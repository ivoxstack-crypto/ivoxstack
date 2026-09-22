import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, ShieldCheck } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 bg-white">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
          Complimentary Analysis
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
          Request A Free Digital Audit
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Uncover the hidden performance leaks in your online presence. We analyze your website, ads, SEO, and social presence to provide a prioritized growth action plan.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Select Audit Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              1. Choose Audit Focus Areas (Select All That Apply)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {auditCategories.map((cat, idx) => {
                const isSelected = selectedCats.includes(cat.id);
                const themes = ['card-theme-blue', 'card-theme-orange', 'card-theme-purple', 'card-theme-emerald', 'card-theme-amber', 'card-theme-cyan'];
                const cardTheme = themes[idx % themes.length];
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-4 rounded-2xl border text-left transition-all card-interactive ${cardTheme} ${
                      isSelected
                        ? 'ring-2 ring-brand-500 shadow-md'
                        : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{cat.label}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-brand-600 border-brand-600 text-white shadow-sm' : 'border-slate-400/50 bg-white'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{cat.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Business & Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              2. Your Business Details
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={placeholderName}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={placeholderCompany}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={placeholderPhone}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL or Instagram Handle</label>
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourbrand.com or @yourinstagram"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Preparing Audit Request...' : 'Generate My Free Digital Audit'}</span>
            <span>→</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>No credit card required. We deliver your customized report within 24 hours.</span>
          </div>

        </form>
      </div>

    </div>
  );
};
