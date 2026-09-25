"use client";

import React, { useState } from "react";
import { RiskExplainerCard } from "./risk-explainer-card";
import { ConfidenceExplainerCard } from "./confidence-explainer-card";
import { RecommendationJustifierCard } from "./recommendation-justifier-card";
import { NotificationBanner, NotificationItem } from "@/components/ui/notification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, ShieldCheck, Sparkles, Download, Layers } from "lucide-react";
import { useSecurityStore } from "@/store/useSecurityStore";

export function XaiWorkspaceView() {
  const { setActiveTab } = useSecurityStore();
  const [toast, setToast] = useState<NotificationItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && <NotificationBanner notification={toast} onDismiss={() => setToast(null)} />}

      {/* Header Banner */}
      <div className="p-5 rounded-xl border border-blue-900/60 bg-gradient-to-r from-blue-950/40 via-[#0c1324] to-[#0c1324] flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Badge variant="mitre">EXPLAINABLE AI (XAI) GOVERNANCE</Badge>
            <Badge variant="low">ZERO BLACK-BOX PREDICTIONS</Badge>
          </div>
          <h1 className="text-xl font-bold font-mono text-white tracking-tight">
            Explainable AI Reasoning &amp; Attribution Engine
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-3xl leading-relaxed">
            Every risk score, clustering action, and containment recommendation provides a transparent, auditable
            justification backed by physical telemetry evidence and domain-informed multipliers.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setToast({
                id: "xai-export",
                title: "Model Governance Audit Report Exported",
                message: "Generated cryptographically auditable JSON/PDF model explainability trace.",
                type: "info",
                timestamp: "Just now",
              });
            }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export XAI Audit Report</span>
          </Button>

          <Button
            variant="cyber"
            size="sm"
            onClick={() => setActiveTab("stories")}
          >
            <span>Back to Attack Story</span>
          </Button>
        </div>
      </div>

      {/* 3 Core Explainable AI Pillars */}
      {/* Pillar 1: Risk -> Reasons */}
      <RiskExplainerCard />

      {/* Pillar 2 & 3: Confidence -> Evidence & Recommendations -> Justification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfidenceExplainerCard />
        <RecommendationJustifierCard
          onActionExecuted={(act) => {
            setToast({
              id: `enforced-${act.id}`,
              title: "Containment Enforced",
              message: `${act.actionTitle} successfully executed. ${act.projectedRiskDelta}.`,
              type: "success",
              timestamp: "Just now",
            });
          }}
        />
      </div>
    </div>
  );
}
