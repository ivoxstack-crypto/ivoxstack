import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Phone, 
  DollarSign, 
  Briefcase, 
  TrendingUp,
  ArrowRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { formatINR, buildWhatsAppUrl } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const leads = store.getLeads();
  const clients = store.getClients();
  const projects = store.getProjects();
  const invoices = store.getInvoices();
  const settings = store.getSettings();

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const qualifiedLeads = leads.filter(l => l.status === 'QUALIFIED').length;
  const wonLeads = leads.filter(l => l.status === 'WON').length;
  const activeProjects = projects.filter(p => p.status === 'Active' || p.status === 'In Progress').length;
  const pendingPayments = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';

  const kpis = [
    { title: 'Total Leads', val: totalLeads, sub: `${newLeads} pending action`, icon: <Users className="w-5 h-5 text-blue-600" />, theme: 'card-theme-blue' },
    { title: 'New Inquiries', val: newLeads, sub: 'Needs outreach', icon: <Sparkles className="w-5 h-5 text-orange-600" />, theme: 'card-theme-orange' },
    { title: 'Qualified Leads', val: qualifiedLeads, sub: 'In sales pipeline', icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />, theme: 'card-theme-indigo' },
    { title: 'Won Deals', val: wonLeads, sub: `Conv. Rate: ${conversionRate}%`, icon: <Trophy className="w-5 h-5 text-emerald-600" />, theme: 'card-theme-emerald' },
    { title: 'WhatsApp Clicks', val: 148, sub: 'Direct chats initiated', icon: <WhatsAppIcon className="w-5 h-5 fill-emerald-600" />, theme: 'card-theme-cyan' },
    { title: 'Call Clicks', val: 62, sub: 'Direct phone inquiries', icon: <Phone className="w-5 h-5 text-sky-600" />, theme: 'card-theme-blue' },
    { title: 'Pending Payments', val: formatINR(pendingPayments), sub: 'From active invoices', icon: <DollarSign className="w-5 h-5 text-amber-600" />, theme: 'card-theme-amber' },
    { title: 'Active Projects', val: activeProjects, sub: `${projects.length} total projects`, icon: <Briefcase className="w-5 h-5 text-purple-600" />, theme: 'card-theme-purple' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Operations Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Real-time business performance, pipeline flow, and client telemetry.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/operationsbyivox/leads"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md hover:scale-[1.02]"
          >
            Manage CRM Pipeline
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid with Distinct Logo Light Colors and Zoom */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((k, idx) => (
          <div key={idx} className={`p-5 rounded-3xl card-interactive flex flex-col justify-between ${k.theme}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-600">{k.title}</span>
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                {k.icon}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{k.val}</div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads Pipeline */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Recent Customer Inquiries</h2>
            <p className="text-xs text-slate-500">Captured through public site forms, cost calculators, and digital audits.</p>
          </div>
          <Link
            to="/operationsbyivox/leads"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Lead ID</th>
                <th className="p-3">Client / Business</th>
                <th className="p-3">Service</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.slice(0, 5).map((lead) => {
                const statusColors: Record<string, string> = {
                  NEW: 'bg-orange-50 text-orange-700 border-orange-200',
                  CONTACTED: 'bg-blue-50 text-blue-700 border-blue-200',
                  QUALIFIED: 'bg-purple-50 text-purple-700 border-purple-200',
                  'FOLLOW-UP': 'bg-amber-50 text-amber-700 border-amber-200',
                  WON: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  LOST: 'bg-slate-100 text-slate-600 border-slate-200',
                };

                return (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-brand-600">
                      {lead.lead_id}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{lead.full_name}</div>
                      <div className="text-[11px] text-slate-500">{lead.business_name || lead.phone}</div>
                    </td>
                    <td className="p-3 text-slate-700 font-medium">
                      {lead.service}
                    </td>
                    <td className="p-3 text-slate-700 font-medium">
                      {lead.budget || '—'}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[lead.status] || ''}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={buildWhatsAppUrl(`Hello ${lead.full_name}, this is regarding your inquiry with IvoxStack.`, lead.phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200"
                          title="WhatsApp Client"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                        </a>
                        <Link
                          to={`/operationsbyivox/leads/${lead.id}`}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-600 text-slate-700 hover:text-white transition-colors border border-slate-200"
                          title="View Lead Details"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
