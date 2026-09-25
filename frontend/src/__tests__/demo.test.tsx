import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DemoWalkthroughModal } from "@/components/demo/demo-walkthrough-modal";
import { useSecurityStore } from "@/store/useSecurityStore";

describe("Phase 12: Final Polish & 5-Minute Live Judging Walkthrough", () => {
  it("renders DemoWalkthroughModal when isDemoGuideOpen is true", () => {
    useSecurityStore.setState({ isDemoGuideOpen: true });
    render(<DemoWalkthroughModal />);

    expect(screen.getByText(/SENTINELAI 5-MINUTE LIVE JUDGING WALKTHROUGH/i)).toBeDefined();
    expect(screen.getByText(/Step 1 of 8/i)).toBeDefined();
    expect(screen.getByText(/Executive Dashboard: The Enterprise Problem/i)).toBeDefined();
    expect(screen.getByText(/Presenter Live Pitch & Script/i)).toBeDefined();
  });

  it("navigates through steps with Next Step and Previous Step buttons", () => {
    useSecurityStore.setState({ isDemoGuideOpen: true });
    render(<DemoWalkthroughModal />);

    const nextBtn = screen.getByRole("button", { name: /Next Step/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(/Step 2 of 8/i)).toBeDefined();
    expect(screen.getAllByText(/Correlated Alert Feed/i).length).toBeGreaterThan(0);

    const prevBtn = screen.getByRole("button", { name: /Previous Step/i });
    fireEvent.click(prevBtn);

    expect(screen.getByText(/Step 1 of 8/i)).toBeDefined();
  });

  it("jumps to specific step and navigates to the target tab", () => {
    useSecurityStore.setState({ isDemoGuideOpen: true });
    render(<DemoWalkthroughModal />);

    // Step 4 button (Attack Story Builder)
    const step4Btn = screen.getByRole("button", { name: /4/i });
    fireEvent.click(step4Btn);

    expect(screen.getByText(/Step 4 of 8/i)).toBeDefined();
    expect(screen.getAllByText(/Attack Story Builder/i).length).toBeGreaterThan(0);

    // Click the action button
    const actionBtn = screen.getByRole("button", { name: /Inspect Attack Story/i });
    fireEvent.click(actionBtn);

    expect(useSecurityStore.getState().activeTab).toBe("stories");
    expect(useSecurityStore.getState().isDemoGuideOpen).toBe(false);
  });

  it("closes modal on close button click", () => {
    useSecurityStore.setState({ isDemoGuideOpen: true });
    render(<DemoWalkthroughModal />);

    const closeBtn = screen.getByRole("button", { name: "" }); // X button
    fireEvent.click(closeBtn);

    expect(useSecurityStore.getState().isDemoGuideOpen).toBe(false);
  });
});
