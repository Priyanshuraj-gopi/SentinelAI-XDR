"use client";

import React from "react";
import { AttackStory } from "@/types";
import { Badge } from "@/components/ui/badge";
import { StatusPill } from "@/components/ui/status-pill";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Shield,
  Download,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface StoryHeaderProps {
  story: AttackStory;
  onExecuteContainment?: () => void;
  onExportReport?: () => void;
}

export function StoryHeader({ story, onExecuteContainment, onExportReport }: StoryHeaderProps) {
  return (
    <div className="p-5 rounded-xl border border-red-900/60 bg-gradient-to-r from-red-950/40 via-[#0c1324] to-[#0c1324] shadow-[0_0_20px_rgba(239,68,68,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-5 select-none">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="critical" dot>
            ATTACK STORY CENTERPIECE
          </Badge>
          <Badge variant="mitre">{story.kill_chain_phase}</Badge>
          <StatusPill status={story.status} size="sm" />
          <span className="text-[11px] font-mono text-slate-400">
            Detected: {formatDateTime(story.created_at)}
          </span>
        </div>

        <h1 className="text-xl font-bold font-mono text-white tracking-tight leading-snug">
          {story.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>
            Scope: <strong className="text-slate-200">{story.impact_scope}</strong>
          </span>
          <span>•</span>
          <span>
            Verdict: <strong className="text-red-400 font-bold">{story.verdict}</strong>
          </span>
          <span>•</span>
          <span>
            Confidence: <strong className="text-emerald-400 font-bold">{(story.confidence * 100).toFixed(0)}%</strong>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 shrink-0">
        <RiskIndicator score={story.aggregate_risk} size="lg" showGauge showLabel />

        <div className="flex flex-col gap-2">
          <Button variant="containment" size="sm" onClick={onExecuteContainment}>
            <Shield className="w-3.5 h-3.5" />
            <span>Emergency Containment</span>
          </Button>

          <Button variant="outline" size="sm" onClick={onExportReport}>
            <Download className="w-3.5 h-3.5" />
            <span>Export Incident Brief</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
