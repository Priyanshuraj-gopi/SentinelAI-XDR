"use client";

import React from "react";
import { Sparkles, HelpCircle, ShieldAlert, FileText, ArrowRight } from "lucide-react";

interface CopilotQuickActionsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export function CopilotQuickActions({ onSelectPrompt, disabled }: CopilotQuickActionsProps) {
  const quickPrompts = [
    {
      id: "what-happened",
      label: "What happened?",
      query: "What happened in this incident?",
      icon: HelpCircle,
      desc: "Root cause & attack progression timeline",
      glow: "border-blue-500/50 hover:bg-blue-950/40 text-blue-300",
    },
    {
      id: "why-fired",
      label: "Why did this alert fire?",
      query: "Why did this alert fire and what evidence corroborated it?",
      icon: Sparkles,
      desc: "Telemetry evidence & multi-sensor validation",
      glow: "border-cyan-500/50 hover:bg-cyan-950/40 text-cyan-300",
    },
    {
      id: "containment",
      label: "What should I do?",
      query: "What containment actions should I execute to neutralize the threat?",
      icon: ShieldAlert,
      desc: "Prioritized SOAR containment steps",
      glow: "border-emerald-500/50 hover:bg-emerald-950/40 text-emerald-300",
    },
    {
      id: "ciso-summary",
      label: "Summarize for CISO",
      query: "Summarize this incident for CISO and executive leadership",
      icon: FileText,
      desc: "Business impact, data exposure & posture brief",
      glow: "border-purple-500/50 hover:bg-purple-950/40 text-purple-300",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
        <span>Suggested AI Prompts</span>
        <span className="text-[10px] text-blue-400">Context: Story #001 (DarkHydra)</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quickPrompts.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              disabled={disabled}
              onClick={() => onSelectPrompt(item.query)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border bg-[#0b101f]/90 text-left transition-all ${item.glow} group disabled:opacity-50 disabled:pointer-events-none`}
            >
              <span className="p-1 rounded bg-black/40 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold font-mono group-hover:text-white flex items-center justify-between">
                  <span>{item.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
