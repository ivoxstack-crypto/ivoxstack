import React, { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { store } from '../lib/store';
import { useStoreVersion } from '../lib/useStore';
import { formatINR } from '../lib/utils';
import { Invoice } from '../types';

const inputClass =
  'w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-brand-500';

const statusStyles: Record<Invoice['status'], string> = {
  Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Overdue: 'bg-red-50 text-red-700 border-red-200',
  Cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const Invoices: React.FC = () => {
  useStoreVersion();
  const invoices = store.getInvoices();
  const clients = store.getClients();

  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clientId, setClientId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const totalCollected = invoices.filter((i) => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = invoices.filter((i) => i.status === 'Pending' || i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === (clientId || clients[0]?.id));
    if (!client) return;
    setSaving(true);
    const res = await store.addInvoice({
      client_id: client.id,
      client_name: client.company || client.name,
      amount: Number(amount),
      tax_amount: Number(tax),
      due_date: dueDate,
      notes,
    });
    setSaving(false);
    if (!res.success) {
      alert(`Could not create invoice: ${res.message}`);
      return;
    }
    setShowAdd(false);
    setAmount(0);
    setTax(0);
    setDueDate('');
    setNotes('');
  };

  const markPaid = async (inv: Invoice) => {
    const method = prompt('Payment method (UPI, NEFT, Razorpay, Cash, Other)', 'UPI');
    if (method === null) return;
    const res = await store.updateInvoiceStatus(inv.id, 'Paid', method.trim() || 'Other');
    if (!res.success) alert(`Could not update invoice: ${res.message}`);
  };

  const setStatus = async (inv: Invoice, status: Invoice['status']) => {
    const res = await store.updateInvoiceStatus(inv.id, status, status === 'Paid' ? inv.payment_method : undefined);
    if (!res.success) alert(`Could not update invoice: ${res.message}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Invoices & Payments</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Raise invoices for clients and track what has been paid.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          disabled={clients.length === 0}
          title={clients.length === 0 ? 'Convert a lead into a client first' : undefined}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none"
        >
          <Plus className="w-4 h-4" />
          <span>New Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl card-theme-emerald">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Collected</span>
          <div className="text-3xl sm:text-4xl font-black text-emerald-700 mt-1">{formatINR(totalCollected)}</div>
          <span className="text-[11px] text-emerald-900/70 font-medium mt-1 block">Invoices marked as paid</span>
        </div>
        <div className="p-6 rounded-3xl card-theme-amber">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Outstanding</span>
          <div className="text-3xl sm:text-4xl font-black text-amber-700 mt-1">{formatINR(pendingAmount)}</div>
          <span className="text-[11px] text-amber-900/70 font-medium mt-1 block">Pending and overdue invoices</span>
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
                <th className="p-4">Issued</th>
                <th className="p-4">Due</th>
                <th className="p-4">Status</th>
                <th className="p-4">Method</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No invoices yet. {clients.length === 0 ? 'Convert a lead into a client, then raise an invoice here.' : 'Click "New Invoice" to raise one.'}
                  </td>
                </tr>
              )}
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-brand-600 whitespace-nowrap">{inv.invoice_number}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{inv.client_name}</div>
                    {inv.notes && <div className="text-[11px] text-slate-500 font-medium">{inv.notes}</div>}
                  </td>
                  <td className="p-4 font-black text-slate-900 whitespace-nowrap">
                    {formatINR(inv.amount)}
                    {!!inv.tax_amount && <span className="block text-[10px] font-medium text-slate-500">+ {formatINR(inv.tax_amount)} tax</span>}
                  </td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">{inv.issue_date}</td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">{inv.due_date || '—'}</td>
                  <td className="p-4">
                    <select
                      value={inv.status}
                      onChange={(e) => setStatus(inv, e.target.value as Invoice['status'])}
                      aria-label={`Status of ${inv.invoice_number}`}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border focus:outline-none ${statusStyles[inv.status]}`}
                    >
                      {(Object.keys(statusStyles) as Invoice['status'][]).map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{inv.payment_method || '—'}</td>
                  <td className="p-4 text-right">
                    {inv.status !== 'Paid' && inv.status !== 'Cancelled' && (
                      <button
                        onClick={() => markPaid(inv)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 font-bold transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">New Invoice</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Client</label>
                <select value={clientId} onChange={(e) => setClientId(e.target.value)} className={inputClass}>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}{c.company && c.company !== c.name ? ` (${c.company})` : ''}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Amount (INR) *</label>
                  <input type="number" min={1} required value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} className={inputClass} />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tax (INR)</label>
                  <input type="number" min={0} value={tax || ''} onChange={(e) => setTax(Number(e.target.value))} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Due Date *</label>
                <input type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Website development — 50% advance" className={inputClass} />
              </div>
              <div className="pt-3 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold disabled:opacity-50">
                  {saving ? 'Creating...' : 'Create Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
