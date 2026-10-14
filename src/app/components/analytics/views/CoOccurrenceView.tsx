import React, { useState } from 'react';
import {
  Grid3X3,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { CoOccurrenceData } from '../../../../lib/sheet2DataService';

interface Props {
  data: CoOccurrenceData;
}

export default function CoOccurrenceView({ data }: Props) {
  const { labels, matrix } = data;
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string; val: number } | null>(null);

  const getHeatmapColor = (val: number) => {
    if (val === 100) return 'bg-[#2878B5] text-white font-extrabold';
    if (val >= 70) return 'bg-[#1E6297]/80 text-white font-bold';
    if (val >= 50) return 'bg-[#1E6297]/60 text-emerald-200';
    if (val >= 40) return 'bg-emerald-950/50 text-emerald-300';
    return 'bg-slate-900 text-slate-400';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header description */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-white">Feature & Interest Co-Occurrence Affinity Matrix</h4>
          <span className="text-xs font-mono text-emerald-400 bg-[#02241e]/60 px-2.5 py-1 rounded-full border border-blue-800/40">
            Co-Browsing Affinity
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl">
          Visualizes statistical co-occurrence probabilities between visited service sections, enterprise intent topics, and conversion interactions.
        </p>

        {/* 2. Interactive Matrix */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className="min-w-[680px]">
            {/* Column Headers */}
            <div className="grid grid-cols-7 gap-2 text-xs font-mono mb-2">
              <div className="font-bold text-slate-400 uppercase text-[10px] flex items-end pb-1">
                TOPIC / PAGE
              </div>
              {labels.map((colLabel, cIdx) => (
                <div key={cIdx} className="text-center font-semibold text-slate-300 truncate px-1 text-[11px]">
                  {colLabel}
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            <div className="space-y-2">
              {labels.map((rowLabel, rIdx) => (
                <div key={rIdx} className="grid grid-cols-7 gap-2 items-center">
                  <div className="text-xs font-mono font-bold text-slate-300 truncate pr-2">
                    {rowLabel}
                  </div>
                  {labels.map((colLabel, cIdx) => {
                    const score = matrix[rIdx]?.[cIdx] ?? 0;
                    const isHovered = hoveredCell?.row === rowLabel && hoveredCell?.col === colLabel;
                    return (
                      <div
                        key={cIdx}
                        onMouseEnter={() => setHoveredCell({ row: rowLabel, col: colLabel, val: score })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`h-12 rounded-xl flex items-center justify-center font-mono text-xs cursor-pointer transition-all duration-150 border border-slate-800/60 ${getHeatmapColor(
                          score
                        )} ${isHovered ? 'ring-2 ring-white scale-105 shadow-lg' : ''}`}
                      >
                        {score}%
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Inspect Ribbon */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400">
            {hoveredCell ? (
              <span>
                Affinity between <strong className="text-white">{hoveredCell.row}</strong> &{' '}
                <strong className="text-emerald-400">{hoveredCell.col}</strong>:
              </span>
            ) : (
              <span>Hover over any intersection cell to inspect correlation score</span>
            )}
          </div>
          {hoveredCell && (
            <span className="text-emerald-400 font-bold text-sm">
              {hoveredCell.val}% Co-occurrence Correlation
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
