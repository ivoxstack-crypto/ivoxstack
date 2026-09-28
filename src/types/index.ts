export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'FOLLOW-UP' | 'WON' | 'LOST';

export interface Lead {
  id: string;
  lead_id: string;
  full_name: string;
  business_name?: string;
  phone: string;
  email: string;
  service: string;
  budget?: string;
  timeline?: string;
  project_details?: string;
  status: LeadStatus;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  page_url?: string;
  created_at: string;
  updated_at?: string;
  assigned_user?: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  user_name: string;
  note: string;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  source_lead_id?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  assigned_manager?: string;
  notes?: string;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  client_name: string;
  name: string;
  service: string;
  status: 'Active' | 'In Progress' | 'Client Review' | 'Revision' | 'Delivered' | 'On Hold';
  start_date: string;
  deadline: string;
  budget: number;
  team_member?: string;
  notes?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  client_name: string;
  order_id?: string;
  amount: number;
  tax_amount?: number;
  issue_date: string;
  due_date: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
  payment_method?: string;
  notes?: string;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  starting_price: number;
  icon: string;
  features: string[];
  display_order: number;
  is_active: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Websites' | 'Creative Design' | 'Video' | 'Branding' | 'Social Media' | 'Advertising';
  client?: string;
  description: string;
  image: string;
  project_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  business_hours: string;
  meta_pixel_id: string;
  ga4_id: string;
  maintenance_mode: boolean;
  announcement_active: boolean;
  announcement_text: string;
  announcement_link: string;
}

export type AdminRole = 'SUPER_ADMIN' | 'OPERATIONS_LEAD' | 'SALES_TEAM' | 'MARKETING_TEAM';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
}

export interface ActivityLog {
  id: string;
  user_name: string;
  action: string;
  entity: string;
  details: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_name: string;
  action: string;
  entity: string;
  old_value?: string;
  new_value?: string;
  created_at: string;
}
