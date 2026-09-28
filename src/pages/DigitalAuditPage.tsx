import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { store } from '../lib/store';
import { sanitizeInput, validateEmail, validatePhone } from '../lib/utils';
import { trackLeadSubmission } from '../lib/analytics';

const RANDOM_NAMES = [
  'e.g. Rahul Sharma',
  'e.g. Priya Patel',
  'e.g. Vikram Malhotra',
  'e.g. Ananya Roy',
  'e.g. Rohan Gupta',
  'e.g. Sneha Reddy',
  'e.g. Amit Verma'
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

export const DigitalAuditPage: React.FC = () => {
  const navigate = useNavigate();

  const auditCategories = [
    { id: 'Website', label: 'Website Speed & UX Audit', desc: 'Core Web Vitals, mobile responsiveness & conversion bottlenecks' },
    { id: 'Social Media', label: 'Social Media & Content Audit', desc: 'Grid aesthetics, viral hooks, reel retention & engagement ratios' },
    { id: 'Meta Ads', label: 'Meta Ads & Pixel Audit', desc: 'Pixel tracking health, event deduplication, ad fatigue & audience overlap' },
    { id: 'Google Ads', label: 'Google Ads & Search Audit', desc: 'Wasted spend, negative keywords, search impression share & CTR' },
    { id: 'SEO', label: 'SEO & Organic Growth Audit', desc: 'Technical crawlability, keyword indexing, backlinks & on-page tags' },
    { id: 'Google Business Profile', label: 'Google Maps (GBP) Audit', desc: 'Local pack ranking, citations, reviews & discovery keywords' },
  ];

  const [selectedCats, setSelectedCats] = useState<string[]>(['Website', 'Meta Ads']);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Dynamic realistic placeholders
  const [placeholderName] = useState(() => RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]);
  const [placeholderPhone] = useState(() => RANDOM_PHONES[Math.floor(Math.random() * RANDOM_PHONES.length)]);
  const [placeholderCompany] = useState(() => RANDOM_COMPANIES[Math.floor(Math.random() * RANDOM_COMPANIES.length)]);

  const toggleCategory = (id: string) => {
    if (selectedCats.includes(id)) {
      if (selectedCats.length > 1) {
        setSelectedCats(selectedCats.filter(c => c !== id));
      }
    } else {
      setSelectedCats([...selectedCats, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

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
      const lead = await store.addLead({
        full_name: cleanName,
        business_name: sanitizeInput(businessName),
        phone: cleanPhone,
        email: cleanEmail,
        service: `Digital Audit: ${selectedCats.join(', ')}`,
        project_details: `Audit Request for URL: ${websiteUrl}. Selected categories: ${selectedCats.join(', ')}`,
        landing_page: '/audit',
      });

      trackLeadSubmission(lead.lead_id, 'Digital Audit');
      setLoading(false);
      navigate('/thank-you', { state: { name: cleanName, leadId: lead.lead_id } });
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Audit request failed.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-12">
      <SectionHeading
        asPageTitle
        eyebrow="Complimentary Analysis"
        title={
          <>
            Request a <span className="text-highlight">free digital audit</span>
          </>
        }
        description="Uncover the hidden performance leaks in your online presence. We analyze your website, ads, SEO and social presence and send a prioritized growth plan."
      />

      <Reveal>
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-[32px] glass-strong">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h2 className="flex items-center gap-3 text-base font-bold text-slate-950">
                <span className="w-7 h-7 rounded-full bg-brand-50 text-brand-600 border border-brand-100 text-xs font-bold flex items-center justify-center">1</span>
                Choose audit focus areas
              </h2>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {auditCategories.map((cat) => {
                  const isSelected = selectedCats.includes(cat.id);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      aria-pressed={isSelected}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-white border-brand-500 shadow-[0_0_0_4px_rgba(0,128,255,0.1)]'
                          : 'bg-white/50 border-slate-200/80 hover:bg-white/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-900">{cat.label}</span>
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                            isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{cat.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-3 text-base font-bold text-slate-950">
                <span className="w-7 h-7 rounded-full bg-brand-50 text-brand-600 border border-brand-100 text-xs font-bold flex items-center justify-center">2</span>
                Your business details
              </h2>

              {errorMsg && (
                <div className="mt-5 p-3 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label" htmlFor="au-name">Full Name *</label>
                  <input id="au-name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={placeholderName} className="field" />
                </div>
                <div>
                  <label className="field-label" htmlFor="au-company">Business Name</label>
                  <input id="au-company" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder={placeholderCompany} className="field" />
                </div>
                <div>
                  <label className="field-label" htmlFor="au-phone">Phone Number (WhatsApp) *</label>
                  <input id="au-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={placeholderPhone} className="field" />
                </div>
                <div>
                  <label className="field-label" htmlFor="au-email">Work Email *</label>
                  <input id="au-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="field" />
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label" htmlFor="au-url">Website URL or Instagram Handle</label>
                  <input id="au-url" type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://yourbrand.com or @yourinstagram" className="field" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button type="submit" disabled={loading} className="btn btn-primary w-full !py-4 !text-base">
                <Search className="w-4 h-4" />
                <span>{loading ? 'Preparing audit request...' : 'Get My Free Digital Audit'}</span>
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                No credit card required. Your customized report arrives within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </Reveal>
    </div>
  );
};
