"use client";

import React from "react";
import { Cpu, AlertCircle, Fingerprint, Activity, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NovelAttacksWidget() {
  return (
    <Card glow="high">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-950/80 text-purple-400 border border-purple-800/80">
              <Cpu className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">BEHAVIORAL NOVEL ATTACK DETECTION</CardTitle>
          </div>
          <Badge variant="mitre">ZERO SIGNATURE / XAI</Badge>
        </div>
        <CardDescription>
          Living-off-the-land & zero-day vectors identified through statistical entropy deviations.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        <div className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-purple-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              High-Entropy Execution Detected
            </span>
            <Badge variant="critical">91.4% ANOMALY DISTANCE</Badge>
          </div>

          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            Target process <code className="text-cyan-300 font-mono">powershell.exe</code> launched with Shannon entropy of 5.92 bits/char, 3.4 standard deviations above baseline.
          </p>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Subject: WKSTN-FIN-04</span>
            <span className="text-emerald-400 font-bold">Unsupervised Isolation Forest</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-amber-300 font-bold flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5 text-amber-400" />
              Atypical Daemon Ingress Chaining
            </span>
            <Badge variant="high">86.2% NOVELTY</Badge>
          </div>

          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            Spawning of shell interpreter from system spooler daemon (<code className="text-cyan-300 font-mono">spoolsv.exe -&gt; cmd.exe</code>) without associated print spool jobs.
          </p>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Subject: PRINT-SRV-01</span>
            <span className="text-emerald-400 font-bold">Process Lineage Graph</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
