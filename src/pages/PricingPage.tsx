import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { formatINR, buildWhatsAppUrl } from '../lib/utils';
import { store } from '../lib/store';
import { trackWhatsAppClick } from '../lib/analytics';

interface PricingPageProps {
  onOpenLeadModal: (packageName?: string) => void;
}

const categoryAliases: Record<string, string> = {
  'social': 'social-mgmt',
  'social-media': 'social-mgmt',
  'social-media-management': 'social-mgmt',
  'social-mgmt': 'social-mgmt',
  'reels': 'reels-video',
  'reel': 'reels-video',
  'video': 'reels-video',
  'videos': 'reels-video',
  'reels-video': 'reels-video',
  'creative': 'creative',
  'creatives': 'creative',
  'social-creative': 'creative',
  'social-media-creative': 'creative',
  'website': 'websites',
  'web': 'websites',
  'websites': 'websites',
  'website-development': 'websites',
  'website-design': 'websites',
  'website-design-development': 'websites',
  'maintenance': 'maintenance',
  'website-maintenance': 'maintenance',
  'meta': 'meta-ads',
  'meta-ads': 'meta-ads',
  'meta-ads-management': 'meta-ads',
  'lead-gen': 'lead-gen',
  'lead-generation': 'lead-gen',
  'leads': 'lead-gen',
  'branding': 'branding',
  'brand': 'branding',
  'google-ads': 'google-ads',
  'google': 'google-ads',
  'seo': 'seo-automation',
  'automation': 'seo-automation',
  'seo-automation': 'seo-automation',
  'bundles': 'bundles',
  'turnkey': 'bundles',
};

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenLeadModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get('category') || searchParams.get('tab');
  const resolvedCategory = rawCategory ? (categoryAliases[rawCategory.toLowerCase()] || rawCategory) : 'websites';
  const [activeTab, setActiveTab] = useState<string>(resolvedCategory);
  const tabsRef = useRef<HTMLDivElement>(null);
  const settings = store.getSettings();

  useEffect(() => {
    const raw = searchParams.get('category') || searchParams.get('tab');
    if (raw) {
      const resolved = categoryAliases[raw.toLowerCase()] || raw;
      setActiveTab(resolved);
      setTimeout(() => {
        const tabBtn = tabsRef.current?.querySelector(`[data-cat="${resolved}"]`);
        if (tabBtn) {
          tabBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        const catalogEl = document.getElementById('pricing-catalog');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }, [searchParams]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' });
    }
  };

  const handleWhatsApp = (planName: string, price: string) => {
    trackWhatsAppClick(`pricing_${planName}`);
    const msg = `Hello IvoxStack, I am interested in the ${planName} package (${price}). Please share the onboarding details.`;
    window.open(buildWhatsAppUrl(msg, settings.whatsapp), '_blank', 'noopener,noreferrer');
  };

  const categories = [
    { id: 'websites', label: 'Websites' },
    { id: 'bundles', label: 'Turnkey Bundles' },
    { id: 'meta-ads', label: 'Meta Ads' },
    { id: 'lead-gen', label: 'Lead Generation' },
    { id: 'reels-video', label: 'Reels & Video' },
    { id: 'creative', label: 'Creative Design' },
    { id: 'social-mgmt', label: 'Social Media' },
    { id: 'google-ads', label: 'Google Ads & GBP' },
    { id: 'branding', label: 'Branding & Identity' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'seo-automation', label: 'SEO & Automation' },
  ];

  const pricingData: Record<string, Array<{ name: string; price: number; isMonthly?: boolean; popular?: boolean; features: string[] }>> = {
    websites: [
      {
        name: 'One Page Starter Website',
        price: 3499,
        features: ['Hero Section & About', 'Services Grid', 'Contact & WhatsApp CTA', 'Mobile Responsive', '1 Revision Included'],
      },
      {
        name: 'Landing Page',
        price: 5999,
        popular: true,
        features: ['Conversion-Focused Architecture', 'Lead Capture Form', 'Meta Pixel & Analytics Setup', 'Thank You Page', 'Speed Optimized'],
      },
      {
        name: 'Portfolio Website',
        price: 7999,
        features: ['Up to 4 Custom Pages', 'Portfolio Gallery Showcase', 'Category Filters', 'Mobile Responsive Design', 'WhatsApp Quick Chat'],
      },
      {
        name: 'Business Website',
        price: 10499,
        popular: true,
        features: ['Up to 5 Pages', 'Google Maps Integration', 'Basic SEO Setup', 'Contact Form to Email', '2 Revisions Included'],
      },
      {
        name: 'Professional Business Website',
        price: 14999,
        features: ['Up to 8 Pages', 'Blog / Case Studies Engine', 'Full Analytics Integration', 'Advanced Lead Funnels', '3 Revisions Included'],
      },
      {
        name: 'Premium Corporate Website',
        price: 20999,
        features: ['Up to 12 Pages', 'Micro-Animations & Premium UI', 'Advanced Conversion Funnels', 'Technical SEO Architecture', 'Dedicated Webmaster'],
      },
      {
        name: 'Booking Website',
        price: 22999,
        features: ['Appointment / Booking System', 'Online Payment Gateway', 'WhatsApp & Email Alerts', 'Dynamic Booking Calendar', 'Admin Booking Portal'],
      },
      {
        name: 'Complete E-Commerce Store',
        price: 28999,
        features: ['Product Catalog & Filtering', 'Shopping Cart & Checkout', 'Razorpay / UPI Integration', 'WhatsApp Order Alerts', 'Customer Accounts'],
      },
    ],
    bundles: [
      {
        name: 'Business Starter Kit',
        price: 11999,
        features: ['One Page Starter Website', 'Logo Refinement & Guidelines', 'Instagram & Facebook Profile Setup', 'Google Business Profile Setup', '6 Social Media Creatives', 'WhatsApp CTA Integration'],
      },
      {
        name: 'Complete Digital Launch',
        price: 28999,
        popular: true,
        features: ['Professional 5-Page Website', 'Complete Social Profile Setup', '12 Social Creatives + 4 Reels', 'Meta Business & Pixel Setup', 'Lead Generation Funnel', 'Quarterly Marketing Roadmap'],
      },
      {
        name: 'Digital Growth Engine',
        price: 57999,
        features: ['Custom Corporate Web Portal', 'Full Brand Identity System', '1-Month Social Media Management', 'Meta Ads + Google Ads Setup', 'CRM & WhatsApp Automation', 'Scalable Lead Funnel Engine'],
      },
    ],
    'meta-ads': [
      {
        name: 'Ad Account Setup',
        price: 2299,
        features: ['Meta Business Manager Setup', 'Ad Account & Payment Setup', 'Meta Pixel & Events Setup', 'Initial Campaign Architecture'],
      },
      {
        name: 'Starter Ads Management',
        price: 5999,
        isMonthly: true,
        features: ['Target Audience Research', 'Single Campaign Funnel Setup', 'Weekly Bid & Budget Optimization', 'Bi-Weekly Reporting'],
      },
      {
        name: 'Growth Ads Management',
        price: 9499,
        isMonthly: true,
        popular: true,
        features: ['Multiple Campaign Angles', 'A/B Creative & Copy Testing', 'Custom Retargeting Funnel', 'Audience Lookalike Testing', 'Weekly Performance Reports'],
      },
      {
        name: 'Professional Scaling',
        price: 13999,
        isMonthly: true,
        features: ['Full Multi-Stage Funnel (TOFU, MOFU, BOFU)', 'Custom & LAL Audience Stacks', 'Aggressive Budget Scaling', 'Daily Bid & CPL Optimization', 'Dedicated Media Buyer'],
      },
    ],
    'lead-gen': [
      {
        name: 'Starter Sprint',
        price: 11999,
        isMonthly: true,
        features: ['Targeted Meta Ads Lead Funnel', 'Audience Demographic Research', 'Instant Lead Form Integration', 'Basic Retargeting Layer'],
      },
      {
        name: 'Growth Sprint',
        price: 17499,
        isMonthly: true,
        popular: true,
        features: ['Multiple Campaign Funnels', 'Automated Lead Qualification Sheet', 'Instant WhatsApp Alerts', 'A/B Hook & Offer Testing'],
      },
      {
        name: 'Pro Funnel',
        price: 22999,
        isMonthly: true,
        features: ['Custom Dedicated Landing Page', 'Meta Ads + Pixel Tracking', '5–8 High CTR Ad Creatives', 'CRM Pipeline Sync', 'Weekly Strategy Review'],
      },
      {
        name: 'Scale Enterprise',
        price: 34999,
        isMonthly: true,
        features: ['Meta Ads + Google Search Ads', 'Multi-Step High-Intent Funnel', 'Dynamic Creative Refresh', 'Automated CRM Lead Routing', 'Enterprise Account Scaling'],
      },
    ],
    'reels-video': [
      {
        name: 'Basic Reel',
        price: 399,
        features: ['15–30 Seconds Duration', 'Clean Fast Cuts', 'Audio Sync', 'Basic Text Overlays', 'Watermark Integration'],
      },
      {
        name: 'Professional Reel',
        price: 599,
        popular: true,
        features: ['Fast Dynamic Pacing', 'Animated Captions & Subtitles', 'Brand Styling & Colors', 'SFX Audio Hits', 'Conversion Call-to-Action'],
      },
      {
        name: 'Promotional Reel',
        price: 799,
        features: ['Hook Scripting Strategy', 'Advanced Typography', 'Full Sound Design / SFX', 'Color Grading', 'Designed For High Shareability'],
      },
      {
        name: 'Performance Ad Reel',
        price: 1099,
        features: ['Direct-Response Hook Editing', 'Pattern Interrupt Motion Captions', 'Layered SFX & Kinetic Cuts', 'Engineered for High CTR & ROAS'],
      },
      {
        name: 'Monthly 8 Reels Package',
        price: 3999,
        features: ['8 Professional Reels', 'Scripting & Hook Assistance', 'Sound & Trend Sync', 'Fast 48h Turnaround'],
      },
      {
        name: 'Monthly 20 Reels Package',
        price: 9499,
        features: ['20 High Impact Reels', 'Complete Content Calendar', 'Hooks, Captions & SFX', 'Priority Queue Turnaround'],
      },
    ],
    creative: [
      {
        name: 'Basic Social Media Post',
        price: 119,
        features: ['Single Creative Design', 'Standard 1:1 or 4:5 Format', 'Clean Modern Typography', 'Fast Delivery'],
      },
      {
        name: 'Professional Creative',
        price: 179,
        popular: true,
        features: ['High-Click Ad Design', 'Custom Brand Elements', 'Multi-Ratio Delivery (Post & Story)', 'High Resolution Export'],
      },
      {
        name: 'Premium Promotional Creative',
        price: 229,
        features: ['High-Conversion Offer Layout', '3D Asset / Product Lighting', 'Persuasive Visual Hierarchy', 'Ready for Paid Campaigns'],
      },
      {
        name: 'Carousel Design (5 Slides)',
        price: 599,
        features: ['5 Seamless Carousel Slides', 'Educational / Storytelling Layout', 'Engaging Slide Transitions', 'High Save & Share Rate'],
      },
      {
        name: 'Carousel Design (10 Slides)',
        price: 1199,
        features: ['10 Seamless Panoramic Slides', 'Deep Dive Breakdown / Portfolio', 'Hook to Final CTA Flow', 'High Engagement Format'],
      },
    ],
    'social-mgmt': [
      {
        name: 'Starter Management',
        price: 7999,
        isMonthly: true,
        features: ['Instagram & Facebook Handling', '12 Custom Creatives / Month', '4 Reels / Month', 'Captions & Hashtag Strategy', 'Monthly Growth Report'],
      },
      {
        name: 'Growth Management',
        price: 13999,
        isMonthly: true,
        popular: true,
        features: ['Instagram, Facebook & LinkedIn', '16 Custom Creatives / Month', '6 Reels / Month', 'Daily Stories (Mon-Fri)', 'Comprehensive Content Calendar', 'Monthly Strategic Review'],
      },
      {
        name: 'Premium Management',
        price: 22999,
        isMonthly: true,
        features: ['Multi-Platform Brand Management', '20 Custom Creatives / Month', '8 Dynamic Reels / Month', 'Daily Stories & Community Moderation', 'Growth Strategy & Analytics', 'Dedicated Account Manager'],
      },
    ],
    'google-ads': [
      {
        name: 'Google Business Profile Setup',
        price: 1199,
        features: ['New Listing Setup & Verification Support', 'Categories & Hours Configuration', 'Business Bio & Geotagged Photos', 'Direct WhatsApp / Call Button'],
      },
      {
        name: 'GBP Complete Optimization',
        price: 2299,
        popular: true,
        features: ['Local Keyword Optimization', 'Review Generation QR & Templates', 'Products & Services Setup', 'Google Maps Local Boost Strategy'],
      },
      {
        name: 'Google Search Ads Management',
        price: 6999,
        isMonthly: true,
        features: ['High-Intent Search Keyword Research', 'Negative Keyword Shielding', 'Ad Copy & Extension Setup', 'Conversion Tracking Configuration'],
      },
      {
        name: 'Unified Meta + Google Ads',
        price: 17499,
        isMonthly: true,
        features: ['Cross-Platform Strategy & Scaling', 'Search Capture + Social Push', 'Unified Conversion Analytics', 'Weekly Optimization Call'],
      },
    ],
    branding: [
      {
        name: 'Starter Brand Kit',
        price: 3499,
        features: ['Custom Logo Design (2 Concepts)', 'Official Brand Color Palette', 'Typography & Font System', 'PNG & Transparent Files'],
      },
      {
        name: 'Professional Brand Kit',
        price: 6999,
        popular: true,
        features: ['Logo Suite (Primary, Secondary, Icon)', 'Color & Typography Hierarchy', 'Visiting Card & Letterhead Design', 'Social Media Kit (Profile & Banner)', 'Vector Source Files (AI, SVG, PDF)'],
      },
      {
        name: 'Complete Brand System',
        price: 11999,
        features: ['Complete Brand Guidelines Book', 'Full Stationery System (Card, Letter, Folder)', 'Comprehensive Social Media Kit', 'Packaging / Merch Guidelines', 'All Vector Master Files'],
      },
    ],
    maintenance: [
      {
        name: 'Basic Maintenance',
        price: 1199,
        isMonthly: true,
        features: ['Monthly Cloud Backups', 'Uptime Monitoring (24/7)', 'Security Updates & SSL Check', '1 Content Update / Month', 'Support Turnaround ~4 Hours'],
      },
      {
        name: 'Standard Maintenance',
        price: 2299,
        isMonthly: true,
        popular: true,
        features: ['Weekly Automated Backups', 'Speed & Cache Tuning', 'Spam & Form Monitoring', '3 Content Updates / Month', 'Priority WhatsApp Support (~1 Hour)'],
      },
      {
        name: 'Premium Maintenance',
        price: 3499,
        isMonthly: true,
        features: ['Daily Automated Cloud Backups', 'Instant Disaster Recovery', 'Web Application Firewall Checks', 'Minor Content Updates On Demand', 'Dedicated Webmaster (<30m Response)'],
      },
    ],
    'seo-automation': [
      {
        name: 'Local SEO Package',
        price: 7999,
        isMonthly: true,
        features: ['Google Maps Top-3 Strategy', 'Local Citation Building', 'On-Page Local Landing Pages', 'Monthly Rank & Call Tracking'],
      },
      {
        name: 'WhatsApp Inquiry Automation',
        price: 5999,
        features: ['Automated Instant Greetings', 'Service Menu Selection Bots', 'Lead Capture & Notification', 'Zero Delay Response Setup'],
      },
      {
        name: 'WhatsApp + CRM + Lead Routing',
        price: 17499,
        popular: true,
        features: ['Instant Lead Sync to CRM / Sheets', 'Instant WhatsApp Alerts to Sales Team', 'Automated Customer Follow-Up Sequence', 'Webhook Integrations (Zapier/Make)'],
      },
    ],
  };

  const currentPlans = pricingData[activeTab] || pricingData.websites;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-12">
      <SectionHeading
        asPageTitle
        eyebrow="Transparent Catalog"
        title="Clear, fixed pricing"
        description="No hidden fees, no vague estimates. Transparent pricing designed for MSMEs, startups and growing brands."
      />

      {/* Category Tabs */}
      <div id="pricing-catalog" className="relative max-w-6xl mx-auto flex items-center gap-2 scroll-mt-28">
        <button
          type="button"
          onClick={() => scrollTabs('left')}
          className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full btn-glass shrink-0"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div ref={tabsRef} className="flex-1 overflow-x-auto no-scrollbar scroll-smooth rounded-full glass p-1.5">
          <div className="flex items-center gap-1 w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                data-cat={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setSearchParams({ category: cat.id }, { replace: true });
                }}
                className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === cat.id
                    ? 'bg-white text-brand-600 font-semibold shadow-[0_0_0_1px_rgba(0,128,255,0.25),0_6px_16px_-8px_rgba(0,128,255,0.45)]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollTabs('right')}
          className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full btn-glass shrink-0"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Plans */}
      <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {currentPlans.map((plan, idx) => (
          <Reveal key={plan.name} delay={(idx % 3) * 70} className="h-full">
            <div
              className={`relative h-full p-7 sm:p-8 rounded-3xl flex flex-col justify-between glass-hover ${
                plan.popular ? 'card-featured' : 'glass'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-7 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white bg-accent-500 shadow-md shadow-orange-500/25">
                  Most popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-950">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-slate-950 tracking-tight">{formatINR(plan.price)}</span>
                  {plan.isMonthly && <span className="text-sm font-medium text-slate-500">/month</span>}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/70">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">What's included</span>
                  <ul className="mt-3 space-y-2.5">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <button
                  onClick={() => onOpenLeadModal(plan.name)}
                  className={`btn flex-1 ${plan.popular ? 'btn-primary' : 'btn-soft'}`}
                >
                  Choose plan
                </button>
                <button
                  onClick={() => handleWhatsApp(plan.name, formatINR(plan.price, plan.isMonthly))}
                  className="btn btn-glass !px-3.5"
                  title="Book on WhatsApp"
                  aria-label={`Book ${plan.name} on WhatsApp`}
                >
                  <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="rounded-[28px] glass-strong p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-slate-950">Need a custom combination?</h3>
            <p className="text-sm text-slate-600 mt-1.5">
              Use the live cost calculator to combine websites, creatives, reels and maintenance.
            </p>
          </div>
          <Link to="/calculator" className="btn btn-primary shrink-0">
            Launch calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
};
