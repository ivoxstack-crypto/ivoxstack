import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { store } from '../lib/store';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

interface PortfolioPageProps {
  onOpenLeadModal: (serviceName?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenLeadModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const portfolio = store.getPortfolio();

  // Only offer filters for categories that actually have work in them
  const categories = ['All', ...Array.from(new Set(portfolio.map((p) => p.category)))];
  const filteredItems = activeCategory === 'All' ? portfolio : portfolio.filter((p) => p.category === activeCategory);
  const single = filteredItems.length === 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-12">
      <SectionHeading
        asPageTitle
        eyebrow="Proven Track Record"
        title="Featured client work"
        description="Web platforms, brand systems and digital solutions delivered for growing businesses."
      />

      {categories.length > 2 && (
        <div className="flex justify-center">
          <div className="max-w-full overflow-x-auto no-scrollbar rounded-full glass p-1.5">
            <div className="flex items-center gap-1 w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-white text-brand-600 font-semibold shadow-[0_0_0_1px_rgba(0,128,255,0.25),0_6px_16px_-8px_rgba(0,128,255,0.45)]'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 gap-6 ${single ? '' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredItems.map((item, idx) => (
          <Reveal key={item.id} delay={(idx % 3) * 80} className="h-full">
            <article
              className={`group h-full rounded-[28px] glass glass-hover overflow-hidden ${
                single ? 'grid grid-cols-1 lg:grid-cols-2' : 'flex flex-col'
              }`}
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden m-2 rounded-[22px] bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 text-[11px] font-semibold px-3 py-1 rounded-full glass-strong text-slate-800">
                  {item.category}
                </span>
              </div>

              <div className="p-7 sm:p-10 flex-1 flex flex-col justify-center">
                {item.client && <span className="text-sm font-semibold text-brand-600">{item.client}</span>}
                <h3 className="text-2xl font-bold text-slate-950 mt-2 leading-snug">{item.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">{item.description}</p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {item.project_url && (
                    <a href={item.project_url} target="_blank" rel="noreferrer" className="btn btn-soft">
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit live website</span>
                    </a>
                  )}
                  <button onClick={() => onOpenLeadModal(item.title)} className="btn btn-glass">
                    Start a similar project
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] glass-strong p-10 sm:p-14 text-center max-w-3xl mx-auto">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-60 rounded-full bg-brand-400/20 blur-3xl" aria-hidden="true" />
          <div className="relative space-y-4">
            <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight">Have a project in mind?</h3>
            <p className="text-base text-slate-600 max-w-lg mx-auto">
              From a high-converting website to a complete brand system, we deliver production-ready work.
            </p>
            <button onClick={() => onOpenLeadModal('Portfolio Custom Solution')} className="btn btn-primary !px-7 !py-3.5">
              Discuss your project <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
