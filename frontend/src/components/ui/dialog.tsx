import * as React from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  variant?: "default" | "destructive" | "containment";
  isLoading?: boolean;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default",
  isLoading = false,
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-xl border border-slate-700/80 bg-[#0c1322] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {variant === "destructive" || variant === "containment" ? (
              <div className="p-2 rounded-lg bg-red-950/70 text-red-400 border border-red-800/80">
                <AlertTriangle className="w-5 h-5" />
              </div>
            ) : null}
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
              {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {children && <div className="p-5 text-xs text-slate-300 space-y-3">{children}</div>}

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0a0f1b] flex items-center justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "containment" ? "containment" : variant === "destructive" ? "destructive" : "default"}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
