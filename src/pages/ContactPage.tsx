import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
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
    window.open(buildWhatsAppUrl('Hello IvoxStack, I would like to schedule a direct consultation call.', settings.whatsapp), '_blank', 'noopener,noreferrer');
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

  const channels = [
    {
      icon: <Phone className="w-5 h-5 text-brand-600" />,
      label: 'Call us',
      value: settings.phone,
      note: settings.business_hours,
      onClick: handlePhone,
    },
    {
      icon: <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />,
      label: 'WhatsApp',
      value: 'Chat with us directly',
      note: 'Average response under 15 minutes',
      onClick: handleWhatsApp,
    },
    {
      icon: <Mail className="w-5 h-5 text-accent-500" />,
      label: 'Email',
      value: settings.email,
      note: 'Inquiries, proposals & RFPs',
      href: `mailto:${settings.email}`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-14">
      <SectionHeading
        asPageTitle
        eyebrow="Get in Touch"
        title="Let's talk about your growth"
        description="Have an urgent requirement or want to discuss a custom digital roadmap? Reach out via phone, WhatsApp or send an inquiry."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Channels */}
        <Reveal className="lg:col-span-5 space-y-4">
          {channels.map((c) => {
            const body = (
              <>
                <span className="icon-chip shrink-0">{c.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{c.label}</span>
                  <span className="block text-base font-semibold text-slate-950 mt-1 truncate">{c.value}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{c.note}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto shrink-0 group-hover:translate-x-1 group-hover:text-slate-900 transition-all" />
              </>
            );
            const cls = 'group w-full flex items-center gap-4 p-5 rounded-3xl glass glass-hover text-left';
            return c.href ? (
              <a key={c.label} href={c.href} className={cls}>
                {body}
              </a>
            ) : (
              <button key={c.label} onClick={c.onClick} className={cls}>
                {body}
              </button>
            );
          })}

          <div className="flex items-center gap-4 p-5 rounded-3xl glass">
            <span className="icon-chip shrink-0">
              <MapPin className="w-5 h-5 text-violet-600" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Office</span>
              <span className="block text-base font-semibold text-slate-950 mt-1">{settings.address}</span>
              <span className="block text-xs text-slate-500 mt-0.5">Serving clients across India & worldwide</span>
            </span>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={100} className="lg:col-span-7">
          <div className="p-7 sm:p-10 rounded-[28px] glass-strong">
            <h2 className="text-2xl font-bold text-slate-950">Send an inquiry</h2>
            <p className="text-sm text-slate-600 mt-1.5 mb-7">Share a few details and our team will reply with a tailored roadmap.</p>

            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label" htmlFor="ct-name">Full Name *</label>
                  <input id="ct-name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={placeholderName} className="field" />
                </div>
                <div>
                  <label className="field-label" htmlFor="ct-phone">Phone Number *</label>
                  <input id="ct-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={placeholderPhone} className="field" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label" htmlFor="ct-email">Email Address *</label>
                  <input id="ct-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="field" />
                </div>
                <div>
                  <label className="field-label" htmlFor="ct-service">Solution Category</label>
                  <select id="ct-service" value={service} onChange={(e) => setService(e.target.value)} className="field">
                    <option value="General Consultation">General Consultation</option>
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
                <label className="field-label" htmlFor="ct-message">Message / Project Scope</label>
                <textarea
                  id="ct-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business goals, target audience or current bottlenecks..."
                  className="field resize-none"
                />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full !py-3.5">
                <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
