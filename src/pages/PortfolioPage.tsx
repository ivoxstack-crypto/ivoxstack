import React, { useState } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { store } from '../lib/store';
import { PdfPreviewModal } from '../components/PdfPreviewModal';

interface PortfolioPageProps {
  onOpenLeadModal: (serviceName?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenLeadModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

  const portfolio = store.getPortfolio();

  const categories = ['All', 'Websites', 'Branding', 'Advertising', 'Creative Design', 'Social Media'];

  const filteredItems = activeCategory === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 bg-white">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
          Proven Track Record
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
          Featured Client Portfolio & Catalogues
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Explore official pitch decks, commercial catalogues, corporate brand collateral, and web solutions delivered for expanding enterprises.
        </p>
      </div>

      {/* Category Filter */}
      <div className="w-full overflow-x-auto pb-2 px-2 no-scrollbar">
        <div className="flex items-center gap-2 w-max mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className={`grid grid-cols-1 ${filteredItems.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-xl mx-auto'} gap-8`}>
        {filteredItems.map((item, idx) => {
          const themes = ['card-theme-blue', 'card-theme-orange', 'card-theme-purple', 'card-theme-emerald', 'card-theme-cyan', 'card-theme-amber'];
          const cardTheme = themes[idx % themes.length];
          return (
            <div
              key={item.id}
              className={`rounded-3xl ${cardTheme} card-interactive overflow-hidden flex flex-col justify-between group shadow-sm`}
            >
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-slate-800 shadow-sm">
                  {item.category}
                </span>
                {item.client && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/95 text-slate-900 shadow-sm">
                    {item.client}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                {item.pdf_url ? (
                  <button
                    onClick={() => setActivePdf({ url: item.pdf_url!, title: item.title })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Full Deck</span>
                  </button>
                ) : item.project_url ? (
                  <a
                    href={item.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 hover:text-accent-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit Live Website</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">Corporate Asset</span>
                )}

                <button
                  onClick={() => onOpenLeadModal(item.title)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Start Project
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

      {/* PDF Modal */}
      {activePdf && (
        <PdfPreviewModal
          isOpen={Boolean(activePdf)}
          onClose={() => setActivePdf(null)}
          pdfUrl={activePdf.url}
          title={activePdf.title}
        />
      )}

      {/* CTA */}
      <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">Have A Project In Mind?</h3>
        <p className="text-xs text-slate-600">
          Whether you need an investor pitch deck, a commercial marketplace catalogue, or an enterprise web platform, we deliver production-ready assets.
        </p>
        <button
          onClick={() => onOpenLeadModal('Portfolio Custom Solution')}
          className="px-6 py-3 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs shadow-md shadow-orange-500/25 hover:scale-105 transition-all"
        >
          Discuss Your Project Scope →
        </button>
      </div>

    </div>
  );
};
