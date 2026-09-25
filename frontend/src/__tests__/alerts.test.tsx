import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AlertFeed } from "@/components/alerts/alert-feed";

describe("AlertFeed Phase 4", () => {
  it("renders search bar, severity filters, and alert intake statistics", () => {
    render(<AlertFeed />);
    expect(screen.getByPlaceholderText(/Search alerts, entities/i)).toBeDefined();
    expect(screen.getByText(/Gross Alert Intake/i)).toBeDefined();
    expect(screen.getByText(/Noise Suppressed/i)).toBeDefined();
    expect(screen.getByText(/Suspicious Encoded PowerShell Execution/i)).toBeDefined();
  });

  it("allows expanding alert intelligence drawer to view XAI rationale", () => {
    render(<AlertFeed />);
    const expandButtons = screen.getAllByText(/Expand Intelligence/i);
    expect(expandButtons.length).toBeGreaterThan(0);
    fireEvent.click(expandButtons[0]);
    expect(screen.getByText(/Explainable AI \(XAI\) Correlation Reason/i)).toBeDefined();
  });
});
