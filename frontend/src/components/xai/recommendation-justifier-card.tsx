"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle2, Lock, Key, Ban, ArrowRight, Zap } from "lucide-react";

interface ActionJustification {
  id: string;
  actionTitle: string;
  target: string;
  urgency: "Critical" | "High";
  technicalJustification: string;
  projectedRiskDelta: string;
  businessDisruptionRisk: string;
  isExecuted: boolean;
}

interface RecommendationJustifierCardProps {
  onActionExecuted?: (action: ActionJustification) => void;
}

export function RecommendationJustifierCard({ onActionExecuted }: RecommendationJustifierCardProps) {
  const [actions, setActions] = useState<ActionJustification[]>([
    {
      id: "rec-1",
      actionTitle: "Network Quarantine of Endpoint WKSTN-FIN-04",
      target: "WKSTN-FIN-04 (10.0.4.112)",
      urgency: "Critical",
      technicalJustification:
        "Active reflective Cobalt Strike beacon running in memory under PID 4812. Quarantining terminates the active C2 session and halts lateral discovery scans against the Domain Controller.",
      projectedRiskDelta: "Δ -48.5 Points Immediate Drop",
      businessDisruptionRisk: "Low: Isolates single endpoint. Does not impact ERP or central finance databases.",
      isExecuted: false,
    },
    {
      id: "rec-2",
      actionTitle: "Revoke Okta & Entra ID OAuth Refresh Tokens",
      target: "j.doe@sentinel.corp",
      urgency: "Critical",
      technicalJustification:
        "External VPN session authenticated via Tor relay using harvested credentials. Invalidating refresh tokens drops the active adversary session immediately.",
      projectedRiskDelta: "Δ -24.0 Points Immediate Drop",
      businessDisruptionRisk: "Minimal: User prompted to re-authenticate via hardware FIDO2 key upon return.",
      isExecuted: false,
    },
    {
      id: "rec-3",
      actionTitle: "Sinkhole Authoritative DNS Domain ns1.dark-c2.net",
      target: "ns1.dark-c2.net (DNS Firewall)",
      urgency: "High",
      technicalJustification:
        "Authoritative nameserver receiving Base32 encoded TXT exfiltration records. Sinkholing prevents further data loss across all perimeter resolvers.",
      projectedRiskDelta: "Δ -18.2 Points Immediate Drop",
      businessDisruptionRisk: "Zero: Domain was newly registered 48 hours ago with zero benign enterprise traffic.",
      isExecuted: false,
    },
  ]);

  const handleExecute = (id: string) => {
    setActions((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = { ...a, isExecuted: true };
          onActionExecuted?.(updated);
          return updated;
        }
        return a;
      })
    );
  };

  return (
    <Card glow="critical">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-950/80 text-purple-400 border border-purple-800/80">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">
              EXPLAINABLE AI: CONTAINMENT JUSTIFICATION & IMPACT
            </CardTitle>
          </div>
          <Badge variant="critical">TRANSPARENT REASONING</Badge>
        </div>
        <CardDescription>
          Every containment recommendation provides an auditable operational justification, projected risk reduction delta, and business impact assessment.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        {actions.map((act) => (
          <div
            key={act.id}
            className={`p-4 rounded-xl border transition-all ${
              act.isExecuted
                ? "bg-[#091512] border-emerald-900/60"
                : "bg-[#090e1b] border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">{act.actionTitle}</span>
                  <Badge variant={act.urgency === "Critical" ? "critical" : "high"}>
                    {act.urgency}
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-400">
                  Target: <strong className="text-cyan-300">{act.target}</strong>
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  {act.technicalJustification}
                </p>
              </div>

              <div className="shrink-0 sm:self-center">
                {act.isExecuted ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Enforced
                  </span>
                ) : (
                  <Button
                    variant={act.urgency === "Critical" ? "containment" : "default"}
                    size="sm"
                    onClick={() => handleExecute(act.id)}
                  >
                    <span>Enforce Mitigation</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Impact Metric Strip */}
            <div className="pt-2.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Zap className="w-3 h-3 shrink-0" />
                <span>Projected Risk Reduction: <strong>{act.projectedRiskDelta}</strong></span>
              </div>
              <div className="text-slate-400 truncate">
                Disruption: <span className="text-slate-300">{act.businessDisruptionRisk}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
