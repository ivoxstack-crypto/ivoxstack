import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, TrendingUp, Target, Users, Share2, Sparkles, Palette, Cpu } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface OrbitItem {
  id: string;
  name: string;
  sub: string;
  link: string;
  icon: React.ReactNode;
}

const orbitItems: OrbitItem[] = [
  { id: 'web', name: 'Web Design', sub: 'Modern & High Speed', link: '/pricing?category=websites#pricing-catalog', icon: <Globe className="w-4 h-4 text-sky-600" /> },
  { id: 'digital', name: 'Digital Marketing', sub: 'Multi-Channel Growth', link: '/pricing?category=bundles#pricing-catalog', icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
  { id: 'meta', name: 'Meta Ads', sub: 'High-ROAS Campaigns', link: '/pricing?category=meta-ads#pricing-catalog', icon: <Target className="w-4 h-4 text-blue-600" /> },
  { id: 'leads', name: 'Lead Generation', sub: 'Qualified Inquiries', link: '/pricing?category=lead-gen#pricing-catalog', icon: <Users className="w-4 h-4 text-amber-600" /> },
  { id: 'social', name: 'Social Media', sub: 'Brand Engagement', link: '/pricing?category=social-mgmt#pricing-catalog', icon: <Share2 className="w-4 h-4 text-pink-600" /> },
  { id: 'branding', name: 'Branding', sub: 'Identity & Vectors', link: '/pricing?category=branding#pricing-catalog', icon: <Sparkles className="w-4 h-4 text-orange-600" /> },
  { id: 'creative', name: 'Creative', sub: 'High CTR Visuals', link: '/pricing?category=creative#pricing-catalog', icon: <Palette className="w-4 h-4 text-purple-600" /> },
  { id: 'ai', name: 'AI Solutions', sub: 'Smart Automation', link: '/pricing?category=seo-automation#pricing-catalog', icon: <Cpu className="w-4 h-4 text-cyan-600" /> },
];

export const HeroRotatingOrbit: React.FC = () => {
  const [activeItem, setActiveItem] = useState<OrbitItem | null>(null);
  const total = orbitItems.length;

  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Soft ambient glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-brand-50 blur-3xl pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-accent-50 blur-3xl pointer-events-none -bottom-10 -right-10" />

      <div className="orbit-circle-wrapper flex items-center justify-center">
        {/* Thin guide rings only */}
        <div className="absolute inset-0 rounded-full border border-slate-200 pointer-events-none" />
        <div className="absolute inset-6 rounded-full border border-dashed border-brand-200 pointer-events-none animate-spin-slow" />
        <div className="absolute inset-16 rounded-full border border-accent-200 pointer-events-none animate-reverse-spin" />

        {/* Core */}
        <div className="relative z-20 flex items-center justify-center w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 rounded-full bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10 transition-transform duration-500 hover:scale-105">
          {/* Logo scales with the core so it always sits centered with even breathing room */}
          <div className="flex items-center justify-center scale-[0.72] xs:scale-[0.85] sm:scale-100">
            <BrandLogo layout="vertical" size="sm" />
          </div>
        </div>

        {/* Revolving badges */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
          {orbitItems.map((item, idx) => {
            const angle = (idx / total) * 2 * Math.PI;
            const x = 50 + 44 * Math.cos(angle);
            const y = 50 + 44 * Math.sin(angle);

            return (
              <div
                key={item.id}
                className="absolute pointer-events-auto"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {/* Counter-rotate so labels stay upright */}
                <div className="animate-reverse-spin">
                  <Link
                    to={item.link}
                    aria-label={item.name}
                    className="flex items-center gap-2 p-1.5 sm:pl-1.5 sm:pr-3 rounded-full bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 transition-transform duration-300 hover:scale-110"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-50">
                      {item.icon}
                    </span>
                    <span className="text-xs font-semibold whitespace-nowrap text-slate-800 hidden sm:inline-block">
                      {item.name}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {activeItem && (
          <div className="absolute -bottom-2 z-30 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xl pointer-events-none animate-fade-in">
            <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              {activeItem.icon} {activeItem.name}
            </p>
            <p className="text-[11px] text-slate-500">{activeItem.sub}</p>
          </div>
        )}
      </div>
    </div>
  );
};
