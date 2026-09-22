import React from 'react';
import { CostCalculator } from '../components/CostCalculator';

export const CalculatorPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
          Transparent Cost Calculator
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
          Interactive Project Cost Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Configure your digital requirements dynamically. See real-time breakdown calculations and export your customized growth plan directly to WhatsApp.
        </p>
      </div>

      <CostCalculator />
    </div>
  );
};
