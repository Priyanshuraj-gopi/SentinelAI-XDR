import React from "react";
import { AlertCircle, CheckCircle, Info, X, ShieldAlert, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: "critical" | "warning" | "success" | "info";
  timestamp?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationBannerProps {
  notification: NotificationItem;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function NotificationBanner({ notification, onDismiss, className }: NotificationBannerProps) {
  const getStyle = () => {
    switch (notification.type) {
      case "critical":
        return {
          border: "border-red-600/70",
          bg: "bg-red-950/80",
          icon: ShieldAlert,
          iconColor: "text-red-400",
          glow: "shadow-[0_0_15px_rgba(239,68,68,0.2)]",
        };
      case "warning":
        return {
          border: "border-orange-600/70",
          bg: "bg-orange-950/80",
          icon: AlertCircle,
          iconColor: "text-orange-400",
          glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)]",
        };
      case "success":
        return {
          border: "border-emerald-600/70",
          bg: "bg-emerald-950/80",
          icon: CheckCircle,
          iconColor: "text-emerald-400",
          glow: "shadow-[0_0_15px_rgba(34,197,94,0.2)]",
        };
      default:
        return {
          border: "border-blue-600/70",
          bg: "bg-blue-950/80",
          icon: Info,
          iconColor: "text-blue-400",
          glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",
        };
    }
  };

  const style = getStyle();
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 p-3.5 rounded-lg border backdrop-blur text-xs",
        style.bg,
        style.border,
        style.glow,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", style.iconColor)} />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">{notification.title}</span>
            {notification.timestamp && (
              <span className="text-[10px] font-mono text-slate-400">
                {notification.timestamp}
              </span>
            )}
          </div>
          <p className="text-slate-300 leading-relaxed">{notification.message}</p>
          {notification.actionLabel && (
            <button
              onClick={notification.onAction}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-white underline hover:text-blue-300 pt-1"
            >
              <span>{notification.actionLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {onDismiss && (
        <button
          onClick={() => onDismiss(notification.id)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-black/30 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
