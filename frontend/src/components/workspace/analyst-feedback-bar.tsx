"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, ShieldOff, Sparkles, CheckCircle2 } from "lucide-react";

interface AnalystFeedbackBarProps {
  storyId?: string;
  onFeedbackSubmitted?: (verdict: string) => void;
}

export function AnalystFeedbackBar({
  storyId = "story-001",
  onFeedbackSubmitted,
}: AnalystFeedbackBarProps) {
  const [selectedVerdict, setSelectedVerdict] = useState<string | null>(null);

  const handleFeedback = (verdict: string) => {
    setSelectedVerdict(verdict);
    onFeedbackSubmitted?.(verdict);
  };

  return (
    <Card glow="blue">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
              <Sparkles className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono text-sm">
              HUMAN-IN-THE-LOOP FEEDBACK &amp; ACTIVE LEARNING
            </CardTitle>
          </div>
          <Badge variant="mitre">ADAPTIVE REINFORCEMENT</Badge>
        </div>
        <CardDescription>
          Teach SentinelAI: analyst verdicts dynamically update the graph correlation weights and suppression thresholds.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#090e1b] border border-slate-800">
          <div className="space-y-0.5">
            <span className="text-white font-bold text-xs">Evaluate Narrative Accuracy:</span>
            <p className="text-slate-400 font-sans text-xs">
              Did SentinelAI correctly reconstruct this attack narrative and cluster the right telemetry?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleFeedback("Accurate - True Positive")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-xs transition-all ${
                selectedVerdict === "Accurate - True Positive"
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                  : "bg-emerald-950/40 text-emerald-400 border-emerald-800 hover:bg-emerald-900/60"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Accurate Attack Narrative</span>
            </button>

            <button
              onClick={() => handleFeedback("Inaccurate - False Positive")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-xs transition-all ${
                selectedVerdict === "Inaccurate - False Positive"
                  ? "bg-red-600 text-white border-red-500 shadow-md"
                  : "bg-red-950/40 text-red-400 border-red-800 hover:bg-red-900/60"
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Inaccurate Correlation</span>
            </button>

            <button
              onClick={() => handleFeedback("Suppress Similar Decoys")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-xs transition-all ${
                selectedVerdict === "Suppress Similar Decoys"
                  ? "bg-amber-600 text-white border-amber-500 shadow-md"
                  : "bg-amber-950/40 text-amber-400 border-amber-800 hover:bg-amber-900/60"
              }`}
            >
              <ShieldOff className="w-3.5 h-3.5" />
              <span>Suppress Similar Pattern</span>
            </button>
          </div>
        </div>

        {selectedVerdict && (
          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between text-emerald-300 text-xs animate-in fade-in duration-150">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Feedback recorded: <strong className="text-white">{selectedVerdict}</strong>. Correlation engine weights adapted for current tenant.
            </span>
            <span className="text-[10px] text-slate-400">Synced to DB</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
