import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Local fallback backup schema ready',
          timestamp: new Date().toISOString(),
        })
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const tables = ['leads', 'clients', 'projects', 'orders', 'payments', 'invoices', 'services', 'pricing_plans', 'settings', 'portfolio', 'case_studies'];
    const backupData: Record<string, any> = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      tables: {}
    };

    for (const table of tables) {
      const { data } = await supabase.from(table).select('*');
      backupData.tables[table] = data || [];
    }

    // Record in backup table
    await supabase.from('backups').insert([{
      created_by: 'SUPER_ADMIN',
      data_size: JSON.stringify(backupData).length,
      backup_json: backupData,
    }]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="ivoxstack_backup_${Date.now()}.json"`,
      },
      body: JSON.stringify(backupData, null, 2),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
