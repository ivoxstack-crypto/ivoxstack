-- 002_rls.sql
-- Row Level Security (RLS) Policies for IvoxStack

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE backups ENABLE ROW LEVEL SECURITY;

-- 1. Public can read active services, pricing, portfolio, case studies, announcements, settings
CREATE POLICY "Public Read Active Services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Pricing" ON pricing_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Published Portfolio" ON portfolio FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Published Case Studies" ON case_studies FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Active Announcements" ON announcements FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Settings" ON settings FOR SELECT USING (true);

-- 2. Public can insert leads (validated by backend/function or public anon key)
CREATE POLICY "Public Insert Leads" ON leads FOR INSERT WITH CHECK (true);

-- 3. Authenticated Staff have Full Access to Leads, CRM, Clients, Operations
CREATE POLICY "Staff Full Access Profiles" ON profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Services" ON services FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Pricing" ON pricing_plans FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Portfolio" ON portfolio FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Case Studies" ON case_studies FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Leads" ON leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Notes" ON lead_notes FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Activity" ON lead_activity FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Clients" ON clients FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Orders" ON orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Payments" ON payments FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Invoices" ON invoices FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Settings" ON settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Announcements" ON announcements FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Activity Logs" ON activity_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Audit Logs" ON audit_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Webhook Logs" ON webhook_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff Full Access Backups" ON backups FOR ALL TO authenticated USING (true);
