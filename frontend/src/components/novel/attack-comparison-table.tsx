"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ShieldCheck, ShieldAlert, Check, X, ArrowRight } from "lucide-react";

export function AttackComparisonTable() {
  const comparisons = [
    {
      dimension: "Payload Delivery Mechanism",
      knownAttack: "Dropped PE EXE file written to disk (e.g., C:\\Temp\\mimikatz.exe)",
      novelAttack: "Reflective in-memory DLL injection via PowerShell & comsvcs.dll #24",
      signatureBypass: "Bypasses standard file hash & AV scanners completely",
    },
    {
      dimension: "Adversary Ingress",
      knownAttack: "Brute-force credential spraying on external RDP/SSH",
      novelAttack: "MFA push fatigue on valid account from Tor exit node",
      signatureBypass: "Appears as authorized login in basic SIEM filters",
    },
    {
      dimension: "Command & Control Protocol",
      knownAttack: "Cleartext HTTP/S GET/POST beacons to known malicious IP",
      novelAttack: "Asynchronous Base32 encoded DNS TXT records to dynamic nameservers",
      signatureBypass: "Circumvents perimeter web proxies & TLS inspection",
    },
    {
      dimension: "Persistence Strategy",
      knownAttack: "Run/RunOnce registry keys and standard startup shortcuts",
      novelAttack: "Scheduled task proxying legitimate binary certutil.exe download",
      signatureBypass: "Living-off-the-Land (LotL): zero unsigned binaries created",
    },
    {
      dimension: "Detection Vector",
      knownAttack: "Static IOC matching (VirusTotal hash, YARA rule match)",
      novelAttack: "Unsupervised Isolation Forest + Shannon Entropy Anomaly (3.4σ)",
      signatureBypass: "100% resilient against zero-day and uncompiled payloads",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/80">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">
              COMPARISON: KNOWN ATTACK SIGNATURES VS. NOVEL BEHAVIORAL ZERO-DAY
            </CardTitle>
          </div>
          <Badge variant="info">PARADIGM SHIFT</Badge>
        </div>
        <CardDescription>
          Contrasting static signature limitations against SentinelAI&apos;s behavioral reasoning pipeline.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Attack Dimension</TableHead>
              <TableHead className="w-[32%] text-slate-400">Traditional Known Attack Pattern</TableHead>
              <TableHead className="w-[32%] text-cyan-300">SentinelAI Detected Novel Campaign</TableHead>
              <TableHead className="w-[16%] text-right">Detection Advantage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisons.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-bold text-white font-mono">{row.dimension}</TableCell>
                <TableCell className="text-slate-400 font-sans text-xs">
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-500 font-bold shrink-0">Legacy:</span>
                    <span>{row.knownAttack}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-200 font-sans text-xs">
                  <div className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold shrink-0">Novel:</span>
                    <span className="text-cyan-100 font-medium">{row.novelAttack}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="mitre" className="text-[10px]">
                    {row.signatureBypass}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
