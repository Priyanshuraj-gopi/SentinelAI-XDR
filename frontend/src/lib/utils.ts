import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return isoString;
  }
}

export function getSeverityColor(severity: string): { bg: string; text: string; border: string; glow: string } {
  switch (severity?.toLowerCase()) {
    case "critical":
      return {
        bg: "bg-red-950/60",
        text: "text-red-400",
        border: "border-red-600/50",
        glow: "shadow-[0_0_12px_rgba(239,68,68,0.3)]",
      };
    case "high":
      return {
        bg: "bg-orange-950/60",
        text: "text-orange-400",
        border: "border-orange-600/50",
        glow: "shadow-[0_0_12px_rgba(249,115,22,0.3)]",
      };
    case "medium":
      return {
        bg: "bg-yellow-950/60",
        text: "text-yellow-400",
        border: "border-yellow-600/50",
        glow: "shadow-[0_0_12px_rgba(234,179,8,0.3)]",
      };
    case "low":
      return {
        bg: "bg-emerald-950/60",
        text: "text-emerald-400",
        border: "border-emerald-600/50",
        glow: "shadow-[0_0_12px_rgba(34,197,94,0.3)]",
      };
    default:
      return {
        bg: "bg-sky-950/60",
        text: "text-sky-400",
        border: "border-sky-600/50",
        glow: "shadow-[0_0_12px_rgba(56,189,248,0.3)]",
      };
  }
}
