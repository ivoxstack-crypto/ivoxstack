import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

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
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-900/30 backdrop-blur-md animate-fade-in"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div className="relative w-full max-w-xl rounded-[28px] glass-strong p-6 sm:p-8 max-h-[92vh] overflow-y-auto animate-modal-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/5 text-slate-500 hover:text-slate-900 hover:bg-slate-900/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="eyebrow">
          <span className="eyebrow-dot" />
          Free Consultation
        </span>
        <h3 id="lead-modal-title" className="text-2xl sm:text-[28px] font-extrabold text-slate-950 tracking-tight mt-4">
          Let's plan your growth
        </h3>
        <p className="text-sm text-slate-600 mt-1.5">
          Tell us about your business. We'll review your digital footprint and propose an actionable roadmap.
        </p>

        {errorMsg && (
          <div className="mt-5 p-3 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-sm flex items-center gap-2">
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
              <label className="field-label" htmlFor="lm-name">Full Name <span className="text-accent-500">*</span></label>
              <input id="lm-name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={placeholderName} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="lm-company">Business / Company</label>
              <input id="lm-company" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder={placeholderCompany} className="field" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label" htmlFor="lm-phone">WhatsApp / Phone <span className="text-accent-500">*</span></label>
              <input id="lm-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={placeholderPhone} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="lm-email">Email Address <span className="text-accent-500">*</span></label>
              <input id="lm-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@company.com" className="field" />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="lm-service">Primary Service</label>
            <select id="lm-service" value={service} onChange={(e) => setService(e.target.value)} className="field">
              {defaultService && !services.some((s) => s.name === defaultService) && (
                <option value={defaultService}>{defaultService}</option>
              )}
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} (Starting ₹{s.starting_price.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label" htmlFor="lm-budget">Estimated Budget</label>
              <select id="lm-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="field">
                <option value="Below ₹5,000">Below ₹5,000</option>
                <option value="₹5,000–₹10,000">₹5,000–₹10,000</option>
                <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                <option value="₹50,000+">₹50,000+</option>
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="lm-timeline">Expected Timeline</label>
              <select id="lm-timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="field">
                <option value="Immediately">Immediately</option>
                <option value="Within 7 Days">Within 7 Days</option>
                <option value="Within This Month">Within This Month</option>
                <option value="Just Exploring">Just Exploring</option>
              </select>
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="lm-details">Project Details & Goals</label>
            <textarea
              id="lm-details"
              rows={3}
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Briefly describe your objectives or current challenges..."
              className="field resize-none"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full !py-3.5">
            <span>{loading ? 'Submitting...' : 'Get My Free Roadmap'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% confidential. No spam. We respond within 4 business hours.
          </p>
        </form>
      </div>
    </div>
  );
};
