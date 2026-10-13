import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  AlertOctagon,
  CornerDownRight,
  Clock,
  ShieldCheck,
  Search
} from 'lucide-react';
import { BrokenLinkQAData, BrokenLinkItem } from '../../../../lib/sheet2DataService';

interface Props {
  data: BrokenLinkQAData;
}

export default function BrokenLinkQAView({ data }: Props) {
  const { totalChecked, workingCount, redirectCount, brokenCount, timeoutCount, items } = data;
  const [statusFilter, setStatusFilter] = useState<'all' | 'Working' | 'Redirect' | 'Broken' | 'Timeout'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchQuery && !item.url.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: BrokenLinkItem['status'], httpStatus: number) => {
    switch (status) {
      case 'Working':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0066FF] text-[#0066FF] border border-[#0066FF]/60">
            <CheckCircle2 className="w-3 h-3" />
            <span>200 Working</span>
          </span>
        );
      case 'Redirect':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#02241e] text-[#0066FF] border border-blue-800/60">
            <CornerDownRight className="w-3 h-3" />
            <span>{httpStatus} Redirect</span>
          </span>
        );
      case 'Broken':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800/60">
            <AlertOctagon className="w-3 h-3" />
            <span>{httpStatus} Broken</span>
          </span>
        );
      case 'Timeout':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800/60">
            <Clock className="w-3 h-3" />
            <span>Timeout</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setStatusFilter('all')}
          className={`p-5 rounded-2xl border shadow-xl cursor-pointer transition-all ${
            statusFilter === 'all'
              ? 'bg-white border-[#0066FF]/50 ring-1 ring-emerald-600'
              : 'bg-white/90 border-[#0066FF]'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Total Monitored URLs</span>
          <div className="text-2xl font-extrabold text-white font-mono my-1">{totalChecked}</div>
          <span className="text-xs text-[#0066FF]">100% crawl coverage</span>
        </div>

        <div
          onClick={() => setStatusFilter('Working')}
          className={`p-5 rounded-2xl border shadow-xl cursor-pointer transition-all ${
            statusFilter === 'Working'
              ? 'bg-[#0066FF]/40 border-[#0066FF]/50 ring-1 ring-emerald-500'
              : 'bg-white/90 border-[#0066FF]'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Working (200 OK)</span>
          <div className="text-2xl font-extrabold text-[#0066FF] font-mono my-1">{workingCount}</div>
          <span className="text-xs text-[#0066FF]">Optimal status</span>
        </div>

        <div
          onClick={() => setStatusFilter('Redirect')}
          className={`p-5 rounded-2xl border shadow-xl cursor-pointer transition-all ${
            statusFilter === 'Redirect'
              ? 'bg-[#02241e]/40 border-[#0066FF]/50 ring-1 ring-emerald-600'
              : 'bg-white/90 border-[#0066FF]'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Redirects (301/302)</span>
          <div className="text-2xl font-extrabold text-[#0066FF] font-mono my-1">{redirectCount}</div>
          <span className="text-xs text-[#0066FF]">Canonical forwards</span>
        </div>

        <div
          onClick={() => setStatusFilter('Broken')}
          className={`p-5 rounded-2xl border shadow-xl cursor-pointer transition-all ${
            statusFilter === 'Broken'
              ? 'bg-rose-950/40 border-rose-500/50 ring-1 ring-rose-500'
              : 'bg-white/90 border-[#0066FF]'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Broken (404/500)</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono my-1">{brokenCount}</div>
          <span className="text-xs text-rose-400 font-semibold">Requires attention</span>
        </div>
      </div>

      {/* 2. Technical Link QA Monitoring Table */}
      <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold text-white">Technical Link Integrity Ledger</h4>
            <p className="text-xs text-[#0066FF]">
              Diagnostic audit reporting only. No site links are altered automatically.
            </p>
          </div>

          {/* Search filter input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#0066FF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audited URLs..."
              className="bg-white border border-[#0066FF] rounded-xl pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-[#0066FF] w-56 font-mono"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#0066FF] text-[#0066FF] uppercase">
                <th className="pb-3 font-semibold">Track ID</th>
                <th className="pb-3 font-semibold">Target URL</th>
                <th className="pb-3 font-semibold">Response Time</th>
                <th className="pb-3 font-semibold">Diagnostic Detail</th>
                <th className="pb-3 font-semibold">Last Verified</th>
                <th className="pb-3 font-semibold text-right">HTTP Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/30 transition-colors">
                  <td className="py-3 font-bold text-[#0066FF]">{item.id}</td>
                  <td className="py-3 font-bold text-white max-w-[280px] truncate">{item.url}</td>
                  <td className="py-3 text-[#0066FF]">{item.responseMs}ms</td>
                  <td className="py-3 text-[#0066FF] max-w-[240px] truncate">
                    {item.errorType || 'HTTP Status 200 OK — Normal routing'}
                  </td>
                  <td className="py-3 text-[#0066FF]">{item.lastChecked}</td>
                  <td className="py-3 text-right">{getStatusBadge(item.status, item.httpStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
