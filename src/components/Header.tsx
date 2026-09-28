import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick, trackCallClick } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onOpenLeadModal: () => void;
}

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

export const Header: React.FC<HeaderProps> = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const settings = store.getSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleWhatsApp = () => {
    trackWhatsAppClick('header_cta');
    const url = buildWhatsAppUrl(
      'Hello IvoxStack, I would like to consult regarding digital solutions for my business.',
      settings.whatsapp
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhone = () => {
    trackCallClick('header_top');
    window.location.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3.5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
      isActive
        ? 'bg-white text-slate-950 font-semibold shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_4px_12px_-6px_rgba(15,23,42,0.2)]'
        : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
    }`;

  return (
    <>
      {/* Announcement Bar (managed from Admin → Settings) */}
      {settings.announcement_active && settings.announcement_text && (
        <div className="relative z-40 border-b border-white/80 bg-white/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2.5 text-xs text-slate-700">
            <span className="hidden xs:inline-flex shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-100">
              New
            </span>
            <span className="truncate font-medium">{settings.announcement_text}</span>
            {settings.announcement_link && (
              <Link
                to={settings.announcement_link}
                className="hidden sm:inline-flex items-center gap-1 shrink-0 font-semibold text-brand-600 hover:text-brand-700"
              >
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full px-3 sm:px-4 pt-3">
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
            scrolled || mobileMenuOpen ? 'glass-strong' : 'bg-white/40 border border-white/70 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between h-16 sm:h-[72px] pl-3 pr-2.5 sm:pl-5 sm:pr-3">
            <Link to="/" className="shrink-0 flex items-center" aria-label="IvoxStack home">
              <BrandLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-0.5 p-1 rounded-full bg-slate-900/[0.035]">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} end={link.path === '/'} className={navClass}>
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePhone}
                className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full btn-glass transition-all"
                title={`Call ${settings.phone}`}
                aria-label="Call us"
              >
                <Phone className="w-4 h-4 text-brand-600" />
              </button>

              <button onClick={handleWhatsApp} className="hidden md:inline-flex btn btn-sm btn-glass !py-2.5">
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                <span>WhatsApp</span>
              </button>

              <button onClick={() => onOpenLeadModal()} className="hidden sm:inline-flex btn btn-sm btn-primary !py-2.5">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile */}
              <button
                onClick={handleWhatsApp}
                className="sm:hidden inline-flex w-10 h-10 items-center justify-center rounded-full btn-glass"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden inline-flex w-10 h-10 items-center justify-center rounded-full btn-glass text-slate-800"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Menu */}
          {mobileMenuOpen && (
            <div className="xl:hidden px-3 pb-4 pt-1 animate-fade-in">
              <nav className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-3 border-t border-slate-200/70">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-white text-brand-700 font-semibold shadow-sm'
                          : 'text-slate-700 hover:bg-white/70'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
              <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-200/70">
                <button onClick={handleWhatsApp} className="btn btn-whatsapp">
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </button>
                <button onClick={() => onOpenLeadModal()} className="btn btn-primary">
                  <span>Free Consultation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
