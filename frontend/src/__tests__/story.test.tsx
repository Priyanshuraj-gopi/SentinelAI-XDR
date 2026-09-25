import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StoryBuilderView } from "@/components/story/story-builder-view";

describe("StoryBuilderView Phase 6 Centerpiece", () => {
  it("renders the attack story title, aggregate risk, and narrative card", () => {
    render(<StoryBuilderView />);
    expect(screen.getByText(/Operation DarkHydra/i)).toBeDefined();
    expect(screen.getByText(/ATTACK STORY CENTERPIECE/i)).toBeDefined();
    expect(screen.getByText(/AUTONOMOUS ATTACK NARRATIVE RECONSTRUCTION/i)).toBeDefined();
    expect(screen.getByText(/Inferred Adversary Objective/i)).toBeDefined();
  });

  it("allows switching sub-tabs to view entities matrix and recommendations", () => {
    render(<StoryBuilderView />);
    const entitiesTab = screen.getByText(/Entity Blast-Radius Matrix/i);
    fireEvent.click(entitiesTab);
    expect(screen.getByText(/INCIDENT ENTITY BLAST-RADIUS MATRIX/i)).toBeDefined();

    const mitigationsTab = screen.getByText(/Actionable Mitigations/i);
    fireEvent.click(mitigationsTab);
    expect(screen.getByText(/AUTOMATED CONTAINMENT & MITIGATION ACTIONS/i)).toBeDefined();
  });
});
