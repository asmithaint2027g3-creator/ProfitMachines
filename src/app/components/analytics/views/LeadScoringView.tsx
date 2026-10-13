import React from 'react';
import {
  Flame,
  Award,
  Zap,
  Target,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { LeadScoringData } from '../../../../lib/sheet2DataService';

interface Props {
  data: LeadScoringData;
}

export default function LeadScoringView({ data }: Props) {
  const { distribution, totalQualifiedLeads, intentSignals, recentScoredLeads } = data;

  const tierCards = [
    { tier: 'Hot Leads', count: distribution.hot, color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800/50', desc: 'Score 90+ • Imminent buying decision' },
    { tier: 'Warm Leads', count: distribution.warm, color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/50', desc: 'Score 70-89 • High evaluation activity' },
    { tier: 'Medium Intent', count: distribution.medium, color: 'text-[#0066FF]', bg: 'bg-[#02241e]/40 border-blue-800/50', desc: 'Score 50-69 • Multiple page reads' },
    { tier: 'Low Intent', count: distribution.low, color: 'text-[#0066FF]', bg: 'bg-white border-[#0066FF]', desc: 'Score <50 • Exploratory browsing' }
  ];

  const chartData = [
    { tier: 'Hot', count: distribution.hot, fill: '#ef4444' },
    { tier: 'Warm', count: distribution.warm, fill: '#f59e0b' },
    { tier: 'Medium', count: distribution.medium, fill: '#3b82f6' },
    { tier: 'Low', count: distribution.low, fill: '#64748b' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Tier Distribution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tierCards.map((c, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border shadow-xl ${c.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">{c.tier}</span>
              <Flame className={`w-4 h-4 ${c.color}`} />
            </div>
            <div className={`text-3xl font-extrabold font-mono mb-1 ${c.color}`}>
              {c.count.toLocaleString()}
            </div>
            <span className="text-[11px] text-[#0066FF] block">{c.desc}</span>
          </div>
        ))}
      </div>

      {/* 2. Lead Score Distribution Chart & High-Impact Intent Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tier Volume Bar Chart */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Lead Intent Distribution</h4>
              <p className="text-xs text-[#0066FF]">Sheet 2 scored pipeline volume categorized into intent tiers</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="tier" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Intent Signals */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Top Conversion Intent Signals</h4>
            <p className="text-xs text-[#0066FF] mb-4">Behaviors with the highest correlation to closed enterprise contracts</p>

            <div className="space-y-3 font-mono text-xs">
              {intentSignals.map((sig, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/70 border border-[#0066FF] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <span className="text-[#0066FF] truncate max-w-[280px]">{sig.signal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{sig.frequency} hits</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sig.impactLevel === 'High'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                        : 'bg-[#02241e] text-[#0066FF] border border-blue-800/60'
                    }`}>
                      {sig.impactLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#0066FF] text-[11px] text-[#0066FF]">
            Engine Model: Weighted heuristic intent calculation computed by Sheet 2.
          </div>
        </div>
      </div>

      {/* 3. Scored Inbound Pipeline Table */}
      <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Recently Scored Opportunities</h4>
            <p className="text-xs text-[#0066FF]">Scored visitor sessions ranked by intent tier</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#0066FF] text-[#0066FF] uppercase">
                <th className="pb-3 font-semibold">Lead ID</th>
                <th className="pb-3 font-semibold">Score</th>
                <th className="pb-3 font-semibold">Tier</th>
                <th className="pb-3 font-semibold">Attribution Channel</th>
                <th className="pb-3 font-semibold">Primary Section</th>
                <th className="pb-3 font-semibold">Engagement Depth</th>
                <th className="pb-3 font-semibold text-right">Activity Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentScoredLeads.map((lead, idx) => (
                <tr key={idx} className="hover:bg-white/30 transition-colors">
                  <td className="py-3 font-bold text-white">{lead.leadId}</td>
                  <td className="py-3 text-[#0066FF] font-extrabold">{lead.score}/100</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.tier === 'Hot'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                        : lead.tier === 'Warm'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                        : 'bg-[#02241e] text-[#0066FF] border border-blue-800/60'
                    }`}>
                      {lead.tier}
                    </span>
                  </td>
                  <td className="py-3 text-[#0066FF]">{lead.source}</td>
                  <td className="py-3 text-[#0066FF]">{lead.primaryPage}</td>
                  <td className="py-3 text-[#0066FF]">{lead.engagementDepth}</td>
                  <td className="py-3 text-right text-[#0066FF]">{lead.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
