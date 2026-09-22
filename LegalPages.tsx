import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 bg-white">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            IvoxStack collects business contact information provided voluntarily through our inquiry forms, calculators, and communication channels. This includes full name, business name, phone number, email address, project requirements, and marketing preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Analytics, Pixels & UTM Tracking</h2>
          <p>
            To optimize user experience and measure campaign efficacy, we utilize Meta Pixel, Google Analytics 4 (GA4), and URL campaign tracking parameters (UTM source, medium, campaign). These tools capture aggregate navigational and conversion event metrics without exposing individual financial data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. How We Use Collected Data</h2>
          <p>
            Collected data is utilized strictly for evaluating project scope, dispatching customized digital roadmaps, generating invoice statements, and facilitating business operations. We never sell, rent, or lease client data to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Data Security</h2>
          <p>
            All platform data is protected using PostgreSQL Row Level Security (RLS), encrypted transmission protocols (HTTPS/TLS), and server-side validation.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 bg-white">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Engagement & Deliverables</h2>
          <p>
            All digital solution engagements are governed by explicit proposals and package inclusions cataloged on this platform. Work commences upon clearance of the agreed upfront deposit or retainer milestone.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Intellectual Property & Ownership</h2>
          <p>
            Upon complete settlement of all agreed invoices, full client-specific deliverables including website source code, custom graphics, vector logos, and brand guidelines are transferred to the client. Pre-existing proprietary agency libraries and internal templates remain the property of IvoxStack.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Monthly Retainer Termination</h2>
          <p>
            Ongoing monthly retainers (Social Media, Meta Ads, Maintenance) require a minimum notice of 7 days prior to the subsequent billing cycle.
          </p>
        </section>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 bg-white">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Refund Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Customized Creative & Technical Services</h2>
          <p>
            Due to the custom labor, strategy, and design time invested immediately upon project kickoff, completed design work, ad spend consumed on third-party ad networks (Meta/Google), and delivered code modules are non-refundable.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Pre-Execution Cancellations</h2>
          <p>
            If a client requests project cancellation prior to the commencement of research or asset production, deposit amounts may be refunded minus a 15% administrative and consultation processing fee.
          </p>
        </section>
      </div>
    </div>
  );
};

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 bg-white">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Cookie Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Use of Cookies</h2>
          <p>
            IvoxStack utilizes standard HTTP cookies and session storage to maintain authentication state, preserve UTM campaign parameters across multi-page sessions, and deliver optimized content caching.
          </p>
        </section>
      </div>
    </div>
  );
};

export const RevisionPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 bg-white">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Revision & SLA Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Revision Allowances by Tier</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Starter Packages:</strong> 1 complete round of structured revision.</li>
            <li><strong>Business Packages:</strong> 2 complete rounds of structured revision.</li>
            <li><strong>Professional & Enterprise Packages:</strong> 3 complete rounds of structured revision.</li>
            <li><strong>Monthly Maintenance:</strong> Scope-defined ongoing updates as per contracted tier.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Support SLA Targets</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Basic Maintenance:</strong> Target turnaround within ~4 business hours.</li>
            <li><strong>Standard Maintenance:</strong> Priority turnaround within ~1 business hour.</li>
            <li><strong>Premium Maintenance:</strong> Emergency response within ~30 minutes.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
