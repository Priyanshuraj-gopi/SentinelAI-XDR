"use client";

import React from "react";
import { Flame, ShieldAlert, AlertTriangle, ArrowUpRight, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { Button } from "@/components/ui/button";

interface ThreatLevelCardProps {
  threatLevel?: string;
  activeScore?: number;
  campaignName?: string;
  onInspectCampaign?: () => void;
}

export function ThreatLevelCard({
  threatLevel = "DEFCON 2 — Elevated Active Campaign",
  activeScore = 94.2,
  campaignName = "Operation DarkHydra (Dual-Pronged Ransomware Staging)",
  onInspectCampaign,
}: ThreatLevelCardProps) {
  return (
    <Card glow="critical" className="relative overflow-hidden">
      {/* Background ambient alert glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-red-950/80 text-red-400 border border-red-800/80 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              <Flame className="w-4 h-4 animate-pulse" />
            </span>
            <CardTitle className="text-red-400 font-mono">ENTERPRISE THREAT POSTURE</CardTitle>
          </div>
          <Badge variant="critical" dot>
            CRITICAL SEVERITY
          </Badge>
        </div>
        <CardDescription>
          Aggregated real-time risk index across all monitored endpoints, identities, and network perimeters.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#090e1b] border border-red-900/40">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Active Security Status
            </div>
            <div className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              {threatLevel}
            </div>
            <div className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
              <span className="text-slate-500">Primary Campaign:</span>
              <span className="text-amber-300 font-semibold">{campaignName}</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <RiskIndicator score={activeScore} size="lg" showGauge showLabel />
          </div>
        </div>

        {/* Dynamic Threat Factor Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#0e1628] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Asset Criticality Multiplier</span>
            <div className="text-sm font-bold text-red-400">1.50x (Crown Jewel)</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Domain Controller <span className="font-mono text-slate-200">DC-PRIMARY-01</span> targeted.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0e1628] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Kill-Chain Velocity</span>
            <div className="text-sm font-bold text-orange-400">1.70x (High Velocity)</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Initial access to lateral recon traversed in &lt; 45 minutes.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0e1628] border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Zero-Day Anomaly</span>
            <div className="text-sm font-bold text-purple-400">+12.5 Pts (Novel)</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Unusual Shannon entropy in parent PowerShell process.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <Button variant="cyber" size="sm" onClick={onInspectCampaign}>
            <span>Triage Attack Campaign</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
