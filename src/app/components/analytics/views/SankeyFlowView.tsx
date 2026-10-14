import React, { useState } from 'react';
import {
  GitMerge,
  ArrowRight,
  Target,
  Zap,
  Layers
} from 'lucide-react';
import { SankeyFlowData } from '../../../../lib/sheet2DataService';

interface Props {
  data: SankeyFlowData;
}

export default function SankeyFlowView({ data }: Props) {
  const { stages, nodes, links } = data;
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Group nodes by category
  const categorizedNodes: Record<string, typeof nodes> = {
    Source: nodes.filter((n) => n.category === 'Source'),
    Landing: nodes.filter((n) => n.category === 'Landing'),
    Evaluation: nodes.filter((n) => n.category === 'Evaluation'),
    Action: nodes.filter((n) => n.category === 'Action'),
    Outcome: nodes.filter((n) => n.category === 'Outcome')
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Source':
        return 'bg-[#2878B5]/20 text-emerald-400 border-emerald-600/40';
      case 'Landing':
        return 'bg-[#2878B5]/20 text-emerald-400 border-emerald-600/40';
      case 'Evaluation':
        return 'bg-teal-700/20 text-teal-400 border-purple-500/40';
      case 'Action':
        return 'bg-rose-600/20 text-rose-400 border-rose-500/40';
      case 'Outcome':
        return 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Flow Header */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">Visitor Multi-Stage Journey Flow</h4>
            <p className="text-xs text-slate-400">
              Traffic Source → Landing Page → Deep Evaluation → Micro-Action → Verified Conversion
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40 self-start sm:self-auto">
            Processed Sheet 2 Sankey
          </span>
        </div>

        {/* 2. Visual Stage Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(categorizedNodes).map(([category, catNodes], cIdx) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                <span>{stages[cIdx] || category}</span>
                <span className="text-[10px] text-slate-400">Step {cIdx + 1}</span>
              </div>

              <div className="space-y-2.5">
                {catNodes.map((node) => {
                  const isHighlighted = activeNode === node.name;
                  const totalVolume = links
                    .filter((l) => l.source === node.name || l.target === node.name)
                    .reduce((sum, l) => sum + l.value, 0);

                  return (
                    <div
                      key={node.name}
                      onMouseEnter={() => setActiveNode(node.name)}
                      onMouseLeave={() => setActiveNode(null)}
                      className={`p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                        isHighlighted
                          ? 'ring-2 ring-blue-400 scale-102 bg-slate-800 shadow-lg'
                          : getCategoryColor(node.category)
                      }`}
                    >
                      <div className="text-xs font-bold truncate mb-1">{node.name}</div>
                      <div className="flex items-center justify-between text-[11px] font-mono opacity-85">
                        <span>Throughput:</span>
                        <span className="font-bold">{totalVolume.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Link Flow Ledger */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Transition Paths & Volume Density</h4>
            <p className="text-xs text-slate-400">Exact visitor volumes transitioning across journey junctions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="pb-3 font-semibold">Origin Stage</th>
                <th className="pb-3 font-semibold">Target Stage</th>
                <th className="pb-3 font-semibold">Transition Volume</th>
                <th className="pb-3 font-semibold text-right">Path Flow Intensity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {links.map((link, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    activeNode === link.source || activeNode === link.target
                      ? 'bg-[#2878B5]/10'
                      : 'hover:bg-slate-800/30'
                  }`}
                >
                  <td className="py-3 font-bold text-slate-200">{link.source}</td>
                  <td className="py-3 text-emerald-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{link.target}</span>
                  </td>
                  <td className="py-3 text-white font-bold">{link.value.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${Math.min(100, (link.value / 9500) * 100)}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-[10px]">
                        {Math.round((link.value / 9500) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
