import type { NodeProps } from "reactflow"
import { Handle, Position } from "reactflow"

export default function HeroMindNode({ id, data }: NodeProps) {
  const isCenter = data?.variant === "center"
  const expanded = !!data?.expanded
  const clickable = data?.variant === "outer"

  const onToggle = () => {
    if (clickable && typeof data?.onToggle === "function") {
      data.onToggle(id)
    }
  }

  return (
    <div
      onClick={onToggle}
      className={[
        "select-none",
        "rounded-2xl",
        "border",
        "shadow-sm",
        "transition-all",
        "duration-300",
        isCenter ? "bg-white border-[#0066FF]" : "bg-white border-[#0066FF]",
        clickable ? "cursor-pointer hover:shadow-lg hover:border-[#0066FF]" : "cursor-default",
        isCenter ? "px-8 py-6" : "px-6 py-4",
        "min-w-[220px]",
      ].join(" ")}
    >
      <div className={["flex", "items-center", "justify-center"].join(" ")}>
        <div
          className={[
            "text-center",
            isCenter ? "text-2xl font-bold text-[#0066FF]" : "text-lg font-semibold text-[#0066FF]",
          ].join(" ")}
        >
          {data?.label}
        </div>
      </div>
      {data?.items && expanded && (
        <div className="mt-4 grid grid-cols-1 gap-2">
          {data.items.map((item: string, i: number) => (
            <div
              key={i}
              className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm bg-gradient-to-r from-[#0066FF] to-[#0066FF] border border-[#0066FF] text-[#0066FF]"
            >
              {item}
            </div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />
      <Handle type="target" position={Position.Left} className="opacity-0 pointer-events-none" />
    </div>
  )
}
