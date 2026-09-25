import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Server, User, Terminal, Globe, Lock } from "lucide-react";

export function EntityNode({ data }: { data: any }) {
  const getIcon = () => {
    const cat = (data.category || "").toLowerCase();
    if (cat.includes("crown") || cat.includes("controller") || cat.includes("dc")) {
      return <Lock className="w-3.5 h-3.5 text-red-400" />;
    }
    if (cat.includes("host") || cat.includes("endpoint") || cat.includes("server")) {
      return <Server className="w-3.5 h-3.5 text-purple-400" />;
    }
    if (cat.includes("user") || cat.includes("identity") || cat.includes("account")) {
      return <User className="w-3.5 h-3.5 text-blue-400" />;
    }
    if (cat.includes("process") || cat.includes("execution")) {
      return <Terminal className="w-3.5 h-3.5 text-cyan-400" />;
    }
    return <Globe className="w-3.5 h-3.5 text-amber-400" />;
  };

  const isCrownJewel = (data.category || "").toLowerCase().includes("crown");

  return (
    <div
      className={`px-3 py-2 rounded-xl border bg-[#0d1526] shadow-xl text-xs font-mono w-52 select-none transition-all ${
        isCrownJewel
          ? "border-amber-600/80 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          : "border-slate-700 hover:border-blue-400"
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-500" />

      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5">
          {getIcon()}
          <span className="text-[10px] uppercase font-bold text-slate-400">{data.category || "Entity"}</span>
        </div>
        {data.criticality && (
          <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-950/80 px-1 py-0.5 rounded border border-amber-800/80">
            {data.criticality}
          </span>
        )}
      </div>

      <div className="font-bold text-white text-xs truncate">
        {data.label}
      </div>

      {data.role && (
        <div className="text-[10px] text-slate-400 truncate mt-0.5 font-sans">
          {data.role}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-blue-500" />
    </div>
  );
}
