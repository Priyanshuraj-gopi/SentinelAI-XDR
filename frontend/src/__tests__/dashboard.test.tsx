import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExecutiveDashboard } from "@/components/dashboard/executive-dashboard";

describe("ExecutiveDashboard Phase 3", () => {
  it("renders key executive threat metrics and posture cards", () => {
    render(<ExecutiveDashboard />);
    expect(screen.getByText(/ENTERPRISE THREAT POSTURE/i)).toBeDefined();
    expect(screen.getByText(/SOC RESPONSE VELOCITY/i)).toBeDefined();
    expect(screen.getByText(/ENTERPRISE RISK & ATTACK VELOCITY TREND/i)).toBeDefined();
    expect(screen.getByText(/MITRE ATT&CK® TACTICAL HEATMAP/i)).toBeDefined();
    expect(screen.getByText(/CRITICAL ENTERPRISE ASSETS AT RISK/i)).toBeDefined();
    expect(screen.getByText(/SYNTHESIZED ATTACK STORIES/i)).toBeDefined();
    expect(screen.getByText(/ALERT NOISE SUPPRESSION ENGINE/i)).toBeDefined();
  });
});
