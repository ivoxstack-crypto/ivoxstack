import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
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
        targetEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, []);

  const handleWhatsApp = (serviceName: string) => {
    trackWhatsAppClick(`service_${serviceName}`);
    const url = buildWhatsAppUrl(`Hello IvoxStack, I would like to inquire about your ${serviceName} solutions.`, settings.whatsapp);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-16">
      <SectionHeading
        asPageTitle
        eyebrow="Core Capabilities"
        title={`${services.length} complete digital solutions`}
        description="From full-stack web platforms and high-ROAS advertising to corporate branding and automated CRM pipelines — built with precision for sustainable growth."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv, idx) => (
          <Reveal key={srv.id} delay={(idx % 3) * 80} className="h-full">
            <div id={srv.slug} className="h-full p-7 sm:p-8 rounded-3xl glass glass-hover flex flex-col justify-between scroll-mt-28">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-slate-300">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-semibold text-slate-700 px-3 py-1 rounded-full bg-white/80 border border-slate-200/70">
                    From {formatINR(srv.starting_price)}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-950 mt-6">{srv.name}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{srv.short_description}</p>

                <div className="mt-6 pt-5 border-t border-slate-200/70">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Key deliverables</span>
                  <ul className="mt-3 space-y-2.5">
                    {srv.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <button onClick={() => onOpenLeadModal(srv.name)} className="btn btn-soft flex-1">
                  Get started
                </button>
                <button
                  onClick={() => handleWhatsApp(srv.name)}
                  className="btn btn-glass !px-3.5"
                  title="Discuss on WhatsApp"
                  aria-label={`Discuss ${srv.name} on WhatsApp`}
                >
                  <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="rounded-[28px] glass-strong p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-slate-950">Need a tailored retainer bundle?</h3>
            <p className="text-sm text-slate-600 mt-1.5">Combine websites, social media management and Meta Ads for maximum value.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Link to="/pricing?category=bundles#pricing-catalog" className="btn btn-glass">
              Turnkey bundles
            </Link>
            <Link to="/calculator" className="btn btn-primary">
              Calculate live cost <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
