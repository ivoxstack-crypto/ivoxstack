import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from './WhatsAppIcon';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/analytics';
import { X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const location = useLocation();
  const settings = store.getSettings();
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  // Don't show inside admin / operations portal
  if (location.pathname.startsWith('/operationsbyivox') || location.pathname.startsWith('/operationsbyshubhu') || location.pathname.startsWith('/operations')) {
    return null;
  }

  const handleOpen = () => {
    trackWhatsAppClick('floating_widget');
    const url = buildWhatsAppUrl(
      'Hello IvoxStack, I would like to consult regarding digital solutions for my business.',
      settings.whatsapp
    );
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6">
      {/* Floating Tooltip Pill (Desktop & Tablet) */}
      {!isTooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/10 backdrop-blur-md animate-fade-in text-xs font-medium text-slate-700">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-semibold text-slate-900">Chat with an Expert</span>
          <span className="text-[10px] text-slate-400">| Online</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsTooltipDismissed(true);
            }}
            className="text-slate-400 hover:text-slate-600 ml-0.5 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleOpen}
        aria-label="Contact us on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:scale-108 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/25 animate-ping pointer-events-none group-hover:opacity-0 transition-opacity" />
        
        {/* Authentic WhatsApp Icon */}
        <WhatsAppIcon className="w-7 h-7 fill-white drop-shadow-sm transition-transform duration-300 group-hover:rotate-12" />
        
        {/* Mobile status indicator */}
        <span className="absolute top-1 right-1 flex h-3 w-3 sm:hidden">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-white" />
        </span>
      </button>
    </div>
  );
};
