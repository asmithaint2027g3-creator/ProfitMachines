import { useState, useEffect, useMemo } from 'react';
import ReactFlow, { Background, Node, Edge, Handle, Position, NodeProps } from 'reactflow';
import 'reactflow/dist/style.css';
import { cryptoMindMapData } from '../../data/cryptoMindMap';

// --- CUSTOM NODES ---

const UnifiedTimelineNode = ({ data }: NodeProps) => {
    const Icon = data.icon;
    const colors = [
        'from-emerald-400 to-cyan-500 shadow-blue-500/50',
        'from-purple-400 to-emerald-600 shadow-purple-500/50',
        'from-pink-400 to-rose-500 shadow-pink-500/50',
        'from-amber-400 to-orange-500 shadow-amber-500/50',
        'from-emerald-400 to-teal-500 shadow-emerald-500/50',
        'from-[#2878B5] to-emerald-600 shadow-blue-600/50',
        'from-violet-500 to-fuchsia-600 shadow-violet-600/50',
    ];
    const colorClass = colors[data.colorIndex % colors.length];

    return (
        <div className="flex flex-col items-center select-none w-[800px]">
            <Handle type="target" position={Position.Top} className="opacity-0" />

            {/* Horizontal Header Section: Icon Left, Title Right (Aligned Center) */}
            <div className="flex items-center justify-center gap-8 mb-6">
                {/* Icon Circle */}
                <div className="relative group">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colorClass} shadow-xl flex items-center justify-center border-4 border-white shrink-0 transition-transform duration-500 group-hover:scale-110 relative z-10`}>
                        {Icon && <Icon className="w-10 h-10 text-white" />}
                    </div>
                </div>

                {/* Title & Number Group */}
                <div className="text-left">
                    <span className="text-2xl font-black text-[#2878B5] tracking-tighter mb-1 font-mono block">
                        {data.number}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight max-w-[500px]">
                        {data.title}
                    </h3>
                </div>
            </div>

            {/* Tagline Below */}
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-semibold max-w-[600px] text-center mb-8 px-4">
                {data.tagline}
            </p>

            {/* Tags Group */}
            <div className="flex flex-wrap gap-3 justify-center max-w-[650px]">
                {data.tags?.map((tag: string, i: number) => (
                    <div
                        key={i}
                        className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-sm font-bold whitespace-nowrap shadow-sm hover:border-emerald-600/50 hover:shadow-md hover:bg-slate-50 transition-all cursor-default"
                    >
                        {tag}
                    </div>
                ))}
            </div>

            <Handle type="source" position={Position.Bottom} className="opacity-0" />
        </div>
    );
};

const RootTitleNode = ({ data }: NodeProps) => (
    <div className="text-center pb-12 select-none">
        <div className="inline-block px-4 py-1 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-[#2878B5] text-[10px] font-black uppercase tracking-[0.25em] mb-4">
            Architecture Overview
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
            {data.label}
        </h2>
        <p className="text-sm md:text-base text-slate-500 font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto">
            {data.description}
        </p>
    </div>
);

const nodeTypes = {
    'timeline-section': UnifiedTimelineNode,
    'root': RootTitleNode
};

export default function CryptoMindMap() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { nodes, edges } = useMemo(() => {
        const flowNodes: Node[] = cryptoMindMapData.nodes.map((n) => ({
            id: n.id,
            position: { x: n.x ?? 0, y: n.y ?? 0 },
            data: n.data || { label: n.label, description: n.description },
            type: n.type,
            draggable: false,
            // Center the node on its coordinate
            origin: [0.5, 0.5],
        }));

        const flowEdges: Edge[] = cryptoMindMapData.edges.map((e) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            type: e.type || 'straight',
            animated: false,
            style: {
                stroke: '#3b82f6',
                strokeWidth: 2,
                opacity: 0.4,
                filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))'
            }
        }));

        return { nodes: flowNodes, edges: flowEdges };
    }, []);

    return (
        <div className="w-full h-[3200px] relative overflow-hidden group border-y border-slate-100/50 mt-0 mb-20 bg-slate-50/20 cursor-default">

            {/* Dynamic Background Effects (Stateless) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-emerald-600/0 via-blue-500/10 to-emerald-600/0" />
                <div className="absolute inset-0 pointer-events-none"></div>
            </div>

            {/* SERVER-SIDE SEO FALLBACK (Hidden on client) */}
            <div className="sr-only">
                <h1>{cryptoMindMapData.title}</h1>
                {cryptoMindMapData.nodes.map(n => (
                    <div key={n.id}>
                        <h2>{n.data?.title || n.label}</h2>
                        <p>{n.data?.tagline || n.description}</p>
                        {n.data?.tags?.map((t: string) => <span key={t}>{t} </span>)}
                    </div>
                ))}
            </div>

            {isClient && (
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.1 }}
                    minZoom={1}
                    maxZoom={1}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    panOnDrag={false}
                    panOnScroll={false}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    elementsSelectable={false}
                    preventScrolling={false}
                    attributionPosition="bottom-right"
                    proOptions={{ hideAttribution: true }}
                    style={{ background: 'transparent', cursor: 'default' }}
                >
                    <Background color="#3b82f6" gap={40} size={1} style={{ opacity: 0.05 }} />
                </ReactFlow>
            )}
        </div>
    );
}
