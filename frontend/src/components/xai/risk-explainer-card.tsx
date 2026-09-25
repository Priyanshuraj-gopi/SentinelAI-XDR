"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { Flame, ShieldAlert, Sparkles, Sliders, CheckCircle2, RotateCcw } from "lucide-react";

interface RiskFactor {
  id: string;
  name: string;
  weight: number;
  pointsAdded: number;
  description: string;
  mitigated: boolean;
}

export function RiskExplainerCard() {
  const [factors, setFactors] = useState<RiskFactor[]>([
    {
      id: "asset",
      name: "Crown Jewel Asset Target (Domain Controller)",
      weight: 1.5,
      pointsAdded: 32.4,
      description: "Direct reconnaissance and ticket enumeration targeting DC-PRIMARY-01.corp.",
      mitigated: false,
    },
    {
      id: "velocity",
      name: "Rapid Kill-Chain Velocity (<45 mins)",
      weight: 1.35,
      pointsAdded: 26.8,
      description: "Adversary navigated from external VPN login to LSASS dump in 38 minutes.",
      mitigated: false,
    },
    {
      id: "privilege",
      name: "SYSTEM Privilege Context & LSASS Dumping",
      weight: 1.25,
      pointsAdded: 22.7,
      description: "Harvested Kerberos TGT hashes under NT AUTHORITY\\SYSTEM context.",
      mitigated: false,
    },
    {
      id: "entropy",
      name: "High Shannon Entropy in Process Arguments",
      weight: 1.15,
      pointsAdded: 16.5,
      description: "Process powershell.exe launched with 5.92 bits/char entropy (>3.4σ above baseline).",
      mitigated: false,
    },
  ]);

  const toggleMitigate = (id: string) => {
    setFactors((prev) =>
      prev.map((f) => (f.id === id ? { ...f, mitigated: !f.mitigated } : f))
    );
  };

  const resetSimulation = () => {
    setFactors((prev) => prev.map((f) => ({ ...f, mitigated: false })));
  };

  // Dynamically compute simulated risk
  const activePoints = factors
    .filter((f) => !f.mitigated)
    .reduce((sum, f) => sum + f.pointsAdded, 0);

  const baseTelemetryRisk = 24.2;
  const currentRiskScore = Math.min(99.9, Math.round((baseTelemetryRisk + activePoints * 0.76) * 10) / 10);

  return (
    <Card glow={currentRiskScore >= 85 ? "critical" : currentRiskScore >= 60 ? "high" : "blue"}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-red-950/80 text-red-400 border border-red-800/80">
              <Flame className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">
              EXPLAINABLE AI: RISK SCORE FACTOR ATTRIBUTION
            </CardTitle>
          </div>
          <Badge variant={currentRiskScore >= 85 ? "critical" : "low"}>
            {currentRiskScore >= 85 ? "HIGH THREAT PRIORITY" : "CONTAINED / SUPPRESSED"}
          </Badge>
        </div>
        <CardDescription>
          Transparent mathematical breakdown: every single point of the composite risk score is attributed to deterministic telemetry factors.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Score and What-If Sandbox Summary */}
        <div className="p-4 rounded-xl bg-[#090e1b] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
          <div className="space-y-1">
            <div className="text-[11px] text-slate-400 uppercase">Composite Threat Evaluation</div>
            <div className="text-2xl font-bold text-white flex items-center gap-3">
              <span className={currentRiskScore >= 85 ? "text-red-400" : "text-emerald-400"}>
                {currentRiskScore.toFixed(1)} / 100
              </span>
              <span className="text-xs text-slate-400 font-normal">
                (Base Telemetry: {baseTelemetryRisk} + Dynamic Multipliers)
              </span>
            </div>
            <div className="text-xs text-slate-300 font-sans">
              Click checkboxes below to simulate real-time risk reduction via automated containment.
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <RiskIndicator score={currentRiskScore} size="lg" showGauge showLabel />
            <button
              onClick={resetSimulation}
              title="Reset Simulation"
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Factor List */}
        <div className="space-y-2.5 font-mono text-xs">
          {factors.map((factor) => (
            <div
              key={factor.id}
              onClick={() => toggleMitigate(factor.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-4 ${
                factor.mitigated
                  ? "bg-[#091512] border-emerald-800/60 opacity-70"
                  : "bg-[#0a101f] border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={factor.mitigated}
                  onChange={() => {}}
                  className="mt-1 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0 cursor-pointer"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-xs ${factor.mitigated ? "text-emerald-400 line-through" : "text-white"}`}>
                      {factor.name}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                      Multiplier: {factor.weight}x
                    </span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`font-bold text-xs ${factor.mitigated ? "text-emerald-400" : "text-red-400"}`}>
                  {factor.mitigated ? "MITIGATED" : `+${factor.pointsAdded} pts`}
                </span>
                <div className="text-[10px] text-slate-500">
                  {factor.mitigated ? "Risk Reduced" : "Active Driver"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
