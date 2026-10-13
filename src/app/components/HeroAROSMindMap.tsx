import { useEffect, useMemo, useRef, useState } from "react"
import ReactFlow from "reactflow"
import type { Edge, Node } from "reactflow"
import "reactflow/dist/style.css"
import { arosMindMap } from "../../data/arosMindMap"
import { computeRadialLayout } from "../utils/radialLayout"
import HeroMindNode from "./HeroMindNode"

const nodeTypes = { heroNode: HeroMindNode }

export default function HeroAROSMindMap() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const layout = useMemo(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    const width = rect?.width ?? 1000
    const height = rect?.height ?? 500
    return computeRadialLayout(arosMindMap, { width, height })
  }, [containerRef.current?.offsetWidth, containerRef.current?.offsetHeight])

  useEffect(() => {
    const initialNodes = layout.nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        onToggle: (id: string) => {
          setNodes((prev) =>
            prev.map((p) => (p.id === id ? { ...p, data: { ...p.data, expanded: !p.data?.expanded } } : p))
          )
        },
      },
    }))
    setNodes(initialNodes)
    setEdges(layout.edges)
  }, [layout])

  useEffect(() => {
    const onResize = () => {
      const rect = containerRef.current?.getBoundingClientRect()
      const width = rect?.width ?? 1000
      const height = rect?.height ?? 500
      const { nodes: nextNodes, edges: nextEdges } = computeRadialLayout(arosMindMap, { width, height })
      setEdges(nextEdges)
      setNodes((prev) =>
        nextNodes.map((n) => {
          const existing = prev.find((p) => p.id === n.id)
          return {
            ...n,
            data: { ...n.data, expanded: existing?.data?.expanded ?? n.data?.expanded, onToggle: existing?.data?.onToggle },
          }
        })
      )
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <section className="relative py-24 bg-white border-t border-[#0066FF] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0066FF] via-white to-white"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0066FF]">AI Revenue Operations</h2>
          <p className="text-[#0066FF] text-lg">System overview</p>
        </div>
        <div ref={containerRef} className="relative w-full h-[520px] rounded-3xl border border-[#0066FF] bg-white shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            panOnScroll={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            nodesDraggable={false}
            elementsSelectable={false}
            minZoom={1}
            maxZoom={1}
            proOptions={{ hideAttribution: true }}
          />
        </div>
      </div>
    </section>
  )
}
