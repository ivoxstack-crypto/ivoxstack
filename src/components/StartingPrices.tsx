import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatINR } from '../lib/utils';

export const StartingPrices: React.FC = () => {
  const priceThemes = [
    {
      title: 'Social Media Creative',
      category: 'creative',
      price: 99,
      isMonthly: false,
      desc: 'High CTR ad graphics & promotional designs',
      badge: 'Bestseller',
      themeClass: 'card-theme-blue',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      btnHover: 'hover:bg-brand-600 hover:border-brand-600',
    },
    {
      title: 'Reel Editing',
      category: 'reels-video',
      price: 349,
      isMonthly: false,
      desc: 'Fast cuts, viral pacing, motion captions & SFX',
      badge: 'Trending',
      themeClass: 'card-theme-orange',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      btnHover: 'hover:bg-accent-500 hover:border-accent-500',
    },
    {
      title: 'Website Design & Development',
      category: 'websites',
      price: 2999,
      isMonthly: false,
      desc: 'High speed, conversion-optimized business website',
      badge: 'Popular',
      themeClass: 'card-theme-blue ring-2 ring-brand-500/20',
      badgeColor: 'bg-brand-500 text-white border-brand-600',
      btnHover: 'hover:bg-brand-600 hover:border-brand-600',
    },
    {
      title: 'Website Maintenance',
      category: 'maintenance',
      price: 999,
      isMonthly: true,
      desc: 'Backups, SSL checks, speed tuning & quick support',
      badge: 'Essential',
      themeClass: 'card-theme-emerald',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      btnHover: 'hover:bg-emerald-600 hover:border-emerald-600',
    },
    {
      title: 'Meta Ads Management',
      category: 'meta-ads',
      price: 4999,
      isMonthly: true,
      desc: 'High-ROAS Facebook & Instagram campaign scaling',
      badge: 'High ROI',
      themeClass: 'card-theme-purple',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      btnHover: 'hover:bg-purple-600 hover:border-purple-600',
    },
    {
      title: 'Social Media Management',
      category: 'social-mgmt',
      price: 6999,
      isMonthly: true,
      desc: 'Full content calendar, reels, posts & community',
      badge: 'Brand Growth',
      themeClass: 'card-theme-amber',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      btnHover: 'hover:bg-amber-600 hover:border-amber-600',
    },
    {
      title: 'Lead Generation',
      category: 'lead-gen',
      price: 9999,
      isMonthly: true,
      desc: 'Predictable high-intent customer acquisition funnels',
      badge: 'Scale Fast',
      themeClass: 'card-theme-orange ring-2 ring-accent-500/20',
      badgeColor: 'bg-accent-500 text-white border-accent-600',
      btnHover: 'hover:bg-accent-600 hover:border-accent-600',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Transparent & Scalable Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clear Starting Prices, Zero Hidden Surprises
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Every digital solution is packaged transparently so your business can start lean and scale aggressively with verified return on investment.
          </p>
        </div>

        {/* Price Cards Grid with Distinct Logo Colors and Zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {priceThemes.map((card, idx) => (
            <div 
              key={idx}
              className={`relative rounded-3xl p-6 card-interactive flex flex-col justify-between ${card.themeClass}`}
            >
              {card.badge && (
                <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-xs ${card.badgeColor}`}>
                  {card.badge}
                </span>
              )}

              <Link 
                to={`/pricing?category=${card.category}#pricing-catalog`}
                className="block group"
              >
                <h3 className="text-base font-extrabold text-slate-900 pr-16 group-hover:text-brand-600 transition-colors">{card.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 min-h-[32px] leading-relaxed">{card.desc}</p>
                
                <div className="mt-5 mb-4">
                  <span className="text-[11px] text-slate-500 block font-semibold uppercase tracking-wider">Starting at</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {formatINR(card.price)}
                    </span>
                    {card.isMonthly && (
                      <span className="text-xs font-bold text-slate-500">/month</span>
                    )}
                  </div>
                </div>
              </Link>

              <Link
                to={`/pricing?category=${card.category}#pricing-catalog`}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/80 hover:text-white text-slate-800 text-xs font-bold border border-slate-200 transition-all mt-3 group shadow-xs ${card.btnHover}`}
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all hover:scale-105"
          >
            <span>Need a Custom Combination? Try Live Cost Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
