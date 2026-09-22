import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { store } from '../lib/store';
import { getUTMParams, trackLeadSubmission } from '../lib/analytics';
import { sanitizeInput, validateEmail, validatePhone } from '../lib/utils';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const RANDOM_NAMES = [
  'e.g. Rahul Sharma',
  'e.g. Priya Patel',
  'e.g. Vikram Malhotra',
  'e.g. Ananya Roy',
  'e.g. Rohan Gupta',
  'e.g. Sneha Reddy',
  'e.g. Arjun Mehta'
];

const RANDOM_PHONES = [
  '+91 98XXX XXXXX',
  '+91 97XXX XXXXX',
  '+91 91XXX XXXXX',
  '+91 88XXX XXXXX',
  '+91 98765 43210'
];

const RANDOM_COMPANIES = [
  'e.g. Apex Global Solutions',
  'e.g. Nova Retail & Co.',
  'e.g. Zenith Tech Labs',
  'e.g. Horizon Ventures',
  'e.g. Bloom Aesthetics'
];

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, defaultService }) => {
  const navigate = useNavigate();
  const services = store.getServices();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(defaultService || 'Website Design & Development');
  const [budget, setBudget] = useState('₹10,000–₹25,000');
  const [timeline, setTimeline] = useState('Within 7 Days');
  const [projectDetails, setProjectDetails] = useState('');
  
  // Anti-spam state
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime, setFormStartTime] = useState<number>(Date.now());
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic realistic placeholders
  const [placeholderName, setPlaceholderName] = useState('e.g. Rahul Sharma');
  const [placeholderPhone, setPlaceholderPhone] = useState('+91 98XXX XXXXX');
  const [placeholderCompany, setPlaceholderCompany] = useState('e.g. Apex Global Solutions');

  useEffect(() => {
    if (isOpen) {
      setFormStartTime(Date.now());
      setErrorMsg('');
      if (defaultService) setService(defaultService);
      setPlaceholderName(RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]);
      setPlaceholderPhone(RANDOM_PHONES[Math.floor(Math.random() * RANDOM_PHONES.length)]);
      setPlaceholderCompany(RANDOM_COMPANIES[Math.floor(Math.random() * RANDOM_COMPANIES.length)]);
    }
  }, [isOpen, defaultService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Anti-spam check (honeypot)
    if (honeypot) {
      onClose();
      return;
    }

    // 2. Anti-spam timing check
    if (Date.now() - formStartTime < 1200) {
      setErrorMsg('Submission too fast. Please take a moment to review your inquiry.');
      return;
    }

    // 3. Validation
    const cleanName = sanitizeInput(fullName);
    const cleanPhone = sanitizeInput(phone);
    const cleanEmail = sanitizeInput(email);

    if (cleanName.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!validatePhone(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const utm = getUTMParams();

      const newLead = await store.addLead({
        full_name: cleanName,
        business_name: sanitizeInput(businessName),
        phone: cleanPhone,
        email: cleanEmail,
        service: service,
        budget: budget,
        timeline: timeline,
        project_details: sanitizeInput(projectDetails),
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_term: utm.utm_term,
        utm_content: utm.utm_content,
        landing_page: window.location.pathname,
        page_url: window.location.href,
      });

      trackLeadSubmission(newLead.lead_id, service);

      setLoading(false);
      onClose();
      navigate('/thank-you', { state: { name: cleanName, leadId: newLead.lead_id } });
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'An error occurred. Please try again or chat via WhatsApp.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Start Your Business Growth
          </span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Request Free Consultation & Strategy
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Tell us about your business requirements. We'll analyze your digital footprint and propose an actionable roadmap.
        </p>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website_hp_check"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-accent-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={placeholderName}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business / Company Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={placeholderCompany}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp / Phone <span className="text-accent-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={placeholderPhone}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address <span className="text-accent-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Service Interested In
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
            >
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} (Starting ₹{s.starting_price.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
              >
                <option value="Below ₹5,000">Below ₹5,000</option>
                <option value="₹5,000–₹10,000">₹5,000–₹10,000</option>
                <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                <option value="₹50,000+">₹50,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expected Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
              >
                <option value="Immediately">Immediately</option>
                <option value="Within 7 Days">Within 7 Days</option>
                <option value="Within This Month">Within This Month</option>
                <option value="Just Exploring">Just Exploring</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Details & Goals
            </label>
            <textarea
              rows={3}
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Briefly describe your objectives, current website or ad performance challenges..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs shadow-md shadow-orange-500/25 active:scale-98 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : 'Submit Inquiry & Get Free Roadmap'}</span>
                <span>→</span>
              </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Confidential. Zero spam. We respond within 4 business hours.</span>
          </div>

        </form>

      </div>
    </div>
  );
};
