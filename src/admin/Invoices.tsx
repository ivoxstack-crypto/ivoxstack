import React from 'react';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';
import { formatINR } from '../lib/utils';

export const Invoices: React.FC = () => {
  useStoreVersion();
  const invoices = store.getInvoices();

  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Invoices & Payments</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Audit billing cycles, payment statuses, and issued tax invoices.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl card-theme-emerald card-interactive">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Total Collected Revenue</span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-700 mt-1">{formatINR(totalCollected)}</div>
          <span className="text-[11px] text-emerald-900/70 font-medium mt-1 block">Settled via UPI, NEFT & Razorpay</span>
        </div>
        <div className="p-6 rounded-3xl card-theme-amber card-interactive">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Pending Receivables</span>
          <div className="text-3xl sm:text-4xl font-black text-amber-700 mt-1">{formatINR(pendingAmount)}</div>
          <span className="text-[11px] text-amber-900/70 font-medium mt-1 block">Awaiting client payment clearance</span>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">No invoices recorded yet.</td>
                </tr>
              )}
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-brand-600">{inv.invoice_number}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{inv.client_name}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{inv.notes}</div>
                  </td>
                  <td className="p-4 font-black text-slate-900">{formatINR(inv.amount)}</td>
                  <td className="p-4 text-slate-500">{inv.issue_date}</td>
                  <td className="p-4 text-slate-500">{inv.due_date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-mono font-medium">{inv.payment_method || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
