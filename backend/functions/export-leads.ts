import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const handler: Handler = async (event) => {
  try {
    let leads: any[] = [];
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      leads = data || [];
    }

    // CSV fields: Lead ID, Name, Business, Phone, Email, Service, Budget, Timeline, Status, UTM Source, UTM Medium, UTM Campaign, Created At
    const headers = ['Lead ID', 'Name', 'Business', 'Phone', 'Email', 'Service', 'Budget', 'Timeline', 'Status', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Created At'];
    const rows = leads.map(l => [
      `"${l.lead_id || ''}"`,
      `"${(l.full_name || '').replace(/"/g, '""')}"`,
      `"${(l.business_name || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${l.budget || ''}"`,
      `"${l.timeline || ''}"`,
      `"${l.status || ''}"`,
      `"${l.utm_source || ''}"`,
      `"${l.utm_medium || ''}"`,
      `"${l.utm_campaign || ''}"`,
      `"${l.created_at || ''}"`,
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="ivoxstack_leads.csv"',
      },
      body: csvContent,
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
