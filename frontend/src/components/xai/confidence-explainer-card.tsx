"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, Layers, Sparkles, Activity } from "lucide-react";

export function ConfidenceExplainerCard() {
  const telemetryEvidence = [
    {
      sensor: "CrowdStrike Falcon (EDR)",
      weight: "35% Weight",
      confidence: 0.98,
      evidenceSummary: "Kernel-level execution hooks intercepted in-memory PowerShell cradle with suspicious call stack.",
      sourceIcon: "EDR",
    },
    {
      sensor: "Microsoft Defender XDR",
      weight: "30% Weight",
      confidence: 0.99,
      evidenceSummary: "Memory protection engine confirmed comsvcs.dll #24 MiniDump targeted against lsass.exe process.",
      sourceIcon: "AV",
    },
    {
      sensor: "Okta Identity Cloud (SSO/IAM)",
      weight: "20% Weight",
      confidence: 0.92,
      evidenceSummary: "Auth event origin IP tagged as active Tor Exit Node; consecutive failed push notifications prior to acceptance.",
      sourceIcon: "IAM",
    },
    {
      sensor: "Zeek / Corelight (NDR)",
      weight: "15% Weight",
      confidence: 0.95,
      evidenceSummary: "DNS query payload entropy of 4.9 bits/char with 52.4MB cumulative TXT record transfer to ns1.dark-c2.net.",
      sourceIcon: "NDR",
    },
  ];

  return (
    <Card glow="blue">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">
              EXPLAINABLE AI: CONFIDENCE RATING JUSTIFICATION
            </CardTitle>
          </div>
          <Badge variant="low" dot>
            97.4% MULTI-SENSOR CORROBORATION
          </Badge>
        </div>
        <CardDescription>
          Multi-source evidentiary grounding: algorithm confidence is backed by independent physical sensor corroboration.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 font-mono text-xs">
        {/* Statistical Summary Strip */}
        <div className="p-3.5 rounded-xl bg-[#090e1b] border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Composite Model Confidence</div>
            <div className="text-xl font-bold text-emerald-400">97.4% High</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Sensors in Agreement</div>
            <div className="text-xl font-bold text-cyan-300">4 / 4 Streams</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase">False-Positive Likelihood</div>
            <div className="text-xl font-bold text-slate-200">&lt; 0.6%</div>
          </div>
        </div>

        {/* Sensor Evidence Breakdown */}
        <div className="space-y-2">
          {telemetryEvidence.map((ev, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-[#0c1424] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{ev.sensor}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {ev.weight}
                  </span>
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  {ev.evidenceSummary}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-emerald-400 font-bold text-sm">
                  {(ev.confidence * 100).toFixed(0)}%
                </span>
                <div className="text-[9px] text-slate-500 uppercase">Confidence</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
