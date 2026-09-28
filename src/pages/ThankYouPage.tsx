import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, ArrowLeft, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/analytics';

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const settings = store.getSettings();

  const name = (location.state as any)?.name || 'there';
  const leadId = (location.state as any)?.leadId || '';

  const handleWhatsApp = () => {
    trackWhatsAppClick('thank_you_page');
    const msg = `Hello IvoxStack, I just submitted an inquiry (${leadId ? `ID: ${leadId}` : 'online'}). Looking forward to connecting.`;
    window.open(buildWhatsAppUrl(msg, settings.whatsapp), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
      <div className="relative p-8 sm:p-14 rounded-[32px] glass-strong space-y-7 animate-modal-in overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-60 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden="true" />

        <div className="relative w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white bg-emerald-500 shadow-xl shadow-emerald-500/30">
          <Check className="w-10 h-10" strokeWidth={3} />
        </div>

        <div className="relative space-y-3">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Inquiry received
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">Thank you, {name}!</h1>
          <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed">
            Your inquiry has been received. Our growth team will review your requirements and get in touch shortly.
          </p>
          {leadId && (
            <p className="text-xs text-slate-500 pt-1">
              Reference ID: <span className="font-mono font-semibold text-slate-900">{leadId}</span>
            </p>
          )}
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={handleWhatsApp} className="btn btn-whatsapp w-full sm:w-auto !px-6 !py-3.5">
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp now</span>
          </button>
          <Link to="/" className="btn btn-glass w-full sm:w-auto !px-6 !py-3.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
        </div>

        <p className="relative pt-6 border-t border-slate-200/70 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Priority response within ~4 business hours.
        </p>
      </div>
    </div>
  );
};
