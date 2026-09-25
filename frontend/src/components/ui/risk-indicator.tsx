import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, ShieldCheck, Flame } from "lucide-react";

interface RiskIndicatorProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showGauge?: boolean;
  className?: string;
}

export function RiskIndicator({
  score,
  size = "md",
  showLabel = true,
  showGauge = true,
  className,
}: RiskIndicatorProps) {
  const clampedScore = Math.min(Math.max(score, 0), 100);

  const getTier = (val: number) => {
    if (val >= 85) return { label: "CRITICAL", color: "text-red-400", stroke: "#ef4444", bg: "bg-red-950/60 border-red-800/80", icon: Flame };
    if (val >= 65) return { label: "HIGH", color: "text-orange-400", stroke: "#f97316", bg: "bg-orange-950/60 border-orange-800/80", icon: AlertTriangle };
    if (val >= 40) return { label: "MEDIUM", color: "text-yellow-400", stroke: "#eab308", bg: "bg-yellow-950/60 border-yellow-800/80", icon: AlertTriangle };
    return { label: "LOW", color: "text-emerald-400", stroke: "#22c55e", bg: "bg-emerald-950/60 border-emerald-800/80", icon: ShieldCheck };
  };

  const tier = getTier(clampedScore);
  const Icon = tier.icon;

  // Circular gauge calculations
  const radius = size === "lg" ? 28 : size === "md" ? 20 : 14;
  const strokeWidth = size === "lg" ? 4 : 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  if (size === "sm") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded border font-mono font-bold text-xs select-none",
          tier.bg,
          tier.color,
          className
        )}
      >
        <Icon className="w-3 h-3" />
        <span>{clampedScore.toFixed(0)}</span>
        {showLabel && <span className="text-[10px] opacity-80">({tier.label})</span>}
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-3 p-2 rounded-lg border bg-[#0d1424] border-slate-800/80", className)}>
      {showGauge && (
        <div className="relative flex items-center justify-center">
          <svg
            className="transform -rotate-90"
            width={radius * 2 + strokeWidth * 2}
            height={radius * 2 + strokeWidth * 2}
          >
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke="#1e293b"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke={tier.stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <span className={cn("absolute font-mono font-bold text-xs", tier.color)}>
            {clampedScore.toFixed(0)}
          </span>
        </div>
      )}

      {showLabel && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <Icon className={cn("w-3.5 h-3.5", tier.color)} />
            <span className={cn("text-xs font-mono font-bold uppercase", tier.color)}>
              {tier.label} RISK
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Score: {clampedScore.toFixed(1)} / 100
          </span>
        </div>
      )}
    </div>
  );
}
