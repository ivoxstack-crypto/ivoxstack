import React from 'react';
import { BarChart3, TrendingUp, PieChart, Users, DollarSign, Award } from 'lucide-react';
import { store } from '../lib/store';
import { formatINR } from '../lib/utils';

export const Reports: React.FC = () => {
  const leads = store.getLeads();
  const invoices = store.getInvoices();

  const totalWonRevenue = invoices.reduce((sum, i) => sum + i.amount, 0);
  const wonCount = leads.filter(l => l.status === 'WON').length;
  const avgDealSize = wonCount > 0 ? Math.round(totalWonRevenue / wonCount) : 0;

  // Group by service
  const serviceCounts: Record<string, number> = {};
  leads.forEach(l => {
    serviceCounts[l.service] = (serviceCounts[l.service] || 0) + 1;
  });

  const sortedServices = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Reports & Business Intelligence</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Automated calculations of deal economics, lead acquisition channels, and top-converting solution categories.
        </p>
      </div>

      {/* Analytics KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl card-theme-emerald card-interactive">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Total Won Deal Revenue</span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-700 mt-1">{formatINR(totalWonRevenue)}</div>
          <span className="text-[11px] text-emerald-900/70 font-medium mt-1 block">From settled and active client accounts</span>
        </div>

        <div className="p-6 rounded-3xl card-theme-blue card-interactive">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Average Deal Size (Won Revenue ÷ Deals)</span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">{formatINR(avgDealSize)}</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Benchmark target: ₹20,000+</span>
        </div>

        <div className="p-6 rounded-3xl card-theme-orange card-interactive">
          <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">Lead Conversion Rate</span>
          <div className="text-3xl sm:text-4xl font-black text-accent-600 mt-1">
            {leads.length > 0 ? ((wonCount / leads.length) * 100).toFixed(1) : 0}%
          </div>
          <span className="text-[11px] text-orange-900/70 font-medium mt-1 block">{wonCount} won out of {leads.length} leads</span>
        </div>
      </div>

      {/* Top Services Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <Award className="w-5 h-5 text-accent-500" />
          <h2 className="text-lg font-black text-slate-900">Top Services by Customer Inquiry Volume</h2>
        </div>

        <div className="space-y-4">
          {sortedServices.map(([srvName, count], idx) => {
            const percentage = Math.round((count / leads.length) * 100) || 0;
            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="font-bold text-slate-900">{srvName}</span>
                  <span className="text-slate-500">{count} inquiries ({percentage}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#f95700]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
