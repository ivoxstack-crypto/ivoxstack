import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Plus, 
  Phone, 
  Check, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { Lead, LeadStatus } from '../types';
import { buildWhatsAppUrl } from '../lib/utils';

export const LeadsCRM: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(store.getLeads());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('table');

  const statuses: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'FOLLOW-UP', 'WON', 'LOST'];

  const filteredLeads = leads.filter(l => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      l.lead_id.toLowerCase().includes(q) ||
      l.full_name.toLowerCase().includes(q) ||
      (l.business_name || '').toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    store.updateLeadStatus(leadId, newStatus, 'ADMIN');
    setLeads([...store.getLeads()]);
  };

  const handleConvertToClient = (leadId: string) => {
    const client = store.convertLeadToClient(leadId, 'SALES');
    if (client) {
      alert(`Lead converted into Client successfully: ${client.name}`);
      setLeads([...store.getLeads()]);
    }
  };

  const handleExportCSV = () => {
    // Generate CSV string
    const headers = ['Lead ID', 'Name', 'Business', 'Phone', 'Email', 'Service', 'Budget', 'Timeline', 'Status', 'UTM Source', 'Created At'];
    const rows = filteredLeads.map(l => [
      `"${l.lead_id}"`,
      `"${l.full_name.replace(/"/g, '""')}"`,
      `"${(l.business_name || '').replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.service.replace(/"/g, '""')}"`,
      `"${l.budget || ''}"`,
      `"${l.timeline || ''}"`,
      `"${l.status}"`,
      `"${l.utm_source || ''}"`,
      `"${l.created_at}"`,
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ivoxstack_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusColors: Record<string, string> = {
    NEW: 'bg-accent-500/20 text-accent-400 border-accent-500/30',
    CONTACTED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    QUALIFIED: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'FOLLOW-UP': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    WON: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    LOST: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Leads & Sales CRM</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Capture, qualify, nurture, and transition customer inquiries into paying retainer clients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs font-bold transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Filtered CSV</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, lead ID..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              statusFilter === 'ALL' ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({leads.length})
          </button>
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                statusFilter === s ? 'bg-brand-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s} ({leads.filter(l => l.status === s).length})
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table View */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Lead ID</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Service</th>
                <th className="p-4">Budget & Timeline</th>
                <th className="p-4">Status & Stage</th>
                <th className="p-4">Source</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => {
                const statusColors: Record<string, string> = {
                  NEW: 'bg-orange-50 text-orange-700 border-orange-200',
                  CONTACTED: 'bg-blue-50 text-blue-700 border-blue-200',
                  QUALIFIED: 'bg-purple-50 text-purple-700 border-purple-200',
                  'FOLLOW-UP': 'bg-amber-50 text-amber-700 border-amber-200',
                  WON: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  LOST: 'bg-slate-100 text-slate-600 border-slate-200',
                };

                return (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <Link
                        to={`/operationsbyivox/leads/${lead.id}`}
                        className="font-mono font-bold text-brand-600 hover:underline"
                      >
                        {lead.lead_id}
                      </Link>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{lead.full_name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{lead.business_name || 'Individual'}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{lead.phone} • {lead.email}</div>
                    </td>

                    <td className="p-4 text-slate-700">
                      <div className="font-semibold text-slate-900">{lead.service}</div>
                      {lead.project_details && (
                        <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                          {lead.project_details}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-slate-900">{lead.budget || 'Not specified'}</span>
                      <span className="block text-[11px] text-slate-500">{lead.timeline || 'Flexible'}</span>
                    </td>

                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border bg-white focus:outline-none cursor-pointer ${statusColors[lead.status] || ''}`}
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                    <td className="p-4 text-[11px] text-slate-500">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 font-medium">
                        {lead.utm_source || 'direct'}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {lead.status !== 'WON' && (
                          <button
                            onClick={() => handleConvertToClient(lead.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200"
                            title="Convert to Client"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <a
                          href={buildWhatsAppUrl(`Hello ${lead.full_name}, thank you for inquiring about ${lead.service} with IvoxStack.`, lead.phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200"
                          title="Chat on WhatsApp"
                          aria-label="Chat on WhatsApp"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] hover:fill-white" />
                        </a>
                        <Link
                          to={`/operationsbyivox/leads/${lead.id}`}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-600 text-slate-700 hover:text-white transition-colors border border-slate-200"
                          title="View Full Profile"
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
