import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  TrendingUp, 
  Target, 
  Users, 
  Share2, 
  Sparkles, 
  Palette, 
  Cpu 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface OrbitItem {
  id: string;
  name: string;
  sub: string;
  link: string;
  icon: React.ReactNode;
  borderCol: string;
  bgLight: string;
  textCol: string;
}

export const HeroRotatingOrbit: React.FC = () => {
  const [activeItem, setActiveItem] = useState<OrbitItem | null>(null);

  const orbitItems: OrbitItem[] = [
    {
      id: 'web',
      name: 'Web Design',
      sub: 'Modern & High Speed',
      link: '/pricing?category=websites#pricing-catalog',
      icon: <Globe className="w-4 h-4 text-sky-600" />,
      borderCol: 'border-sky-200',
      bgLight: 'bg-sky-50',
      textCol: 'text-sky-900',
    },
    {
      id: 'digital',
      name: 'Digital Marketing',
      sub: 'Multi-Channel Growth',
      link: '/pricing?category=bundles#pricing-catalog',
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      borderCol: 'border-emerald-200',
      bgLight: 'bg-emerald-50',
      textCol: 'text-emerald-900',
    },
    {
      id: 'meta',
      name: 'Meta Ads',
      sub: 'High-ROAS Campaigns',
      link: '/pricing?category=meta-ads#pricing-catalog',
      icon: <Target className="w-4 h-4 text-blue-600" />,
      borderCol: 'border-blue-200',
      bgLight: 'bg-blue-50',
      textCol: 'text-blue-900',
    },
    {
      id: 'leads',
      name: 'Lead Generation',
      sub: 'Qualified Inquiries',
      link: '/pricing?category=lead-gen#pricing-catalog',
      icon: <Users className="w-4 h-4 text-amber-600" />,
      borderCol: 'border-amber-200',
      bgLight: 'bg-amber-50',
      textCol: 'text-amber-900',
    },
    {
      id: 'social',
      name: 'Social Media',
      sub: 'Brand Engagement',
      link: '/pricing?category=social-mgmt#pricing-catalog',
      icon: <Share2 className="w-4 h-4 text-pink-600" />,
      borderCol: 'border-pink-200',
      bgLight: 'bg-pink-50',
      textCol: 'text-pink-900',
    },
    {
      id: 'branding',
      name: 'Branding',
      sub: 'Identity & Vectors',
      link: '/pricing?category=branding#pricing-catalog',
      icon: <Sparkles className="w-4 h-4 text-orange-600" />,
      borderCol: 'border-orange-200',
      bgLight: 'bg-orange-50',
      textCol: 'text-orange-900',
    },
    {
      id: 'creative',
      name: 'Creative',
      sub: 'High CTR Visuals',
      link: '/pricing?category=creative#pricing-catalog',
      icon: <Palette className="w-4 h-4 text-purple-600" />,
      borderCol: 'border-purple-200',
      bgLight: 'bg-purple-50',
      textCol: 'text-purple-900',
    },
    {
      id: 'ai',
      name: 'AI Solutions',
      sub: 'Smart Automation',
      link: '/pricing?category=seo-automation#pricing-catalog',
      icon: <Cpu className="w-4 h-4 text-cyan-600" />,
      borderCol: 'border-cyan-200',
      bgLight: 'bg-cyan-50',
      textCol: 'text-cyan-900',
    },
  ];

  const total = orbitItems.length;

  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Outer ambient subtle glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-brand-50 blur-3xl pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-accent-50 blur-3xl pointer-events-none -bottom-10 -right-10" />

      {/* Orbit Container */}
      <div className="orbit-circle-wrapper flex items-center justify-center">
        
        {/* Outer Orbit Guide Rings in Light Theme */}
        <div className="absolute inset-0 rounded-full border border-slate-200 shadow-sm pointer-events-none" />
        <div className="absolute inset-6 rounded-full border border-dashed border-brand-200 pointer-events-none animate-spin-slow" />
        <div className="absolute inset-16 rounded-full border border-accent-200 pointer-events-none animate-reverse-spin" />

        {/* Central Core: IvoxStack with Transparent Icon and Vector Text */}
        <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 text-center group hover:scale-105 transition-all duration-300">
          <BrandLogo layout="vertical" size="sm" />
        </div>

        {/* Revolving Badges Container */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
          {orbitItems.map((item, idx) => {
            const angle = (idx / total) * 2 * Math.PI;
            const x = 50 + 44 * Math.cos(angle);
            const y = 50 + 44 * Math.sin(angle);

            return (
              <div
                key={item.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {/* Counter-rotate each icon so text/icon remains upright */}
                <div className="animate-reverse-spin">
                  <Link
                    to={item.link}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white border shadow-md cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${item.borderCol}`}
                  >
                    <div className={`p-1 rounded-lg ${item.bgLight}`}>
                      {item.icon}
                    </div>
                    <span className={`text-[11px] sm:text-xs font-semibold whitespace-nowrap hidden sm:inline-block ${item.textCol}`}>
                      {item.name}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active item floating detail card (on hover) */}
        {activeItem && (
          <div className="absolute bottom-1 z-30 px-3.5 py-1.5 rounded-xl bg-white border border-brand-200 shadow-xl pointer-events-none">
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              {activeItem.icon} {activeItem.name}
            </p>
            <p className="text-[11px] text-slate-500">{activeItem.sub}</p>
          </div>
        )}

      </div>
    </div>
  );
};
