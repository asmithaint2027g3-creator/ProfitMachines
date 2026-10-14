import React from 'react';
import {
  Filter,
  TrendingDown,
  Target,
  ArrowDown,
  ShieldCheck
} from 'lucide-react';
import { FunnelDropOffData } from '../../../../lib/sheet2DataService';

interface Props {
  data: FunnelDropOffData;
}

export default function FunnelDropOffView({ data }: Props) {
  const { overallConversionRate, stages } = data;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold text-white mb-1">Macro Conversion Funnel & Drop-Off Scrutiny</h4>
          <p className="text-xs text-slate-400">
            Step-by-step conversion efficiency from top-of-funnel discovery to qualified sales pipeline
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">End-to-End Conversion</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">{overallConversionRate}</span>
          </div>
        </div>
      </div>

      {/* 2. Visual Stepped Funnel */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isLast = idx === stages.length - 1;
            return (
              <div key={idx} className="space-y-2">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#2878B5]/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">{stage.stage}</div>
                      <div className="text-xs font-mono text-slate-400">
                        {stage.count.toLocaleString()} volume • {stage.pctOfTop}% of total site traffic
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto font-mono text-xs">
                    {idx > 0 && (
                      <div className="flex items-center gap-1 text-rose-400 font-semibold">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>-{stage.dropOffPct}% drop</span>
                      </div>
                    )}
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-bold border border-slate-800">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress bar visualizer */}
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.max(2, stage.pctOfTop)}%`,
                      backgroundColor: stage.color
                    }}
                  />
                </div>

                {/* Downward Drop Indicator between stages */}
                {!isLast && (
                  <div className="flex items-center justify-center py-1 text-slate-400">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Conversion Diagnostics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Highest Drop-off Point:</span>
          <span className="text-rose-400 font-bold">Stage 4: Form Initiation (-79.6%)</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Visitor Engagement Retention:</span>
          <span className="text-emerald-400 font-bold">58.1% pass 45s Dwell Milestone</span>
        </div>
      </div>
    </div>
  );
}
