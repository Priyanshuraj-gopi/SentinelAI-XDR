"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitFork, Terminal, AlertTriangle, ArrowRight, Activity, ShieldAlert, Cpu } from "lucide-react";

export function BehaviorGraphCard() {
  const executionNodes = [
    {
      id: "node-1",
      process: "explorer.exe (PID 2108)",
      role: "User Interactive Shell",
      deviation: "Normal Baseline (0.1σ)",
      isAnomaly: false,
      entropy: "3.2 bits",
    },
    {
      id: "node-2",
      process: "powershell.exe -Enc (PID 4812)",
      role: "Living-off-the-Land Cradle",
      deviation: "Critical Outlier (3.4σ)",
      isAnomaly: true,
      entropy: "5.92 bits",
    },
    {
      id: "node-3",
      process: "rundll32.exe comsvcs.dll (PID 6104)",
      role: "In-Memory LSASS Dumper",
      deviation: "High Outlier (2.8σ)",
      isAnomaly: true,
      entropy: "4.81 bits",
    },
    {
      id: "node-4",
      process: "Raw Socket Egress (ns1.dark-c2.net)",
      role: "DNS Tunneling Channel",
      deviation: "Critical Outlier (4.1σ)",
      isAnomaly: true,
      entropy: "6.12 bits",
    },
  ];

  return (
    <Card glow="critical">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-950/80 text-purple-400 border border-purple-800/80">
              <Cpu className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">
              BEHAVIORAL EXECUTION LINEAGE GRAPH
            </CardTitle>
          </div>
          <Badge variant="critical">3.4σ STATISTICAL OUTLIER</Badge>
        </div>
        <CardDescription>
          Zero-signature anomaly detection: models parent-child process relationships, Shannon entropy, and API syscall sequences.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Anomaly Gauge Strip */}
        <div className="p-4 rounded-xl bg-[#090e1b] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Detection Methodology</div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span>Unsupervised Isolation Forest + Entropy Scanner</span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Identifies novel attacks where zero antivirus signatures or known IOC hashes exist.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-right">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Novelty Confidence</div>
              <div className="text-xl font-bold text-emerald-400">91.4% Match</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Z-Score Deviation</div>
              <div className="text-xl font-bold text-red-400">+3.42 σ</div>
            </div>
          </div>
        </div>

        {/* Process Tree Lineage */}
        <div className="space-y-3 font-mono text-xs">
          {executionNodes.map((node, i) => (
            <div
              key={node.id}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                node.isAnomaly
                  ? "bg-red-950/20 border-red-800/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                  : "bg-[#090e1b] border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg border shrink-0 ${
                    node.isAnomaly
                      ? "bg-red-950/80 text-red-400 border-red-700/80"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{node.process}</span>
                    <Badge variant={node.isAnomaly ? "critical" : "low"}>
                      {node.deviation}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">{node.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right shrink-0">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Shannon Entropy</div>
                  <div className={`font-bold text-xs ${node.isAnomaly ? "text-purple-300" : "text-slate-300"}`}>
                    {node.entropy}
                  </div>
                </div>
                {node.isAnomaly && (
                  <Badge variant="mitre" className="text-[10px]">
                    ZERO-DAY
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
