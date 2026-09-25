"use client";

import React, { useState } from "react";
import { Alert } from "@/types";
import { Badge } from "@/components/ui/badge";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import {
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  ArrowRight,
  Server,
  User,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface AlertCardProps {
  alert: Alert;
  onInspectStory?: (clusterId: string) => void;
  onIsolateHost?: (host: string) => void;
  onOpenDetails?: (alert: Alert) => void;
}

export function AlertCard({ alert, onInspectStory, onIsolateHost, onOpenDetails }: AlertCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriority = (risk: number): { label: string; variant: "critical" | "high" | "medium" | "low" } => {
    if (risk >= 90) return { label: "P1 - CRITICAL", variant: "critical" };
    if (risk >= 70) return { label: "P2 - HIGH", variant: "high" };
    if (risk >= 40) return { label: "P3 - MEDIUM", variant: "medium" };
    return { label: "P4 - LOW", variant: "low" };
  };

  const priority = getPriority(alert.risk_score);
  const host = alert.raw_payload?.host || (alert.raw_payload?.client_ip ? `IP ${alert.raw_payload.client_ip}` : "WKSTN-FIN-04");
  const user = alert.raw_payload?.user || "j.doe@sentinel.corp";

  return (
    <div
      className={`rounded-xl border transition-all duration-200 bg-[#0c1324] hover:bg-[#0f172c] ${
        alert.severity.toLowerCase() === "critical"
          ? "border-red-900/60 hover:border-red-600/80 shadow-[0_0_12px_rgba(239,68,68,0.1)]"
          : alert.severity.toLowerCase() === "high"
          ? "border-orange-900/60 hover:border-orange-600/80"
          : "border-slate-800 hover:border-slate-700"
      }`}
    >
      {/* Primary Card Header */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                alert.severity.toLowerCase() === "critical"
                  ? "critical"
                  : alert.severity.toLowerCase() === "high"
                  ? "high"
                  : alert.severity.toLowerCase() === "medium"
                  ? "medium"
                  : "low"
              }
              dot
            >
              {alert.severity}
            </Badge>

            <Badge variant="outline" className="font-mono text-[10px]">
              {priority.label}
            </Badge>

            <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/80">
              {alert.source}
            </span>

            {alert.cluster_id && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                <Layers className="w-3 h-3 text-cyan-400" />
                Correlated ({alert.cluster_id})
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {formatDateTime(alert.created_at)}
            </span>
            <RiskIndicator score={alert.risk_score} size="sm" showLabel={false} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3
            onClick={() => onOpenDetails?.(alert)}
            className="text-sm font-bold text-white hover:text-blue-300 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>{alert.title}</span>
          </h3>
          {alert.description && (
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {alert.description}
            </p>
          )}
        </div>

        {/* Metadata Strip: MITRE, Entities & Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            {alert.mitre_mappings?.map((m) => (
              <Badge key={m.id} variant="mitre">
                {m.technique_id} {m.technique_name}
              </Badge>
            ))}

            <span className="flex items-center gap-1 text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
              <Server className="w-3 h-3 text-purple-400" />
              {host}
            </span>

            <span className="flex items-center gap-1 text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
              <User className="w-3 h-3 text-blue-400" />
              {user}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">
              Confidence: <strong className="text-emerald-400">{(alert.confidence * 100).toFixed(0)}%</strong>
            </span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors select-none"
            >
              <span>{isExpanded ? "Collapse Details" : "Expand Intelligence"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Intelligence Drawer */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-[#080d19] border-t border-slate-800/90 space-y-4 text-xs font-mono animate-in fade-in duration-150">
          {/* Explainable AI Rationale */}
          <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 space-y-1.5">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Explainable AI (XAI) Correlation Reason
            </div>
            <p className="text-slate-200 font-sans leading-relaxed text-xs">
              Alert was grouped with 3 companion detections into <strong className="text-white">Operation DarkHydra</strong> because parent process execution (<code className="text-cyan-300">powershell.exe</code>) on host <strong className="text-white">{host}</strong> was immediately preceded by an anomalous external Tor authentication token.
            </p>
          </div>

          {/* Raw Telemetry Artifact Snippet */}
          {alert.raw_payload && (
            <div className="space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-cyan-400" />
                Raw Telemetry Execution Artifact
              </div>
              <pre className="p-3 rounded-lg bg-black/70 border border-slate-800/80 text-[11px] text-cyan-300 overflow-x-auto">
                {JSON.stringify(alert.raw_payload, null, 2)}
              </pre>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/70">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">DECISION ACTIONS:</span>
              <button
                onClick={() => onIsolateHost?.(host)}
                className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-700 font-semibold text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <Lock className="w-3 h-3" />
                Isolate {host}
              </button>
            </div>

            {alert.cluster_id && (
              <Button
                variant="cyber"
                size="sm"
                onClick={() => onInspectStory?.(alert.cluster_id!)}
              >
                <span>View Attack Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
