import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const settings = store.getSettings();
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  const handleOpen = () => {
    trackWhatsAppClick('floating_widget');
    const url = buildWhatsAppUrl(
      'Hello IvoxStack, I would like to consult regarding digital solutions for my business.',
      settings.whatsapp
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
      {!isTooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2.5 pl-3.5 pr-2 py-2 rounded-full glass-strong text-xs animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-semibold text-slate-900">Chat with an expert</span>
          <span className="text-slate-400">· Online</span>
          <button
            onClick={() => setIsTooltipDismissed(true)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <button
        onClick={handleOpen}
        aria-label="Contact us on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full btn-whatsapp transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-ping pointer-events-none group-hover:opacity-0" />
        <WhatsAppIcon className="w-7 h-7 fill-white transition-transform duration-300 group-hover:rotate-12" />
      </button>
    </div>
  );
};
