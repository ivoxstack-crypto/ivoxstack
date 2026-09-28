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
    const cached = sessionStorage.getItem('ivoxstack_utm');
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

const loadedTrackers = new Set<string>();

/** Injects the Meta Pixel and GA4 scripts once, using the IDs saved in admin settings. */
export function loadTrackingScripts(metaPixelId: string, ga4Id: string) {
  const w = window as any;

  if (metaPixelId && !loadedTrackers.has('fbq')) {
    loadedTrackers.add('fbq');
    const fbq: any = function (...args: any[]) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    w.fbq = w._fbq = fbq;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
    w.fbq('init', metaPixelId);
  }

  if (ga4Id && !loadedTrackers.has('gtag')) {
    loadedTrackers.add('gtag');
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      // gtag.js expects the raw `arguments` object
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(s);
    w.gtag('js', new Date());
    // Page views are sent manually on every route change (SPA)
    w.gtag('config', ga4Id, { send_page_view: false });
  }
}

export function trackPageView() {
  const w = window as any;
  w.fbq?.('track', 'PageView');
  w.gtag?.('event', 'page_view', { page_path: window.location.pathname, page_location: window.location.href });
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
