import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface WidgetProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    direction: "up" | "down" | "neutral";
    isPositive?: boolean; // In SOC, lower MTTD or lower alerts is positive!
  };
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "default" | "critical" | "warning" | "success" | "blue";
  className?: string;
}

export function Widget({
  title,
  value,
  change,
  subtitle,
  icon,
  variant = "default",
  className,
}: WidgetProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "critical":
        return "border-red-800/60 bg-gradient-to-b from-red-950/40 to-[#0c1322] shadow-[0_0_15px_rgba(239,68,68,0.1)]";
      case "warning":
        return "border-orange-800/60 bg-gradient-to-b from-orange-950/40 to-[#0c1322] shadow-[0_0_15px_rgba(249,115,22,0.1)]";
      case "success":
        return "border-emerald-800/60 bg-gradient-to-b from-emerald-950/40 to-[#0c1322] shadow-[0_0_15px_rgba(34,197,94,0.1)]";
      case "blue":
        return "border-blue-700/60 bg-gradient-to-b from-blue-950/40 to-[#0c1322] shadow-[0_0_15px_rgba(59,130,246,0.1)]";
      default:
        return "border-slate-800/80 bg-[#0c1322]/90";
    }
  };

  const renderTrend = () => {
    if (!change) return null;
    const isGood = change.isPositive !== undefined ? change.isPositive : change.direction === "up";
    const color = isGood ? "text-emerald-400 bg-emerald-950/60 border-emerald-800/60" : "text-red-400 bg-red-950/60 border-red-800/60";

    return (
      <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-mono font-bold", color)}>
        {change.direction === "up" && <TrendingUp className="w-3 h-3" />}
        {change.direction === "down" && <TrendingDown className="w-3 h-3" />}
        {change.direction === "neutral" && <Minus className="w-3 h-3" />}
        <span>{change.value}</span>
      </span>
    );
  };

  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-xl border backdrop-blur text-slate-100 flex flex-col justify-between transition-all hover:border-slate-700",
        getVariantStyles(),
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2.5 my-1">
        <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
        {renderTrend()}
      </div>

      {subtitle && <p className="text-[11px] text-slate-400 font-mono mt-1">{subtitle}</p>}
    </div>
  );
}
