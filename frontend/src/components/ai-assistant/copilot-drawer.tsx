"use client";

import React, { useEffect } from "react";
import { useSecurityStore } from "@/store/useSecurityStore";
import { CopilotChatView } from "./copilot-chat-view";
import { X, Sparkles, Bot, Maximize2 } from "lucide-react";

export function CopilotDrawer() {
  const { isCopilotOpen, setIsCopilotOpen, setActiveTab } = useSecurityStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCopilotOpen) {
        setIsCopilotOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCopilotOpen, setIsCopilotOpen]);

  if (!isCopilotOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      {/* Backdrop click to close */}
      <div
        className="flex-1"
        onClick={() => setIsCopilotOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className="w-full max-w-2xl h-full bg-[#070b14] border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-4 py-2 bg-[#090d1a] border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive SOC Sidecar</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setIsCopilotOpen(false);
                setActiveTab("copilot");
              }}
              title="Expand to Full Page View"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsCopilotOpen(false)}
              title="Close Drawer (Esc)"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-3">
          <CopilotChatView />
        </div>
      </div>
    </div>
  );
}
