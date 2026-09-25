"use client";

import React, { useState } from "react";
import { Grid, Layers, ExternalLink, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MITRETactic {
  id: string;
  name: string;
  count: number;
  criticality: "critical" | "high" | "medium" | "low" | "none";
  techniques: Array<{ id: string; name: string; alerts: number }>;
}

export function MITREHeatmap() {
  const [selectedTactic, setSelectedTactic] = useState<MITRETactic | null>(null);

  const tactics: MITRETactic[] = [
    {
      id: "TA0001",
      name: "Initial Access",
      count: 14,
      criticality: "high",
      techniques: [
        { id: "T1078.004", name: "Cloud Accounts (VPN)", alerts: 8 },
        { id: "T1566.002", name: "Spearphishing Link", alerts: 6 },
      ],
    },
    {
      id: "TA0002",
      name: "Execution",
      count: 28,
      criticality: "critical",
      techniques: [
        { id: "T1059.001", name: "PowerShell", alerts: 19 },
        { id: "T1059.003", name: "Windows Command Shell", alerts: 9 },
      ],
    },
    {
      id: "TA0003",
      name: "Persistence",
      count: 6,
      criticality: "medium",
      techniques: [
        { id: "T1053.005", name: "Scheduled Task", alerts: 6 },
      ],
    },
    {
      id: "TA0004",
      name: "Privilege Escalation",
      count: 12,
      criticality: "high",
      techniques: [
        { id: "T1068", name: "Exploitation for Privilege Escalation", alerts: 7 },
        { id: "T1548.002", name: "Bypass UAC", alerts: 5 },
      ],
    },
    {
      id: "TA0005",
      name: "Defense Evasion",
      count: 22,
      criticality: "critical",
      techniques: [
        { id: "T1027", name: "Obfuscated Files or Information", alerts: 14 },
        { id: "T1070", name: "Indicator Removal on Host", alerts: 8 },
      ],
    },
    {
      id: "TA0006",
      name: "Credential Access",
      count: 19,
      criticality: "critical",
      techniques: [
        { id: "T1003.001", name: "LSASS Memory Dump", alerts: 12 },
        { id: "T1558.003", name: "Kerberoasting", alerts: 7 },
      ],
    },
    {
      id: "TA0007",
      name: "Discovery",
      count: 8,
      criticality: "medium",
      techniques: [
        { id: "T1087", name: "Account Discovery", alerts: 5 },
        { id: "T1018", name: "Remote System Discovery", alerts: 3 },
      ],
    },
    {
      id: "TA0008",
      name: "Lateral Movement",
      count: 16,
      criticality: "critical",
      techniques: [
        { id: "T1021.002", name: "SMB/Windows Admin Shares", alerts: 10 },
        { id: "T1550.002", name: "Pass the Hash", alerts: 6 },
      ],
    },
    {
      id: "TA0010",
      name: "Exfiltration",
      count: 11,
      criticality: "critical",
      techniques: [
        { id: "T1048.003", name: "Exfiltration Over DNS", alerts: 8 },
        { id: "T1567", name: "Exfiltration Over Web Service", alerts: 3 },
      ],
    },
    {
      id: "TA0040",
      name: "Impact",
      count: 3,
      criticality: "high",
      techniques: [
        { id: "T1486", name: "Data Encrypted for Impact", alerts: 3 },
      ],
    },
  ];

  const getHeatmapColor = (crit: MITRETactic["criticality"]) => {
    switch (crit) {
      case "critical":
        return "bg-red-950/70 text-red-300 border-red-700 hover:bg-red-900/80 shadow-[0_0_8px_rgba(239,68,68,0.25)]";
      case "high":
        return "bg-orange-950/70 text-orange-300 border-orange-700 hover:bg-orange-900/80";
      case "medium":
        return "bg-amber-950/70 text-amber-300 border-amber-700 hover:bg-amber-900/80";
      case "low":
        return "bg-emerald-950/70 text-emerald-300 border-emerald-700 hover:bg-emerald-900/80";
      default:
        return "bg-slate-900/50 text-slate-500 border-slate-800";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-indigo-950/80 text-indigo-400 border border-indigo-800/80">
              <Grid className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">MITRE ATT&CK® TACTICAL HEATMAP</CardTitle>
          </div>
          <Badge variant="mitre">ENTERPRISE MATRIX v14</Badge>
        </div>
        <CardDescription>
          Real-time detection density across the cyber kill chain. Click any tactic cell to drill down into active techniques.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Heatmap Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {tactics.map((tactic) => (
            <button
              key={tactic.id}
              onClick={() => setSelectedTactic(tactic)}
              className={`p-2.5 rounded-lg border flex flex-col justify-between text-left transition-all duration-150 h-24 select-none ${getHeatmapColor(
                tactic.criticality
              )} ${selectedTactic?.id === tactic.id ? "ring-2 ring-blue-400" : ""}`}
            >
              <div className="text-[10px] font-mono font-bold uppercase opacity-80 line-clamp-2">
                {tactic.name}
              </div>
              <div className="flex items-end justify-between font-mono">
                <span className="text-base font-bold">{tactic.count}</span>
                <span className="text-[9px] opacity-70">alts</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Tactic Technique Drawer */}
        {selectedTactic && (
          <div className="p-4 rounded-xl bg-[#090e1b] border border-slate-800 space-y-2 animate-in fade-in duration-150 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-400" />
                Active Techniques in {selectedTactic.name} ({selectedTactic.id})
              </span>
              <button
                onClick={() => setSelectedTactic(null)}
                className="text-slate-400 hover:text-white text-[11px]"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {selectedTactic.techniques.map((tech) => (
                <div
                  key={tech.id}
                  className="p-2 rounded-md bg-[#0c1424] border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="text-cyan-400 font-bold">{tech.id}</span>
                    <span className="text-slate-300 ml-2">{tech.name}</span>
                  </div>
                  <Badge variant="critical">{tech.alerts} hits</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
