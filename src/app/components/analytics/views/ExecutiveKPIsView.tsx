import React from 'react';
import {
  Users,
  Eye,
  Clock,
  RotateCw,
  Compass,
  ArrowUpRight,
  Sparkles
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
import { ExecutiveKPIsData } from '../../../../lib/sheet2DataService';

interface Props {
  data: ExecutiveKPIsData;
}

export default function ExecutiveKPIsView({ data }: Props) {
  const { kpis, top5Pages, topPagesByTime, topRepeatVisitors, masterPageMetrics } = data;

  const cards = [
    { title: 'Total Visits', value: kpis.totalVisits.toLocaleString(), icon: Eye, change: '+16.2%', sub: 'Across all assets' },
    { title: 'Unique Visitors', value: kpis.uniqueVisitors.toLocaleString(), icon: Users, change: '+20.1%', sub: 'First-party profiles' },
    { title: 'Avg Session Time', value: kpis.avgSessionTime, icon: Clock, change: '+12.4%', sub: 'Depth per visit' },
    { title: 'Repeat Visitors', value: kpis.repeatVisitors.toLocaleString(), icon: RotateCw, change: '+18.8%', sub: 'Returning accounts' },
    { title: 'Most Active Page', value: kpis.mostActivePage, icon: Compass, change: 'Top Intent', sub: 'Highest engagement' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Five KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 truncate">{c.title}</span>
                <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono truncate mb-1">
                {c.value}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold font-mono inline-flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {c.change}
                </span>
                <span className="text-slate-400 text-[11px] truncate">{c.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Top 5 Pages & Top Pages by Time Spent Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Pages Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Top 5 Pages by Traffic</h4>
              <p className="text-xs text-slate-400">Visit volume and total share from Sheet 2 Executive_KPIs</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-[#02241e]/60 px-2.5 py-1 rounded-full border border-blue-800/40">
              Ranked
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top5Pages} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="page" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} visits`, 'Traffic']}
                />
                <Bar dataKey="visits" fill="#3b82f6" radius={[0, 6, 6, 0]}>
                  {top5Pages.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages by Time Spent Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Top Pages by Average Time Spent</h4>
              <p className="text-xs text-slate-400">Engagement depth indicating high buying intent</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
              Deep Dwell
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPagesByTime} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} unit="s" />
                <YAxis dataKey="page" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any, _, item: any) => [item?.payload?.avgTimeFormatted || `${val}s`, 'Avg Dwell Time']}
                />
                <Bar dataKey="avgTimeSeconds" fill="#10b981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Top Repeat Visitors Leaderboard Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Top Repeat Visitors Leaderboard</h4>
            <p className="text-xs text-slate-400">First-party anonymous profiles exhibiting high frequency and multi-session velocity</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                <th className="pb-3 font-semibold">Visitor ID</th>
                <th className="pb-3 font-semibold">Sessions</th>
                <th className="pb-3 font-semibold">Total Time</th>
                <th className="pb-3 font-semibold">Dominant Channel</th>
                <th className="pb-3 font-semibold">Last Seen</th>
                <th className="pb-3 font-semibold text-right">Lifecycle Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {topRepeatVisitors.map((vis, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 text-emerald-400 font-bold">{vis.visitorId}</td>
                  <td className="py-3 text-white font-bold">{vis.sessionsCount}</td>
                  <td className="py-3 text-emerald-400">{vis.totalTimeFormatted}</td>
                  <td className="py-3 text-slate-300">{vis.dominantSource}</td>
                  <td className="py-3 text-slate-400">{vis.lastSeen}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      vis.status.includes('Booked') || vis.status.includes('Hot')
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-[#02241e] text-emerald-400 border border-blue-800/60'
                    }`}>
                      {vis.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Master Page Metrics Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Master Page Metrics</h4>
            <p className="text-xs text-slate-400">Complete performance ledger across all published site routes</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                <th className="pb-3 font-semibold">Page URL</th>
                <th className="pb-3 font-semibold">Total Visits</th>
                <th className="pb-3 font-semibold">Unique Users</th>
                <th className="pb-3 font-semibold">Average Time</th>
                <th className="pb-3 font-semibold">Maximum Time</th>
                <th className="pb-3 font-semibold text-right">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {masterPageMetrics.map((page, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 font-bold text-white">{page.pageUrl}</td>
                  <td className="py-3 text-slate-300">{page.totalVisits.toLocaleString()}</td>
                  <td className="py-3 text-emerald-400">{page.uniqueUsers.toLocaleString()}</td>
                  <td className="py-3 text-emerald-400">{page.avgTime}</td>
                  <td className="py-3 text-slate-400">{page.maxTime}</td>
                  <td className="py-3 text-right text-slate-300">{page.bounceRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
