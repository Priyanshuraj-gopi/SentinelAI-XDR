import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("SentinelAI Phase 1 Shell", () => {
  it("renders the SentinelAI platform brand and header", () => {
    render(<Home />);
    expect(screen.getByText("SentinelAI")).toBeDefined();
    expect(screen.getByText("Run Demo Scenario")).toBeDefined();
    expect(screen.getByText("Executive Dashboard")).toBeDefined();
  });
});
