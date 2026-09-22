import React from 'react';

interface CaseStudiesPageProps {
  onOpenLeadModal: (serviceName?: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onOpenLeadModal }) => {
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
      ]
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
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 bg-white">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Real Business Impact
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
          Documented Case Studies
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Structured breakdowns of client challenges, strategic frameworks, execution rigor, and verified business results.
        </p>
      </div>

      <div className="space-y-10">
        {caseStudies.map((cs, idx) => {
          const mainThemes = ['card-theme-blue', 'card-theme-orange'];
          const mainTheme = mainThemes[idx % mainThemes.length];
          return (
            <div
              key={idx}
              className={`p-8 sm:p-10 rounded-3xl ${mainTheme} shadow-sm space-y-8`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 shadow-sm">
                    {cs.industry}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">{cs.client}</h2>
                </div>
                <div className="flex items-center gap-4">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center p-3 rounded-2xl bg-white border border-slate-200 min-w-[100px] shadow-sm card-interactive">
                      <span className="text-lg sm:text-xl font-black text-emerald-600">{m.value}</span>
                      <span className="text-[10px] text-slate-600 block font-semibold mt-0.5">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
                <div className="space-y-1.5 p-5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm card-interactive">
                  <span className="font-bold text-rose-600 uppercase tracking-wider text-[11px] block">
                    The Problem
                  </span>
                  <p className="leading-relaxed text-slate-700">{cs.problem}</p>
                </div>

                <div className="space-y-1.5 p-5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm card-interactive">
                  <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px] block">
                    Strategic Objective
                  </span>
                  <p className="leading-relaxed text-slate-700">{cs.objective}</p>
                </div>

                <div className="space-y-1.5 p-5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm card-interactive">
                  <span className="font-bold text-purple-600 uppercase tracking-wider text-[11px] block">
                    Strategic Roadmap
                  </span>
                  <p className="leading-relaxed text-slate-700">{cs.strategy}</p>
                </div>

                <div className="space-y-1.5 p-5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm card-interactive">
                  <span className="font-bold text-orange-600 uppercase tracking-wider text-[11px] block">
                    Execution & Delivery
                  </span>
                  <p className="leading-relaxed text-slate-700">{cs.execution}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between flex-wrap gap-4 card-interactive shadow-sm">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Verified Outcome
                  </span>
                  <p className="text-xs text-emerald-950 mt-1 font-medium">{cs.results}</p>
                </div>
                <button
                  onClick={() => onOpenLeadModal(`Growth Strategy based on ${cs.client}`)}
                  className="px-5 py-2.5 rounded-xl bg-[#f95700] hover:bg-[#e04e00] text-white text-xs font-bold transition-all shrink-0 shadow-md shadow-orange-500/25 active:scale-95"
                >
                  Achieve Similar Growth →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
