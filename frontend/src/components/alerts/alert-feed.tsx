"use client";

import React, { useState, useMemo } from "react";
import { Alert } from "@/types";
import { AlertCard } from "./alert-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Panel } from "@/components/ui/panel";
import { NotificationBanner, NotificationItem } from "@/components/ui/notification";
import { useSecurityStore } from "@/store/useSecurityStore";
import {
  ShieldAlert,
  Filter,
  Layers,
  SlidersHorizontal,
  Flame,
  Zap,
  Server,
  Grid,
  CheckCircle2,
  RefreshCw,
  Terminal,
} from "lucide-react";

interface AlertFeedProps {
  initialAlerts?: Alert[];
}

export function AlertFeed({ initialAlerts }: AlertFeedProps) {
  const { setActiveTab, setSelectedStoryId } = useSecurityStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [selectedSource, setSelectedSource] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [groupingMode, setGroupingMode] = useState<"none" | "story" | "host" | "tactic">("none");
  const [sortBy, setSortBy] = useState<"risk_desc" | "risk_asc" | "newest" | "oldest" | "confidence">("risk_desc");
  const [showSuppressed, setShowSuppressed] = useState(false);

  // Inspector & Action States
  const [inspectedAlert, setInspectedAlert] = useState<Alert | null>(null);
  const [quarantineTarget, setQuarantineTarget] = useState<string | null>(null);
  const [isQuarantining, setIsQuarantining] = useState(false);
  const [toast, setToast] = useState<NotificationItem | null>(null);

  // Enterprise baseline alerts
  const allAlerts: Alert[] = useMemo(() => {
    if (initialAlerts && initialAlerts.length > 0) return initialAlerts;
    const now = Date.now();
    return [
      {
        id: "alt-101",
        title: "Suspicious Encoded PowerShell Execution (Download Cradle)",
        description: "powershell.exe executed with -EncodedCommand attempting outbound HTTP beacon.",
        severity: "Critical",
        source: "CrowdStrike Falcon",
        category: "Execution",
        risk_score: 94.0,
        confidence: 0.96,
        is_suppressed: false,
        cluster_id: "cluster-corr-1",
        created_at: new Date(now - 15 * 60000).toISOString(),
        mitre_mappings: [
          { id: "m-1", tactic: "Execution", technique_id: "T1059.001", technique_name: "PowerShell", confidence: 0.98 },
        ],
        raw_payload: { cmd: "powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA...", pid: 4812, host: "WKSTN-FIN-04" },
      },
      {
        id: "alt-102",
        title: "LSASS Memory Dump via comsvcs.dll MiniDump",
        description: "rundll32 comsvcs.dll #24 MiniDump executed on Domain Controller candidate.",
        severity: "Critical",
        source: "Microsoft Defender XDR",
        category: "CredentialAccess",
        risk_score: 98.5,
        confidence: 0.99,
        is_suppressed: false,
        cluster_id: "cluster-corr-1",
        created_at: new Date(now - 10 * 60000).toISOString(),
        mitre_mappings: [
          { id: "m-2", tactic: "Credential Access", technique_id: "T1003.001", technique_name: "LSASS Memory", confidence: 0.99 },
        ],
        raw_payload: { module: "comsvcs.dll", target_process: "lsass.exe", host: "WKSTN-FIN-04" },
      },
      {
        id: "alt-103",
        title: "Anomalous Ingress VPN Login from Tor Exit Node",
        description: "Authentication for j.doe@sentinel.corp from known Tor relay 185.220.101.5.",
        severity: "High",
        source: "Okta Identity Cloud",
        category: "InitialAccess",
        risk_score: 88.0,
        confidence: 0.92,
        is_suppressed: false,
        cluster_id: "cluster-corr-1",
        created_at: new Date(now - 35 * 60000).toISOString(),
        mitre_mappings: [
          { id: "m-3", tactic: "Initial Access", technique_id: "T1078.004", technique_name: "Cloud Accounts", confidence: 0.90 },
        ],
        raw_payload: { ip: "185.220.101.5", user: "j.doe@sentinel.corp", mfa: "Passed-PushSpam" },
      },
      {
        id: "alt-104",
        title: "Large Volume Data Egress over DNS Tunneling",
        description: "Unusually high TXT query frequency toward external authoritative domain ns1.dark-c2.net.",
        severity: "Critical",
        source: "Zeek / Corelight",
        category: "Exfiltration",
        risk_score: 95.0,
        confidence: 0.94,
        is_suppressed: false,
        cluster_id: "cluster-corr-1",
        created_at: new Date(now - 5 * 60000).toISOString(),
        mitre_mappings: [
          { id: "m-4", tactic: "Exfiltration", technique_id: "T1048.003", technique_name: "Exfiltration Over DNS", confidence: 0.95 },
        ],
        raw_payload: { domain: "ns1.dark-c2.net", bytes: "52.4 MB", host: "WKSTN-FIN-04" },
      },
      {
        id: "alt-105",
        title: "Scheduled Task Persistence via certutil.exe Download",
        description: "Low-privilege service account registered persistent task running certutil -urlcache download.",
        severity: "High",
        source: "Microsoft Defender XDR",
        category: "Persistence",
        risk_score: 78.0,
        confidence: 0.89,
        is_suppressed: false,
        cluster_id: "cluster-corr-2",
        created_at: new Date(now - 75 * 60000).toISOString(),
        mitre_mappings: [
          { id: "m-5", tactic: "Persistence", technique_id: "T1053.005", technique_name: "Scheduled Task", confidence: 0.91 },
        ],
        raw_payload: { task: "SystemSyncUpdate", binary: "certutil.exe", host: "SRV-APP-02" },
      },
      {
        id: "alt-106",
        title: "Routine Vulnerability Scanner Port Sweep",
        description: "Automated internal Nessus scanner querying ports 22, 80, 443 across subnet.",
        severity: "Low",
        source: "Palo Alto Networks",
        category: "Reconnaissance",
        risk_score: 12.0,
        confidence: 0.99,
        is_suppressed: true,
        suppression_reason: "Matches authorized Qualys scanner profile on 10.0.10.15",
        created_at: new Date(now - 50 * 60000).toISOString(),
        mitre_mappings: [
          { id: "m-6", tactic: "Reconnaissance", technique_id: "T1595", technique_name: "Active Scanning", confidence: 0.95 },
        ],
        raw_payload: { scanner_ip: "10.0.10.15", authorized: true, host: "NET-SCAN-01" },
      },
      {
        id: "alt-107",
        title: "Health Probe Heartbeat Timeout Spurious Spike",
        description: "Cluster agent timed out for 1200ms due to temporary hypervisor memory migration.",
        severity: "Low",
        source: "Kubernetes / Datadog",
        category: "Reconnaissance",
        risk_score: 8.5,
        confidence: 0.98,
        is_suppressed: true,
        suppression_reason: "Automated infra transient state de-duplicated",
        created_at: new Date(now - 90 * 60000).toISOString(),
        mitre_mappings: [],
        raw_payload: { probe: "kubelet_check", host: "K8S-NODE-03" },
      },
    ];
  }, [initialAlerts]);

  // Filtering & Sorting Pipeline
  const filteredAlerts = useMemo(() => {
    return allAlerts
      .filter((alert) => {
        // Suppression filter
        if (!showSuppressed && alert.is_suppressed) return false;

        // Severity filter
        if (selectedSeverity !== "ALL" && alert.severity.toUpperCase() !== selectedSeverity) {
          return false;
        }

        // Source filter
        if (selectedSource !== "ALL" && !alert.source.toLowerCase().includes(selectedSource.toLowerCase())) {
          return false;
        }

        // Category filter
        if (selectedCategory !== "ALL" && alert.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Search text
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = alert.title.toLowerCase().includes(q);
          const matchesDesc = alert.description?.toLowerCase().includes(q);
          const matchesSource = alert.source.toLowerCase().includes(q);
          const matchesCategory = alert.category.toLowerCase().includes(q);
          const matchesMitre = alert.mitre_mappings?.some(
            (m) => m.technique_id.toLowerCase().includes(q) || m.technique_name.toLowerCase().includes(q)
          );
          return matchesTitle || matchesDesc || matchesSource || matchesCategory || matchesMitre;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "risk_desc") return b.risk_score - a.risk_score;
        if (sortBy === "risk_asc") return a.risk_score - b.risk_score;
        if (sortBy === "confidence") return b.confidence - a.confidence;
        if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        return 0;
      });
  }, [allAlerts, showSuppressed, selectedSeverity, selectedSource, selectedCategory, searchQuery, sortBy]);

  // Grouped alert collections
  const groupedAlerts = useMemo(() => {
    if (groupingMode === "none") return null;

    const groups: Record<string, Alert[]> = {};

    filteredAlerts.forEach((a) => {
      let key = "Unassigned";
      if (groupingMode === "story") {
        key = a.cluster_id ? `Campaign Story (${a.cluster_id})` : "Uncorrelated Alerts (Isolated)";
      } else if (groupingMode === "host") {
        key = a.raw_payload?.host || "Unspecified Endpoint";
      } else if (groupingMode === "tactic") {
        key = a.mitre_mappings?.[0]?.tactic || a.category || "General Execution";
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(a);
    });

    return groups;
  }, [filteredAlerts, groupingMode]);

  const handleInspectStory = (clusterId: string) => {
    setSelectedStoryId("story-001");
    setActiveTab("stories");
  };

  const handleConfirmQuarantine = () => {
    if (!quarantineTarget) return;
    setIsQuarantining(true);
    setTimeout(() => {
      setIsQuarantining(false);
      setToast({
        id: "quarantined-alert-host",
        title: "Endpoint Quarantined",
        message: `Asset ${quarantineTarget} has been isolated successfully. Network egress suspended.`,
        type: "success",
        timestamp: "Just now",
      });
      setQuarantineTarget(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toast && <NotificationBanner notification={toast} onDismiss={() => setToast(null)} />}

      {/* Top SOC Alert Velocity Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3 rounded-lg border border-slate-800 bg-[#090e1b] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Gross Alert Intake</span>
            <div className="text-lg font-bold text-white">24,680</div>
          </div>
          <ShieldAlert className="w-5 h-5 text-blue-400" />
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-[#090e1b] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Triage Candidates</span>
            <div className="text-lg font-bold text-red-400">{filteredAlerts.length} Active</div>
          </div>
          <Flame className="w-5 h-5 text-red-400" />
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-[#090e1b] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Noise Suppressed</span>
            <div className="text-lg font-bold text-emerald-400">94.8%</div>
          </div>
          <Zap className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-[#090e1b] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Story Correlation</span>
            <div className="text-lg font-bold text-cyan-300">14 Stories</div>
          </div>
          <Layers className="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0c1322] space-y-4">
        {/* Search Input with quick keywords */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSelectQuickFilter={(qf) => setSearchQuery(qf)}
        />

        {/* Multi-Dimensional Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Severity:</span>
            {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  selectedSeverity === sev
                    ? "bg-blue-600 text-white border border-blue-400"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Grouping and Sorting Options */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Group By:</span>
              <select
                value={groupingMode}
                onChange={(e) => setGroupingMode(e.target.value as any)}
                className="bg-[#080d19] border border-slate-700 rounded px-2 py-1 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="none">None (Flat List)</option>
                <option value="story">Correlated Attack Story</option>
                <option value="host">Target Endpoint</option>
                <option value="tactic">MITRE Tactic</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#080d19] border border-slate-700 rounded px-2 py-1 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="risk_desc">Highest Risk Score</option>
                <option value="risk_asc">Lowest Risk Score</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="confidence">Highest Confidence</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[11px] text-slate-300">
              <input
                type="checkbox"
                checked={showSuppressed}
                onChange={(e) => setShowSuppressed(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0"
              />
              <span>Show Suppressed Noise</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Alert List Display */}
      {groupedAlerts ? (
        // Grouped Mode
        <div className="space-y-6">
          {Object.entries(groupedAlerts).map(([groupTitle, alertsInGroup]) => (
            <div key={groupTitle} className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white font-mono">{groupTitle}</h3>
                  <Badge variant="outline">{alertsInGroup.length} alerts</Badge>
                </div>
                {groupTitle.includes("Campaign Story") && (
                  <Button
                    variant="cyber"
                    size="sm"
                    onClick={() => handleInspectStory("cluster-corr-1")}
                  >
                    Inspect Attack Narrative
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {alertsInGroup.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onInspectStory={handleInspectStory}
                    onIsolateHost={(h) => setQuarantineTarget(h)}
                    onOpenDetails={(a) => setInspectedAlert(a)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Flat List Mode
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-xl">
              No telemetry alerts match current search query and severity filters.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onInspectStory={handleInspectStory}
                onIsolateHost={(h) => setQuarantineTarget(h)}
                onOpenDetails={(a) => setInspectedAlert(a)}
              />
            ))
          )}
        </div>
      )}

      {/* Slide-over Deep Inspection Panel */}
      <Panel
        isOpen={!!inspectedAlert}
        onClose={() => setInspectedAlert(null)}
        title={inspectedAlert ? inspectedAlert.title : "Alert Forensics"}
        subtitle={inspectedAlert ? `ID: ${inspectedAlert.id} • ${inspectedAlert.source}` : undefined}
        badge={
          inspectedAlert && (
            <Badge
              variant={
                inspectedAlert.severity.toLowerCase() === "critical"
                  ? "critical"
                  : inspectedAlert.severity.toLowerCase() === "high"
                  ? "high"
                  : "default"
              }
            >
              {inspectedAlert.severity}
            </Badge>
          )
        }
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setInspectedAlert(null)}>
              Close
            </Button>
            <Button
              variant="containment"
              size="sm"
              onClick={() => {
                setQuarantineTarget("WKSTN-FIN-04");
                setInspectedAlert(null);
              }}
            >
              Isolate Endpoint
            </Button>
          </>
        }
      >
        {inspectedAlert && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 space-y-1">
              <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">
                Explainability Engine Justification
              </span>
              <p className="text-slate-200 font-sans text-xs leading-relaxed">
                Prioritized as <strong className="text-red-400">{inspectedAlert.severity}</strong> with risk score of{" "}
                <strong className="text-white">{inspectedAlert.risk_score}</strong> due to sequential chaining of credential theft and lateral reconnaissance telemetry on high-value asset.
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                MITRE ATT&CK Mappings
              </span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {inspectedAlert.mitre_mappings?.map((m) => (
                  <Badge key={m.id} variant="mitre">
                    {m.technique_id} {m.technique_name} ({m.tactic})
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Raw Telemetry Payload
              </span>
              <pre className="mt-1.5 p-3 rounded-lg bg-black/70 border border-slate-800 text-[11px] text-cyan-300 overflow-x-auto">
                {JSON.stringify(inspectedAlert.raw_payload || {}, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Panel>

      {/* Host Quarantine Confirmation Modal */}
      <Dialog
        isOpen={!!quarantineTarget}
        onClose={() => setQuarantineTarget(null)}
        title="Confirm Host Isolation"
        description={`Quarantine endpoint ${quarantineTarget} immediately from corporate network.`}
        confirmLabel="Sever Connections & Isolate"
        variant="containment"
        isLoading={isQuarantining}
        onConfirm={handleConfirmQuarantine}
      >
        <p className="leading-relaxed">
          Executing network isolation on <span className="font-mono font-bold text-white">{quarantineTarget}</span> will drop all network egress and ingress, stopping lateral propagation immediately.
        </p>
      </Dialog>
    </div>
  );
}
