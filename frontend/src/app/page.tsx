"use client";

import React, { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Sidebar } from "@/components/layout/sidebar";
import { ExecutiveDashboard } from "@/components/dashboard/executive-dashboard";
import { AlertFeed } from "@/components/alerts/alert-feed";
import { CorrelationVisualizer } from "@/components/correlation/correlation-visualizer";
import { StoryBuilderView } from "@/components/story/story-builder-view";
import { XaiWorkspaceView } from "@/components/xai/xai-workspace-view";
import { NovelAttackView } from "@/components/novel/novel-attack-view";
import { AnalystWorkbench } from "@/components/workspace/analyst-workbench";
import { CopilotChatView } from "@/components/ai-assistant/copilot-chat-view";
import { CopilotDrawer } from "@/components/ai-assistant/copilot-drawer";
import { IncidentReportView } from "@/components/reporting/incident-report-view";
import { DemoWalkthroughModal } from "@/components/demo/demo-walkthrough-modal";
import { NotificationBanner, NotificationItem } from "@/components/ui/notification";
import { useSecurityStore } from "@/store/useSecurityStore";
import { api } from "@/lib/api";

export default function Home() {
  const {
    activeTab,
    isSimulating,
    setIsSimulating,
    setSelectedStoryId,
    setActiveTab,
  } = useSecurityStore();

  const [notification, setNotification] = useState<NotificationItem | null>(null);

  const handleRunDemo = async () => {
    setIsSimulating(true);
    const res = await api.triggerSimulation();
    setNotification({
      id: "sim-done",
      title: "Attack Campaign Telemetry Injected",
      message: `${res.scenario_name}: ${res.alerts_injected} alerts correlated into unified attack narrative.`,
      type: "success",
      timestamp: "Just now",
      actionLabel: "Inspect Attack Narrative",
      onAction: () => {
        setSelectedStoryId("story-001");
        setActiveTab("stories");
      },
    });
    setIsSimulating(false);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#070b14] text-slate-100 overflow-hidden font-sans">
      {/* Enterprise Topbar */}
      <Topbar onRunDemo={handleRunDemo} isSimulating={isSimulating} />

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Central Workspace Canvas */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6 cyber-grid space-y-6">
          {/* Notification Toast Banner */}
          {notification && (
            <NotificationBanner
              notification={notification}
              onDismiss={() => setNotification(null)}
            />
          )}

          {/* Tab 1: Executive Dashboard (Phase 3) */}
          {activeTab === "dashboard" && <ExecutiveDashboard />}

          {/* Tab 2: Correlated Alert Feed (Phase 4) */}
          {activeTab === "alerts" && <AlertFeed />}

          {/* Tab 3: Attack Story Builder Centerpiece (Phase 6) */}
          {activeTab === "stories" && <StoryBuilderView />}

          {/* Tab 4: Attack Graph & Trees (Phase 5 Correlation Engine) */}
          {activeTab === "graph" && <CorrelationVisualizer />}

          {/* Tab 5: Novel Attack Detector (Phase 8 Behavioral Detection) */}
          {activeTab === "novel" && <NovelAttackView />}

          {/* Tab 6: Analyst Workspace & SOAR Playbook (Phase 9) */}
          {activeTab === "workspace" && <AnalystWorkbench />}

          {/* Tab 7: AI SOC Copilot (Phase 10) */}
          {activeTab === "copilot" && <CopilotChatView />}

          {/* Tab 8: Executive Incident Report (Phase 11) */}
          {activeTab === "reports" && <IncidentReportView />}
        </main>
      </div>

      {/* Global Slide-Over AI Copilot Drawer */}
      <CopilotDrawer />

      {/* Global 5-Minute Live Judging Walkthrough Guide Modal */}
      <DemoWalkthroughModal />
    </div>
  );
}
