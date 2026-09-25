import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Skull, Radio } from "lucide-react";

export function ThreatActorNode({ data }: { data: any }) {
  return (
    <div className="px-3.5 py-2.5 rounded-xl border border-red-600/90 bg-gradient-to-b from-red-950/80 to-[#0b0f19] shadow-[0_0_20px_rgba(239,68,68,0.25)] text-xs font-mono w-56 select-none animate-pulse-subtle">
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5 text-red-400 font-bold">
          <Skull className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] uppercase tracking-wider">External Threat Actor</span>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
      </div>

      <div className="font-bold text-white text-xs leading-snug">
        {data.label}
      </div>

      {data.data?.ip && (
        <div className="text-[10px] text-red-300 mt-1 flex items-center gap-1">
          <Radio className="w-3 h-3 text-red-400" />
          <span>Exit Relay: {data.data.ip}</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-2.5 h-2.5 bg-red-500" />
    </div>
  );
}
