import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { store } from '../lib/store';
import { buildWhatsAppUrl } from '../lib/utils';
import { trackWhatsAppClick, trackCallClick } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const settings = store.getSettings();

  const handleWhatsApp = () => {
    trackWhatsAppClick('footer');
    const url = buildWhatsAppUrl('Hello IvoxStack, I would like to inquire about digital solutions.', settings.whatsapp);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackCallClick('footer');
    window.location.href = `tel:${settings.phone}`;
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand Lockup & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <BrandLogo size="md" />
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Digital Solutions Built for Business Growth. Complete web development, digital advertising, branding, creative design, and automation platforms engineered for scalable ROI.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all shadow-2xs group"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] group-hover:fill-white transition-colors" />
                <span>WhatsApp Direct</span>
              </button>
              <button
                onClick={handleCall}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                {settings.phone}
              </button>
            </div>
          </div>

          {/* Col 2: Digital Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Digital Solutions
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Website Design & Development</Link></li>
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Meta Ads Management</Link></li>
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Lead Generation</Link></li>
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Video & Reels Editing</Link></li>
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Creative Ad Design</Link></li>
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Branding & Identity</Link></li>
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Search Engine Optimization</Link></li>
              <li><Link to="/services" className="hover:text-brand-600 transition-colors">Marketing Automation</Link></li>
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/pricing" className="hover:text-brand-600 transition-colors">Transparent Pricing</Link></li>
              <li><Link to="/calculator" className="hover:text-brand-600 transition-colors text-brand-600 font-semibold">Cost Calculator</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-600 transition-colors">Featured Portfolio</Link></li>
              <li><Link to="/case-studies" className="hover:text-brand-600 transition-colors">Case Studies</Link></li>
              <li><Link to="/audit" className="hover:text-brand-600 transition-colors">Free Digital Audit</Link></li>
              <li><Link to="/about" className="hover:text-brand-600 transition-colors">About IvoxStack</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4: Reach Out */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Direct Contact
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-slate-900 transition-colors">{settings.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>{settings.business_hours}</span>
              </li>
              <li className="pt-1">
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Business Solutions</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} IvoxStack. All rights reserved. Digital Solutions Built for Business Growth.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-slate-900 transition-colors">Refund Policy</Link>
            <span>•</span>
            <Link to="/cookie-policy" className="hover:text-slate-900 transition-colors">Cookie Policy</Link>
            <span>•</span>
            <Link to="/revision-policy" className="hover:text-slate-900 transition-colors">Revision Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
