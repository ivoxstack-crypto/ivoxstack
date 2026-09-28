import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick, trackCallClick } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';

const serviceLinks = [
  'Website Design & Development',
  'Meta Ads Management',
  'Lead Generation',
  'Video & Reels Editing',
  'Creative Ad Design',
  'Branding & Identity',
  'Search Engine Optimization',
  'Marketing Automation',
];

const companyLinks = [
  { name: 'Transparent Pricing', path: '/pricing' },
  { name: 'Cost Calculator', path: '/calculator' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Free Digital Audit', path: '/audit' },
  { name: 'About IvoxStack', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

const legalLinks = [
  { name: 'Privacy', path: '/privacy-policy' },
  { name: 'Terms', path: '/terms' },
  { name: 'Refunds', path: '/refund-policy' },
  { name: 'Cookies', path: '/cookie-policy' },
  { name: 'Revisions', path: '/revision-policy' },
];

export const Footer: React.FC = () => {
  const settings = store.getSettings();

  const handleWhatsApp = () => {
    trackWhatsAppClick('footer');
    const url = buildWhatsAppUrl('Hello IvoxStack, I would like to inquire about digital solutions.', settings.whatsapp);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackCallClick('footer');
    window.location.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
  };

  return (
    <footer className="px-3 sm:px-4 pb-4 pt-8">
      <div className="max-w-7xl mx-auto glass rounded-[28px] px-6 sm:px-10 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-200/70">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block" aria-label="IvoxStack home">
              <BrandLogo size="md" />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Digital solutions built for business growth — web development, advertising, branding, creative
              design and automation engineered for scalable ROI.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <button onClick={handleWhatsApp} className="btn btn-sm btn-whatsapp">
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </button>
              <button onClick={handleCall} className="btn btn-sm btn-glass">
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>{settings.phone}</span>
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 mb-4">Solutions</h3>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((name) => (
                <li key={name}>
                  <Link to="/services" className="text-slate-600 hover:text-brand-600 transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-slate-600 hover:text-brand-600 transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 mb-4">Get in Touch</h3>
            <ul className="space-y-3.5 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="hover:text-slate-900 transition-colors break-all">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>{settings.business_hours}</span>
              </li>
            </ul>
            <Link to="/contact" className="link-arrow mt-5">
              Start a project <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} IvoxStack. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.path} to={l.path} className="hover:text-slate-900 transition-colors">
                {l.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
