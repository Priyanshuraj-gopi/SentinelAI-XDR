"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertTriangle, Fingerprint, Network, Layers } from "lucide-react";

export function NovelAnomalyReasons() {
  const reasons = [
    {
      title: "Shannon Information Entropy Spike (5.92 bits/char)",
      category: "Process Obfuscation",
      icon: Sparkles,
      description:
        "The command argument passed to powershell.exe contained a heavily compressed Base64 payload with an entropy score of 5.92 bits per character, which exceeds 99.8% of historical enterprise PowerShell executions.",
      impact: "Zero-Day In-Memory Reflective Injection",
    },
    {
      title: "Atypical Parent-Child Execution Lineage",
      category: "Living-off-the-Land (LotL)",
      icon: Fingerprint,
      description:
        "rundll32.exe was spawned directly from a non-interactive PowerShell child thread invoking comsvcs.dll #24 against lsass.exe, an established tradecraft anomaly that bypasses standard disk write alerts.",
      impact: "In-Memory Credential Dumping",
    },
    {
      title: "Asynchronous UDP/53 Volumetric Tunneling Outlier",
      category: "Network Exfiltration",
      icon: Network,
      description:
        "4,200 non-cached DNS TXT queries directed exclusively toward external domain ns1.dark-c2.net within a 180-second window, transferring 52.4MB of binary data over protocol UDP port 53.",
      impact: "Firewall Evasion & Data Exfiltration",
    },
    {
      title: "Cross-Geolocation Tor VPN Token Replay",
      category: "Identity Anomaly",
      icon: Layers,
      description:
        "Okta authentication token minted from Tor Exit Relay 185.220.101.5 was presented to internal Domain Controller RPC endpoints within 4 minutes, establishing impossible travel velocity.",
      impact: "Compromised Valid Accounts (T1078.004)",
    },
  ];

  return (
    <Card glow="high">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/80">
              <Sparkles className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">
              BEHAVIORAL ANOMALY REASONING ENGINE
            </CardTitle>
          </div>
          <Badge variant="mitre">EXPLAINABLE ZERO-DAY AUDIT</Badge>
        </div>
        <CardDescription>
          Deterministic behavioral justifications proving why this campaign was detected without signatures.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        {reasons.map((r, i) => {
          const Icon = r.icon;

          return (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-[#090e1b] border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-white text-xs">{r.title}</span>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {r.category}
                </Badge>
              </div>

              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {r.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Inferred Tradecraft:</span>
                <span className="text-red-400 font-bold">{r.impact}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
