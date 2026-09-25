import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NovelAttackView } from "@/components/novel/novel-attack-view";

describe("NovelAttackView Phase 8", () => {
  it("renders the behavioral execution graph and statistical outlier metrics", () => {
    render(<NovelAttackView />);
    expect(screen.getByText(/BEHAVIORAL EXECUTION LINEAGE GRAPH/i)).toBeDefined();
    expect(screen.getByText(/3.4σ STATISTICAL OUTLIER/i)).toBeDefined();
    expect(screen.getAllByText(/Unsupervised Isolation Forest/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/powershell.exe -Enc/i)).toBeDefined();
  });

  it("renders the behavioral anomaly reasoning engine cards", () => {
    render(<NovelAttackView />);
    expect(screen.getByText(/BEHAVIORAL ANOMALY REASONING ENGINE/i)).toBeDefined();
    expect(screen.getByText(/Shannon Information Entropy Spike/i)).toBeDefined();
    expect(screen.getByText(/Atypical Parent-Child Execution Lineage/i)).toBeDefined();
    expect(screen.getByText(/Asynchronous UDP\/53 Volumetric Tunneling/i)).toBeDefined();
  });

  it("renders the comparative matrix contrasting legacy signatures against behavioral zero-day", () => {
    render(<NovelAttackView />);
    expect(screen.getByText(/COMPARISON: KNOWN ATTACK SIGNATURES VS. NOVEL BEHAVIORAL ZERO-DAY/i)).toBeDefined();
    expect(screen.getByText(/Payload Delivery Mechanism/i)).toBeDefined();
    expect(screen.getByText(/Reflective in-memory DLL injection/i)).toBeDefined();
  });
});
