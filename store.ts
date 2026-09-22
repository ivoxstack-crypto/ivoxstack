import { 
  Lead, 
  Client, 
  Project, 
  Order, 
  Payment, 
  Invoice, 
  ServiceItem, 
  PricingPlan, 
  PortfolioItem, 
  CaseStudy, 
  SiteSettings, 
  ActivityLog, 
  AuditLog, 
  AdminUser,
  LeadNote
} from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const INITIAL_SETTINGS: SiteSettings = {
  site_name: 'IvoxStack',
  tagline: 'Digital Solutions Built for Business Growth',
  phone: '+91 82522 57405',
  whatsapp: '918252257405',
  email: 'digimarketive@gmail.com',
  address: 'Ghitorni, New Delhi - 110030',
  business_hours: 'Monday - Saturday: 9:30 AM - 7:30 PM',
  social_links: {
    instagram: 'https://instagram.com/ivoxstack',
    facebook: 'https://facebook.com/ivoxstack',
    linkedin: 'https://linkedin.com/company/ivoxstack',
  },
  meta_pixel_id: '',
  ga4_id: '',
  webhook_url: '',
  maintenance_mode: false,
  announcement_active: true,
  announcement_text: '🚀 Special Growth Launch — Get 20% Off All Digital Growth Bundles This Month!',
  announcement_link: '/pricing',
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Website Design & Development',
    slug: 'website-design-development',
    short_description: 'High-speed, conversion-focused websites, landing pages, and enterprise web solutions.',
    starting_price: 2999,
    icon: 'Globe',
    features: ['Modern UI/UX', 'Mobile Responsive', 'SEO Optimized', 'Speed Tuned', 'Lead Capture Funnels'],
    display_order: 1,
    is_active: true,
  },
  {
    id: 'srv-2',
    name: 'Creative Design',
    slug: 'creative-design',
    short_description: 'High-impact social media creatives, promotional posters, and ad designs.',
    starting_price: 99,
    icon: 'Palette',
    features: ['Custom Visuals', 'High Click-Through Design', 'Brand Typography', 'Ad Formats', 'Fast Turnaround'],
    display_order: 2,
    is_active: true,
  },
  {
    id: 'srv-3',
    name: 'Video Editing & Reels',
    slug: 'video-editing-reels',
    short_description: 'Dynamic short-form video, Instagram reels, motion captions, and direct-response hooks.',
    starting_price: 349,
    icon: 'Video',
    features: ['Hook Scripting', 'Dynamic Captions', 'Sound Design & SFX', 'Color Grading', 'Viral Pacing'],
    display_order: 3,
    is_active: true,
  },
  {
    id: 'srv-4',
    name: 'Social Media Management',
    slug: 'social-media-management',
    short_description: 'Organic brand presence, strategic content calendars, reels, stories, and engagement.',
    starting_price: 6999,
    icon: 'Share2',
    features: ['12-20 Monthly Posts', 'Reels & Stories', 'Hashtag & Caption Strategy', 'Monthly Analytics', 'Community Moderation'],
    display_order: 4,
    is_active: true,
  },
  {
    id: 'srv-5',
    name: 'Meta Ads Management',
    slug: 'meta-ads-management',
    short_description: 'High-ROAS Facebook & Instagram campaigns, custom audiences, retargeting & scaling.',
    starting_price: 4999,
    icon: 'Target',
    features: ['Ad Account Setup', 'Audience Research', 'A/B Creative Testing', 'Pixel Integration', 'Weekly Optimization'],
    display_order: 5,
    is_active: true,
  },
  {
    id: 'srv-6',
    name: 'Lead Generation',
    slug: 'lead-generation',
    short_description: 'High-intent B2B & B2C customer acquisition funnels that convert visitors into qualified leads.',
    starting_price: 9999,
    icon: 'Users',
    features: ['Custom Funnels', 'Instant WhatsApp Alerts', 'CRM Synchronization', 'Automated Qualification', 'Scalable Volume'],
    display_order: 6,
    is_active: true,
  },
  {
    id: 'srv-7',
    name: 'Google Ads',
    slug: 'google-ads',
    short_description: 'High-intent search ads, Performance Max campaigns, and display retargeting.',
    starting_price: 2999,
    icon: 'Search',
    features: ['Search Keyword Research', 'P-Max Campaigns', 'Negative Keyword Lists', 'Conversion Tracking', 'ROI Focus'],
    display_order: 7,
    is_active: true,
  },
  {
    id: 'srv-8',
    name: 'Google Business Profile',
    slug: 'google-business-profile',
    short_description: 'Rank #1 on Google Maps for local searches, review strategies, and direct lead calls.',
    starting_price: 999,
    icon: 'MapPin',
    features: ['Profile Optimization', 'Local Geotagging', 'Review Generation Strategy', 'Weekly Posts', 'Call Tracking'],
    display_order: 8,
    is_active: true,
  },
  {
    id: 'srv-9',
    name: 'Local Business Marketing',
    slug: 'local-business-marketing',
    short_description: 'Hyper-local advertising, WhatsApp inquiries, and local discovery campaigns.',
    starting_price: 7999,
    icon: 'Store',
    features: ['Hyper-Local Geo Ads', 'Google Maps Boost', 'Local WhatsApp Marketing', 'Community Engagement', 'Store Footfall'],
    display_order: 9,
    is_active: true,
  },
  {
    id: 'srv-10',
    name: 'Branding & Identity',
    slug: 'branding-identity',
    short_description: 'Complete brand books, logos, color systems, stationery, and vector guidelines.',
    starting_price: 2999,
    icon: 'Sparkles',
    features: ['Logo Suite & Vectors', 'Color Palette & Typography', 'Stationery Kit', 'Social Media Kit', 'Brand Usage Guidelines'],
    display_order: 10,
    is_active: true,
  },
  {
    id: 'srv-11',
    name: 'Search Engine Optimization (SEO)',
    slug: 'seo',
    short_description: 'Technical SEO, on-page optimization, local maps ranking, and organic traffic growth.',
    starting_price: 4999,
    icon: 'TrendingUp',
    features: ['Keyword Analysis', 'Technical Audits', 'On-Page Optimization', 'Backlink Strategy', 'Monthly Rank Reports'],
    display_order: 11,
    is_active: true,
  },
  {
    id: 'srv-12',
    name: 'Marketing Automation',
    slug: 'marketing-automation',
    short_description: 'Automated WhatsApp routing, lead sync, email workflows, and CRM pipelines.',
    starting_price: 4999,
    icon: 'Cpu',
    features: ['WhatsApp Auto-Replies', 'CRM Webhook Integrations', 'Lead Notification Bots', 'Zero Manual Entry', 'Instant Speed to Lead'],
    display_order: 12,
    is_active: true,
  },
  {
    id: 'srv-13',
    name: 'WhatsApp Marketing',
    slug: 'whatsapp-marketing',
    short_description: 'Official WhatsApp template broadcasts, segmentation, and automated customer journeys.',
    starting_price: 999,
    icon: 'MessageCircle',
    features: ['Meta Verified Templates', 'Segmented Broadcasts', 'Interactive CTA Buttons', 'Opt-In Lists', 'High Open Rates (98%)'],
    display_order: 13,
    is_active: true,
  },
  {
    id: 'srv-14',
    name: 'Content Writing',
    slug: 'content-writing',
    short_description: 'Persuasive ad copy, website copy, sales letters, and SEO-optimized blogs.',
    starting_price: 99,
    icon: 'PenTool',
    features: ['Direct Response Copy', 'High-CTR Ad Copy', 'Website Page Copy', 'SEO Blog Articles', 'Tone-of-Voice Alignment'],
    display_order: 14,
    is_active: true,
  },
  {
    id: 'srv-15',
    name: 'Website Maintenance',
    slug: 'website-maintenance',
    short_description: 'Regular backups, SSL security, speed optimization, uptime checks, and content updates.',
    starting_price: 999,
    icon: 'ShieldCheck',
    features: ['Automated Backups', 'SSL & Security Audits', 'Speed & Cache Tuning', 'Content Updates', 'Fast Support Turnaround'],
    display_order: 15,
    is_active: true,
  },
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-3',
    title: 'NVA Infracon Corporate Infrastructure Portal',
    category: 'Websites',
    client: 'NVA Infracon',
    description: 'Modern infrastructure corporate portal, commercial civil construction project showcases, and dynamic procurement funnels.',
    image: '/nva-infracon.png',
    project_url: 'https://nvainfracon.com',
    is_featured: true,
    is_published: true,
    display_order: 1,
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'ld-1',
    lead_id: 'LEAD-892341',
    full_name: 'Vikramaditya Sharma',
    business_name: 'Apex Hospitality Group',
    phone: '+91 98230 45678',
    email: 'vikram@apexhospitality.in',
    service: 'Website Design & Development',
    budget: '₹25,000–₹50,000',
    timeline: 'Within 7 Days',
    project_details: 'Need a luxury resort booking website with WhatsApp integration and Meta pixel for ad campaigns.',
    status: 'QUALIFIED',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'resort_leads_q3',
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: 'ld-2',
    lead_id: 'LEAD-612984',
    full_name: 'Rajesh Agrawal',
    business_name: 'Agrawal Auto Dealership',
    phone: '+91 99112 34567',
    email: 'rajesh@agrawalmotors.com',
    service: 'Lead Generation',
    budget: '₹10,000–₹25,000',
    timeline: 'Immediately',
    project_details: 'Seeking regular car buyers in Varanasi region via Meta Ads and WhatsApp follow-up.',
    status: 'NEW',
    utm_source: 'meta',
    utm_medium: 'paid',
    utm_campaign: 'dealership_growth',
    created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
  {
    id: 'ld-3',
    lead_id: 'LEAD-734190',
    full_name: 'Dr. Ananya Sen',
    business_name: 'Sen Dental & Aesthetic Clinic',
    phone: '+91 98450 12389',
    email: 'drananya@senclinic.com',
    service: 'Google Business Profile',
    budget: '₹5,000–₹10,000',
    timeline: 'Within This Month',
    project_details: 'Optimize Google Maps listing for aesthetic dental implants in NCR.',
    status: 'CONTACTED',
    utm_source: 'direct',
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
  },
  {
    id: 'ld-4',
    lead_id: 'LEAD-489021',
    full_name: 'Karan Mehra',
    business_name: 'UrbanStyle D2C Fashion',
    phone: '+91 97118 90214',
    email: 'karan@urbanstyle.co',
    service: 'Meta Ads Management',
    budget: '₹25,000–₹50,000',
    timeline: 'Immediately',
    project_details: 'Scaled fashion brand needing direct ROAS 4.5+ scaling on Instagram.',
    status: 'WON',
    utm_source: 'instagram',
    utm_medium: 'organic',
    created_at: new Date(Date.now() - 72 * 3600000).toISOString(),
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cl-1',
    name: 'Karan Mehra',
    company: 'UrbanStyle D2C Fashion',
    phone: '+91 97118 90214',
    email: 'karan@urbanstyle.co',
    source_lead_id: 'ld-4',
    status: 'ACTIVE',
    assigned_manager: 'Shubham Pandey',
    notes: 'Retainer client. Meta ads + creative packages.',
    created_at: new Date(Date.now() - 60 * 3600000).toISOString(),
  },
  {
    id: 'cl-2',
    name: 'Vikramaditya Sharma',
    company: 'Apex Hospitality Group',
    phone: '+91 98230 45678',
    email: 'vikram@apexhospitality.in',
    status: 'ACTIVE',
    assigned_manager: 'Shubham Pandey',
    notes: 'Luxury Web Platform and Direct Booking Concierge.',
    created_at: new Date(Date.now() - 45 * 24 * 3600000).toISOString(),
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    client_id: 'cl-1',
    client_name: 'UrbanStyle D2C Fashion',
    name: 'Q3 Meta Ads Scaling & High-ROAS Creatives',
    service: 'Meta Ads Management',
    status: 'Active',
    start_date: '2026-09-01',
    deadline: '2026-09-30',
    budget: 19999,
    team_member: 'Shubham Pandey',
    notes: 'Running 3 campaign angles with lookalike audiences.',
    created_at: new Date(Date.now() - 14 * 24 * 3600000).toISOString(),
  },
  {
    id: 'proj-2',
    client_id: 'cl-2',
    client_name: 'Apex Hospitality Group',
    name: 'Luxury Web Platform & Direct Booking Concierge',
    service: 'Website Design & Development',
    status: 'Delivered',
    start_date: '2026-08-01',
    deadline: '2026-08-25',
    budget: 34999,
    team_member: 'Shubham Pandey',
    notes: 'Delivered high-aesthetic resort portal and integrated WhatsApp concierge.',
    created_at: new Date(Date.now() - 30 * 24 * 3600000).toISOString(),
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoice_number: 'INV-2026-001',
    client_id: 'cl-1',
    client_name: 'UrbanStyle D2C Fashion',
    amount: 19999,
    tax_amount: 3599,
    issue_date: '2026-09-01',
    due_date: '2026-09-08',
    status: 'Paid',
    payment_method: 'UPI',
    notes: 'September Retainer - Meta Ads',
    created_at: new Date(Date.now() - 15 * 24 * 3600000).toISOString(),
  },
  {
    id: 'inv-2',
    invoice_number: 'INV-2026-002',
    client_id: 'cl-2',
    client_name: 'Apex Hospitality Group',
    amount: 34999,
    tax_amount: 6299,
    issue_date: '2026-08-15',
    due_date: '2026-08-22',
    status: 'Paid',
    payment_method: 'NEFT',
    notes: 'Luxury Web Platform Deliverables',
    created_at: new Date(Date.now() - 32 * 24 * 3600000).toISOString(),
  }
];

// Helper to save/load state to persist in browser while allowing Supabase sync
class StoreService {
  private settings: SiteSettings;
  private services: ServiceItem[];
  private portfolio: PortfolioItem[];
  private leads: Lead[];
  private clients: Client[];
  private projects: Project[];
  private invoices: Invoice[];
  private notes: LeadNote[];
  private activityLogs: ActivityLog[];
  private auditLogs: AuditLog[];
  private currentAdmin: AdminUser | null = null;
  private failedLoginAttempts = 0;
  private lockoutUntil: number | null = null;

  constructor() {
    this.settings = this.load('dm_settings', INITIAL_SETTINGS);
    if (
      this.settings.site_name === 'DigiMarketive' ||
      this.settings.phone === '+91 98765 43210' ||
      this.settings.email === 'hello@ivoxstack.com' ||
      !this.settings.phone?.includes('82522') ||
      this.settings.address === 'Varanasi & Noida, India' ||
      !this.settings.address
    ) {
      this.settings.site_name = 'IvoxStack';
      this.settings.phone = '+91 82522 57405';
      this.settings.whatsapp = '918252257405';
      this.settings.email = 'digimarketive@gmail.com';
      this.settings.address = 'Ghitorni, New Delhi - 110030';
      this.save('dm_settings', this.settings);
    }
    this.services = this.load('dm_services', INITIAL_SERVICES);
    this.portfolio = this.load('dm_portfolio', INITIAL_PORTFOLIO);
    
    // Purge removed legacy items from localStorage cache
    const REMOVED_NAMES = [
      'Ultimate iTech',
      'Indian Trade Mart',
      'HHH-Jobs',
      'Indian Properties',
      'Connect Love',
      'Srishti Tech',
      'Eimager Visuals',
      'UrbanStyle',
      'Apex Luxury',
      'Apex Hospitality',
    ];
    const cleaned = this.portfolio.filter(p => 
      !REMOVED_NAMES.some(name => p.title.toLowerCase().includes(name.toLowerCase()) || p.client?.toLowerCase().includes(name.toLowerCase()))
    );
    if (cleaned.length !== this.portfolio.length || cleaned.length === 0) {
      this.portfolio = cleaned.length > 0 ? cleaned : INITIAL_PORTFOLIO;
      this.save('dm_portfolio', this.portfolio);
    }
    this.leads = this.load('dm_leads', INITIAL_LEADS);
    this.clients = this.load('dm_clients', INITIAL_CLIENTS);
    this.projects = this.load('dm_projects', INITIAL_PROJECTS);
    this.invoices = this.load('dm_invoices', INITIAL_INVOICES);
    this.notes = this.load('dm_notes', []);
    this.activityLogs = this.load('dm_activity', [
      {
        id: 'act-1',
        user_name: 'System',
        action: 'PLATFORM_INIT',
        entity: 'CORE',
        details: 'IvoxStack platform initialized with complete digital solutions architecture.',
        created_at: new Date().toISOString(),
      }
    ]);
    this.auditLogs = this.load('dm_audit', []);
    
    // Check existing auth session
    const savedAdmin = sessionStorage.getItem('dm_admin_user');
    if (savedAdmin) {
      try {
        this.currentAdmin = JSON.parse(savedAdmin);
      } catch {
        this.currentAdmin = null;
      }
    }
  }

  private load<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private save<T>(key: string, data: T) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  // --- Settings ---
  getSettings(): SiteSettings {
    return this.settings;
  }

  updateSettings(newSettings: Partial<SiteSettings>, userName = 'SUPER_ADMIN') {
    const oldSettings = { ...this.settings };
    this.settings = { ...this.settings, ...newSettings };
    this.save('dm_settings', this.settings);
    
    this.logAudit(userName, 'UPDATE_SETTINGS', 'SITE_SETTINGS', JSON.stringify(oldSettings), JSON.stringify(this.settings));
    this.logActivity(userName, 'UPDATE_SETTINGS', 'SETTINGS', 'Updated website configuration & metadata');
    return this.settings;
  }

  // --- Services CMS ---
  getServices(): ServiceItem[] {
    return this.services.sort((a, b) => a.display_order - b.display_order);
  }

  updateService(id: string, updates: Partial<ServiceItem>, userName = 'ADMIN') {
    const idx = this.services.findIndex(s => s.id === id);
    if (idx >= 0) {
      const oldVal = JSON.stringify(this.services[idx]);
      this.services[idx] = { ...this.services[idx], ...updates };
      this.save('dm_services', this.services);
      this.logAudit(userName, 'UPDATE_SERVICE', this.services[idx].name, oldVal, JSON.stringify(this.services[idx]));
    }
    return this.services;
  }

  // --- Portfolio CMS ---
  getPortfolio(): PortfolioItem[] {
    return this.portfolio.sort((a, b) => a.display_order - b.display_order);
  }

  addPortfolioItem(item: Omit<PortfolioItem, 'id'>, userName = 'ADMIN'): PortfolioItem {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
    };
    this.portfolio.push(newItem);
    this.save('dm_portfolio', this.portfolio);
    this.logActivity(userName, 'CREATE_PORTFOLIO', newItem.title, 'Created new portfolio showcase');
    return newItem;
  }

  // --- Leads & CRM ---
  getLeads(): Lead[] {
    return [...this.leads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getLeadById(id: string): Lead | undefined {
    return this.leads.find(l => l.id === id || l.lead_id === id);
  }

  async addLead(leadData: Omit<Lead, 'id' | 'lead_id' | 'status' | 'created_at'>): Promise<Lead> {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const leadId = `LEAD-${randomDigits}`;

    const newLead: Lead = {
      ...leadData,
      id: `ld-${Date.now()}`,
      lead_id: leadId,
      status: 'NEW',
      created_at: new Date().toISOString(),
    };

    this.leads.unshift(newLead);
    this.save('dm_leads', this.leads);

    this.logActivity('System', 'LEAD_CREATED', leadId, `New lead captured for ${newLead.service} from ${newLead.full_name}`);

    // If Supabase is connected, async push
    if (supabase) {
      supabase.from('leads').insert([newLead]).then();
    }

    return newLead;
  }

  updateLeadStatus(id: string, newStatus: Lead['status'], userName = 'STAFF') {
    const lead = this.leads.find(l => l.id === id || l.lead_id === id);
    if (lead) {
      const oldStatus = lead.status;
      lead.status = newStatus;
      lead.updated_at = new Date().toISOString();
      this.save('dm_leads', this.leads);

      this.logAudit(userName, 'STATUS_CHANGE', lead.lead_id, oldStatus, newStatus);
      this.logActivity(userName, 'LEAD_STATUS_UPDATED', lead.lead_id, `Status transitioned from ${oldStatus} to ${newStatus}`);
    }
  }

  addLeadNote(leadId: string, note: string, userName = 'Agent') {
    const newNote: LeadNote = {
      id: `note-${Date.now()}`,
      lead_id: leadId,
      user_name: userName,
      note,
      created_at: new Date().toISOString(),
    };
    this.notes.unshift(newNote);
    this.save('dm_notes', this.notes);
    this.logActivity(userName, 'NOTE_ADDED', leadId, `Internal note recorded`);
    return newNote;
  }

  getNotesForLead(leadId: string): LeadNote[] {
    return this.notes.filter(n => n.lead_id === leadId);
  }

  // --- Convert Lead to Client ---
  convertLeadToClient(leadId: string, userName = 'SALES'): Client | null {
    const lead = this.leads.find(l => l.id === leadId || l.lead_id === leadId);
    if (!lead) return null;

    lead.status = 'WON';
    this.save('dm_leads', this.leads);

    const client: Client = {
      id: `cl-${Date.now()}`,
      name: lead.full_name,
      company: lead.business_name || lead.full_name,
      phone: lead.phone,
      email: lead.email,
      source_lead_id: lead.id,
      status: 'ACTIVE',
      assigned_manager: userName,
      notes: `Converted from lead ${lead.lead_id}. Interested in ${lead.service}.`,
      created_at: new Date().toISOString(),
    };

    this.clients.unshift(client);
    this.save('dm_clients', this.clients);

    this.logActivity(userName, 'CLIENT_CONVERTED', client.name, `Successfully converted Lead ${lead.lead_id} into Client.`);
    return client;
  }

  // --- Clients, Projects, Invoices ---
  getClients(): Client[] {
    return this.clients;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  addProject(projectData: Omit<Project, 'id' | 'created_at'>): Project {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.projects.unshift(newProject);
    this.save('dm_projects', this.projects);
    return newProject;
  }

  getInvoices(): Invoice[] {
    return this.invoices;
  }

  // --- Activity & Audit Logs ---
  getActivityLogs(): ActivityLog[] {
    return this.activityLogs.slice(0, 100);
  }

  getAuditLogs(): AuditLog[] {
    return this.auditLogs.slice(0, 100);
  }

  private logActivity(userName: string, action: string, entity: string, details: string) {
    const log: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user_name: userName,
      action,
      entity,
      details,
      created_at: new Date().toISOString(),
    };
    this.activityLogs.unshift(log);
    this.save('dm_activity', this.activityLogs);
  }

  private logAudit(userName: string, action: string, entity: string, oldValue: string, newValue: string) {
    const log: AuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user_name: userName,
      action,
      entity,
      old_value: oldValue,
      new_value: newValue,
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    this.save('dm_audit', this.auditLogs);
  }

  // --- Auth & Security ---
  getCurrentAdmin(): AdminUser | null {
    return this.currentAdmin;
  }

  getStoredPassword(): string {
    return localStorage.getItem('ivoxstack_admin_pass') || 'DigiGrowth@2026!';
  }

  getStoredEmail(): string {
    return localStorage.getItem('ivoxstack_admin_email') || 'admin@ivoxstack.com';
  }

  changeAdminPassword(currentPass: string, newPass: string): { success: boolean; message?: string } {
    const activePass = this.getStoredPassword();
    if (currentPass !== activePass) {
      return { success: false, message: 'Current password does not match.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }
    localStorage.setItem('ivoxstack_admin_pass', newPass);
    this.logActivity(this.currentAdmin?.full_name || 'Super Admin', 'SECURITY_UPDATE', 'OPERATIONS_PORTAL', 'Admin password changed successfully');
    return { success: true, message: 'Password updated successfully!' };
  }

  changeAdminEmail(newEmail: string): { success: boolean; message?: string } {
    if (!newEmail || !newEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    localStorage.setItem('ivoxstack_admin_email', newEmail.trim().toLowerCase());
    if (this.currentAdmin) {
      this.currentAdmin.email = newEmail.trim().toLowerCase();
      sessionStorage.setItem('dm_admin_user', JSON.stringify(this.currentAdmin));
    }
    this.logActivity(this.currentAdmin?.full_name || 'Super Admin', 'SECURITY_UPDATE', 'OPERATIONS_PORTAL', `Admin email updated to ${newEmail}`);
    return { success: true, message: 'Admin email updated successfully!' };
  }

  loginAdmin(email: string, pass: string): { success: boolean; message?: string } {
    const now = Date.now();
    if (this.lockoutUntil && now < this.lockoutUntil) {
      const waitMins = Math.ceil((this.lockoutUntil - now) / 60000);
      return { success: false, message: `Account locked due to 5 failed attempts. Please retry in ${waitMins} minute(s).` };
    }

    const storedEmail = this.getStoredEmail();
    const storedPass = this.getStoredPassword();
    const validEmails = [storedEmail, 'admin@ivoxstack.com', 'admin@digimarketive.com', 'digimarketive@gmail.com'];

    if (validEmails.includes(email.trim().toLowerCase()) && pass === storedPass) {
      this.failedLoginAttempts = 0;
      this.lockoutUntil = null;
      this.currentAdmin = {
        id: 'usr-admin-1',
        email: email.trim().toLowerCase(),
        full_name: 'Shubham Pandey (Super Admin)',
        role: 'SUPER_ADMIN',
      };
      sessionStorage.setItem('dm_admin_user', JSON.stringify(this.currentAdmin));
      this.logActivity('Shubham Pandey', 'LOGIN', 'OPERATIONS_PORTAL', 'Super Admin logged into Operations Dashboard');
      return { success: true };
    } else {
      this.failedLoginAttempts += 1;
      if (this.failedLoginAttempts >= 5) {
        this.lockoutUntil = now + 15 * 60 * 1000; // 15 mins lockout
        return { success: false, message: 'Too many incorrect attempts. Account locked for 15 minutes.' };
      }
      return { success: false, message: `Invalid credentials. (${5 - this.failedLoginAttempts} attempts remaining)` };
    }
  }

  logoutAdmin() {
    if (this.currentAdmin) {
      this.logActivity(this.currentAdmin.full_name, 'LOGOUT', 'OPERATIONS_PORTAL', 'Logged out of admin session');
    }
    this.currentAdmin = null;
    sessionStorage.removeItem('dm_admin_user');
  }

  // --- Backup & Restore ---
  createBackupJSON(): string {
    const backup = {
      timestamp: new Date().toISOString(),
      platform: 'IvoxStack',
      version: '1.0.0',
      tables: {
        settings: this.settings,
        services: this.services,
        portfolio: this.portfolio,
        leads: this.leads,
        clients: this.clients,
        projects: this.projects,
        invoices: this.invoices,
        notes: this.notes,
        activityLogs: this.activityLogs,
        auditLogs: this.auditLogs,
      }
    };
    return JSON.stringify(backup, null, 2);
  }

  restoreBackupJSON(jsonString: string, userName = 'SUPER_ADMIN'): { success: boolean; message: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.tables) {
        return { success: false, message: 'Invalid backup JSON. Missing tables property.' };
      }

      const t = parsed.tables;
      if (t.settings) this.settings = t.settings;
      if (t.services) this.services = t.services;
      if (t.portfolio) this.portfolio = t.portfolio;
      if (t.leads) this.leads = t.leads;
      if (t.clients) this.clients = t.clients;
      if (t.projects) this.projects = t.projects;
      if (t.invoices) this.invoices = t.invoices;
      if (t.notes) this.notes = t.notes;

      this.save('dm_settings', this.settings);
      this.save('dm_services', this.services);
      this.save('dm_portfolio', this.portfolio);
      this.save('dm_leads', this.leads);
      this.save('dm_clients', this.clients);
      this.save('dm_projects', this.projects);
      this.save('dm_invoices', this.invoices);
      this.save('dm_notes', this.notes);

      this.logAudit(userName, 'RESTORE_DATABASE', 'ALL_TABLES', 'Previous State', `Restored from ${parsed.timestamp || 'file'}`);
      this.logActivity(userName, 'RESTORE_COMPLETE', 'DATABASE', 'Full system restoration succeeded.');
      return { success: true, message: 'Platform state restored successfully!' };
    } catch (err: any) {
      return { success: false, message: `Failed to restore: ${err.message}` };
    }
  }
}

export const store = new StoreService();
