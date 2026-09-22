import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { buildWhatsAppUrl, sanitizeInput, validateEmail, validatePhone } from '../lib/utils';
import { trackWhatsAppClick, trackCallClick, trackLeadSubmission } from '../lib/analytics';
import { useNavigate } from 'react-router-dom';

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

export const ContactPage: React.FC = () => {
  const settings = store.getSettings();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('General Consultation');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Randomized realistic placeholders
  const [placeholderName] = useState(() => RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]);
  const [placeholderPhone] = useState(() => RANDOM_PHONES[Math.floor(Math.random() * RANDOM_PHONES.length)]);

  const handleWhatsApp = () => {
    trackWhatsAppClick('contact_page');
    window.open(buildWhatsAppUrl('Hello IvoxStack, I would like to schedule a direct consultation call.', settings.whatsapp), '_blank');
  };

  const handlePhone = () => {
    trackCallClick('contact_page');
    window.location.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
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
        phone: cleanPhone,
        email: cleanEmail,
        service: service,
        project_details: sanitizeInput(message),
        landing_page: '/contact',
      });

      trackLeadSubmission(lead.lead_id, service);
      setLoading(false);
      navigate('/thank-you', { state: { name: cleanName, leadId: lead.lead_id } });
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Submission failed.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 bg-white">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
          Direct Connect
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
          Get in Touch With IvoxStack
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Have an urgent requirement or want to discuss a customized digital roadmap? Reach out via phone, WhatsApp or submit an inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Direct Communication</h3>
            
            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-4 rounded-2xl card-theme-blue card-interactive">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-blue-800 uppercase block">Phone Support</span>
                  <button onClick={handlePhone} className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                    {settings.phone}
                  </button>
                  <p className="text-[11px] text-slate-600 mt-0.5">Mon–Sat (9:30 AM – 7:30 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl card-theme-emerald card-interactive">
                <WhatsAppIcon className="w-5 h-5 fill-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Instant WhatsApp</span>
                  <button onClick={handleWhatsApp} className="text-sm font-semibold text-emerald-700 hover:underline">
                    Chat on WhatsApp Directly
                  </button>
                  <p className="text-[11px] text-slate-600 mt-0.5">Average response under 15 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl card-theme-orange card-interactive">
                <Mail className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-orange-800 uppercase block">Official Email</span>
                  <a href={`mailto:${settings.email}`} className="text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors">
                    {settings.email}
                  </a>
                  <p className="text-[11px] text-slate-600 mt-0.5">Inquiries, proposals & RFPs</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl card-theme-purple card-interactive">
                <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-purple-800 uppercase block">Operating Locations</span>
                  <span className="text-sm font-semibold text-slate-900">{settings.address}</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Serving clients worldwide</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Dedicated Enterprise Account Managers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Send An Inquiry</h3>
            <p className="text-xs text-slate-500 mb-6">Fill in your information and our technical team will review and reply with a tailored roadmap.</p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={placeholderPhone}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Solution Category</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                  >
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="Meta Ads Management">Meta Ads Management</option>
                    <option value="Lead Generation Funnels">Lead Generation Funnels</option>
                    <option value="Reels & Video Editing">Reels & Video Editing</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Turnkey Growth Bundle">Turnkey Growth Bundle</option>
                    <option value="Other Solutions">Other Solutions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Project Scope</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business goals, target audience, or current bottlenecks..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Sending Inquiry...' : 'Submit Inquiry & Connect With Us'}</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
