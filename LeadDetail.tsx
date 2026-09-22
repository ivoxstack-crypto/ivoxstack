import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Clock, 
  UserCheck, 
  Send, 
  FileText, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { store } from '../lib/store';
import { LeadStatus } from '../types';
import { buildWhatsAppUrl } from '../lib/utils';

export const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lead = store.getLeadById(id || '');

  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState(lead ? store.getNotesForLead(lead.id) : []);
  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(lead?.status || 'NEW');

  if (!lead) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Lead Record Not Found</h2>
        <Link to="/operationsbyivox/leads" className="text-xs text-brand-400 hover:underline">
          Back to Leads Pipeline
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus: LeadStatus) => {
    setCurrentStatus(newStatus);
    store.updateLeadStatus(lead.id, newStatus, 'ADMIN');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    store.addLeadNote(lead.id, noteText.trim(), 'Sales Agent');
    setNotes(store.getNotesForLead(lead.id));
    setNoteText('');
  };

  const handleConvertClient = () => {
    const client = store.convertLeadToClient(lead.id, 'SALES');
    if (client) {
      alert(`Lead ${lead.lead_id} converted to Client: ${client.name}`);
      navigate('/operationsbyivox/clients');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Back & Actions Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/operationsbyivox/leads"
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Leads Pipeline</span>
        </Link>

        <div className="flex items-center gap-2">
          {lead.status !== 'WON' && (
            <button
              onClick={handleConvertClient}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Convert to Client</span>
            </button>
          )}

          <a
            href={buildWhatsAppUrl(`Hello ${lead.full_name}, this is IvoxStack regarding your inquiry ${lead.lead_id}.`, lead.phone)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all group"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] group-hover:fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Lead Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-brand-600">{lead.lead_id}</span>
              <span className="text-xs text-slate-500">• {new Date(lead.created_at).toLocaleString('en-IN')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{lead.full_name}</h1>
            <p className="text-xs text-slate-500 font-medium">{lead.business_name || 'Individual Business Inquiry'}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600">Stage:</span>
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-500"
            >
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="FOLLOW-UP">FOLLOW-UP</option>
              <option value="WON">WON</option>
              <option value="LOST">LOST</option>
            </select>
          </div>
        </div>

        {/* Lead Details Grid with Distinct Logo Theme Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl card-theme-blue">
            <span className="text-blue-800 block font-bold text-[11px] uppercase tracking-wider">Service Requested</span>
            <span className="text-slate-900 font-black text-sm mt-0.5 block">{lead.service}</span>
          </div>

          <div className="p-4 rounded-2xl card-theme-orange">
            <span className="text-orange-800 block font-bold text-[11px] uppercase tracking-wider">Budget Scope</span>
            <span className="text-slate-900 font-black text-sm mt-0.5 block">{lead.budget || 'Open'}</span>
          </div>

          <div className="p-4 rounded-2xl card-theme-purple">
            <span className="text-purple-800 block font-bold text-[11px] uppercase tracking-wider">Timeline</span>
            <span className="text-slate-900 font-black text-sm mt-0.5 block">{lead.timeline || 'Flexible'}</span>
          </div>

          <div className="p-4 rounded-2xl card-theme-emerald">
            <span className="text-emerald-800 block font-bold text-[11px] uppercase tracking-wider">Direct Phone</span>
            <span className="text-emerald-700 font-black text-sm mt-0.5 block">{lead.phone}</span>
          </div>
        </div>

        {/* Project Details Description */}
        {lead.project_details && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              Customer Message / Requirements
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">{lead.project_details}</p>
          </div>
        )}

        {/* Marketing Attribution / UTM */}
        <div className="pt-4 border-t border-slate-100 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Marketing Attribution Telemetry
          </span>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
              Source: <strong className="text-slate-900">{lead.utm_source || 'direct'}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
              Medium: <strong className="text-slate-900">{lead.utm_medium || 'none'}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
              Campaign: <strong className="text-slate-900">{lead.utm_campaign || 'general'}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
              Page: <strong className="text-slate-900">{lead.landing_page || '/'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Internal Sales Notes Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-black text-slate-900">Internal Sales & Follow-Up Notes</h2>

        <form onSubmit={handleAddNote} className="space-y-3">
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add internal observations, client call notes, or follow-up milestones..."
            className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-brand-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Record Internal Note</span>
          </button>
        </form>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          {notes.length === 0 ? (
            <p className="text-xs text-slate-400">No notes recorded yet for this lead.</p>
          ) : (
            notes.map((n) => (
              <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-bold text-slate-900">{n.user_name}</span>
                  <span>{new Date(n.created_at).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-slate-700 font-medium">{n.note}</p>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
