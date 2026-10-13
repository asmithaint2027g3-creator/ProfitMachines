import React from 'react';
import {
  BarChart2,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { ParetoData } from '../../../../lib/sheet2DataService';

interface Props {
  data: ParetoData;
}

export default function ParetoView({ data }: Props) {
  const { threshold80Index, totalVolume, topEntitiesContributionPct, items } = data;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Total Measured Volume</span>
            <div className="p-2 rounded-lg bg-[#0066FF]/10 text-[#0066FF]">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{totalVolume.toLocaleString()}</div>
          <span className="text-xs text-[#0066FF]">Aggregated events across pages & sources</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">80% Threshold Reached At</span>
            <div className="p-2 rounded-lg bg-white0/10 text-[#0066FF]">
              <Filter className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0066FF] font-mono">Top {threshold80Index} Entities</div>
          <span className="text-xs text-[#0066FF]">Drive ~80% of total revenue momentum</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Vital Few Concentration</span>
            <div className="p-2 rounded-lg bg-white0/10 text-[#0066FF]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0066FF] font-mono">{topEntitiesContributionPct}%</div>
          <span className="text-xs text-[#0066FF]">Classic 80/20 power law validated</span>
        </div>
      </div>

      {/* 2. Pareto Dual-Axis Visualization */}
      <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Pareto 80/20 Activity Curve</h4>
            <p className="text-xs text-[#0066FF]">
              Bars denote individual contribution; line traces cumulative impact against the 80% benchmark line
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-[#0066FF]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#0066FF]" /> Individual Volume
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Cumulative %
            </span>
            <span className="inline-flex items-center gap-1.5 text-rose-400">
              <span className="w-3 border-t-2 border-dashed border-rose-500" /> 80% Cutoff
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={items} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" />
              <YAxis yAxisId="left" stroke="#3b82f6" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val: any, name: string) => [
                  name === 'cumulativePct' ? `${val}%` : Number(val).toLocaleString(),
                  name === 'cumulativePct' ? 'Cumulative %' : 'Contribution'
                ]}
              />
              <ReferenceLine yAxisId="right" y={80} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '80% Threshold', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} />
              <Bar yAxisId="left" dataKey="contribution" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={34} />
              <Line yAxisId="right" type="monotone" dataKey="cumulativePct" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Pareto Breakdown Table */}
      <div className="p-6 rounded-2xl bg-white/90 border border-[#0066FF] shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Entity Cumulative Contribution Ledger</h4>
            <p className="text-xs text-[#0066FF]">Entities sorted by individual contribution weight</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#0066FF] text-[#0066FF] uppercase">
                <th className="pb-3 font-semibold">Entity Name</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Contribution</th>
                <th className="pb-3 font-semibold">Individual Share</th>
                <th className="pb-3 font-semibold text-right">Cumulative %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {items.map((item, idx) => {
                const individualShare = ((item.contribution / totalVolume) * 100).toFixed(1);
                const isUnder80 = item.cumulativePct <= 80;
                return (
                  <tr key={idx} className="hover:bg-white/30 transition-colors">
                    <td className="py-3 font-bold text-white">{item.name}</td>
                    <td className="py-3 text-[#0066FF] uppercase text-[11px]">{item.type}</td>
                    <td className="py-3 text-[#0066FF] font-bold">{item.contribution.toLocaleString()}</td>
                    <td className="py-3 text-[#0066FF]">{individualShare}%</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isUnder80
                          ? 'bg-[#0066FF] text-[#0066FF] border border-[#0066FF]/50'
                          : 'bg-white text-[#0066FF]'
                      }`}>
                        {item.cumulativePct}% {isUnder80 ? '? Core 80%' : ''}
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
