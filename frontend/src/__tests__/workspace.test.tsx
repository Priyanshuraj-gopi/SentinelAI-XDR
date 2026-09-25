import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AnalystWorkbench } from "@/components/workspace/analyst-workbench";
import { EvidenceInspectorDrawer } from "@/components/workspace/evidence-inspector-drawer";
import { InvestigationNotesPad } from "@/components/workspace/investigation-notes-pad";
import { DecisionHistoryLog } from "@/components/workspace/decision-history-log";
import { AnalystFeedbackBar } from "@/components/workspace/analyst-feedback-bar";

describe("Phase 9: Analyst Workspace & SOAR Playbook", () => {
  it("renders AnalystWorkbench with SOAR action controls", () => {
    render(<AnalystWorkbench />);
    expect(screen.getByText(/ANALYST WORKBENCH & SOAR PLAYBOOK/i)).toBeDefined();
    expect(screen.getAllByText(/Operation DarkHydra/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Quarantine Host/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Invalidate Tokens/i)).toBeDefined();
  });

  it("handles 1-click host quarantine containment action", () => {
    render(<AnalystWorkbench />);
    const quarantineBtn = screen.getByRole("button", { name: /Quarantine Host/i });
    fireEvent.click(quarantineBtn);
    expect(screen.getByText(/Host Quarantined/i)).toBeDefined();
  });

  it("renders EvidenceInspectorDrawer and switches evidence categories", () => {
    render(<EvidenceInspectorDrawer />);
    expect(screen.getByText(/FORENSIC EVIDENCE & TELEMETRY INSPECTOR/i)).toBeDefined();
    expect(screen.getAllByText(/powershell\.exe/i).length).toBeGreaterThan(0);

    // Switch to Users tab
    const usersTab = screen.getByRole("button", { name: /Users \(1\)/i });
    fireEvent.click(usersTab);
    expect(screen.getByText(/j\.doe@sentinel\.corp/i)).toBeDefined();

    // Switch to Devices tab
    const devicesTab = screen.getByRole("button", { name: /Devices \(2\)/i });
    fireEvent.click(devicesTab);
    expect(screen.getByText(/WKSTN-FIN-04/i)).toBeDefined();
  });

  it("supports adding template checklists in InvestigationNotesPad", () => {
    const handleSave = vi.fn();
    render(<InvestigationNotesPad onSaveNote={handleSave} />);
    expect(screen.getByText(/COLLABORATIVE INVESTIGATION JOURNAL/i)).toBeDefined();

    // Click + Handoff Checklist
    const handoffBtn = screen.getByText(/\+ Handoff Checklist/i);
    fireEvent.click(handoffBtn);

    // Save note
    const saveBtn = screen.getByRole("button", { name: /Save Journal Notes/i });
    fireEvent.click(saveBtn);
    expect(handleSave).toHaveBeenCalled();
  });

  it("renders DecisionHistoryLog with immutable audit entries", () => {
    render(<DecisionHistoryLog />);
    expect(screen.getByText(/INCIDENT DECISION & MITIGATION AUDIT LOG/i)).toBeDefined();
    expect(screen.getByText(/Quarantine Host & Revoke Token Enforced/i)).toBeDefined();
  });

  it("submits active learning verdicts in AnalystFeedbackBar", () => {
    const handleFeedback = vi.fn();
    render(<AnalystFeedbackBar onFeedbackSubmitted={handleFeedback} />);
    expect(screen.getByText(/HUMAN-IN-THE-LOOP FEEDBACK/i)).toBeDefined();

    const accurateBtn = screen.getByRole("button", { name: /Accurate Attack Narrative/i });
    fireEvent.click(accurateBtn);
    expect(handleFeedback).toHaveBeenCalledWith("Accurate - True Positive");
  });
});
