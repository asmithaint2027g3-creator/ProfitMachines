import React from 'react';
import {
  Activity,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  HelpCircle,
  CheckCircle2
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
import { StdDeviationData } from '../../../../lib/sheet2DataService';

interface Props {
  data: StdDeviationData;
}

export default function StdDeviationView({ data }: Props) {
  const {
    metricName,
    mean,
    stdDev,
    upper2Sigma,
    lower2Sigma,
    anomaliesDetected,
    distribution,
    recentObservations
  } = data;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Statistical KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mean Baseline (μ)</span>
            <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{mean.toFixed(1)}s</div>
          <span className="text-xs text-slate-400">Average engagement time per session</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Std Deviation (σ)</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">±{stdDev.toFixed(1)}s</div>
          <span className="text-xs text-slate-400">Standard variance window</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Normal Range (±2σ)</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {lower2Sigma.toFixed(0)}s – {upper2Sigma.toFixed(0)}s
          </div>
          <span className="text-xs text-slate-400">95.4% of all verified visitors</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Statistical Anomalies</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">{anomaliesDetected} Detected</div>
          <span className="text-xs text-rose-400">Outliers beyond ±2σ boundary</span>
        </div>
      </div>

      {/* 2. Bell Curve / Distribution Histogram */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Gaussian Engagement Dispersion</h4>
            <p className="text-xs text-slate-400">{metricName} — Normal curve distribution with outlier flags</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" /> Expected Range
            </span>
            <span className="inline-flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Outlier / Anomaly
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="bucketLabel" stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val: any) => [`${Number(val).toLocaleString()} sessions`, 'Count']}
              />
              <Bar dataKey="frequency" radius={[4, 4, 0, 0]}>
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isAnomaly ? '#ef4444' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Recent Observations & Outliers Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Recent Hourly Statistical Inspections</h4>
            <p className="text-xs text-slate-400">Live hourly sample deviations relative to baseline mean</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="pb-3 font-semibold">Time Window</th>
                <th className="pb-3 font-semibold">Observed Value</th>
                <th className="pb-3 font-semibold">Z-Score Deviation</th>
                <th className="pb-3 font-semibold text-right">Statistical Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentObservations.map((obs, idx) => {
                const isAlert = obs.status === 'Anomaly Alert';
                const isHigh = obs.status === 'High Activity';
                return (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-bold text-white">{obs.date}</td>
                    <td className="py-3 text-slate-200">{obs.value}s</td>
                    <td className="py-3 text-emerald-400 font-bold">
                      {obs.deviationScore > 0 ? `+${obs.deviationScore.toFixed(2)}σ` : `${obs.deviationScore.toFixed(2)}σ`}
                    </td>
                    <td className="py-3 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isAlert
                          ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                          : isHigh
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {obs.status}
                      </span>
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
}
