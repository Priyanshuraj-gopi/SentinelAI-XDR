import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "default" | "wide";
}

export function Panel({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  footer,
  width = "default",
}: PanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className={cn(
          "h-full bg-[#0a0f1d] border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200",
          width === "wide" ? "w-full max-w-2xl" : "w-full max-w-lg"
        )}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-[#0d1426] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">{title}</h2>
              {badge}
            </div>
            {subtitle && <p className="text-xs text-slate-400 font-mono">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-slate-800/80 bg-[#0c1222] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
