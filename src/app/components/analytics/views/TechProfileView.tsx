import React from 'react';
import {
  Laptop,
  Monitor,
  Smartphone,
  Globe,
  Wifi,
  Moon,
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TechProfileData } from '../../../../lib/sheet2DataService';

interface Props {
  data: TechProfileData;
}

export default function TechProfileView({ data }: Props) {
  const {
    operatingSystems,
    browsers,
    screenResolutions,
    viewports,
    connections,
    languages,
    themePreference,
    timezones
  } = data;

  const viewportColors = ['#3b82f6', '#8b5cf6', '#10b981'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Viewports & Operating Systems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Operating Systems Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Operating System Landscape</h4>
              <p className="text-xs text-slate-400">Enterprise OS distribution detected across visitor sessions</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-400">
              <Laptop className="w-4 h-4" />
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operatingSystems} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={70} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any, _, item: any) => [`${Number(val).toLocaleString()} visits (${item?.payload?.share})`, 'Volume']}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Viewport Category Donut */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Viewport Form Factor</h4>
            <p className="text-xs text-slate-400 mb-4">Desktop vs Mobile vs Tablet client viewports</p>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={viewports}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {viewports.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={viewportColors[index % viewportColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any) => [Number(val).toLocaleString(), 'Sessions']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-2">
            {viewports.map((vp, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: viewportColors[idx] }} />
                  <span className="text-slate-300">{vp.type}</span>
                </div>
                <span className="text-white font-bold">{vp.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Browsers, Screen Resolutions & Network Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Browsers Table */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-emerald-400" />
            <span>Browser Engine</span>
          </h4>
          <div className="space-y-2.5 font-mono text-xs">
            {browsers.map((b, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">{b.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{b.count.toLocaleString()}</span>
                  <span className="text-emerald-400 font-bold">{b.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Screen Resolutions */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Laptop className="w-4 h-4 text-emerald-400" />
            <span>Screen Resolution</span>
          </h4>
          <div className="space-y-2.5 font-mono text-xs">
            {screenResolutions.map((sr, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">{sr.resolution}</span>
                <span className="text-emerald-400 font-bold">{sr.share}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Profile (Dark Theme, Connection, Lang) */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div>
            <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Moon className="w-4 h-4 text-teal-400" />
              <span>Theme Preference</span>
            </h4>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Dark Mode Active:</span>
              <span className="text-emerald-400 font-bold">
                {Math.round((themePreference.dark / (themePreference.dark + themePreference.light)) * 100)}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>Network Protocol</span>
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {connections.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-300">{c.type}</span>
                  <span className="text-white font-bold">{c.share}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
