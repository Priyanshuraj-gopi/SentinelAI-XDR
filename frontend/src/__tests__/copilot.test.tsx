import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopilotChatView } from "@/components/ai-assistant/copilot-chat-view";
import { CopilotQuickActions } from "@/components/ai-assistant/copilot-quick-actions";
import { CopilotMessageItem, CopilotMessage } from "@/components/ai-assistant/copilot-message-item";
import { CopilotDrawer } from "@/components/ai-assistant/copilot-drawer";
import { useSecurityStore } from "@/store/useSecurityStore";
import { api } from "@/lib/api";

describe("Phase 10: AI Assistant (SOC Copilot)", () => {
  it("renders CopilotChatView with initial welcome message and telemetry grounding", () => {
    render(<CopilotChatView />);
    expect(screen.getByText(/SENTINELAI SOC COPILOT/i)).toBeDefined();
    expect(screen.getByText(/Grounded in 86 Telemetry Signals/i)).toBeDefined();
    expect(screen.getAllByText(/Operation DarkHydra/i).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Ask Copilot/i)).toBeDefined();
  });

  it("renders CopilotQuickActions with 4 enterprise prompt chips and triggers callback", () => {
    const handleSelectPrompt = vi.fn();
    render(<CopilotQuickActions onSelectPrompt={handleSelectPrompt} />);

    expect(screen.getByText(/What happened\?/i)).toBeDefined();
    expect(screen.getByText(/Why did this alert fire\?/i)).toBeDefined();
    expect(screen.getByText(/What should I do\?/i)).toBeDefined();
    expect(screen.getByText(/Summarize for CISO/i)).toBeDefined();

    const whatHappenedBtn = screen.getByText(/What happened\?/i);
    fireEvent.click(whatHappenedBtn);
    expect(handleSelectPrompt).toHaveBeenCalledWith("What happened in this incident?");
  });

  it("renders CopilotMessageItem with MITRE mappings, citations, and allows executing SOAR action", () => {
    const handleExecuteAction = vi.fn();
    const testMsg: CopilotMessage = {
      id: "test-1",
      sender: "copilot",
      timestamp: "12:00:00 UTC",
      content: "### Test Incident Synthesis\nAdversary executed beacon.",
      suggestedActions: ["Quarantine Host WKSTN-FIN-04"],
      mitreTechniques: [{ id: "T1059.001", name: "PowerShell Scripting" }],
      evidenceCitations: ["CrowdStrike Falcon PID 4812"],
    };

    render(
      <CopilotMessageItem
        message={testMsg}
        onExecuteAction={handleExecuteAction}
      />
    );

    expect(screen.getByText(/Test Incident Synthesis/i)).toBeDefined();
    expect(screen.getByText(/T1059.001/i)).toBeDefined();
    expect(screen.getByText(/PowerShell Scripting/i)).toBeDefined();
    expect(screen.getByText(/CrowdStrike Falcon PID 4812/i)).toBeDefined();

    const execBtn = screen.getByRole("button", { name: /Execute/i });
    fireEvent.click(execBtn);
    expect(handleExecuteAction).toHaveBeenCalledWith("Quarantine Host WKSTN-FIN-04");
    expect(screen.getAllByText(/Executed/i).length).toBeGreaterThan(0);
  });

  it("sends message and renders AI response on submit", async () => {
    vi.spyOn(api, "copilotChat").mockResolvedValue({
      reply: "### Alert Activation Rationale & Telemetry Corroboration\n\nThis critical alert fired because 4 distinct sensors corroborated it.",
      suggested_actions: ["Inspect raw process memory dump"],
      mitre_techniques: [{ id: "T1003.001", name: "LSASS Memory Dumping" }],
      evidence_citations: ["Sensor Corroboration Score: 94.2% across 4 telemetries"],
    });

    render(<CopilotChatView />);
    const input = screen.getByPlaceholderText(/Ask Copilot/i);
    const sendBtn = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, { target: { value: "Why did this alert fire?" } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(screen.getAllByText(/Alert Activation Rationale/i).length).toBeGreaterThan(0);
    });
  });

  it("handles CopilotDrawer toggle open and close", () => {
    useSecurityStore.setState({ isCopilotOpen: false });
    const { rerender } = render(<CopilotDrawer />);
    expect(screen.queryByText(/Interactive SOC Sidecar/i)).toBeNull();

    useSecurityStore.setState({ isCopilotOpen: true });
    rerender(<CopilotDrawer />);
    expect(screen.getByText(/Interactive SOC Sidecar/i)).toBeDefined();

    const closeBtn = screen.getByTitle(/Close Drawer/i);
    fireEvent.click(closeBtn);
    expect(useSecurityStore.getState().isCopilotOpen).toBe(false);
  });
});
