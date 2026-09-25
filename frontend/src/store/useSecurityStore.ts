import { create } from "zustand";
import { AttackStory, Alert } from "@/types";

interface SecurityState {
  // Navigation & View
  activeTab: "dashboard" | "alerts" | "stories" | "graph" | "workspace" | "novel" | "copilot" | "reports";
  setActiveTab: (tab: "dashboard" | "alerts" | "stories" | "graph" | "workspace" | "novel" | "copilot" | "reports") => void;

  // AI Copilot Drawer State
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;

  // Demo Guide Walkthrough Modal State
  isDemoGuideOpen: boolean;
  setIsDemoGuideOpen: (open: boolean) => void;

  // Selected Entities
  selectedStoryId: string;
  setSelectedStoryId: (id: string) => void;
  selectedAlert: Alert | null;
  setSelectedAlert: (alert: Alert | null) => void;

  // Filter criteria
  severityFilter: string | null;
  setSeverityFilter: (severity: string | null) => void;
  includeSuppressed: boolean;
  setIncludeSuppressed: (include: boolean) => void;

  // Demo Simulation State
  isSimulating: boolean;
  setIsSimulating: (simulating: boolean) => void;
}

export const useSecurityStore = create<SecurityState>((set) => ({
  activeTab: "dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),

  isCopilotOpen: false,
  setIsCopilotOpen: (open) => set({ isCopilotOpen: open }),

  isDemoGuideOpen: false,
  setIsDemoGuideOpen: (open) => set({ isDemoGuideOpen: open }),

  selectedStoryId: "story-001",
  setSelectedStoryId: (id) => set({ selectedStoryId: id }),
  selectedAlert: null,
  setSelectedAlert: (alert) => set({ selectedAlert: alert }),

  severityFilter: null,
  setSeverityFilter: (severity) => set({ severityFilter: severity }),
  includeSuppressed: false,
  setIncludeSuppressed: (include) => set({ includeSuppressed: include }),

  isSimulating: false,
  setIsSimulating: (simulating) => set({ isSimulating: simulating }),
}));
