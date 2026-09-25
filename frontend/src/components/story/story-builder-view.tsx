"use client";

import React, { useState } from "react";
import { StoryHeader } from "./story-header";
import { StoryNarrativeCard } from "./story-narrative-card";
import { StoryEntitiesMatrix } from "./story-entities-matrix";
import { StoryEvidenceTimeline } from "./story-evidence-timeline";
import { StoryRecommendationsList } from "./story-recommendations-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { NotificationBanner, NotificationItem } from "@/components/ui/notification";
import { AttackStory, Recommendation } from "@/types";
import { Clock, Shield, Sparkles, Layers, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSecurityStore } from "@/store/useSecurityStore";

interface StoryBuilderViewProps {
  story?: AttackStory;
}

export function StoryBuilderView({ story: customStory }: StoryBuilderViewProps) {
  const { setActiveTab } = useSecurityStore();
  const [activeSubTab, setActiveSubTab] = useState<"timeline" | "entities" | "mitigations">("timeline");
  const [toast, setToast] = useState<NotificationItem | null>(null);
  const [isQuarantineOpen, setIsQuarantineOpen] = useState(false);
  const [isQuarantining, setIsQuarantining] = useState(false);

  // Enterprise baseline Attack Story (Operation DarkHydra)
  const defaultStory: AttackStory = {
    id: "story-001",
    title: "Operation DarkHydra: Tor VPN Ingress to Domain Admin Ransomware Staging",
    narrative:
      "External threat actor authenticated into account j.doe@sentinel.corp via MFA push fatigue from Tor Exit Relay 185.220.101.5. Upon acquiring interactive VPN access, adversary spawned in-memory PowerShell download cradle (PID 4812) on endpoint WKSTN-FIN-04. Using comsvcs.dll #24, the actor dumped LSASS process memory, compromised Kerberos credentials, conducted lateral enumeration against DC-PRIMARY-01.corp, and initiated large-volume encrypted DNS tunneling (52.4MB) toward ns1.dark-c2.net.",
    kill_chain_phase: "Lateral Movement / Exfiltration",
    status: "Active - Immediate Triage",
    aggregate_risk: 98.4,
    confidence: 0.97,
    verdict: "True Positive - Malicious APT Campaign",
    impact_scope: "2 Hosts, 1 Domain Controller, 1 Identity Account, 1 External C2 Channel",
    created_at: new Date(Date.now() - 80 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60000).toISOString(),
    cluster_id: "cluster-corr-1",
    timeline_events: [
      {
        id: "te-1",
        story_id: "story-001",
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        phase: "Initial Access",
        headline: "Compromised Credentials via Tor VPN",
        details: "User j.doe authenticated from 185.220.101.5 (Tor exit node) bypassing typical geolocation policy.",
        actor: "j.doe@sentinel.corp",
        target: "VPN-GW-EAST.corp",
        evidence_type: "AuthTelemetry",
        evidence_payload: { mfa: "Push-Spam-Approved", client_ip: "185.220.101.5", vpn_endpoint: "gateway-east.corp" },
      },
      {
        id: "te-2",
        story_id: "story-001",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        phase: "Execution",
        headline: "In-Memory PowerShell C2 Cradle",
        details: "powershell.exe -Enc injected reflective Cobalt Strike DLL loader into memory space of WKSTN-FIN-04.",
        actor: "j.doe",
        target: "WKSTN-FIN-04",
        evidence_type: "ProcessTree",
        evidence_payload: { parent: "explorer.exe", child: "powershell.exe", pid: 4812, cmd: "powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA..." },
      },
      {
        id: "te-3",
        story_id: "story-001",
        timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
        phase: "Credential Access",
        headline: "LSASS Process Memory Minidump",
        details: "comsvcs.dll #24 invoked against lsass.exe to harvest Kerberos ticket hashes and domain admin tokens.",
        actor: "NT AUTHORITY\\SYSTEM",
        target: "WKSTN-FIN-04",
        evidence_type: "MemoryTelemetry",
        evidence_payload: { dump_file: "C:\\Windows\\Temp\\debug.dmp", target_process: "lsass.exe" },
      },
      {
        id: "te-4",
        story_id: "story-001",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        phase: "Exfiltration",
        headline: "Outbound DNS Tunneling to dark-c2.net",
        details: "52MB of compressed credential cache exfiltrated via high-frequency Base32 TXT queries.",
        actor: "WKSTN-FIN-04",
        target: "ns1.dark-c2.net",
        evidence_type: "NetworkFlow",
        evidence_payload: { dns_queries: 4200, domain: "ns1.dark-c2.net", protocol: "DNS-over-UDP" },
      },
    ],
    recommendations: [
      {
        id: "rec-101",
        story_id: "story-001",
        title: "Isolate Compromised Endpoint WKSTN-FIN-04",
        action_type: "IsolateHost",
        target_entity: "WKSTN-FIN-04",
        urgency: "Critical",
        justification: "Active C2 beaconing and credential harvesting detected in local memory.",
        status: "Pending",
      },
      {
        id: "rec-102",
        story_id: "story-001",
        title: "Revoke Active Session Tokens for j.doe",
        action_type: "RevokeToken",
        target_entity: "j.doe@sentinel.corp",
        urgency: "Critical",
        justification: "Primary identity hijacked via external VPN endpoint.",
        status: "Pending",
      },
      {
        id: "rec-103",
        story_id: "story-001",
        title: "Null-Route Domain dark-c2.net on Firewalls",
        action_type: "BlockDomain",
        target_entity: "dark-c2.net",
        urgency: "High",
        justification: "Identified authoritative domain for ongoing data exfiltration.",
        status: "Pending",
      },
    ],
  };

  const story = customStory || defaultStory;

  const handleExecuteRecommendation = (rec: Recommendation) => {
    setToast({
      id: `rec-enforced-${rec.id}`,
      title: "Mitigation Action Enforced",
      message: `${rec.title}: Enforced across endpoint management agents. Target: ${rec.target_entity}.`,
      type: "success",
      timestamp: "Just now",
    });
  };

  const handleConfirmQuarantine = () => {
    setIsQuarantining(true);
    setTimeout(() => {
      setIsQuarantining(false);
      setIsQuarantineOpen(false);
      setToast({
        id: "containment-all",
        title: "Emergency Host Isolation Enforced",
        message: "Endpoint WKSTN-FIN-04 has been quarantined from subnet. Active C2 connections terminated.",
        type: "success",
        timestamp: "Just now",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toast && <NotificationBanner notification={toast} onDismiss={() => setToast(null)} />}

      {/* Centerpiece Header */}
      <StoryHeader
        story={story}
        onExecuteContainment={() => setIsQuarantineOpen(true)}
        onExportReport={() => {
          setToast({
            id: "export-done",
            title: "Incident Brief Compiled",
            message: "Executive PDF and JSON forensic manifest generated successfully.",
            type: "info",
            timestamp: "Just now",
          });
        }}
      />

      {/* Executive Narrative Card */}
      <StoryNarrativeCard narrative={story.narrative} />

      {/* Investigation Workspace Navigation Sub-Tabs */}
      <div className="p-3 rounded-xl border border-slate-800 bg-[#0c1322] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab("timeline")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === "timeline"
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Forensic Evidence Timeline ({story.timeline_events.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("entities")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === "entities"
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Entity Blast-Radius Matrix</span>
          </button>

          <button
            onClick={() => setActiveSubTab("mitigations")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === "mitigations"
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Actionable Mitigations ({story.recommendations.length})</span>
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveTab("graph")}
        >
          <span>Open in Graph Visualizer</span>
        </Button>
      </div>

      {/* Sub-Tab 1: Forensic Timeline */}
      {activeSubTab === "timeline" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-mono">
              CHRONOLOGICAL ATTACK KILL-CHAIN EVIDENCE
            </CardTitle>
            <CardDescription>
              Temporal sequence of adversary maneuvers reconstructed from cross-telemetry streams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StoryEvidenceTimeline events={story.timeline_events} />
          </CardContent>
        </Card>
      )}

      {/* Sub-Tab 2: Entities Matrix */}
      {activeSubTab === "entities" && (
        <StoryEntitiesMatrix
          onIsolateHost={() => setIsQuarantineOpen(true)}
          onRevokeUser={(user) => {
            setToast({
              id: "revoked-user",
              title: "Session Revoked",
              message: `Active identity tokens for ${user} have been revoked in Okta and Entra ID.`,
              type: "success",
              timestamp: "Just now",
            });
          }}
        />
      )}

      {/* Sub-Tab 3: Actionable Mitigations */}
      {activeSubTab === "mitigations" && (
        <Card glow="critical">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-400 font-mono">
              AUTOMATED CONTAINMENT & MITIGATION ACTIONS
            </CardTitle>
            <CardDescription>
              One-click actions synthesized by the Recommendation Engine to halt active adversary exfiltration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StoryRecommendationsList
              recommendations={story.recommendations}
              onExecuteAction={handleExecuteRecommendation}
            />
          </CardContent>
        </Card>
      )}

      {/* Containment Confirmation Modal */}
      <Dialog
        isOpen={isQuarantineOpen}
        onClose={() => setIsQuarantineOpen(false)}
        title="Execute Emergency Host Isolation"
        description="Quarantine endpoint WKSTN-FIN-04 immediately from corporate network."
        confirmLabel="Sever Connections & Isolate"
        variant="containment"
        isLoading={isQuarantining}
        onConfirm={handleConfirmQuarantine}
      >
        <p className="leading-relaxed">
          Executing network quarantine on <span className="font-mono font-bold text-white">WKSTN-FIN-04 (10.0.4.112)</span> will immediately drop all active TCP/UDP sessions, severing the C2 DNS tunneling channel.
        </p>
      </Dialog>
    </div>
  );
}
