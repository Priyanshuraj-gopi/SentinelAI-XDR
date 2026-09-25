"use client";

import React, { useState } from "react";
import { ThreatLevelCard } from "./threat-level-card";
import { MttdMttrCard } from "./mttd-mttr-card";
import { RiskTrendChart } from "./risk-trend-chart";
import { MITREHeatmap } from "./mitre-heatmap";
import { TopAssetsTable } from "./top-assets-table";
import { ActiveStoriesGrid } from "./active-stories-grid";
import { NovelAttacksWidget } from "./novel-attacks-widget";
import { SuppressedNoiseWidget } from "./suppressed-noise-widget";
import { Dialog } from "@/components/ui/dialog";
import { NotificationBanner, NotificationItem } from "@/components/ui/notification";
import { useSecurityStore } from "@/store/useSecurityStore";
import { RefreshCw, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExecutiveDashboard() {
  const { setActiveTab, setSelectedStoryId } = useSecurityStore();
  const [quarantineTarget, setQuarantineTarget] = useState<string | null>(null);
  const [isQuarantining, setIsQuarantining] = useState(false);
  const [toast, setToast] = useState<NotificationItem | null>(null);

  const handleInspectStory = (storyId: string) => {
    setSelectedStoryId(storyId);
    setActiveTab("stories");
  };

  const handleConfirmQuarantine = () => {
    if (!quarantineTarget) return;
    setIsQuarantining(true);
    setTimeout(() => {
      setIsQuarantining(false);
      setToast({
        id: "quarantine-success",
        title: "Endpoint Quarantined",
        message: `Asset ${quarantineTarget} has been isolated from subnet. All active C2 sessions terminated.`,
        type: "success",
        timestamp: "Just now",
      });
      setQuarantineTarget(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {toast && <NotificationBanner notification={toast} onDismiss={() => setToast(null)} />}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <span>Enterprise Security Operations Center Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry synthesis, behavioral anomaly scoring, and attack story prioritization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setToast({
                id: "refresh-posture",
                title: "Telemetry Refreshed",
                message: "Fetched 1,420 new event logs from CrowdStrike and Defender stream.",
                type: "info",
                timestamp: "Just now",
              });
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Feeds</span>
          </Button>

          <Button
            variant="cyber"
            size="sm"
            onClick={() => handleInspectStory("story-001")}
          >
            <span>Triage Active Campaign</span>
          </Button>
        </div>
      </div>

      {/* Row 1: Threat Level & Performance Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatLevelCard onInspectCampaign={() => handleInspectStory("story-001")} />
        <MttdMttrCard />
      </div>

      {/* Row 2: Risk Progression Chart */}
      <RiskTrendChart />

      {/* Row 3: MITRE ATT&CK Matrix Tactical Saturation */}
      <MITREHeatmap />

      {/* Row 4: Prioritized Attack Narratives */}
      <ActiveStoriesGrid onSelectStory={handleInspectStory} />

      {/* Row 5: Infrastructure Assets & Novel Attack Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopAssetsTable onIsolateAsset={(asset) => setQuarantineTarget(asset)} />
        <NovelAttacksWidget />
      </div>

      {/* Row 6: Noise Suppression Proof */}
      <SuppressedNoiseWidget />

      {/* Quarantine Confirmation Dialog */}
      <Dialog
        isOpen={!!quarantineTarget}
        onClose={() => setQuarantineTarget(null)}
        title="Quarantine Critical Asset"
        description={`Execute emergency host isolation for ${quarantineTarget}.`}
        confirmLabel="Sever Connections"
        variant="containment"
        isLoading={isQuarantining}
        onConfirm={handleConfirmQuarantine}
      >
        <p className="leading-relaxed">
          Quarantining <span className="font-mono font-bold text-white">{quarantineTarget}</span> will drop all network egress and ingress, stopping lateral propagation immediately.
        </p>
      </Dialog>
    </div>
  );
}
