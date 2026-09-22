import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const webhookUrl = payload.webhook_url || process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Webhook URL not specified' }),
      };
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-IvoxStack-Secret': process.env.WEBHOOK_SECRET || '',
      },
      body: JSON.stringify(payload.data || payload),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        response_code: res.status,
        message: 'Webhook dispatched successfully',
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
