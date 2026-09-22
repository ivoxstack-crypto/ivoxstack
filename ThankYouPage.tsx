import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/analytics';

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const settings = store.getSettings();

  const name = (location.state as any)?.name || 'Valued Business';
  const leadId = (location.state as any)?.leadId || '';

  const handleWhatsApp = () => {
    trackWhatsAppClick('thank_you_page');
    const msg = `Hello IvoxStack, I just submitted an inquiry (${leadId ? `ID: ${leadId}` : 'online'}). Looking forward to connecting.`;
    window.open(buildWhatsAppUrl(msg, settings.whatsapp), '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center bg-white">
      <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 animate-fade-in">
        
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Inquiry Successfully Logged
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Thank You, {name}!
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Your inquiry has been safely received into our operations CRM. Our strategic growth team will review your business requirements and contact you shortly.
          </p>
          {leadId && (
            <p className="text-xs font-mono text-slate-500 pt-2">
              Reference Tracking ID: <span className="text-brand-600 font-bold">{leadId}</span>
            </p>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 group"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>Chat on WhatsApp Now</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Priority response SLA: ~4 business hours.</span>
        </div>

      </div>
    </div>
  );
};
