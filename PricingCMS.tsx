import React, { useState } from 'react';
import { DollarSign, Check, Edit2, AlertCircle } from 'lucide-react';
import { formatINR } from '../lib/utils';

interface PlanConfig {
  id: string;
  name: string;
  category: string;
  price: number;
  isMonthly: boolean;
  isActive: boolean;
}

export const PricingCMS: React.FC = () => {
  const [plans, setPlans] = useState<PlanConfig[]>([
    { id: 'p-1', name: 'One Page Starter Website', category: 'Websites', price: 2999, isMonthly: false, isActive: true },
    { id: 'p-2', name: 'Landing Page', category: 'Websites', price: 4999, isMonthly: false, isActive: true },
    { id: 'p-3', name: 'Portfolio Website', category: 'Websites', price: 6999, isMonthly: false, isActive: true },
    { id: 'p-4', name: 'Business Website', category: 'Websites', price: 8999, isMonthly: false, isActive: true },
    { id: 'p-5', name: 'Professional Business Website', category: 'Websites', price: 12999, isMonthly: false, isActive: true },
    { id: 'p-6', name: 'Starter Ads Management', category: 'Meta Ads', price: 4999, isMonthly: true, isActive: true },
    { id: 'p-7', name: 'Growth Ads Management', category: 'Meta Ads', price: 7999, isMonthly: true, isActive: true },
    { id: 'p-8', name: 'Starter Sprint', category: 'Lead Generation', price: 9999, isMonthly: true, isActive: true },
    { id: 'p-9', name: 'Growth Sprint', category: 'Lead Generation', price: 14999, isMonthly: true, isActive: true },
    { id: 'p-10', name: 'Business Starter Kit', category: 'Turnkey Bundles', price: 9999, isMonthly: false, isActive: true },
    { id: 'p-11', name: 'Complete Digital Launch', category: 'Turnkey Bundles', price: 24999, isMonthly: false, isActive: true },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  const handleStartEdit = (plan: PlanConfig) => {
    setEditingId(plan.id);
    setNewPrice(plan.price);
  };

  const handleSavePrice = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p));
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Pricing Catalog CMS</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Update prices dynamically. Any modifications immediately update public pricing views and calculators.
        </p>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
            <tr>
              <th className="p-4">Package / Plan Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Billing</th>
              <th className="p-4">Current Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-black text-slate-900 text-sm">{plan.name}</td>
                <td className="p-4 text-slate-600 font-semibold">{plan.category}</td>
                <td className="p-4 text-slate-500">{plan.isMonthly ? 'Monthly Retainer' : 'One-Time'}</td>
                <td className="p-4">
                  {editingId === plan.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-28 p-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-brand-500"
                      />
                      <button
                        onClick={() => handleSavePrice(plan.id)}
                        className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700"
                        title="Save"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                        title="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono font-bold text-brand-600 text-sm">
                      {formatINR(plan.price)}
                      {plan.isMonthly && <span className="text-[10px] text-slate-500 ml-1">/mo</span>}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {editingId !== plan.id && (
                    <button
                      onClick={() => handleStartEdit(plan)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-600 text-slate-700 hover:text-white transition-colors"
                      title="Edit Price"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
