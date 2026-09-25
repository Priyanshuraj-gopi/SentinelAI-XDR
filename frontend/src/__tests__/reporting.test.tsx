import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IncidentReportView } from "@/components/reporting/incident-report-view";

describe("Phase 11: Executive Reporting & Incident Briefs", () => {
  it("renders the formal incident disclosure report with reference and classification", () => {
    render(<IncidentReportView />);
    expect(screen.getByText(/CYBER INCIDENT POST-MORTEM/i)).toBeDefined();
    expect(screen.getByText(/SEC-RPT-2026-0925-001/i)).toBeDefined();
    expect(screen.getByText(/CONFIDENTIAL \/\/ TIER-3 INCIDENT DISCLOSURE/i)).toBeDefined();
    expect(screen.getAllByText(/Operation DarkHydra/i).length).toBeGreaterThan(0);
  });

  it("renders the 4 executive threat metrics cards", () => {
    render(<IncidentReportView />);
    expect(screen.getByText(/98.4 \/ 100/i)).toBeDefined();
    expect(screen.getByText(/CRITICAL INTRUSION/i)).toBeDefined();
    expect(screen.getByText(/4m 12s/i)).toBeDefined();
    expect(screen.getByText(/94.8%/i)).toBeDefined();
  });

  it("renders technical kill-chain progression with MITRE technique mappings", () => {
    render(<IncidentReportView />);
    expect(screen.getByText(/Technical Kill-Chain Progression/i)).toBeDefined();
    expect(screen.getByText(/T1078.004/i)).toBeDefined();
    expect(screen.getByText(/T1059.001/i)).toBeDefined();
    expect(screen.getByText(/T1003.001/i)).toBeDefined();
    expect(screen.getByText(/T1071.004/i)).toBeDefined();
  });

  it("renders the Indicators of Compromise (IOC) Matrix", () => {
    render(<IncidentReportView />);
    expect(screen.getByText(/Indicators of Compromise \(IOC\) Matrix/i)).toBeDefined();
    expect(screen.getAllByText(/185\.220\.101\.5/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ns1\.dark-c2\.net/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/j\.doe@sentinel\.corp/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/WKSTN-FIN-04/i).length).toBeGreaterThan(0);
  });

  it("renders the CISO Strategic Recommendations Roadmap", () => {
    render(<IncidentReportView />);
    expect(screen.getByText(/CISO Strategic Recommendations Roadmap/i)).toBeDefined();
    expect(screen.getByText(/Immediate \(24 Hours\)/i)).toBeDefined();
    expect(screen.getByText(/Near-Term \(30 Days\)/i)).toBeDefined();
    expect(screen.getByText(/Strategic \(90 Days\)/i)).toBeDefined();
    expect(screen.getByText(/OFFICIALLY AUDITED & SIGNED/i)).toBeDefined();
  });

  it("handles copy executive brief action", () => {
    // Mock clipboard writeText
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(<IncidentReportView />);
    const copyBtn = screen.getByRole("button", { name: /Copy Executive Brief/i });
    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalled();
    expect(screen.getByText(/Brief Copied!/i)).toBeDefined();
  });

  it("handles print button trigger", () => {
    const printMock = vi.fn();
    window.print = printMock;

    render(<IncidentReportView />);
    const printBtn = screen.getByRole("button", { name: /Print \/ Save as PDF/i });
    fireEvent.click(printBtn);
    expect(printMock).toHaveBeenCalled();
  });
});
