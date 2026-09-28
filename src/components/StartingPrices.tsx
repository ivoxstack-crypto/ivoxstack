import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { formatINR } from '../lib/utils';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

const startingPrices = [
  { title: 'Social Media Creative', category: 'creative', price: 119, isMonthly: false, desc: 'High CTR ad graphics & promotional designs', badge: 'Bestseller' },
  { title: 'Reel Editing', category: 'reels-video', price: 399, isMonthly: false, desc: 'Fast cuts, viral pacing, motion captions & SFX', badge: 'Trending' },
  { title: 'Website Design & Development', category: 'websites', price: 3499, isMonthly: false, desc: 'High speed, conversion-optimized business website', badge: 'Popular', featured: true },
  { title: 'Website Maintenance', category: 'maintenance', price: 1199, isMonthly: true, desc: 'Backups, SSL checks, speed tuning & quick support', badge: 'Essential' },
  { title: 'Meta Ads Management', category: 'meta-ads', price: 5999, isMonthly: true, desc: 'High-ROAS Facebook & Instagram campaign scaling', badge: 'High ROI' },
  { title: 'Social Media Management', category: 'social-mgmt', price: 7999, isMonthly: true, desc: 'Full content calendar, reels, posts & community', badge: 'Brand Growth' },
  { title: 'Lead Generation', category: 'lead-gen', price: 11999, isMonthly: true, desc: 'Predictable high-intent customer acquisition funnels', badge: 'Scale Fast', featured: true },
];

export const StartingPrices: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionHeading
      eyebrow="Transparent Pricing"
      title="Clear starting prices, zero hidden surprises"
      description="Every solution is packaged transparently so your business can start lean and scale with measurable return on investment."
    />

    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {startingPrices.map((card, idx) => (
        <Reveal key={card.title} delay={(idx % 4) * 70} className="h-full">
          <Link
            to={`/pricing?category=${card.category}#pricing-catalog`}
            className={`group relative h-full flex flex-col justify-between rounded-3xl p-6 glass-hover ${
              card.featured ? 'card-featured' : 'glass'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    card.featured ? 'text-accent-700 bg-accent-50 border border-accent-200' : 'text-slate-600 bg-slate-900/5'
                  }`}
                >
                  {card.badge}
                </span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200/70 text-slate-500 group-hover:text-brand-600 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-950 mt-5 leading-snug">{card.title}</h3>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{card.desc}</p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200/70">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Starting at</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display text-3xl font-extrabold text-slate-950 tracking-tight">{formatINR(card.price)}</span>
                {card.isMonthly && <span className="text-sm font-medium text-slate-500">/month</span>}
              </div>
            </div>
          </Link>
        </Reveal>
      ))}

      {/* Custom combination tile */}
      <Reveal delay={210} className="h-full">
        <Link
          to="/calculator"
          className="group relative h-full min-h-[240px] flex flex-col justify-between rounded-3xl p-6 overflow-hidden glass glass-hover"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-300/30 blur-2xl" />
          <div className="relative">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-brand-700 bg-brand-50 border border-brand-100">Custom</span>
            <h3 className="text-lg font-bold text-slate-950 mt-5 leading-snug">Need a custom combination?</h3>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              Mix websites, creatives, reels & ads in our live cost calculator.
            </p>
          </div>
          <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            Open calculator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </Reveal>
    </div>
  </section>
);
