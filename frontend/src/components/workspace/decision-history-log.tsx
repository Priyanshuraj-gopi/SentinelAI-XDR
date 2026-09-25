"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ShieldCheck, Terminal, User, Sparkles, CheckCircle2 } from "lucide-react";

export function DecisionHistoryLog() {
  const decisions = [
    {
      time: "12:15:22 UTC",
      actor: "Lead Analyst (Tier 3)",
      action: "Quarantine Host & Revoke Token Enforced",
      detail: "Approved emergency containment recommendation for WKSTN-FIN-04 and j.doe session.",
      type: "analyst",
    },
    {
      time: "12:12:05 UTC",
      actor: "SentinelAI Dynamic Risk Engine",
      action: "Risk Score Elevated to 98.4 / 100",
      detail: "Triggered by Domain Controller reconnaissance targeting DC-PRIMARY-01.corp.",
      type: "ai",
    },
    {
      time: "12:08:40 UTC",
      actor: "SentinelAI Correlation Engine",
      action: "Synthesized Operation DarkHydra Narrative",
      detail: "Grouped 86 telemetry alerts across CrowdStrike, Defender, Okta, and Zeek into unified story.",
      type: "ai",
    },
    {
      time: "12:04:12 UTC",
      actor: "SentinelAI Novel Detector",
      action: "Zero-Day Behavioral Outlier Flagged (3.4σ)",
      detail: "Shannon entropy of 5.92 bits/char detected in in-memory powershell.exe execution.",
      type: "ai",
    },
    {
      time: "11:58:30 UTC",
      actor: "SentinelAI Ingestion Normalizer",
      action: "Suppressed 396 Background Decoy Alerts",
      detail: "Filtered authorized Qualys scanner sweeps and routine syslog heartbeats.",
      type: "ai",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
              <Clock className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono text-sm">
              INCIDENT DECISION &amp; MITIGATION AUDIT LOG
            </CardTitle>
          </div>
          <Badge variant="outline">IMMUTABLE SOC LOG</Badge>
        </div>
        <CardDescription>
          Real-time record of algorithmic correlations, risk escalations, and human-in-the-loop decisions.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        {decisions.map((dec, i) => (
          <div
            key={i}
            className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 flex items-start justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xs">{dec.action}</span>
                <Badge variant={dec.type === "analyst" ? "low" : "mitre"} className="text-[9px]">
                  {dec.actor}
                </Badge>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {dec.detail}
              </p>
            </div>

            <div className="shrink-0 text-right text-[11px] text-slate-400">
              {dec.time}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
