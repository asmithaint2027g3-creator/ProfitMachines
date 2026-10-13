import React from 'react';
import {
  Globe,
  Activity,
  Users,
  Clock,
  Flame,
  Search,
  Briefcase,
  MessageSquare,
  UserCheck,
  Trash2,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { MissionControlData } from '../../../../lib/sheet2DataService';

interface Props {
  data: MissionControlData;
}

export default function MissionControlView({ data }: Props) {
  const { kpis, gauges, acquisitionRadar, trafficTrend, acquisitionDistribution } = data;

  const kpiCards = [
    { title: 'Global Traffic', value: kpis.globalTraffic.toLocaleString(), icon: Globe, change: '+18.4%', color: 'blue' },
    { title: 'Number of Sessions', value: kpis.sessions.toLocaleString(), icon: Activity, change: '+14.2%', color: 'indigo' },
    { title: 'Repeat Visitors', value: kpis.repeatVisitors.toLocaleString(), icon: Users, change: '+22.5%', color: 'purple' },
    { title: 'Avg Session Duration', value: `${Math.floor(kpis.avgSessionDurationSeconds / 60)}m ${kpis.avgSessionDurationSeconds % 60}s`, icon: Clock, change: '+8.1%', color: 'emerald' },
    { title: 'Hot Leads', value: kpis.hotLeads.toLocaleString(), icon: Flame, change: '+32.0%', color: 'rose' },
    { title: 'Google Leads', value: kpis.googleLeads.toLocaleString(), icon: Search, change: '+26.4%', color: 'amber' },
    { title: 'Career Submissions', value: kpis.careerSubmissions.toLocaleString(), icon: Briefcase, change: '+12.0%', color: 'cyan' },
    { title: 'Number of Chats', value: kpis.numberOfChats.toLocaleString(), icon: MessageSquare, change: '+44.5%', color: 'blue' },
    { title: 'Unique Visitors', value: kpis.uniqueVisitors.toLocaleString(), icon: UserCheck, change: '+19.8%', color: 'emerald' },
    { title: 'Dev Records Purged', value: kpis.devRecordsPurged.toLocaleString(), icon: Trash2, change: 'Cleaned', color: 'slate' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Ten Primary Sheet 2 KPI Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">Mission Control KPIs</h3>
            <p className="text-xs text-[#0066FF]">Directly synchronized with Sheet 2 Mission_Control processed matrix</p>
          </div>
          <span className="text-[11px] font-mono text-[#0066FF] bg-[#0066FF]/60 border border-[#0066FF]/50 px-2.5 py-1 rounded-full">
            10 Telemetry Signals Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {kpiCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/90 border border-[#0066FF]/90 hover:border-[#0066FF] transition-all shadow-md relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] truncate">
                    {card.title}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/80 text-[#0066FF] group-hover:text-[#0066FF] transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-white font-mono tracking-tight my-1">
                  {card.value}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#0066FF] font-semibold font-mono">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{card.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Gauges & Acquisition Radar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gauge 1: Repeat Visitor % */}
        <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066FF] mb-1">
              Retention Efficiency
            </div>
            <h4 className="text-lg font-bold text-white mb-4">Repeat Visitor %</h4>
          </div>

          <div className="flex flex-col items-center justify-center my-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#0066FF]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#0066FF] transition-all duration-1000 ease-out"
                  strokeDasharray={`${gauges.repeatVisitorPct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-extrabold text-white font-mono">{gauges.repeatVisitorPct}%</span>
                <span className="text-[10px] text-[#0066FF] font-mono">RETENTION</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#0066FF]/80 text-[11px] text-[#0066FF] flex items-center justify-between">
            <span>High Buyer Intent</span>
            <span className="text-[#0066FF] font-bold">+6.2% vs benchmark</span>
          </div>
        </div>

        {/* Gauge 2: Avg Session Duration */}
        <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066FF] mb-1">
              Engagement Depth
            </div>
            <h4 className="text-lg font-bold text-white mb-4">Average Session Duration</h4>
          </div>

          <div className="flex flex-col items-center justify-center my-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#0066FF]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#0066FF] transition-all duration-1000 ease-out"
                  strokeDasharray="68, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-2xl font-extrabold text-white font-mono">{gauges.avgDurationFormatted}</span>
                <span className="text-[10px] text-[#0066FF] font-mono">AVG TIME</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#0066FF]/80 text-[11px] text-[#0066FF] flex items-center justify-between">
            <span>Executive Content Read</span>
            <span className="text-[#0066FF] font-bold">+18.5% QoQ</span>
          </div>
        </div>

        {/* Radar: Traffic Acquisition Radar */}
        <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066FF] mb-1">
              Multi-Channel Balance
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Traffic Acquisition Radar</h4>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={acquisitionRadar}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="source" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 40]} />
                <Radar
                  name="Channel Share %"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-[#0066FF]/80 text-[11px] text-[#0066FF] flex items-center justify-between">
            <span>Primary Driver</span>
            <span className="text-[#0066FF] font-mono font-bold">Organic Search (34%)</span>
          </div>
        </div>
      </div>

      {/* 3. Trends & Acquisition Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Graph: Traffic, Sessions, Visitors */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Daily Traffic & Velocity Trends</h4>
              <p className="text-xs text-[#0066FF]">7-day rolling view of gross traffic, sessions, and verified visitors</p>
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
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="sessions" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Acquisition Donut Distribution */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Acquisition Distribution</h4>
            <p className="text-xs text-[#0066FF] mb-4">Traffic source split calculated by Sheet 2</p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={acquisitionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {acquisitionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-2">
            {acquisitionDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#0066FF]">{item.name}</span>
                </div>
                <span className="font-mono text-white font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
