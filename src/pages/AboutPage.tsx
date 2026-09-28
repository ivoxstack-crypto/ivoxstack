import React from 'react';
import { Sparkles, Target, MapPin, Clock } from 'lucide-react';
import { store } from '../lib/store';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

const principles = [
  {
    title: 'Zero ambiguity in pricing',
    desc: 'Every deliverable, timeline, revision limit and monthly retainer cost is publicly cataloged. No guesswork, no shifting quotes.',
  },
  {
    title: 'You own your assets',
    desc: 'Upon payment completion, clients receive complete source code, raw vector master assets and full admin permissions.',
  },
  {
    title: 'Data-backed optimization',
    desc: 'Campaigns, landing pages and creative edits are driven by real analytics: CTR, CPL, ROAS and conversion funnels.',
  },
];

export const AboutPage: React.FC = () => {
  const settings = store.getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-24">
      <SectionHeading
        asPageTitle
        eyebrow="About IvoxStack"
        title={
          <>
            Digital solutions built for <span className="text-highlight">business growth</span>
          </>
        }
        description="IvoxStack is a technology and creative solutions company built to solve the modern growth problem: fragmented digital vendors, slow turnarounds and opaque pricing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Reveal className="h-full">
          <div className="h-full p-8 sm:p-10 rounded-[28px] glass space-y-5">
            <div className="icon-chip">
              <Target className="w-5 h-5 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-950">Our purpose</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We provide integrated web engineering, performance advertising, creative design and business automation
              under a single roof. We eliminate bloated retainers and deliver transparent, high-ROI systems tailored to
              measurable sales growth.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <div className="h-full p-8 sm:p-10 rounded-[28px] glass space-y-5">
            <div className="icon-chip">
              <Sparkles className="w-5 h-5 text-accent-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-950">One unified team</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Instead of managing separate designers, developers, media buyers and copywriters, businesses partner with
              IvoxStack for synchronized growth. When creative and technical strategy work in unison, acquisition costs
              drop and brand value compounds.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="space-y-12">
        <SectionHeading eyebrow="Principles" title="How we operate differently" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {principles.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 90} className="h-full">
              <div className="h-full p-8 rounded-3xl glass glass-hover">
                <span className="font-display text-4xl font-extrabold text-highlight">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-bold text-slate-950 mt-5">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="rounded-[28px] glass-strong p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-2xl font-bold text-slate-950 max-w-md">Based in New Delhi, serving businesses nationwide</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600" /> {settings.address}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600" /> {settings.business_hours}
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
