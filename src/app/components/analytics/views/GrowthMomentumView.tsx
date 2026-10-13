import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Users,
  Target,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { GrowthMomentumData } from '../../../../lib/sheet2DataService';

interface Props {
  data: GrowthMomentumData;
}

export default function GrowthMomentumView({ data }: Props) {
  const [activeFrequency, setActiveFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { metrics, timeline } = data;

  // Granular scaling according to selected frequency
  const displayTimeline = timeline.map((pt, idx) => {
    if (activeFrequency === 'daily') {
      return {
        ...pt,
        period: `Day ${idx + 1}`,
        traffic: Math.round(pt.traffic / 7),
        sessions: Math.round(pt.sessions / 7),
        visitors: Math.round(pt.visitors / 7),
        leads: Math.max(1, Math.round(pt.leads / 7))
      };
    }
    if (activeFrequency === 'monthly') {
      return {
        ...pt,
        period: `Month ${idx + 1}`,
        traffic: Math.round(pt.traffic * 3.8),
        sessions: Math.round(pt.sessions * 3.8),
        visitors: Math.round(pt.visitors * 3.8),
        leads: Math.round(pt.leads * 3.8)
      };
    }
    return pt;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header with Velocity Switcher & KPI Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Growth Momentum Engine</h3>
          <p className="text-xs text-[#0066FF]">Sheet 2 longitudinal acceleration across core funnel metrics</p>
        </div>

        {/* Granularity Switcher */}
        <div className="bg-white border border-[#0066FF] rounded-xl p-1 flex items-center gap-1 text-xs font-bold self-start sm:self-auto">
          {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
            <button
              key={freq}
              onClick={() => setActiveFrequency(freq)}
              className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all ${
                activeFrequency === freq
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'text-[#0066FF] hover:text-white'
              }`}
            >
              {freq}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Traffic Velocity</span>
            <div className="p-2 rounded-lg bg-[#0066FF]/10 text-[#0066FF]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.trafficGrowthPct}</div>
          <span className="text-xs text-[#0066FF] font-bold inline-flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Period-over-period
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Session Momentum</span>
            <div className="p-2 rounded-lg bg-white0/10 text-[#0066FF]">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.sessionGrowthPct}</div>
          <span className="text-xs text-[#0066FF] font-bold inline-flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> High-frequency growth
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Visitor Expansion</span>
            <div className="p-2 rounded-lg bg-white0/10 text-[#0066FF]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.visitorGrowthPct}</div>
          <span className="text-xs text-[#0066FF] font-bold inline-flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Net-new account intake
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Lead Conversion Lift</span>
            <div className="p-2 rounded-lg bg-[#0066FF]/10 text-[#0066FF]">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0066FF] font-mono">{metrics.leadGrowthPct}</div>
          <span className="text-xs text-[#0066FF] font-bold inline-flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Pipeline velocity surge
          </span>
        </div>
      </div>

      {/* 2. Primary Stacked Area Chart */}
      <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Compound Funnel Trajectory ({activeFrequency.toUpperCase()})</h4>
            <p className="text-xs text-[#0066FF]">Traffic, sessions, visitors, and verified lead flow progression</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-[#0066FF]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" /> Traffic
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#0066FF]">
              <span className="w-2.5 h-2.5 rounded-full bg-white0" /> Sessions
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#0066FF]">
              <span className="w-2.5 h-2.5 rounded-full bg-white0" /> Visitors
            </span>
            <span className="inline-flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Leads
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayTimeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="period" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="traffic" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTraffic)" strokeWidth={2} />
              <Area type="monotone" dataKey="sessions" stroke="#6366f1" fillOpacity={1} fill="url(#colorSessions)" strokeWidth={2} />
              <Area type="monotone" dataKey="visitors" stroke="#10b981" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
