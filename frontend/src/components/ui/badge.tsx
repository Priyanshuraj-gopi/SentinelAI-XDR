import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wide transition-colors uppercase select-none border",
  {
    variants: {
      variant: {
        default: "bg-slate-800/80 text-slate-200 border-slate-700/60",
        critical: "bg-red-950/60 text-red-400 border-red-800/80 shadow-[0_0_8px_rgba(239,68,68,0.2)]",
        high: "bg-orange-950/60 text-orange-400 border-orange-800/80 shadow-[0_0_8px_rgba(249,115,22,0.2)]",
        medium: "bg-amber-950/60 text-amber-300 border-amber-700/80",
        low: "bg-emerald-950/60 text-emerald-400 border-emerald-800/80",
        info: "bg-sky-950/60 text-sky-400 border-sky-800/80",
        outline: "bg-transparent text-slate-300 border-slate-700",
        mitre: "bg-indigo-950/60 text-indigo-300 border-indigo-700/60 hover:border-indigo-500",
        suppressed: "bg-slate-900/90 text-slate-400 border-slate-800 line-through opacity-75"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "critical" && "bg-red-500 animate-pulse",
            variant === "high" && "bg-orange-500",
            variant === "medium" && "bg-amber-400",
            variant === "low" && "bg-emerald-400",
            variant === "info" && "bg-sky-400",
            (!variant || variant === "default") && "bg-slate-400"
          )}
        />
      )}
      {children}
    </span>
  );
}
