import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

interface CaseStudiesPageProps {
  onOpenLeadModal: (serviceName?: string) => void;
}

const caseStudies = [
  {
    client: 'UrbanStyle D2C Brand',
    industry: 'Fashion & Apparel',
    problem: 'High customer acquisition costs and low ad conversion on cold Instagram audiences.',
    objective: 'Lower blended cost-per-lead and scale monthly order volume through direct-response video creatives and pixel optimization.',
    strategy: 'Implemented 3-phase full-funnel Meta Ads structure with custom hook-rate video edits, instant WhatsApp cart alerts, and dynamic retargeting.',
    execution: 'Produced 12 high-CTR reels, rebuilt landing page for sub-second mobile loading, and configured CAPI server-side event tracking.',
    results: 'Achieved 3.8x sustained ROAS, 42% reduction in Cost Per Lead (CPL), and 2.4x monthly qualified lead volume.',
    metrics: [
      { label: 'ROAS Achieved', value: '3.8x' },
      { label: 'CPL Reduction', value: '-42%' },
      { label: 'Lead Volume', value: '+140%' },
    ],
  },
  {
    client: 'Apex Hospitality & Resorts',
    industry: 'Luxury Hospitality',
    problem: 'Heavy dependence on third-party OTA commissions and lack of direct weekend booking inquiries.',
    objective: 'Establish direct high-intent traveler inquiry pipeline via hyper-local Meta campaigns and direct WhatsApp booking concierge.',
    strategy: 'Engineered high-aesthetic visual website showcase with room tours, targeted affluent metro demographics, and automated WhatsApp inquiry routing.',
    execution: 'Launched geo-targeted Meta ad campaigns featuring video walkthroughs with direct WhatsApp CTA buttons.',
    results: 'Generated 180+ direct high-ticket weekend inquiries in the first 45 days, slashing third-party commission overhead by 35%.',
    metrics: [
      { label: 'Direct Inquiries', value: '180+' },
      { label: 'Commission Saved', value: '35%' },
      { label: 'Response Time', value: '< 5 Mins' },
    ],
  },
];

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onOpenLeadModal }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-14">
    <SectionHeading
      asPageTitle
      eyebrow="Real Business Impact"
      title="Documented case studies"
      description="Structured breakdowns of client challenges, strategy, execution and business results."
    />

    <div className="space-y-8">
      {caseStudies.map((cs) => {
        const sections = [
          { label: 'The Problem', text: cs.problem, color: 'text-rose-600' },
          { label: 'Objective', text: cs.objective, color: 'text-brand-600' },
          { label: 'Strategy', text: cs.strategy, color: 'text-violet-600' },
          { label: 'Execution', text: cs.execution, color: 'text-accent-600' },
        ];
        return (
          <Reveal key={cs.client}>
            <article className="rounded-[32px] glass p-6 sm:p-10 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 border border-slate-200/70 text-slate-700">
                    {cs.industry}
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight mt-4">{cs.client}</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="text-center px-4 py-4 rounded-2xl bg-white/80 border border-white shadow-[0_0_0_1px_rgba(15,23,42,0.05)] min-w-[96px]">
                      <span className="font-display text-2xl font-extrabold text-emerald-600 tracking-tight">{m.value}</span>
                      <span className="text-[11px] text-slate-500 block font-medium mt-1">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.map((sec) => (
                  <div key={sec.label} className="p-6 rounded-2xl bg-white/60 border border-white shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${sec.color}`}>{sec.label}</span>
                    <p className="text-sm text-slate-700 leading-relaxed mt-2">{sec.text}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-white/60 border border-emerald-200/70 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">Outcome</span>
                  <p className="text-sm sm:text-base text-emerald-950 mt-1.5 font-medium">{cs.results}</p>
                </div>
                <button onClick={() => onOpenLeadModal(`Growth Strategy based on ${cs.client}`)} className="btn btn-primary shrink-0">
                  Achieve similar growth <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  </div>
);
