import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  FileText, 
  ExternalLink, 
  ChevronRight,
  Briefcase,
  Building2,
  Car,
  Hotel,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Store,
  Utensils,
  Plane,
  Factory,
  Rocket,
  Shirt,
  PartyPopper,
  Wrench,
  UserCheck
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { HeroRotatingOrbit } from '../components/HeroRotatingOrbit';
import { StartingPrices } from '../components/StartingPrices';
import { CostCalculator } from '../components/CostCalculator';
import { PdfPreviewModal } from '../components/PdfPreviewModal';
import { store } from '../lib/store';
import { buildWhatsAppUrl, formatINR } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/analytics';

interface HomePageProps {
  onOpenLeadModal: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenLeadModal }) => {
  const settings = store.getSettings();
  const services = store.getServices();
  const portfolio = store.getPortfolio();

  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

  const handleWhatsApp = () => {
    trackWhatsAppClick('hero_cta');
    const url = buildWhatsAppUrl('Hello IvoxStack, I would like to explore digital solutions for my business.', settings.whatsapp);
    window.open(url, '_blank');
  };

  const pillars = [
    {
      title: 'Strategy First',
      desc: 'In-depth market research, audience profiling, competitor intelligence, and tailored offer positioning before launch.',
      icon: <Target className="w-5 h-5 text-brand-600" />
    },
    {
      title: 'Creative + Performance',
      desc: 'High-aesthetic visual design combined with direct-response hooks that capture attention and convert impressions into sales.',
      icon: <Sparkles className="w-5 h-5 text-accent-500" />
    },
    {
      title: 'Transparent Pricing',
      desc: 'Clear, predictable package inclusions, explicit revision policies, and live cost calculation with zero hidden fees.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Conversion-Focused Approach',
      desc: 'Engineered multi-touch funnels that guide anonymous website visitors into qualified leads and paying customers.',
      icon: <TrendingUp className="w-5 h-5 text-sky-600" />
    },
    {
      title: 'Complete Digital Solutions',
      desc: 'Websites, advertising, branding, social media, automation, and WhatsApp systems delivered under one unified roof.',
      icon: <Layers className="w-5 h-5 text-purple-600" />
    },
    {
      title: 'Scalable Systems',
      desc: 'Built from day one to scale with your business growth without breaking infrastructure or sacrificing quality.',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />
    },
  ];

  const industries = [
    { name: 'Hospitality & Resorts', icon: <Hotel className="w-5 h-5 text-amber-600" /> },
    { name: 'Automobile Dealerships', icon: <Car className="w-5 h-5 text-blue-600" /> },
    { name: 'Real Estate & Builders', icon: <Building2 className="w-5 h-5 text-emerald-600" /> },
    { name: 'Healthcare & Clinics', icon: <Stethoscope className="w-5 h-5 text-rose-600" /> },
    { name: 'Education & Academies', icon: <GraduationCap className="w-5 h-5 text-purple-600" /> },
    { name: 'E-Commerce & D2C', icon: <ShoppingBag className="w-5 h-5 text-pink-600" /> },
    { name: 'Restaurants & Cafes', icon: <Utensils className="w-5 h-5 text-orange-600" /> },
    { name: 'Beauty & Wellness', icon: <Sparkles className="w-5 h-5 text-rose-500" /> },
    { name: 'Travel & Tourism', icon: <Plane className="w-5 h-5 text-teal-600" /> },
    { name: 'Professional Services', icon: <Briefcase className="w-5 h-5 text-indigo-600" /> },
    { name: 'Manufacturing & B2B', icon: <Factory className="w-5 h-5 text-slate-700" /> },
    { name: 'Startups & MSMEs', icon: <Rocket className="w-5 h-5 text-sky-600" /> },
    { name: 'Fashion & Lifestyle', icon: <Shirt className="w-5 h-5 text-violet-600" /> },
    { name: 'Events & Weddings', icon: <PartyPopper className="w-5 h-5 text-fuchsia-600" /> },
    { name: 'Home Services', icon: <Wrench className="w-5 h-5 text-amber-700" /> },
    { name: 'Personal Brands', icon: <UserCheck className="w-5 h-5 text-emerald-700" /> },
  ];

  const frameworkSteps = [
    {
      step: '01',
      title: 'DISCOVER',
      points: ['Understand core product & service', 'Deep dive into audience & competitors', 'Audit current digital presence', 'Define key bottlenecks & targets']
    },
    {
      step: '02',
      title: 'STRATEGIZE',
      points: ['Formulate platform & channel roadmap', 'Develop conversion funnel architecture', 'Design advertising & content calendar', 'Setup automated lead routing']
    },
    {
      step: '03',
      title: 'CREATE & LAUNCH',
      points: ['Deploy high-speed responsive website', 'Produce high-CTR creatives & reels', 'Configure Meta Pixel & GA4 tracking', 'Launch multi-channel campaigns']
    },
    {
      step: '04',
      title: 'OPTIMIZE & SCALE',
      points: ['Analyze winning hooks & campaigns', 'Cut low-performing budget waste', 'Scale winning audience lookalikes', 'Continuous ROI enhancement']
    },
  ];

  return (
    <div className="space-y-20 pb-20 bg-white">
      
      {/* 1. Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-16 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>IvoxStack • Digital Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
                Digital Solutions <br />
                Built for Business Growth
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Websites, digital marketing, creative design, advertising, branding and automation solutions designed to help businesses build, grow and scale online.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onOpenLeadModal()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all active:scale-95 group"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 transition-all active:scale-95 group"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp Direct</span>
                </button>

                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors"
                >
                  View Pricing
                </Link>

                <Link
                  to="/audit"
                  className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-brand-600 text-xs sm:text-sm font-semibold shadow-xs transition-colors"
                >
                  Free Audit
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transparent Fixed Pricing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Conversion-Driven Design</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Fast Turnaround</span>
                </div>
              </div>

            </div>

            {/* Right Column: Orbit Centerpiece */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <HeroRotatingOrbit />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Starting Prices Section */}
      <StartingPrices />

      {/* 3. 15 Core Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              End-to-End Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              15 Complete Digital Solutions
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              From responsive websites and high-ROAS ad campaigns to complete brand systems and marketing automation.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 mt-4 md:mt-0 transition-colors"
          >
            Explore All 15 Services in Detail <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 9).map((srv, idx) => {
            const cardThemes = [
              { theme: 'card-theme-blue', badge: 'bg-blue-100 text-blue-800 border-blue-200', dot: 'bg-brand-500' },
              { theme: 'card-theme-orange', badge: 'bg-orange-100 text-orange-800 border-orange-200', dot: 'bg-accent-500' },
              { theme: 'card-theme-emerald', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' },
              { theme: 'card-theme-purple', badge: 'bg-purple-100 text-purple-800 border-purple-200', dot: 'bg-purple-500' },
              { theme: 'card-theme-cyan', badge: 'bg-cyan-100 text-cyan-800 border-cyan-200', dot: 'bg-cyan-500' },
              { theme: 'card-theme-amber', badge: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
              { theme: 'card-theme-rose', badge: 'bg-rose-100 text-rose-800 border-rose-200', dot: 'bg-rose-500' },
              { theme: 'card-theme-indigo', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', dot: 'bg-indigo-500' },
              { theme: 'card-theme-blue', badge: 'bg-blue-100 text-blue-800 border-blue-200', dot: 'bg-brand-500' },
            ];
            const current = cardThemes[idx % cardThemes.length];

            return (
              <div
                key={srv.id}
                className={`p-6 rounded-3xl card-interactive flex flex-col justify-between ${current.theme}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-2xs ${current.badge}`}>
                      Starting {formatINR(srv.starting_price)}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{srv.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{srv.short_description}</p>
                  
                  <ul className="mt-4 space-y-2">
                    {srv.features.slice(0, 3).map((f, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-700 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <Link
                    to={`/services#${srv.slug}`}
                    className="text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    Learn More
                  </Link>
                  <button
                    onClick={() => onOpenLeadModal(srv.name)}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Get Started <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-brand-500 text-slate-800 text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
          >
            <span>View All 15 Services & Deliverables</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </Link>
        </div>
      </section>

      {/* 4. Six Pillars */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
              Why IvoxStack
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Engineered For Measurable Business Growth
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our six core positioning pillars guarantee clarity, consistency, and compounding ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const pillarThemes = [
                'card-theme-blue',
                'card-theme-orange',
                'card-theme-emerald',
                'card-theme-cyan',
                'card-theme-purple',
                'card-theme-amber',
              ];
              return (
                <div key={idx} className={`p-6 rounded-3xl card-interactive ${pillarThemes[idx % pillarThemes.length]}`}>
                  <div className="p-3 rounded-2xl bg-white w-fit mb-4 border border-slate-200/80 shadow-xs">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Four-Step Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Our Proven Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            The 4-Step Digital Growth Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {frameworkSteps.map((f, idx) => {
            const stepThemes = ['card-theme-blue', 'card-theme-orange', 'card-theme-purple', 'card-theme-emerald'];
            return (
              <div key={idx} className={`p-6 rounded-3xl card-interactive relative ${stepThemes[idx % stepThemes.length]}`}>
                <span className="text-4xl font-black text-slate-300/80 absolute top-4 right-4 select-none">
                  {f.step}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mb-4">{f.title}</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {f.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-1" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Featured Official Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
              Verified Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Client Portfolios & Catalogues
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Preview our official strategic investor decks, marketplace catalogues, recruitment portfolios, and web platforms.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 mt-4 md:mt-0 transition-colors"
          >
            View Full Portfolio Showcase <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className={`grid grid-cols-1 ${portfolio.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-xl mx-auto'} gap-6`}>
          {portfolio.map((item, pIdx) => {
            const portfolioBorderColors = ['hover:border-brand-500', 'hover:border-accent-500', 'hover:border-emerald-500', 'hover:border-purple-500'];
            return (
              <div
                key={item.id}
                className={`rounded-3xl bg-white border border-slate-200 card-interactive overflow-hidden flex flex-col justify-between group shadow-sm ${portfolioBorderColors[pIdx % portfolioBorderColors.length]}`}
              >
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-sm">
                    {item.category}
                  </span>
                  {item.client && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                      {item.client}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    {item.pdf_url ? (
                      <button
                        onClick={() => setActivePdf({ url: item.pdf_url!, title: item.title })}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Official Catalogue</span>
                      </button>
                    ) : item.project_url ? (
                      <a
                        href={item.project_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 hover:text-accent-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Visit Live Website</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">Corporate Asset</span>
                    )}

                    <button
                      onClick={() => onOpenLeadModal(item.title)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Request Similar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Target Industries */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Industry Experience
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Specialized Digital Solutions For Every Vertical
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              High-converting web architecture, targeted advertising, and marketing systems built for your specific industry niche.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {industries.map((ind, idx) => {
              const indThemes = [
                'card-theme-amber',
                'card-theme-blue',
                'card-theme-emerald',
                'card-theme-rose',
                'card-theme-purple',
                'card-theme-orange',
                'card-theme-cyan',
                'card-theme-indigo',
              ];
              return (
                <div
                  key={idx}
                  onClick={() => onOpenLeadModal(`Digital Solution for ${ind.name}`)}
                  className={`p-4 rounded-2xl card-interactive text-center flex flex-col items-center justify-center gap-2.5 cursor-pointer ${indThemes[idx % indThemes.length]}`}
                >
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs group-hover:scale-110 transition-transform">
                    {ind.icon}
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 leading-tight">{ind.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Live Interactive Cost Calculator Embedded */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Real-Time Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Calculate Your Project Cost Instantly
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Select your exact services, slide volume, and instantly send your customized plan to our WhatsApp line.
          </p>
        </div>

        <CostCalculator />
      </section>

      {/* 9. Free Digital Audit Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-brand-50 via-white to-accent-50 border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-100 text-brand-700 border border-brand-200">
              Zero Obligation • 100% Free
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Get A Comprehensive Digital Audit Of Your Business
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              We review your website speed, Meta Pixel tracking, Google Maps ranking, and ad copy performance to discover hidden growth opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/audit"
              className="px-6 py-3 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all hover:scale-102"
            >
              Claim Free Audit Now
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors group"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366] group-hover:scale-110 transition-transform" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* PDF Modal Viewer for Catalogues */}
      {activePdf && (
        <PdfPreviewModal
          isOpen={Boolean(activePdf)}
          onClose={() => setActivePdf(null)}
          pdfUrl={activePdf.url}
          title={activePdf.title}
        />
      )}

    </div>
  );
};
