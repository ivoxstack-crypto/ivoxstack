import React from 'react';
import { CostCalculator } from '../components/CostCalculator';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

export const CalculatorPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-12">
    <SectionHeading
      asPageTitle
      eyebrow="Transparent Cost Calculator"
      title="Project cost calculator"
      description="Configure your requirements, see a live breakdown and send your customized growth plan directly to WhatsApp."
    />
    <Reveal>
      <CostCalculator />
    </Reveal>
  </div>
);
