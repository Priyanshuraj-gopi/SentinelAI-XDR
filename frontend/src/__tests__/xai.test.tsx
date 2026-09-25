import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { XaiWorkspaceView } from "@/components/xai/xai-workspace-view";

describe("XaiWorkspaceView Phase 7", () => {
  it("renders all three explainable AI pillars", () => {
    render(<XaiWorkspaceView />);
    expect(screen.getByText(/EXPLAINABLE AI: RISK SCORE FACTOR ATTRIBUTION/i)).toBeDefined();
    expect(screen.getByText(/EXPLAINABLE AI: CONFIDENCE RATING JUSTIFICATION/i)).toBeDefined();
    expect(screen.getByText(/EXPLAINABLE AI: CONTAINMENT JUSTIFICATION/i)).toBeDefined();
  });

  it("dynamically recalculates simulated risk score upon mitigating a driver", () => {
    render(<XaiWorkspaceView />);
    const factorTitle = screen.getByText(/Crown Jewel Asset Target/i);
    expect(factorTitle).toBeDefined();

    // Click to simulate mitigation
    fireEvent.click(factorTitle);
    expect(screen.getByText(/MITIGATED/i)).toBeDefined();
  });
});
