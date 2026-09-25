import React from "react";
import {
  Activity,
  ShieldAlert,
  BookOpen,
  GitFork,
  Cpu,
  Terminal,
  CheckCircle2,
  Layers,
  Sparkles,
  Fingerprint,
  FileText
} from "lucide-react";
import { useSecurityStore } from "@/store/useSecurityStore";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const { activeTab, setActiveTab } = useSecurityStore();

  const navItems = [
    {
      id: "dashboard" as const,
      label: "Executive Dashboard",
      icon: Activity,
      badge: "LIVE",
      badgeVariant: "info" as const,
    },
    {
      id: "alerts" as const,
      label: "Correlated Alert Feed",
      icon: ShieldAlert,
      count: "24.6k",
    },
    {
      id: "stories" as const,
      label: "Attack Story Builder",
      icon: BookOpen,
      badge: "14 STORIES",
      badgeVariant: "critical" as const,
    },
    {
      id: "graph" as const,
      label: "Attack Graphs & Trees",
      icon: GitFork,
      badge: "REACT FLOW",
      badgeVariant: "default" as const,
    },
    {
      id: "novel" as const,
      label: "Novel Attack Detector",
      icon: Fingerprint,
      badge: "ZERO-DAY",
      badgeVariant: "mitre" as const,
    },
    {
      id: "workspace" as const,
      label: "Analyst Workspace",
      icon: Cpu,
      badge: "SOAR READY",
      badgeVariant: "info" as const,
    },
    {
      id: "copilot" as const,
      label: "AI SOC Copilot",
      icon: Sparkles,
      badge: "LLM CHAT",
      badgeVariant: "mitre" as const,
    },
    {
      id: "reports" as const,
      label: "Executive Reports",
      icon: FileText,
      badge: "PDF EXPORT",
      badgeVariant: "low" as const,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-[#090d1a] flex flex-col justify-between p-3 select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
          <span>SOC Navigation</span>
          <span className="text-blue-400">v1.0-RC</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span className="tracking-tight">{item.label}</span>
              </div>

              {item.badge && (
                <Badge variant={item.badgeVariant} className="text-[9px] px-1.5 py-0">
                  {item.badge}
                </Badge>
              )}

              {item.count && (
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Engine Status & Telemetry Stack */}
      <div className="p-3 rounded-lg border border-slate-800 bg-[#0c1322] space-y-2.5 font-mono text-[11px]">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-blue-400" />
            FastAPI 0.111
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Online
          </span>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-purple-400" />
            NetworkX Clust.
          </span>
          <span className="text-emerald-400">95% Opt.</span>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Next 15 + React 19
          </span>
          <span className="text-cyan-400">Active</span>
        </div>
      </div>
    </aside>
  );
}
