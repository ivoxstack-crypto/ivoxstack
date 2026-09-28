import type {
  Lead,
  Client,
  Project,
  Invoice,
  ServiceItem,
  PortfolioItem,
  SiteSettings,
  ActivityLog,
  AuditLog,
  AdminUser,
  LeadNote,
} from '../types';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { DEFAULT_SETTINGS, DEFAULT_SERVICES, DEFAULT_PORTFOLIO } from './defaults';

type Result = { success: boolean; message?: string };
type NewLead = Omit<Lead, 'id' | 'lead_id' | 'status' | 'created_at'>;

const BACKEND_UNAVAILABLE = 'Our inquiry system is temporarily unavailable. Please contact us on WhatsApp.';

/**
 * Single source of truth for the app.
 *
 * Public content (settings, services, portfolio) starts from the built-in defaults so the
 * site renders instantly, then is replaced by the live rows from Supabase. Staff-only data
 * (leads, clients, projects, ...) is loaded after a staff member signs in. Every write goes
 * to Supabase first; the in-memory cache only changes once the database accepted it.
 * Components subscribe via `useStoreVersion()` and re-render when anything changes.
 */
const PUBLIC_CACHE_KEY = 'ivox_public_v1';

// Keys written by the old browser-only version of the site (demo leads, clients, a copy
// of the admin password, ...). They're never read any more, so wipe them on first load.
const LEGACY_STORAGE_KEYS = [
  'dm_settings', 'dm_services', 'dm_portfolio', 'dm_leads', 'dm_clients', 'dm_projects', 'dm_invoices',
  'dm_notes', 'dm_activity', 'dm_audit', 'dm_price_rev', 'ivoxstack_admin_pass', 'ivoxstack_admin_email',
];

type PublicCache = { settings: SiteSettings; services: ServiceItem[]; portfolio: PortfolioItem[] };

function readPublicCache(): PublicCache | null {
  try {
    const raw = localStorage.getItem(PUBLIC_CACHE_KEY);
    return raw ? (JSON.parse(raw) as PublicCache) : null;
  } catch {
    return null;
  }
}

class StoreService {
  private cache = readPublicCache();
  private settings: SiteSettings = { ...DEFAULT_SETTINGS, ...this.cache?.settings };
  private services: ServiceItem[] = this.cache?.services?.length ? this.cache.services : DEFAULT_SERVICES;
  private portfolio: PortfolioItem[] = this.cache?.portfolio ?? DEFAULT_PORTFOLIO;
  /** True once public content comes from the database (or a previous visit's cached copy). */
  private publicReady = Boolean(this.cache) || !supabase;

  private leads: Lead[] = [];
  private notes: LeadNote[] = [];
  private clients: Client[] = [];
  private projects: Project[] = [];
  private invoices: Invoice[] = [];
  private activityLogs: ActivityLog[] = [];
  private auditLogs: AuditLog[] = [];

  private currentAdmin: AdminUser | null = null;
  private authChecked = false;

  private listeners = new Set<() => void>();
  private version = 0;

  // --- Subscriptions ---
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getVersion = () => this.version;

  private emit() {
    this.version++;
    this.listeners.forEach((l) => l());
  }

  // --- Bootstrapping ---
  async init() {
    try {
      LEGACY_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch {
      // storage unavailable (private mode etc.) — nothing to clean
    }
    // Never keep first-time visitors waiting on a slow network
    setTimeout(() => {
      if (!this.publicReady) {
        this.publicReady = true;
        this.emit();
      }
    }, 2500);
    await Promise.all([this.loadPublicContent(), this.restoreSession()]);
  }

  isPublicReady(): boolean {
    return this.publicReady;
  }

  private savePublicCache() {
    try {
      const cache: PublicCache = { settings: this.settings, services: this.getServices(), portfolio: this.getPortfolio() };
      localStorage.setItem(PUBLIC_CACHE_KEY, JSON.stringify(cache));
    } catch {
      // storage full or unavailable — caching is only an optimisation
    }
  }

  private async loadPublicContent() {
    if (!supabase) return;
    const [settingsRes, servicesRes, portfolioRes] = await Promise.all([
      supabase.from('site_settings').select('data').eq('id', 1).maybeSingle(),
      supabase.from('services').select('*').order('display_order'),
      supabase.from('portfolio').select('*').order('display_order'),
    ]);

    if (settingsRes.error) console.error('Failed to load settings:', settingsRes.error.message);
    else if (settingsRes.data?.data) this.settings = { ...DEFAULT_SETTINGS, ...settingsRes.data.data };

    if (servicesRes.error) console.error('Failed to load services:', servicesRes.error.message);
    else if (servicesRes.data.length) this.services = servicesRes.data as ServiceItem[];

    if (portfolioRes.error) console.error('Failed to load portfolio:', portfolioRes.error.message);
    else this.portfolio = portfolioRes.data as PortfolioItem[];

    this.publicReady = true;
    this.savePublicCache();
    this.emit();
  }

  // --- Public content ---
  getSettings(): SiteSettings {
    return this.settings;
  }

  /** Services visible on the public site. */
  getServices(): ServiceItem[] {
    return this.getAllServices().filter((s) => s.is_active);
  }

  /** Every service, including hidden ones (admin CMS). */
  getAllServices(): ServiceItem[] {
    return [...this.services].sort((a, b) => a.display_order - b.display_order);
  }

  /** Portfolio items visible on the public site. */
  getPortfolio(): PortfolioItem[] {
    return this.getAllPortfolio().filter((p) => p.is_published);
  }

  getAllPortfolio(): PortfolioItem[] {
    return [...this.portfolio].sort((a, b) => a.display_order - b.display_order);
  }

  // --- Public lead capture ---
  async addLead(leadData: NewLead): Promise<Lead> {
    if (!supabase) throw new Error(BACKEND_UNAVAILABLE);

    const makeLead = (): Lead => ({
      ...leadData,
      id: crypto.randomUUID(),
      lead_id: `LEAD-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'NEW',
      created_at: new Date().toISOString(),
    });

    // Visitors may insert but never read leads, so don't ask for the row back.
    let newLead = makeLead();
    let { error } = await supabase.from('leads').insert(newLead);
    if (error?.code === '23505') {
      // Random lead_id collided with an existing one — try once more with a fresh id
      newLead = makeLead();
      ({ error } = await supabase.from('leads').insert(newLead));
    }
    if (error) {
      console.error('Lead insert failed:', error.message);
      throw new Error(BACKEND_UNAVAILABLE);
    }

    if (this.currentAdmin) {
      this.leads.unshift(newLead);
      this.emit();
    }
    return newLead;
  }

  // --- Staff auth ---
  getCurrentAdmin(): AdminUser | null {
    return this.currentAdmin;
  }

  isAuthChecked(): boolean {
    return this.authChecked;
  }

  private async restoreSession() {
    if (!supabase) {
      this.authChecked = true;
      this.emit();
      return;
    }
    const { data } = await supabase.auth.getSession();
    if (data.session) await this.activateAdmin(data.session.user);
    this.authChecked = true;
    this.emit();

    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') this.clearAdminData();
    });
  }

  /** Confirms the signed-in user is on the staff list, then loads staff-only data. */
  private async activateAdmin(user: User): Promise<boolean> {
    if (!supabase) return false;
    const { data: staff } = await supabase.from('staff').select('*').eq('user_id', user.id).maybeSingle();
    if (!staff) {
      await supabase.auth.signOut();
      return false;
    }
    this.currentAdmin = { id: user.id, email: staff.email, full_name: staff.full_name, role: staff.role };
    // Reload public content too: staff can also see hidden services and unpublished work.
    await Promise.all([this.loadAdminData(), this.loadPublicContent()]);
    return true;
  }

  async loginAdmin(email: string, password: string): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error || !data.user) {
      const invalid = error?.message === 'Invalid login credentials';
      return { success: false, message: invalid ? 'Invalid email or password.' : error?.message || 'Sign-in failed.' };
    }

    if (!(await this.activateAdmin(data.user))) {
      return { success: false, message: 'This account does not have staff access.' };
    }
    this.logActivity('LOGIN', 'OPERATIONS_PORTAL', 'Signed in to the operations portal');
    this.emit();
    return { success: true };
  }

  async logoutAdmin() {
    if (this.currentAdmin) this.logActivity('LOGOUT', 'OPERATIONS_PORTAL', 'Signed out');
    await supabase?.auth.signOut();
    this.clearAdminData();
  }

  async changeAdminPassword(newPassword: string): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    if (newPassword.length < 8) return { success: false, message: 'Password must be at least 8 characters.' };
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { success: false, message: error.message };
    this.logActivity('SECURITY_UPDATE', 'OPERATIONS_PORTAL', 'Admin password changed');
    return { success: true, message: 'Password updated successfully.' };
  }

  private clearAdminData() {
    this.currentAdmin = null;
    this.leads = [];
    this.notes = [];
    this.clients = [];
    this.projects = [];
    this.invoices = [];
    this.activityLogs = [];
    this.auditLogs = [];
    this.emit();
  }

  private async loadAdminData() {
    if (!supabase) return;
    const [leads, notes, clients, projects, invoices, activity, audit] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('lead_notes').select('*').order('created_at', { ascending: false }),
      supabase.from('clients').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('invoices').select('*').order('issue_date', { ascending: false }),
      supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(200),
      supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(200),
    ]);
    for (const res of [leads, notes, clients, projects, invoices, activity, audit]) {
      if (res.error) console.error('Failed to load admin data:', res.error.message);
    }
    this.leads = (leads.data as Lead[]) || [];
    this.notes = (notes.data as LeadNote[]) || [];
    this.clients = (clients.data as Client[]) || [];
    this.projects = (projects.data as Project[]) || [];
    this.invoices = (invoices.data as Invoice[]) || [];
    this.activityLogs = (activity.data as ActivityLog[]) || [];
    this.auditLogs = (audit.data as AuditLog[]) || [];
  }

  private adminName() {
    return this.currentAdmin?.full_name || 'Staff';
  }

  private async write(query: PromiseLike<{ error: { message: string } | null }>): Promise<Result> {
    const { error } = await query;
    if (error) {
      console.error('Database write failed:', error.message);
      return { success: false, message: error.message };
    }
    return { success: true };
  }

  // --- Settings & CMS ---
  async updateSettings(newSettings: SiteSettings): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const res = await this.write(supabase.from('site_settings').upsert({ id: 1, data: newSettings }));
    if (!res.success) return res;
    this.settings = newSettings;
    this.savePublicCache();
    this.logAudit('UPDATE_SETTINGS', 'SITE_SETTINGS', '', 'Website settings updated');
    this.emit();
    return res;
  }

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const res = await this.write(supabase.from('services').update(updates).eq('id', id));
    if (!res.success) return res;
    const service = this.services.find((s) => s.id === id);
    if (service) {
      Object.assign(service, updates);
      this.logAudit('UPDATE_SERVICE', service.name, '', JSON.stringify(updates));
    }
    this.savePublicCache();
    this.emit();
    return res;
  }

  async addPortfolioItem(item: Omit<PortfolioItem, 'id'>): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const newItem: PortfolioItem = { ...item, id: `port-${Date.now()}` };
    const res = await this.write(supabase.from('portfolio').insert(newItem));
    if (!res.success) return res;
    this.portfolio.push(newItem);
    this.savePublicCache();
    this.logActivity('CREATE_PORTFOLIO', newItem.title, 'Added a portfolio item');
    this.emit();
    return res;
  }

  async deletePortfolioItem(id: string): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const res = await this.write(supabase.from('portfolio').delete().eq('id', id));
    if (!res.success) return res;
    const item = this.portfolio.find((p) => p.id === id);
    this.portfolio = this.portfolio.filter((p) => p.id !== id);
    this.savePublicCache();
    if (item) this.logActivity('DELETE_PORTFOLIO', item.title, 'Removed a portfolio item');
    this.emit();
    return res;
  }

  // --- Leads & CRM ---
  getLeads(): Lead[] {
    return this.leads;
  }

  getLeadById(id: string): Lead | undefined {
    return this.leads.find((l) => l.id === id || l.lead_id === id);
  }

  async updateLeadStatus(id: string, newStatus: Lead['status']): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const lead = this.getLeadById(id);
    if (!lead) return { success: false, message: 'Lead not found.' };
    const updated_at = new Date().toISOString();
    const res = await this.write(supabase.from('leads').update({ status: newStatus, updated_at }).eq('id', lead.id));
    if (!res.success) return res;
    const oldStatus = lead.status;
    lead.status = newStatus;
    lead.updated_at = updated_at;
    this.logAudit('STATUS_CHANGE', lead.lead_id, oldStatus, newStatus);
    this.emit();
    return res;
  }

  getNotesForLead(leadId: string): LeadNote[] {
    return this.notes.filter((n) => n.lead_id === leadId);
  }

  async addLeadNote(leadId: string, note: string): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const newNote: LeadNote = {
      id: crypto.randomUUID(),
      lead_id: leadId,
      user_name: this.adminName(),
      note,
      created_at: new Date().toISOString(),
    };
    const res = await this.write(supabase.from('lead_notes').insert(newNote));
    if (!res.success) return res;
    this.notes.unshift(newNote);
    this.emit();
    return res;
  }

  async convertLeadToClient(leadId: string): Promise<Client | null> {
    if (!supabase) return null;
    const lead = this.getLeadById(leadId);
    if (!lead) return null;

    const client: Client = {
      id: crypto.randomUUID(),
      name: lead.full_name,
      company: lead.business_name || lead.full_name,
      phone: lead.phone,
      email: lead.email,
      source_lead_id: lead.id,
      status: 'ACTIVE',
      assigned_manager: this.adminName(),
      notes: `Converted from lead ${lead.lead_id}. Interested in ${lead.service}.`,
      created_at: new Date().toISOString(),
    };

    const res = await this.write(supabase.from('clients').insert(client));
    if (!res.success) return null;
    await this.updateLeadStatus(lead.id, 'WON');
    this.clients.unshift(client);
    this.logActivity('CLIENT_CONVERTED', client.name, `Converted lead ${lead.lead_id} into a client`);
    this.emit();
    return client;
  }

  // --- Clients, Projects, Invoices ---
  getClients(): Client[] {
    return this.clients;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  async addProject(projectData: Omit<Project, 'id' | 'created_at' | 'team_member'>): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      team_member: this.adminName(),
      created_at: new Date().toISOString(),
    };
    const res = await this.write(supabase.from('projects').insert(newProject));
    if (!res.success) return res;
    this.projects.unshift(newProject);
    this.logActivity('CREATE_PROJECT', newProject.name, `Project created for ${newProject.client_name}`);
    this.emit();
    return res;
  }

  async updateProjectStatus(id: string, status: Project['status']): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const res = await this.write(supabase.from('projects').update({ status }).eq('id', id));
    if (!res.success) return res;
    const project = this.projects.find((p) => p.id === id);
    if (project) {
      this.logAudit('PROJECT_STATUS', project.name, project.status, status);
      project.status = status;
    }
    this.emit();
    return res;
  }

  getInvoices(): Invoice[] {
    return this.invoices;
  }

  async addInvoice(data: Pick<Invoice, 'client_id' | 'client_name' | 'amount' | 'tax_amount' | 'due_date' | 'notes'>): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const invoice: Invoice = {
      ...data,
      id: crypto.randomUUID(),
      invoice_number: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
      issue_date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      created_at: new Date().toISOString(),
    };
    const res = await this.write(supabase.from('invoices').insert(invoice));
    if (!res.success) return res;
    this.invoices.unshift(invoice);
    this.logActivity('CREATE_INVOICE', invoice.invoice_number, `Invoice for ${invoice.client_name}`);
    this.emit();
    return res;
  }

  async updateInvoiceStatus(id: string, status: Invoice['status'], paymentMethod?: string): Promise<Result> {
    if (!supabase) return { success: false, message: 'Backend is not configured.' };
    const updates = { status, payment_method: paymentMethod ?? null };
    const res = await this.write(supabase.from('invoices').update(updates).eq('id', id));
    if (!res.success) return res;
    const invoice = this.invoices.find((i) => i.id === id);
    if (invoice) {
      this.logAudit('INVOICE_STATUS', invoice.invoice_number, invoice.status, status);
      invoice.status = status;
      invoice.payment_method = paymentMethod;
    }
    this.emit();
    return res;
  }

  // --- Activity & Audit Logs ---
  getActivityLogs(): ActivityLog[] {
    return this.activityLogs;
  }

  getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  private logActivity(action: string, entity: string, details: string) {
    const log: ActivityLog = {
      id: crypto.randomUUID(),
      user_name: this.adminName(),
      action,
      entity,
      details,
      created_at: new Date().toISOString(),
    };
    this.activityLogs.unshift(log);
    if (supabase) void this.write(supabase.from('activity_logs').insert(log));
  }

  private logAudit(action: string, entity: string, oldValue: string, newValue: string) {
    const log: AuditLog = {
      id: crypto.randomUUID(),
      user_name: this.adminName(),
      action,
      entity,
      old_value: oldValue,
      new_value: newValue,
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    if (supabase) void this.write(supabase.from('audit_logs').insert(log));
  }

  // --- Backup ---
  createBackupJSON(): string {
    return JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        platform: 'IvoxStack',
        tables: {
          settings: this.settings,
          services: this.services,
          portfolio: this.portfolio,
          leads: this.leads,
          lead_notes: this.notes,
          clients: this.clients,
          projects: this.projects,
          invoices: this.invoices,
          activity_logs: this.activityLogs,
          audit_logs: this.auditLogs,
        },
      },
      null,
      2
    );
  }
}

export const store = new StoreService();
