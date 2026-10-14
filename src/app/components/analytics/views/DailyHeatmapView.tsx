import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Flame,
  Zap
} from 'lucide-react';
import { HeatmapData } from '../../../../lib/sheet2DataService';

interface Props {
  data: HeatmapData;
}

export default function DailyHeatmapView({ data }: Props) {
  const { peakDay, peakHour, totalEventsInHeatmap, days, grid } = data;
  const [hoveredCell, setHoveredCell] = useState<{ day: string; hour: number; count: number } | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Maximum value for intensity gradient calculation
  const maxVal = Math.max(...grid.flat(), 1);

  const getIntensityClass = (val: number) => {
    const ratio = val / maxVal;
    if (ratio === 0) return 'bg-slate-950 text-slate-700';
    if (ratio < 0.15) return 'bg-[#02241e]/40 text-emerald-300';
    if (ratio < 0.35) return 'bg-[#031f18]/60 text-emerald-200';
    if (ratio < 0.55) return 'bg-[#1E6297] text-white';
    if (ratio < 0.75) return 'bg-[#2878B5] text-white font-bold';
    return 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-extrabold shadow-sm';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Measured Activity</span>
            <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{totalEventsInHeatmap.toLocaleString()}</div>
          <span className="text-xs text-slate-400">Interactions across 168 hours</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Peak Velocity Day</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{peakDay}</div>
          <span className="text-xs text-emerald-400 font-bold">Mid-week executive surge</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Peak Traffic Window</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">{peakHour}</div>
          <span className="text-xs text-slate-400">Optimal outreach & demo booking time</span>
        </div>
      </div>

      {/* 2. Heatmap Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Day × Hour Activity Matrix</h4>
            <p className="text-xs text-slate-400">Hover over any cell for exact interaction counts and hourly intensity</p>
          </div>

          {/* Scale Legend */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Low</span>
            <div className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded bg-slate-950 border border-slate-800" />
              <span className="w-3.5 h-3.5 rounded bg-[#02241e]/40" />
              <span className="w-3.5 h-3.5 rounded bg-[#031f18]/60" />
              <span className="w-3.5 h-3.5 rounded bg-[#1E6297]" />
              <span className="w-3.5 h-3.5 rounded bg-[#2878B5]" />
              <span className="w-3.5 h-3.5 rounded bg-gradient-to-r from-emerald-600 to-emerald-600" />
            </div>
            <span>Peak</span>
          </div>
        </div>

        {/* Matrix Grid Container */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[760px]">
            {/* Header: Hours 00 to 23 */}
            <div className="grid grid-cols-25 gap-1 text-[10px] font-mono text-slate-400 text-center mb-1">
              <div className="w-12 text-left font-bold text-slate-400">DAY</div>
              {hours.map((h) => (
                <div key={h} className="py-1">
                  {h.toString().padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* Rows: Mon to Sun */}
            <div className="space-y-1.5">
              {days.map((day, dIdx) => (
                <div key={day} className="grid grid-cols-25 gap-1 items-center">
                  <div className="w-12 text-xs font-mono font-bold text-slate-300">
                    {day}
                  </div>
                  {hours.map((h) => {
                    const count = grid[dIdx]?.[h] || 0;
                    return (
                      <div
                        key={h}
                        onMouseEnter={() => setHoveredCell({ day, hour: h, count })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`h-7 rounded flex items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-white/80 hover:scale-105 ${getIntensityClass(count)}`}
                        title={`${day} @ ${h.toString().padStart(2, '0')}:00 — ${count} events`}
                      >
                        {count > 0 ? (count > 99 ? '99+' : count) : ''}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Inspect Detail Ribbon */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            {hoveredCell ? (
              <span>
                Inspecting: <strong className="text-white">{hoveredCell.day} at {hoveredCell.hour.toString().padStart(2, '0')}:00</strong>
              </span>
            ) : (
              <span>Hover over any hour block to inspect event telemetry</span>
            )}
          </div>
          {hoveredCell && (
            <div className="text-emerald-400 font-bold">
              {hoveredCell.count} logged telemetry events
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
