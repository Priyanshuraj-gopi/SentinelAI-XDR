import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CorrelationVisualizer } from "@/components/correlation/correlation-visualizer";

describe("CorrelationVisualizer Phase 5", () => {
  it("renders the 400 alerts to 18 investigations compression header", () => {
    render(<CorrelationVisualizer />);
    expect(screen.getByText(/412 Raw Telemetry Alerts/i)).toBeDefined();
    expect(screen.getByText(/18 Unified Investigations/i)).toBeDefined();
    expect(screen.getByText(/95.6% COMPRESSION RATIO/i)).toBeDefined();
  });

  it("renders the Explain Why AI Rationale panel with MITRE chaining", () => {
    render(<CorrelationVisualizer />);
    expect(screen.getByText(/EXPLAIN WHY \(AI RATIONALE\)/i)).toBeDefined();
    expect(screen.getByText(/Shared Entity Ancestry/i)).toBeDefined();
    expect(screen.getByText(/Temporal Burst Window/i)).toBeDefined();
    expect(screen.getByText(/MITRE Technique Progression/i)).toBeDefined();
  });
});
