import React, { useState, useMemo } from 'react';
import { ArrowRight, RotateCcw, Globe, Image, Clapperboard, Users, Share2, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { formatINR, buildWhatsAppUrl } from '../lib/utils';
import { store } from '../lib/store';
import { trackWhatsAppClick } from '../lib/analytics';

interface Option {
  label: string;
  price: number;
}

const websiteOptions: Option[] = [
  { label: 'No Website', price: 0 },
  { label: 'Starter Website', price: 3499 },
  { label: 'Business Website', price: 10499 },
  { label: 'Professional Website', price: 14999 },
  { label: 'E-Commerce Store', price: 28999 },
];

const leadOptions: Option[] = [
  { label: 'None', price: 0 },
  { label: 'Starter', price: 11999 },
  { label: 'Growth', price: 17499 },
  { label: 'Pro', price: 22999 },
];

const socialOptions: Option[] = [
  { label: 'None', price: 0 },
  { label: 'Starter', price: 7999 },
  { label: 'Growth', price: 13999 },
];

const maintenanceOptions: Option[] = [
  { label: 'None', price: 0 },
  { label: 'Basic', price: 1199 },
  { label: 'Standard', price: 2299 },
  { label: 'Premium', price: 3499 },
];

const RATE_PER_CREATIVE = 179;
const RATE_PER_REEL = 599;

// Default configuration (₹46,668 total)
const DEFAULTS = { website: 2, creatives: 20, reels: 8, lead: 2, social: 1, maint: 2 };

const Group: React.FC<{ icon: React.ReactNode; title: string; value: string; children: React.ReactNode }> = ({
  icon,
  title,
  value,
  children,
}) => (
  <div className="p-5 rounded-2xl bg-white/60 border border-white shadow-[0_0_0_1px_rgba(15,23,42,0.05)]">
    <div className="flex items-center justify-between gap-3 mb-4">
      <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-900">
        <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-brand-50 text-brand-600">{icon}</span>
        {title}
      </span>
      <span className="text-xs font-semibold text-slate-700 px-2.5 py-1 rounded-full bg-slate-900/5 whitespace-nowrap">
        {value}
      </span>
    </div>
    {children}
  </div>
);

const OptionPicker: React.FC<{ options: Option[]; selected: number; onSelect: (idx: number) => void; cols: string }> = ({
  options,
  selected,
  onSelect,
  cols,
}) => (
  <div className={`grid gap-2 ${cols}`}>
    {options.map((opt, idx) => {
      const active = selected === idx;
      return (
        <button
          key={opt.label}
          type="button"
          onClick={() => onSelect(idx)}
          aria-pressed={active}
          className={`px-3 py-2.5 rounded-xl text-left border transition-all duration-200 ${
            active
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-[0_0_0_3px_rgba(0,128,255,0.12)]'
              : 'bg-white/80 border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-white'
          }`}
        >
          <p className="text-xs font-semibold truncate">{opt.label}</p>
          <p className={`text-[11px] mt-0.5 ${active ? 'text-brand-600/80' : 'text-slate-500'}`}>{formatINR(opt.price)}</p>
        </button>
      );
    })}
  </div>
);

const Slider: React.FC<{ value: number; max: number; onChange: (v: number) => void; unit: string; ticks: number[] }> = ({
  value,
  max,
  onChange,
  unit,
  ticks,
}) => (
  <div>
    <input
      type="range"
      min="0"
      max={max}
      step="1"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={unit}
      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200"
      style={{ background: `linear-gradient(to right, #0080ff ${(value / max) * 100}%, #e2e8f0 ${(value / max) * 100}%)` }}
    />
    <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-2">
      {ticks.map((t) => (
        <span key={t}>
          {t} {unit}
        </span>
      ))}
    </div>
  </div>
);

export const CostCalculator: React.FC = () => {
  const settings = store.getSettings();

  const [selectedWebsiteIdx, setSelectedWebsiteIdx] = useState(DEFAULTS.website);
  const [creativesCount, setCreativesCount] = useState(DEFAULTS.creatives);
  const [reelsCount, setReelsCount] = useState(DEFAULTS.reels);
  const [selectedLeadIdx, setSelectedLeadIdx] = useState(DEFAULTS.lead);
  const [selectedSocialIdx, setSelectedSocialIdx] = useState(DEFAULTS.social);
  const [selectedMaintIdx, setSelectedMaintIdx] = useState(DEFAULTS.maint);

  const calculation = useMemo(() => {
    const websiteCost = websiteOptions[selectedWebsiteIdx].price;
    const creativesCost = creativesCount * RATE_PER_CREATIVE;
    const reelsCost = reelsCount * RATE_PER_REEL;
    const leadCost = leadOptions[selectedLeadIdx].price;
    const socialCost = socialOptions[selectedSocialIdx].price;
    const maintCost = maintenanceOptions[selectedMaintIdx].price;

    return {
      websiteCost,
      creativesCost,
      reelsCost,
      leadCost,
      socialCost,
      maintCost,
      total: websiteCost + creativesCost + reelsCost + leadCost + socialCost + maintCost,
    };
  }, [selectedWebsiteIdx, creativesCount, reelsCount, selectedLeadIdx, selectedSocialIdx, selectedMaintIdx]);

  const handleWhatsAppQuote = () => {
    trackWhatsAppClick('calculator_quote');

    const message = `Hello IvoxStack,
I would like to discuss the following plan:
Website: ${websiteOptions[selectedWebsiteIdx].label}
Creatives: ${creativesCount}
Reels: ${reelsCount}
Lead Package: ${leadOptions[selectedLeadIdx].label}
Social Management: ${socialOptions[selectedSocialIdx].label}
Website Maintenance: ${maintenanceOptions[selectedMaintIdx].label}
Estimated Cost: ${formatINR(calculation.total)}
Please contact me with further details.`;

    window.open(buildWhatsAppUrl(message, settings.whatsapp), '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setSelectedWebsiteIdx(DEFAULTS.website);
    setCreativesCount(DEFAULTS.creatives);
    setReelsCount(DEFAULTS.reels);
    setSelectedLeadIdx(DEFAULTS.lead);
    setSelectedSocialIdx(DEFAULTS.social);
    setSelectedMaintIdx(DEFAULTS.maint);
  };

  const breakdown = [
    { label: `Website · ${websiteOptions[selectedWebsiteIdx].label}`, value: calculation.websiteCost },
    { label: `${creativesCount} Creatives × ₹${RATE_PER_CREATIVE}`, value: calculation.creativesCost },
    { label: `${reelsCount} Reels × ₹${RATE_PER_REEL}`, value: calculation.reelsCost },
    { label: `Lead Gen · ${leadOptions[selectedLeadIdx].label}`, value: calculation.leadCost },
    { label: `Social Mgmt · ${socialOptions[selectedSocialIdx].label}`, value: calculation.socialCost },
    { label: `Maintenance · ${maintenanceOptions[selectedMaintIdx].label}`, value: calculation.maintCost },
  ];

  return (
    <div className="glass rounded-[28px] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selectors */}
        <div className="lg:col-span-7 space-y-4">
          <Group icon={<Globe className="w-4 h-4" />} title="Website Design & Development" value={formatINR(calculation.websiteCost)}>
            <OptionPicker options={websiteOptions} selected={selectedWebsiteIdx} onSelect={setSelectedWebsiteIdx} cols="grid-cols-2 sm:grid-cols-3" />
          </Group>

          <Group
            icon={<Image className="w-4 h-4" />}
            title={`Social Media Creatives (₹${RATE_PER_CREATIVE}/post)`}
            value={`${creativesCount} · ${formatINR(calculation.creativesCost)}`}
          >
            <Slider value={creativesCount} max={60} onChange={setCreativesCount} unit="posts" ticks={[0, 20, 40, 60]} />
          </Group>

          <Group
            icon={<Clapperboard className="w-4 h-4" />}
            title={`Video Editing & Reels (₹${RATE_PER_REEL}/reel)`}
            value={`${reelsCount} · ${formatINR(calculation.reelsCost)}`}
          >
            <Slider value={reelsCount} max={30} onChange={setReelsCount} unit="reels" ticks={[0, 10, 20, 30]} />
          </Group>

          <Group icon={<Users className="w-4 h-4" />} title="Lead Generation Sprint" value={formatINR(calculation.leadCost)}>
            <OptionPicker options={leadOptions} selected={selectedLeadIdx} onSelect={setSelectedLeadIdx} cols="grid-cols-2 sm:grid-cols-4" />
          </Group>

          <Group icon={<Share2 className="w-4 h-4" />} title="Social Media Management (Monthly)" value={formatINR(calculation.socialCost)}>
            <OptionPicker options={socialOptions} selected={selectedSocialIdx} onSelect={setSelectedSocialIdx} cols="grid-cols-3" />
          </Group>

          <Group icon={<ShieldCheck className="w-4 h-4" />} title="Website Maintenance & Support" value={formatINR(calculation.maintCost)}>
            <OptionPicker options={maintenanceOptions} selected={selectedMaintIdx} onSelect={setSelectedMaintIdx} cols="grid-cols-2 sm:grid-cols-4" />
          </Group>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 rounded-3xl p-6 sm:p-7 glass-strong">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
              <span className="text-sm font-semibold text-slate-900">Your plan</span>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <ul className="divide-y divide-slate-200/60 text-sm">
              {breakdown.map((row) => (
                <li key={row.label} className="flex justify-between items-center gap-4 py-3">
                  <span className="text-slate-600">{row.label}</span>
                  <span className={`font-semibold tabular-nums ${row.value ? 'text-slate-900' : 'text-slate-400'}`}>
                    {formatINR(row.value)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-2 p-5 rounded-2xl bg-gradient-to-br from-brand-50 via-white to-accent-50 border border-white shadow-[0_0_0_1px_rgba(15,23,42,0.05)]">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estimated total</span>
              <p className="font-display text-4xl font-extrabold text-slate-950 tracking-tight mt-1 tabular-nums">
                {formatINR(calculation.total)}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Prices in INR. Can be structured as a one-time deployment or a monthly growth retainer.
              </p>
            </div>

            <button onClick={handleWhatsAppQuote} className="btn btn-whatsapp w-full mt-5 !py-3.5 group">
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Get this plan on WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2.5">
              Opens WhatsApp with your breakdown pre-filled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
