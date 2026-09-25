import React from "react";
import { cn } from "@/lib/utils";

export type IncidentStatus = "Active" | "In-Progress" | "Contained" | "Resolved" | "Suppressed" | "Investigating";

interface StatusPillProps {
  status: IncidentStatus | string;
  size?: "sm" | "md";
  showDot?: boolean;
  className?: string;
}

export function StatusPill({ status, size = "md", showDot = true, className }: StatusPillProps) {
  const normalized = status.toLowerCase();

  const getStyle = () => {
    if (normalized.includes("active") || normalized.includes("critical")) {
      return {
        bg: "bg-red-950/60 text-red-400 border-red-700/60",
        dot: "bg-red-400",
        ping: true,
      };
    }
    if (normalized.includes("progress") || normalized.includes("investigating")) {
      return {
        bg: "bg-amber-950/60 text-amber-300 border-amber-700/60",
        dot: "bg-amber-400",
        ping: false,
      };
    }
    if (normalized.includes("contained")) {
      return {
        bg: "bg-blue-950/60 text-blue-300 border-blue-700/60",
        dot: "bg-blue-400",
        ping: false,
      };
    }
    if (normalized.includes("resolved")) {
      return {
        bg: "bg-emerald-950/60 text-emerald-400 border-emerald-700/60",
        dot: "bg-emerald-400",
        ping: false,
      };
    }
    // Suppressed or benign
    return {
      bg: "bg-slate-900/90 text-slate-400 border-slate-700/60",
      dot: "bg-slate-500",
      ping: false,
    };
  };

  const style = getStyle();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono font-medium tracking-wide uppercase select-none transition-all",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        style.bg,
        className
      )}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          {style.ping && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                style.dot
              )}
            />
          )}
          <span className={cn("relative inline-flex rounded-full h-2 w-2", style.dot)} />
        </span>
      )}
      {status}
    </span>
  );
}
