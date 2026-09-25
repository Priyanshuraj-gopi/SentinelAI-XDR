import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "critical" | "high" | "blue" | "none";
}

export function Card({ className, glow = "none", ...props }: CardProps) {
  const glowStyle = {
    critical: "border-red-800/60 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    high: "border-orange-800/60 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
    blue: "border-blue-600/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    none: "border-slate-800/80",
  }[glow];

  return (
    <div
      className={cn(
        "rounded-xl border bg-[#0c1322]/90 backdrop-blur text-slate-100 transition-all",
        glowStyle,
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-4 sm:p-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm font-semibold tracking-tight text-white flex items-center gap-2", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-slate-400 leading-relaxed", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 sm:p-5 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-4 sm:p-5 pt-0 border-t border-slate-800/60 mt-4", className)} {...props} />;
}
