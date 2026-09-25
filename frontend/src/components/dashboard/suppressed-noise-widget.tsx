"use client";

import React from "react";
import { Filter, Zap, CheckCircle2, ShieldOff, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SuppressedNoiseWidget() {
  const categories = [
    { name: "Authorized Vulnerability Scans (Nessus/Qualys)", count: 12480, percentage: "53.3%", status: "Auto-Suppressed" },
    { name: "Duplicate Syslog Heartbeats & Health Probes", count: 6812, percentage: "29.1%", status: "De-duplicated" },
    { name: "IT Maintenance Cron Scripts (Backup/Patching)", count: 2840, percentage: "12.1%", status: "Whitelist Rule" },
    { name: "Benign Tor Probe Ping Sweeps (External Port 443)", count: 1280, percentage: "5.5%", status: "Threat Intel Filter" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              <Zap className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">ALERT NOISE SUPPRESSION ENGINE</CardTitle>
          </div>
          <Badge variant="low">94.8% FATIGUE REDUCTION</Badge>
        </div>
        <CardDescription>
          23,412 noisy background alerts filtered out automatically before reaching analyst queues.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        <div className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Gross Alert Intake</div>
            <div className="text-xl font-bold text-slate-200">24,680 Alerts</div>
          </div>
          <div className="text-center font-bold text-slate-500 text-lg">→</div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Actionable Attack Stories</div>
            <div className="text-xl font-bold text-red-400">14 Stories</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase">Compression Ratio</div>
            <div className="text-xl font-bold text-emerald-400">1,762 : 1</div>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-[#0c1424] border border-slate-800/80 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-sans text-xs">{cat.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{cat.count.toLocaleString()}</span>
                <span className="text-emerald-400 font-bold w-12 text-right">{cat.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
