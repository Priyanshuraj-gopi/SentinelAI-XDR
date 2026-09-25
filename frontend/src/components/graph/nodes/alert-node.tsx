import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AlertNode({ data }: { data: any }) {
  const isCritical = data.risk >= 85;

  return (
    <div
      className={`px-3 py-2.5 rounded-xl border bg-[#0b1220] shadow-xl text-xs font-mono w-56 select-none transition-all ${
        isCritical
          ? "border-red-600/80 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          : "border-slate-700 hover:border-blue-500"
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-500" />

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className={`w-3.5 h-3.5 ${isCritical ? "text-red-400" : "text-orange-400"}`} />
          <span className="text-[10px] uppercase font-bold text-slate-400">{data.category || "Alert"}</span>
        </div>
        <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/80">
          {data.risk} Risk
        </span>
      </div>

      <div className="font-semibold text-slate-200 text-xs leading-snug line-clamp-2">
        {data.label}
      </div>

      {data.source && (
        <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>{data.source}</span>
          <span className="text-cyan-400">Correlated</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-blue-500" />
    </div>
  );
}
