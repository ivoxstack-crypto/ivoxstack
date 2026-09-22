import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { formatINR, buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/analytics';

interface ServicesPageProps {
  onOpenLeadModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenLeadModal }) => {
  const services = store.getServices();
  const settings = store.getSettings();

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const targetEl = document.querySelector(window.location.hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, []);

  const handleWhatsApp = (serviceName: string) => {
    trackWhatsAppClick(`service_${serviceName}`);
    const url = buildWhatsAppUrl(`Hello IvoxStack, I would like to inquire about your ${serviceName} solutions.`, settings.whatsapp);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14 bg-white">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
          Core Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
          15 Complete Digital Solutions
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          From full-stack web platforms and high-ROAS advertising to corporate branding and automated CRM pipelines. Built with precision for sustainable business growth.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv, idx) => {
          const serviceThemes = [
            { theme: 'card-theme-blue', badge: 'bg-blue-100 text-blue-800 border-blue-200', check: 'text-brand-600' },
            { theme: 'card-theme-orange', badge: 'bg-orange-100 text-orange-800 border-orange-200', check: 'text-accent-500' },
            { theme: 'card-theme-emerald', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', check: 'text-emerald-600' },
            { theme: 'card-theme-purple', badge: 'bg-purple-100 text-purple-800 border-purple-200', check: 'text-purple-600' },
            { theme: 'card-theme-cyan', badge: 'bg-cyan-100 text-cyan-800 border-cyan-200', check: 'text-cyan-600' },
            { theme: 'card-theme-amber', badge: 'bg-amber-100 text-amber-800 border-amber-200', check: 'text-amber-600' },
            { theme: 'card-theme-rose', badge: 'bg-rose-100 text-rose-800 border-rose-200', check: 'text-rose-600' },
            { theme: 'card-theme-indigo', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', check: 'text-indigo-600' },
          ];
          const current = serviceThemes[idx % serviceThemes.length];

          return (
            <div
              key={srv.id}
              id={srv.slug}
              className={`p-8 rounded-3xl card-interactive flex flex-col justify-between scroll-mt-24 ${current.theme}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-2xs ${current.badge}`}>
                    Starting {formatINR(srv.starting_price)}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 mb-2">
                  {srv.name}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {srv.short_description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-200/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block">
                    Key Deliverables
                  </span>
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${current.check}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/70 flex items-center gap-2">
                <button
                  onClick={() => onOpenLeadModal(srv.name)}
                  className="flex-1 py-3 px-3 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white text-xs font-bold text-center transition-all shadow-md shadow-orange-500/20 active:scale-98 hover:scale-[1.02]"
                >
                  Get Started
                </button>
                <button
                  onClick={() => handleWhatsApp(srv.name)}
                  className="p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all hover:scale-105 group"
                  title="Discuss on WhatsApp"
                  aria-label="Discuss on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366] group-hover:fill-white transition-colors" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Need A Tailored Retainer Bundle?</h3>
          <p className="text-xs text-slate-500 mt-1">Combine websites, social media management, and Meta Ads for maximum value.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/pricing"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm"
          >
            Check Turnkey Bundles
          </Link>
          <Link
            to="/calculator"
            className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors shadow-sm"
          >
            Calculate Live Cost
          </Link>
        </div>
      </div>

    </div>
  );
};
