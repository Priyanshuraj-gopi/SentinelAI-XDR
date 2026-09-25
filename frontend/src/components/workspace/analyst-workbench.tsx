"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { EvidenceInspectorDrawer } from "./evidence-inspector-drawer";
import { DecisionHistoryLog } from "./decision-history-log";
import { InvestigationNotesPad } from "./investigation-notes-pad";
import { AnalystFeedbackBar } from "./analyst-feedback-bar";
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Lock,
  Globe,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  UserCheck,
  Send,
  Zap,
} from "lucide-react";

import { XaiWorkspaceView } from "../xai/xai-workspace-view";

export function AnalystWorkbench() {
  const [activeSubTab, setActiveSubTab] = useState<"workbench" | "xai">("workbench");
  const [quarantined, setQuarantined] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const [blockedIp, setBlockedIp] = useState(false);
  const [dnsSinkholed, setDnsSinkholed] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleAction = (actionName: string, stateSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    stateSetter(true);
    setActionNotice(`Executed: ${actionName} applied immediately across SOC agents.`);
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Sub-view switcher bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab("workbench")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
            activeSubTab === "workbench"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
              : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Incident Workbench &amp; SOAR Playbook</span>
        </button>

        <button
          onClick={() => setActiveSubTab("xai")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
            activeSubTab === "xai"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
              : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Explainable AI (XAI) Deep Attribution</span>
        </button>
      </div>

      {activeSubTab === "xai" ? (
        <XaiWorkspaceView />
      ) : (
        <>
      {/* Workbench Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-[#090d1a] border border-slate-800 shadow-2xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/80">
              <Zap className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-white font-mono">
              ANALYST WORKBENCH &amp; SOAR PLAYBOOK
            </h1>
            <Badge variant="critical">TIER-3 ACTIVE INCIDENT</Badge>
            <Badge variant="outline">STORY #001</Badge>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Investigating Campaign: <span className="text-cyan-400 font-bold">Operation DarkHydra</span> | Assigned: Lead SOC Analyst (You) | SLA Deadline: <span className="text-amber-400">18m 42s remaining</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase font-mono text-slate-400">Overall Attack Severity</div>
            <div className="text-xs text-rose-400 font-bold font-mono">98.4 / 100 CRITICAL</div>
          </div>
          <RiskIndicator score={98.4} size="md" />
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-mono animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* 1-Click Automated SOAR Mitigation Playbook Bar */}
      <Card glow="blue">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-950 text-blue-400 border border-blue-800">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <CardTitle className="text-white font-mono text-sm">
                RAPID CONTAINMENT &amp; SOAR ORCHESTRATION ACTIONS
              </CardTitle>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
              ZERO-TRUST AGENT API READY
            </span>
          </div>
          <CardDescription>
            One-click execution triggers immediate containment across CrowdStrike EDR, Okta Identity, and Palo Alto Firewalls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Action 1: Host Quarantine */}
            <div className="p-3 rounded-xl bg-[#090e1b] border border-slate-800/80 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold font-mono">Quarantine Host</span>
                  {quarantined ? (
                    <Badge variant="low">ISOLATED</Badge>
                  ) : (
                    <Badge variant="critical">PENDING</Badge>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">WKSTN-FIN-04 (CrowdStrike)</p>
              </div>
              <Button
                variant={quarantined ? "secondary" : "destructive"}
                size="sm"
                disabled={quarantined}
                onClick={() => handleAction("Host Quarantine (WKSTN-FIN-04)", setQuarantined)}
                className="w-full text-xs font-mono"
              >
                {quarantined ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Host Quarantined
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 mr-1" /> Quarantine Host
                  </>
                )}
              </Button>
            </div>

            {/* Action 2: Revoke Identity Session */}
            <div className="p-3 rounded-xl bg-[#090e1b] border border-slate-800/80 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold font-mono">Revoke Tokens</span>
                  {revoked ? (
                    <Badge variant="low">REVOKED</Badge>
                  ) : (
                    <Badge variant="critical">PENDING</Badge>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">j.doe@sentinel.corp (Okta)</p>
              </div>
              <Button
                variant={revoked ? "secondary" : "containment"}
                size="sm"
                disabled={revoked}
                onClick={() => handleAction("Revoke Identity Session & Invalidate Tokens", setRevoked)}
                className="w-full text-xs font-mono"
              >
                {revoked ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Sessions Killed
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 mr-1" /> Invalidate Tokens
                  </>
                )}
              </Button>
            </div>

            {/* Action 3: Ingress Perimeter Block */}
            <div className="p-3 rounded-xl bg-[#090e1b] border border-slate-800/80 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold font-mono">Block Ingress IP</span>
                  {blockedIp ? (
                    <Badge variant="low">BLOCKED</Badge>
                  ) : (
                    <Badge variant="high">RECOMMENDED</Badge>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">185.220.101.5 (Palo Alto)</p>
              </div>
              <Button
                variant={blockedIp ? "secondary" : "default"}
                size="sm"
                disabled={blockedIp}
                onClick={() => handleAction("Block Ingress IP (185.220.101.5) on Edge Firewalls", setBlockedIp)}
                className="w-full text-xs font-mono bg-blue-600 hover:bg-blue-500"
              >
                {blockedIp ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Ingress Blocked
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5 mr-1" /> Block Ingress IP
                  </>
                )}
              </Button>
            </div>

            {/* Action 4: DNS Tunnel Sinkhole */}
            <div className="p-3 rounded-xl bg-[#090e1b] border border-slate-800/80 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold font-mono">Sinkhole DNS</span>
                  {dnsSinkholed ? (
                    <Badge variant="low">SINKHOLED</Badge>
                  ) : (
                    <Badge variant="medium">RECOMMENDED</Badge>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">*.dark-c2.net (CoreDNS)</p>
              </div>
              <Button
                variant={dnsSinkholed ? "secondary" : "outline"}
                size="sm"
                disabled={dnsSinkholed}
                onClick={() => handleAction("Sinkhole *.dark-c2.net across Corporate Resolvers", setDnsSinkholed)}
                className="w-full text-xs font-mono"
              >
                {dnsSinkholed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> DNS Sinkholed
                  </>
                ) : (
                  <>
                    <Radio className="w-3.5 h-3.5 mr-1 text-purple-400" /> Sinkhole Domain
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forensic Evidence Drawer & Deep Breakdown */}
      <EvidenceInspectorDrawer />

      {/* Two-Column Layout: Collaboration Notes & Decision Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InvestigationNotesPad />
        <DecisionHistoryLog />
      </div>

      {/* Human-in-the-Loop Active Learning Feedback */}
      <AnalystFeedbackBar storyId="story-001" />
        </>
      )}
    </div>
  );
}
