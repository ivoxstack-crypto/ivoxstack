import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    // 1. Anti-Spam Check: Honeypot field must be empty
    if (payload.website_hp_check || payload._honey) {
      return {
        statusCode: 200, // Silent discard for bots
        body: JSON.stringify({ success: true, message: 'Inquiry received' }),
      };
    }

    // 2. Anti-Spam Check: Time based check (if submitted under 1.5s, suspect bot)
    if (payload.form_start_time) {
      const duration = Date.now() - Number(payload.form_start_time);
      if (duration < 1200) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, error: 'Submission too fast. Please try again.' }),
        };
      }
    }

    // 3. Validation
    const fullName = (payload.full_name || '').trim();
    const phone = (payload.phone || '').trim();
    const email = (payload.email || '').trim();
    const service = (payload.service || 'General Inquiry').trim();

    if (!fullName || fullName.length < 2) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Valid full name is required' }),
      };
    }

    if (!phone || phone.length < 8) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Valid phone number is required' }),
      };
    }

    // 4. Generate unique Lead ID
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const leadId = `LEAD-${randomDigits}`;

    const leadRecord = {
      lead_id: leadId,
      full_name: fullName,
      business_name: (payload.business_name || '').trim(),
      phone: phone,
      email: email,
      service: service,
      budget: payload.budget || '',
      timeline: payload.timeline || '',
      project_details: (payload.project_details || '').trim(),
      status: 'NEW',
      utm_source: payload.utm_source || '',
      utm_medium: payload.utm_medium || '',
      utm_campaign: payload.utm_campaign || '',
      utm_term: payload.utm_term || '',
      utm_content: payload.utm_content || '',
      landing_page: payload.landing_page || '/',
      page_url: payload.page_url || '',
      created_at: new Date().toISOString(),
    };

    // 5. Store in Supabase if credentials are present
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from('leads').insert([leadRecord]).select().single();
      if (error) {
        console.error('Supabase Lead Insert Error:', error);
      }
    }

    // 6. Optional Webhook Trigger
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadRecord),
        });
      } catch (whErr) {
        console.error('Webhook execution failed:', whErr);
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        data: leadRecord,
        message: 'Lead captured successfully',
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message || 'Internal Server Error' }),
    };
  }
};
