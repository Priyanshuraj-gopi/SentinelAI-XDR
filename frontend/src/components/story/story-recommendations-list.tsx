"use client";

import React, { useState } from "react";
import { Recommendation } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, AlertTriangle, ArrowRight, Lock, Key, Ban } from "lucide-react";

interface StoryRecommendationsListProps {
  recommendations: Recommendation[];
  onExecuteAction?: (rec: Recommendation) => void;
}

export function StoryRecommendationsList({
  recommendations,
  onExecuteAction,
}: StoryRecommendationsListProps) {
  const [executedIds, setExecutedIds] = useState<string[]>([]);

  const handleAction = (rec: Recommendation) => {
    setExecutedIds((prev) => [...prev, rec.id]);
    onExecuteAction?.(rec);
  };

  const getIcon = (type: string) => {
    if (type.toLowerCase().includes("isolate")) return <Lock className="w-4 h-4 text-red-400" />;
    if (type.toLowerCase().includes("revoke") || type.toLowerCase().includes("token")) return <Key className="w-4 h-4 text-orange-400" />;
    return <Ban className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      {recommendations.map((rec) => {
        const isDone = executedIds.includes(rec.id);

        return (
          <div
            key={rec.id}
            className={`p-4 rounded-xl border transition-all ${
              isDone
                ? "bg-[#091512] border-emerald-900/60"
                : "bg-[#090e1b] border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                  {getIcon(rec.action_type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{rec.title}</span>
                    <Badge variant={rec.urgency === "Critical" ? "critical" : "high"}>
                      {rec.urgency}
                    </Badge>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    {rec.justification}
                  </p>
                  <div className="text-[11px] text-slate-400">
                    Target Entity: <strong className="text-cyan-300">{rec.target_entity}</strong>
                  </div>
                </div>
              </div>

              <div className="shrink-0 sm:self-center">
                {isDone ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Enforced
                  </span>
                ) : (
                  <Button
                    variant={rec.urgency === "Critical" ? "containment" : "default"}
                    size="sm"
                    onClick={() => handleAction(rec)}
                  >
                    <span>Execute Mitigation</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
