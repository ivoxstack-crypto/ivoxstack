import React from 'react';
import { Sparkles, Target, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { store } from '../lib/store';

export const AboutPage: React.FC = () => {
  const settings = store.getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16 bg-white">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
          About IvoxStack
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
          Digital Solutions Built for Business Growth
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
          IvoxStack is a technology and creative solutions company built to solve the modern enterprise growth problem: fragmented digital vendors, slow turnarounds, and opaque pricing.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-200 w-fit">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Strategic Purpose</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We provide integrated web engineering, performance advertising, creative design, and business automation platforms under a single cohesive roof. We eliminate bloated retainers and deliver transparent, high-ROI systems tailored to measurable sales growth.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="p-2.5 rounded-xl bg-accent-50 text-accent-600 border border-accent-200 w-fit">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">The Unified Ecosystem</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Instead of managing separate freelance designers, web developers, media buyers, and copywriters, businesses partner with IvoxStack for synchronized digital growth. When creative and technical strategy operate in unison, customer acquisition costs drop and brand valuation compounds.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            How We Operate Differently
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-brand-600 font-mono text-sm font-bold mb-2">01</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Zero Ambiguity in Pricing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every deliverable, timeline, revision limit, and monthly retainer cost is publicly cataloged. No guesswork, no shifting quotes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-brand-600 font-mono text-sm font-bold mb-2">02</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Asset Ownership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upon payment completion, clients receive complete source code, raw vector master assets, and full admin permissions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-brand-600 font-mono text-sm font-bold mb-2">03</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Data-Backed Optimization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Campaigns, landing pages, and creative edits are driven by real analytics: CTR, CPL, ROAS, and conversion funnel analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Corporate Summary Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-slate-900">Headquartered in Uttar Pradesh & NCR, Serving Nationwide</h3>
          <p className="text-xs text-slate-600">
            {settings.address} • Operating Hours: {settings.business_hours}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-800">ISO Standards Compliant Execution</span>
        </div>
      </div>

    </div>
  );
};
