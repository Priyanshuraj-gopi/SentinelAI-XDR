"use client";

import React from "react";
import { Clock, TrendingDown, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MttdMttrCardProps {
  mttdMinutes?: number;
  mttrMinutes?: number;
}

export function MttdMttrCard({
  mttdMinutes = 4.2,
  mttrMinutes = 14.8,
}: MttdMttrCardProps) {
  return (
    <Card glow="blue">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/80 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <Clock className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">SOC RESPONSE VELOCITY (MTTD & MTTR)</CardTitle>
          </div>
          <Badge variant="info">AUTONOMOUS ACCELERATION</Badge>
        </div>
        <CardDescription>
          Mean Time To Detect (MTTD) and Mean Time To Respond (MTTR) accelerated by AI-assisted attack clustering.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* MTTD */}
          <div className="p-4 rounded-xl bg-[#090e1b] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-slate-400">Mean Time to Detect (MTTD)</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                <TrendingDown className="w-3 h-3" />
                -99.9% vs Benchmark
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-cyan-300">{mttdMinutes}</span>
              <span className="text-xs font-mono text-slate-400">minutes</span>
            </div>

            {/* Comparison progress track */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>SentinelAI: 4.2m</span>
                <span className="text-red-400">Industry Avg: 162 hours</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-[4%]" />
              </div>
            </div>
          </div>

          {/* MTTR */}
          <div className="p-4 rounded-xl bg-[#090e1b] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-slate-400">Mean Time to Respond (MTTR)</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                <TrendingDown className="w-3 h-3" />
                -98.8% vs Benchmark
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-emerald-400">{mttrMinutes}</span>
              <span className="text-xs font-mono text-slate-400">minutes</span>
            </div>

            {/* Comparison progress track */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>SentinelAI: 14.8m</span>
                <span className="text-red-400">Industry Avg: 73 days</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-[6%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#0e1628] border border-slate-800 text-xs text-slate-300 font-mono flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            Story-driven investigation eliminates manual pivot between SIEM search, EDR logs, and identity alerts.
          </span>
          <span className="text-cyan-400 font-bold shrink-0">~42 mins saved/case</span>
        </div>
      </CardContent>
    </Card>
  );
}
