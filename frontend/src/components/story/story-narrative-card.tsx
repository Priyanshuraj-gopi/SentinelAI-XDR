"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

interface StoryNarrativeCardProps {
  narrative: string;
}

export function StoryNarrativeCard({ narrative }: StoryNarrativeCardProps) {
  return (
    <Card glow="blue">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/80">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </span>
            <CardTitle className="text-white font-mono">AUTONOMOUS ATTACK NARRATIVE RECONSTRUCTION</CardTitle>
          </div>
          <Badge variant="mitre">EXPLAINABLE AI SYNTHESIS</Badge>
        </div>
        <CardDescription>
          Unified storyline synthesized across CrowdStrike EDR, Microsoft Defender, Okta Identity, and Zeek network flows.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Story Narrative Paragraph */}
        <div className="p-4 rounded-xl bg-[#090e1b] border border-slate-800 text-slate-200 text-xs leading-relaxed space-y-2">
          <p className="text-sm font-sans">{narrative}</p>
        </div>

        {/* Tactical Objectives & Root Cause */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-[#0e1628] border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-[11px]">
              <Target className="w-3.5 h-3.5 text-red-400" />
              Inferred Adversary Objective
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Exfiltrate privileged Active Directory credential cache to stage domain-wide ransomware deployment via Group Policy Objects (GPO).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0e1628] border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold uppercase text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Root Ingress Vector
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              MFA fatigue attack against finance user <code className="text-cyan-300 font-mono">j.doe</code> originating from Tor exit relay <code className="text-cyan-300 font-mono">185.220.101.5</code>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
