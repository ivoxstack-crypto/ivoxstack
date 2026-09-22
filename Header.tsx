import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles, Phone } from 'lucide-react';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick, trackCallClick } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onOpenLeadModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const settings = store.getSettings();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Free Audit', path: '/audit' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleWhatsApp = () => {
    trackWhatsAppClick('header_cta');
    const url = buildWhatsAppUrl(
      'Hello IvoxStack, I would like to consult regarding digital solutions for my business.',
      settings.whatsapp
    );
    window.open(url, '_blank');
  };

  const handlePhone = () => {
    trackCallClick('header_top');
    window.location.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-white/5">
        <Sparkles className="w-3.5 h-3.5 text-accent-400 shrink-0 animate-pulse" />
        <span className="truncate">Quarterly Growth Slots Open — Flat 15% Savings on Annual Digital Retainers</span>
        <Link to="/pricing" className="underline font-bold text-accent-400 hover:text-accent-300 ml-1 shrink-0 hidden xs:inline">
          Explore Packages &rarr;
        </Link>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Brand Logo Lockup: Vector Text + Transparent Emblem */}
            <Link to="/" className="shrink-0 group flex items-center">
              <BrandLogo size="md" className="group-hover:opacity-95 transition-opacity" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      isActive 
                        ? 'text-brand-600 bg-brand-50/80 font-bold shadow-xs' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTAs (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <button
                onClick={handlePhone}
                className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-colors shadow-2xs"
                title="Direct Call"
                aria-label="Direct Call"
              >
                <Phone className="w-4 h-4 text-brand-600" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-semibold text-xs whitespace-nowrap transition-all shadow-sm hover:shadow-md hover:shadow-emerald-600/25 active:scale-95 group"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Direct</span>
              </button>

              {onOpenLeadModal && (
                <button
                  onClick={() => onOpenLeadModal?.()}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs whitespace-nowrap transition-all shadow-sm hover:shadow-md hover:shadow-orange-500/25 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                </button>
              )}
            </div>

            {/* Mobile Actions: WhatsApp Icon & Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={handleWhatsApp}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs hover:bg-emerald-100 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/60"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-1.5 pb-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs shadow-sm active:scale-98 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </button>
            
            {onOpenLeadModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs shadow-sm active:scale-98 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Free Consultation</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
