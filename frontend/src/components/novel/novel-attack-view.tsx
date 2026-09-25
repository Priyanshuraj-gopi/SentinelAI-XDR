"use client";

import React, { useState } from "react";
import { BehaviorGraphCard } from "./behavior-graph-card";
import { NovelAnomalyReasons } from "./novel-anomaly-reasons";
import { AttackComparisonTable } from "./attack-comparison-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { NotificationBanner, NotificationItem } from "@/components/ui/notification";
import { useSecurityStore } from "@/store/useSecurityStore";
import { Cpu, Sparkles, Shield, ArrowRight, Zap, RefreshCw } from "lucide-react";

export function NovelAttackView() {
  const { setActiveTab } = useSecurityStore();
  const [toast, setToast] = useState<NotificationItem | null>(null);
  const [isQuarantineOpen, setIsQuarantineOpen] = useState(false);
  const [isQuarantining, setIsQuarantining] = useState(false);

  const handleConfirmQuarantine = () => {
    setIsQuarantining(true);
    setTimeout(() => {
      setIsQuarantining(false);
      setIsQuarantineOpen(false);
      setToast({
        id: "zero-day-quarantined",
        title: "Novel Vector Contained",
        message: "Target endpoint WKSTN-FIN-04 quarantined. In-memory PowerShell process tree terminated.",
        type: "success",
        timestamp: "Just now",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && <NotificationBanner notification={toast} onDismiss={() => setToast(null)} />}

      {/* Top Banner */}
      <div className="p-5 rounded-xl border border-purple-900/60 bg-gradient-to-r from-purple-950/40 via-[#0c1324] to-[#0c1324] flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Badge variant="mitre">BEHAVIORAL REASONING ENGINE</Badge>
            <Badge variant="critical">ZERO STATIC SIGNATURES REQUIRED</Badge>
          </div>
          <h1 className="text-xl font-bold font-mono text-white tracking-tight">
            Novel Attack Detection &amp; Zero-Day Anomaly Analysis
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-3xl leading-relaxed">
            Identifies sophisticated living-off-the-land techniques and zero-day execution lineages without waiting
            for commercial threat intelligence feeds or static hash signatures.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="containment"
            size="sm"
            onClick={() => setIsQuarantineOpen(true)}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Contain Zero-Day Vector</span>
          </Button>

          <Button
            variant="cyber"
            size="sm"
            onClick={() => setActiveTab("stories")}
          >
            <span>View Full Attack Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Row 1: Behavior Lineage Graph & Detailed Anomaly Reasons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BehaviorGraphCard />
        <NovelAnomalyReasons />
      </div>

      {/* Row 2: Legacy Signatures vs. Behavioral Novel Comparison Table */}
      <AttackComparisonTable />

      {/* Containment Dialog Modal */}
      <Dialog
        isOpen={isQuarantineOpen}
        onClose={() => setIsQuarantineOpen(false)}
        title="Contain Novel Threat Vector"
        description="Quarantine endpoint WKSTN-FIN-04 and terminate all anomalous child threads."
        confirmLabel="Quarantine Host & Terminate Tree"
        variant="containment"
        isLoading={isQuarantining}
        onConfirm={handleConfirmQuarantine}
      >
        <p className="leading-relaxed">
          Quarantining <span className="font-mono font-bold text-white">WKSTN-FIN-04 (10.0.4.112)</span> will immediately drop active network egress, severing the high-entropy PowerShell C2 beacon.
        </p>
      </Dialog>
    </div>
  );
}
