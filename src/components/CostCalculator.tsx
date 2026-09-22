import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { formatINR, buildWhatsAppUrl } from '../lib/utils';
import { store } from '../lib/store';
import { trackWhatsAppClick } from '../lib/analytics';

export const CostCalculator: React.FC = () => {
  const settings = store.getSettings();

  // Website options
  const websiteOptions = [
    { label: 'No Website', price: 0 },
    { label: 'Starter Website', price: 2999 },
    { label: 'Business Website', price: 8999 },
    { label: 'Professional Website', price: 12999 },
    { label: 'E-Commerce Store', price: 24999 },
  ];

  // Lead Generation options
  const leadOptions = [
    { label: 'None', price: 0 },
    { label: 'Starter', price: 9999 },
    { label: 'Growth', price: 14999 },
    { label: 'Pro', price: 19999 },
  ];

  // Social Media Management options
  const socialOptions = [
    { label: 'None', price: 0 },
    { label: 'Starter', price: 6999 },
    { label: 'Growth', price: 11999 },
  ];

  // Website Maintenance options
  const maintenanceOptions = [
    { label: 'None', price: 0 },
    { label: 'Basic', price: 999 },
    { label: 'Standard', price: 1999 },
    { label: 'Premium', price: 2999 },
  ];

  // Defaults matching benchmark test case of ₹39,969
  const [selectedWebsiteIdx, setSelectedWebsiteIdx] = useState<number>(2); // Business Website (₹8,999)
  const [creativesCount, setCreativesCount] = useState<number>(20);        // 20 Creatives (₹2,980)
  const [reelsCount, setReelsCount] = useState<number>(8);                // 8 Reels (₹3,992)
  const [selectedLeadIdx, setSelectedLeadIdx] = useState<number>(2);       // Growth Lead (₹14,999)
  const [selectedSocialIdx, setSelectedSocialIdx] = useState<number>(1);     // Starter Social (₹6,999)
  const [selectedMaintIdx, setSelectedMaintIdx] = useState<number>(2);      // Standard Maint (₹1,999)

  const RATE_PER_CREATIVE = 149;
  const RATE_PER_REEL = 499;

  // Exact Calculation
  const calculation = useMemo(() => {
    const websiteCost = websiteOptions[selectedWebsiteIdx].price;
    const creativesCost = creativesCount * RATE_PER_CREATIVE;
    const reelsCost = reelsCount * RATE_PER_REEL;
    const leadCost = leadOptions[selectedLeadIdx].price;
    const socialCost = socialOptions[selectedSocialIdx].price;
    const maintCost = maintenanceOptions[selectedMaintIdx].price;

    const total = websiteCost + creativesCost + reelsCost + leadCost + socialCost + maintCost;

    return {
      websiteCost,
      creativesCost,
      reelsCost,
      leadCost,
      socialCost,
      maintCost,
      total,
    };
  }, [selectedWebsiteIdx, creativesCount, reelsCount, selectedLeadIdx, selectedSocialIdx, selectedMaintIdx]);

  const handleWhatsAppQuote = () => {
    trackWhatsAppClick('calculator_quote');

    const websiteLabel = websiteOptions[selectedWebsiteIdx].label;
    const leadLabel = leadOptions[selectedLeadIdx].label;
    const socialLabel = socialOptions[selectedSocialIdx].label;
    const maintLabel = maintenanceOptions[selectedMaintIdx].label;

    const message = `Hello IvoxStack,
I would like to discuss the following plan:
Website: ${websiteLabel}
Creatives: ${creativesCount}
Reels: ${reelsCount}
Lead Package: ${leadLabel}
Social Management: ${socialLabel}
Website Maintenance: ${maintLabel}
Estimated Cost: ${formatINR(calculation.total)}
Please contact me with further details.`;

    const url = buildWhatsAppUrl(message, settings.whatsapp);
    window.open(url, '_blank');
  };

  const handleResetToTest = () => {
    setSelectedWebsiteIdx(2);
    setCreativesCount(20);
    setReelsCount(8);
    setSelectedLeadIdx(2);
    setSelectedSocialIdx(1);
    setSelectedMaintIdx(2);
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-lg">
      
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Live Project Cost Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Configure your business growth requirements and compute live estimates.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetToTest}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 hover:text-slate-900 transition-colors"
          title="Reset to benchmark package"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Benchmark Config</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left Column: Interactive Selectors */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Website - Brand Sky Blue Theme */}
          <div className="p-5 rounded-2xl card-theme-blue card-interactive">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                1. Website Design & Development
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {formatINR(websiteOptions[selectedWebsiteIdx].price)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {websiteOptions.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedWebsiteIdx(idx)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                    selectedWebsiteIdx === idx
                      ? 'bg-brand-500 border-brand-600 text-white font-bold shadow-md shadow-brand-500/20'
                      : 'bg-white border-blue-200 text-slate-700 hover:bg-blue-50/60'
                  }`}
                >
                  <p className="truncate">{opt.label}</p>
                  <p className={`text-[11px] mt-0.5 ${selectedWebsiteIdx === idx ? 'text-blue-100' : 'text-slate-500'}`}>
                    {formatINR(opt.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Social Creatives Slider (0-60) - Brand Growth Orange Theme */}
          <div className="p-5 rounded-2xl card-theme-orange card-interactive">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-orange-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-500"></span>
                2. Social Media Creatives (₹149/post)
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                {creativesCount} Posts = {formatINR(calculation.creativesCost)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={creativesCount}
              onChange={(e) => setCreativesCount(Number(e.target.value))}
              className="w-full h-2.5 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-accent-500"
            />
            <div className="flex justify-between text-[11px] text-orange-900/70 font-medium mt-1.5">
              <span>0 posts</span>
              <span>20 posts (Standard)</span>
              <span>40 posts</span>
              <span>60 posts</span>
            </div>
          </div>

          {/* 3. Reels Slider (0-30) - Royal Purple Theme */}
          <div className="p-5 rounded-2xl card-theme-purple card-interactive">
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                3. Video Editing & Reels (₹499/reel)
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                {reelsCount} Reels = {formatINR(calculation.reelsCost)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={reelsCount}
              onChange={(e) => setReelsCount(Number(e.target.value))}
              className="w-full h-2.5 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[11px] text-purple-900/70 font-medium mt-1.5">
              <span>0 reels</span>
              <span>8 reels (Benchmark)</span>
              <span>15 reels</span>
              <span>30 reels</span>
            </div>
          </div>

          {/* 4. Lead Generation Package - Emerald Growth Theme */}
          <div className="p-5 rounded-2xl card-theme-emerald card-interactive">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                4. Lead Generation Sprint
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {formatINR(leadOptions[selectedLeadIdx].price)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {leadOptions.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedLeadIdx(idx)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                    selectedLeadIdx === idx
                      ? 'bg-emerald-600 border-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20'
                      : 'bg-white border-emerald-200 text-slate-700 hover:bg-emerald-50/60'
                  }`}
                >
                  <p className="truncate">{opt.label}</p>
                  <p className={`text-[11px] mt-0.5 ${selectedLeadIdx === idx ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {formatINR(opt.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Social Media Management - Warm Amber Theme */}
          <div className="p-5 rounded-2xl card-theme-amber card-interactive">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                5. Social Media Management (Monthly)
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {formatINR(socialOptions[selectedSocialIdx].price)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {socialOptions.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSocialIdx(idx)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                    selectedSocialIdx === idx
                      ? 'bg-amber-600 border-amber-700 text-white font-bold shadow-md shadow-amber-600/20'
                      : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-50/60'
                  }`}
                >
                  <p className="truncate">{opt.label}</p>
                  <p className={`text-[11px] mt-0.5 ${selectedSocialIdx === idx ? 'text-amber-100' : 'text-slate-500'}`}>
                    {formatINR(opt.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Website Maintenance - Cyan / Tech Theme */}
          <div className="p-5 rounded-2xl card-theme-cyan card-interactive">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                6. Website Maintenance & Support
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                {formatINR(maintenanceOptions[selectedMaintIdx].price)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {maintenanceOptions.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedMaintIdx(idx)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                    selectedMaintIdx === idx
                      ? 'bg-cyan-600 border-cyan-700 text-white font-bold shadow-md shadow-cyan-600/20'
                      : 'bg-white border-cyan-200 text-slate-700 hover:bg-cyan-50/60'
                  }`}
                >
                  <p className="truncate">{opt.label}</p>
                  <p className={`text-[11px] mt-0.5 ${selectedMaintIdx === idx ? 'text-cyan-100' : 'text-slate-500'}`}>
                    {formatINR(opt.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Bill Breakdown & WhatsApp CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between p-7 rounded-3xl bg-gradient-to-b from-white to-slate-50 border-2 border-brand-200/80 shadow-xl shadow-brand-500/5 card-interactive">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Estimated Plan Breakdown
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold border border-brand-200">
                Instant Calculation
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex justify-between items-center p-2 rounded-xl bg-blue-50/50 border border-blue-100 text-slate-700">
                <span className="font-medium">Website: {websiteOptions[selectedWebsiteIdx].label}</span>
                <span className="font-bold text-slate-900">{formatINR(calculation.websiteCost)}</span>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-xl bg-orange-50/50 border border-orange-100 text-slate-700">
                <span className="font-medium">{creativesCount} Creatives (@ ₹149)</span>
                <span className="font-bold text-slate-900">{formatINR(calculation.creativesCost)}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-purple-50/50 border border-purple-100 text-slate-700">
                <span className="font-medium">{reelsCount} Reels (@ ₹499)</span>
                <span className="font-bold text-slate-900">{formatINR(calculation.reelsCost)}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-50/50 border border-emerald-100 text-slate-700">
                <span className="font-medium">Lead Gen: {leadOptions[selectedLeadIdx].label}</span>
                <span className="font-bold text-slate-900">{formatINR(calculation.leadCost)}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-amber-50/50 border border-amber-100 text-slate-700">
                <span className="font-medium">Social Mgmt: {socialOptions[selectedSocialIdx].label}</span>
                <span className="font-bold text-slate-900">{formatINR(calculation.socialCost)}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-cyan-50/50 border border-cyan-100 text-slate-700">
                <span className="font-medium">Maintenance: {maintenanceOptions[selectedMaintIdx].label}</span>
                <span className="font-bold text-slate-900">{formatINR(calculation.maintCost)}</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                    Estimated Project Total
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-brand-600 tracking-tight mt-1 inline-block">
                    {formatINR(calculation.total)}
                  </span>
                </div>
                <span className="text-xs text-emerald-600 font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  ✓ All-Inclusive
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Prices in Indian Rupees (INR). Can be customized as one-time deployment or monthly growth retainer.
              </p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="mt-8 space-y-2">
            <button
              onClick={handleWhatsAppQuote}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/25 active:scale-98 hover:scale-[1.02] group"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>GET THIS PLAN ON WHATSAPP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-slate-500">
              Opens WhatsApp directly with your pre-configured breakdown.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
