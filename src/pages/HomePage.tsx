import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Layers,
  TrendingUp,
  ShieldCheck,
  Target,
  ExternalLink,
  Briefcase,
  Building2,
  Car,
  Hotel,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Plane,
  Factory,
  Rocket,
  Shirt,
  PartyPopper,
  Wrench,
  UserCheck,
  Search,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { HeroRotatingOrbit } from '../components/HeroRotatingOrbit';
import { StartingPrices } from '../components/StartingPrices';
import { CostCalculator } from '../components/CostCalculator';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { store } from '../lib/store';
import { buildWhatsAppUrl, formatINR } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/analytics';

interface HomePageProps {
  onOpenLeadModal: (serviceName?: string) => void;
}

const pillars = [
  { title: 'Strategy First', desc: 'Market research, audience profiling, competitor intelligence and offer positioning before anything goes live.', icon: <Target className="w-5 h-5 text-brand-600" /> },
  { title: 'Creative + Performance', desc: 'High-aesthetic visuals combined with direct-response hooks that turn impressions into sales.', icon: <Sparkles className="w-5 h-5 text-accent-500" /> },
  { title: 'Transparent Pricing', desc: 'Clear package inclusions, explicit revision policies and live cost calculation — zero hidden fees.', icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" /> },
  { title: 'Conversion-Focused', desc: 'Multi-touch funnels that guide anonymous visitors into qualified leads and paying customers.', icon: <TrendingUp className="w-5 h-5 text-sky-600" /> },
  { title: 'Complete Digital Solutions', desc: 'Websites, ads, branding, social, automation and WhatsApp systems — all under one roof.', icon: <Layers className="w-5 h-5 text-violet-600" /> },
  { title: 'Scalable Systems', desc: 'Built from day one to grow with your business without breaking infrastructure or quality.', icon: <ShieldCheck className="w-5 h-5 text-indigo-600" /> },
];

const industries = [
  { name: 'Hospitality & Resorts', icon: <Hotel className="w-5 h-5 text-amber-600" /> },
  { name: 'Automobile Dealerships', icon: <Car className="w-5 h-5 text-blue-600" /> },
  { name: 'Real Estate & Builders', icon: <Building2 className="w-5 h-5 text-emerald-600" /> },
  { name: 'Healthcare & Clinics', icon: <Stethoscope className="w-5 h-5 text-rose-600" /> },
  { name: 'Education & Academies', icon: <GraduationCap className="w-5 h-5 text-violet-600" /> },
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
  { step: '01', title: 'Discover', points: ['Understand core product & service', 'Deep dive into audience & competitors', 'Audit current digital presence', 'Define key bottlenecks & targets'] },
  { step: '02', title: 'Strategize', points: ['Platform & channel roadmap', 'Conversion funnel architecture', 'Advertising & content calendar', 'Automated lead routing'] },
  { step: '03', title: 'Create & Launch', points: ['High-speed responsive website', 'High-CTR creatives & reels', 'Meta Pixel & GA4 tracking', 'Multi-channel campaigns'] },
  { step: '04', title: 'Optimize & Scale', points: ['Analyze winning hooks & campaigns', 'Cut low-performing budget waste', 'Scale winning lookalike audiences', 'Continuous ROI enhancement'] },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenLeadModal }) => {
  const settings = store.getSettings();
  const services = store.getServices();
  const portfolio = store.getPortfolio();

  const handleWhatsApp = () => {
    trackWhatsAppClick('hero_cta');
    const url = buildWhatsAppUrl('Hello IvoxStack, I would like to explore digital solutions for my business.', settings.whatsapp);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const minPrice = Math.min(...services.map((s) => s.starting_price));

  const heroStats = [
    { value: `${services.length}+`, label: 'Digital services' },
    { value: formatINR(minPrice), label: 'Starting price' },
    { value: '< 4 hrs', label: 'Response time' },
    { value: '100%', label: 'Transparent pricing' },
  ];

  return (
    <div className="space-y-28 sm:space-y-32 pb-24">
      {/* 1. Hero */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20">
        <div className="absolute inset-x-0 -top-24 h-[640px] bg-grid pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <Reveal>
                <span className="eyebrow">
                  <span className="eyebrow-dot" />
                  IvoxStack · Digital Solutions
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-6 text-[40px] leading-[1.05] sm:text-6xl lg:text-[68px] font-extrabold text-slate-950 tracking-tight">
                  Digital solutions built for <span className="text-highlight">business growth</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Websites, digital marketing, creative design, advertising, branding and automation — designed to help
                  businesses build, grow and scale online.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <button onClick={() => onOpenLeadModal()} className="btn btn-primary !px-6 !py-3.5 group">
                    <span>Get Free Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button onClick={handleWhatsApp} className="btn btn-glass !px-6 !py-3.5">
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    <span>WhatsApp Direct</span>
                  </button>
                  <Link to="/pricing" className="link-arrow px-3 py-3">
                    View pricing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 rounded-3xl glass max-w-xl mx-auto lg:mx-0">
                  {heroStats.map((s) => (
                    <div key={s.label} className="px-3 py-3 rounded-2xl text-center lg:text-left">
                      <p className="font-display text-xl font-extrabold text-slate-950 tracking-tight">{s.value}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 flex justify-center items-center">
              <Reveal delay={200}>
                <HeroRotatingOrbit />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Starting Prices */}
      <StartingPrices />

      {/* 3. Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="End-to-End Capabilities"
          title={`${services.length} complete digital solutions`}
          description="From responsive websites and high-ROAS ad campaigns to complete brand systems and marketing automation."
          action={
            <Link to="/services" className="btn btn-glass">
              Explore all services <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 9).map((srv, idx) => (
            <Reveal key={srv.id} delay={(idx % 3) * 80} className="h-full">
              <div className="group h-full p-7 rounded-3xl glass glass-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-slate-300">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-xs font-semibold text-slate-700 px-3 py-1 rounded-full bg-white/80 border border-slate-200/70">
                      From {formatINR(srv.starting_price)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mt-6">{srv.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">{srv.short_description}</p>
                  <ul className="mt-5 space-y-2">
                    {srv.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-sm text-slate-700 flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-200/70 flex items-center justify-between">
                  <Link to={`/services#${srv.slug}`} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    Learn more
                  </Link>
                  <button onClick={() => onOpenLeadModal(srv.name)} className="link-arrow">
                    Get started <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why IvoxStack"
          title="Engineered for measurable business growth"
          description="Six core principles that guarantee clarity, consistency and compounding ROI."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.title} delay={(idx % 3) * 80} className="h-full">
              <div className="h-full p-7 rounded-3xl glass glass-hover">
                <div className="icon-chip">{pillar.icon}</div>
                <h3 className="text-lg font-bold text-slate-950 mt-6">{pillar.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Process" title="The 4-step digital growth framework" />

        <div className="mt-14 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" aria-hidden="true" />
          {frameworkSteps.map((f, idx) => (
            <Reveal key={f.step} delay={idx * 90} className="h-full">
              <div className="relative h-full p-7 rounded-3xl glass glass-hover">
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-2xl font-display text-base font-extrabold text-brand-600 bg-brand-50 border border-brand-100">
                  {f.step}
                </span>
                <h3 className="text-lg font-bold text-slate-950 mt-6">{f.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-2" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. Portfolio */}
      {portfolio.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Selected Work"
            title="Featured client projects"
            description="Web platforms and brand work delivered for growing businesses."
            action={
              <Link to="/portfolio" className="btn btn-glass">
                View portfolio <ArrowRight className="w-4 h-4" />
              </Link>
            }
          />

          <div className={`mt-12 grid grid-cols-1 gap-6 ${portfolio.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
            {portfolio.map((item) => (
              <Reveal key={item.id}>
                <article
                  className={`group rounded-[28px] glass glass-hover overflow-hidden ${
                    portfolio.length === 1 ? 'grid grid-cols-1 lg:grid-cols-2' : 'flex flex-col'
                  }`}
                >
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden m-2 rounded-[22px] bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 text-[11px] font-semibold px-3 py-1 rounded-full glass-strong text-slate-800">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-7 sm:p-10 flex flex-col justify-center">
                    {item.client && <span className="text-sm font-semibold text-brand-600">{item.client}</span>}
                    <h3 className="text-2xl font-bold text-slate-950 mt-2 leading-snug">{item.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">{item.description}</p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {item.project_url && (
                        <a href={item.project_url} target="_blank" rel="noreferrer" className="btn btn-soft">
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit live website</span>
                        </a>
                      )}
                      <button onClick={() => onOpenLeadModal(item.title)} className="btn btn-glass">
                        Request similar
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 7. Industries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industry Experience"
          title="Specialized solutions for every vertical"
          description="High-converting web architecture, targeted advertising and marketing systems built for your niche."
        />

        <Reveal className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {industries.map((ind) => (
              <button
                key={ind.name}
                onClick={() => onOpenLeadModal(`Digital Solution for ${ind.name}`)}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-2xl glass glass-hover text-left"
              >
                <span className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200/60 group-hover:scale-110 transition-transform">
                  {ind.icon}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">{ind.name}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 8. Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real-Time Estimator"
          title="Calculate your project cost instantly"
          description="Pick your services, set volumes and send your customized plan straight to our WhatsApp."
        />
        <Reveal className="mt-12">
          <CostCalculator />
        </Reveal>
      </section>

      {/* 9. Audit CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] glass-strong p-8 sm:p-14">
            <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-brand-400/25 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-accent-400/25 blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
              <div className="max-w-2xl">
                <span className="eyebrow">
                  <span className="eyebrow-dot" />
                  Zero obligation · 100% free
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mt-5 leading-[1.1]">
                  Get a complete digital audit of your business
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
                  We review your website speed, Meta Pixel tracking, Google Maps ranking and ad performance to uncover
                  hidden growth opportunities.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
                <Link to="/audit" className="btn btn-primary !px-7 !py-4">
                  <Search className="w-4 h-4" />
                  <span>Claim free audit</span>
                </Link>
                <button onClick={handleWhatsApp} className="btn btn-glass !px-7 !py-4">
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>Ask on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
