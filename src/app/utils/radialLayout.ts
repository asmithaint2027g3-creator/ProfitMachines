import type { Node, Edge } from "reactflow"
import type { AROSMindMap } from "../../data/arosMindMap"

export function computeRadialLayout(
  data: AROSMindMap,
  size: { width: number; height: number },
  options?: { radius?: number }
): { nodes: Node[]; edges: Edge[] } {
  const cx = size.width / 2
  const cy = size.height / 2
  const radius = options?.radius ?? Math.max(Math.min(size.width, size.height) * 0.28, 180)
  const angleStep = (2 * Math.PI) / data.nodes.length

  const nodes: Node[] = []
  const edges: Edge[] = []

  nodes.push({
    id: "center",
    type: "heroNode",
    position: { x: cx - 140, y: cy - 80 },
    data: { label: data.center, variant: "center", expanded: true },
    draggable: false,
  })

  data.nodes.forEach((item, idx) => {
    const angle = -Math.PI / 2 + idx * angleStep
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    nodes.push({
      id: item.id,
      type: "heroNode",
      position: { x: x - 120, y: y - 60 },
      data: { label: item.label, items: item.items, variant: "outer", expanded: false },
      draggable: false,
    })
    edges.push({
      id: `e-center-${item.id}`,
      source: "center",
      target: item.id,
      animated: false,
      style: { stroke: "#cbd5e1", strokeWidth: 1.5 },
    })
  })

  return { nodes, edges }
}
