/**
 * UTM Tracking, Meta Pixel, and Google Analytics 4 integration
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  if (params.get('utm_source')) utm.utm_source = params.get('utm_source')!;
  if (params.get('utm_medium')) utm.utm_medium = params.get('utm_medium')!;
  if (params.get('utm_campaign')) utm.utm_campaign = params.get('utm_campaign')!;
  if (params.get('utm_term')) utm.utm_term = params.get('utm_term')!;
  if (params.get('utm_content')) utm.utm_content = params.get('utm_content')!;

  // Cache in sessionStorage for multi-page session attribution
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('ivoxstack_utm', JSON.stringify(utm));
  } else {
    const cached = sessionStorage.getItem('ivoxstack_utm') || sessionStorage.getItem('digimarketive_utm');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // ignore
      }
    }
  }

  return utm;
}

export function trackMetaPixel(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params);
  }
}

export function trackGA4Event(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

export function trackWhatsAppClick(source: string) {
  trackMetaPixel('Contact', { type: 'whatsapp', source });
  trackGA4Event('click_to_chat', { channel: 'whatsapp', source });
}

export function trackCallClick(source: string) {
  trackMetaPixel('Contact', { type: 'phone', source });
  trackGA4Event('click_to_call', { channel: 'phone', source });
}

export function trackLeadSubmission(leadId: string, service: string, value = 0) {
  trackMetaPixel('Lead', { lead_id: leadId, service, value, currency: 'INR' });
  trackGA4Event('generate_lead', { lead_id: leadId, service, value });
}
