"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AlertNode } from "@/components/graph/nodes/alert-node";
import { EntityNode } from "@/components/graph/nodes/entity-node";
import { ThreatActorNode } from "@/components/graph/nodes/threat-actor-node";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { useSecurityStore } from "@/store/useSecurityStore";
import {
  GitFork,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldAlert,
  Server,
  User,
  SlidersHorizontal,
  Zap,
  HelpCircle,
  Lock,
} from "lucide-react";

const nodeTypes = {
  alertNode: AlertNode,
  entityNode: EntityNode,
  threatActorNode: ThreatActorNode,
};

export function CorrelationVisualizer() {
  const { setActiveTab, setSelectedStoryId } = useSecurityStore();
  const [selectedClusterId, setSelectedClusterId] = useState("cluster-corr-1");
  const [temporalWindow, setTemporalWindow] = useState("45m");
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);

  // Initial nodes for Investigation #1 (Operation DarkHydra)
  const initialNodes: Node[] = useMemo(
    () => [
      {
        id: "ta-1",
        type: "threatActorNode",
        position: { x: 320, y: 30 },
        data: {
          label: "Adversary (Tor Exit Relay 185.220.101.5)",
          category: "External Threat",
          risk: 98,
          data: { ip: "185.220.101.5" },
        },
      },
      {
        id: "ent-user",
        type: "entityNode",
        position: { x: 120, y: 160 },
        data: {
          label: "j.doe@sentinel.corp",
          category: "Compromised Identity",
          criticality: "High",
          role: "Finance Senior Lead",
        },
      },
      {
        id: "alt-vpn",
        type: "alertNode",
        position: { x: 500, y: 160 },
        data: {
          label: "Okta: Anomalous VPN Login from Tor Relay",
          category: "Initial Access",
          risk: 88,
          source: "Okta Identity Cloud",
        },
      },
      {
        id: "ent-host",
        type: "entityNode",
        position: { x: 320, y: 290 },
        data: {
          label: "WKSTN-FIN-04 (10.0.4.112)",
          category: "Endpoint (Infected)",
          criticality: "High",
          role: "Windows 11 Enterprise",
        },
      },
      {
        id: "alt-ps",
        type: "alertNode",
        position: { x: 80, y: 420 },
        data: {
          label: "CrowdStrike: Encoded PowerShell C2 Cradle",
          category: "Execution",
          risk: 94,
          source: "CrowdStrike Falcon",
        },
      },
      {
        id: "alt-lsass",
        type: "alertNode",
        position: { x: 540, y: 420 },
        data: {
          label: "Defender: LSASS Memory Dump via comsvcs.dll",
          category: "Credential Access",
          risk: 98,
          source: "Microsoft Defender XDR",
        },
      },
      {
        id: "ent-dc",
        type: "entityNode",
        position: { x: 120, y: 560 },
        data: {
          label: "DC-PRIMARY-01.corp",
          category: "Crown Jewel (AD DS)",
          criticality: "Critical",
          role: "Domain Controller",
        },
      },
      {
        id: "alt-dns",
        type: "alertNode",
        position: { x: 500, y: 560 },
        data: {
          label: "Zeek: 52MB Data Egress via DNS Tunneling",
          category: "Exfiltration",
          risk: 95,
          source: "Zeek / Corelight",
        },
      },
    ],
    []
  );

  const initialEdges: Edge[] = useMemo(
    () => [
      {
        id: "e-ta-user",
        source: "ta-1",
        target: "ent-user",
        animated: true,
        label: "MFA Push Fatigue",
        style: { stroke: "#ef4444", strokeWidth: 2 },
      },
      {
        id: "e-ta-vpn",
        source: "ta-1",
        target: "alt-vpn",
        animated: true,
        label: "Tor Exit Relay",
        style: { stroke: "#ef4444", strokeWidth: 2 },
      },
      {
        id: "e-user-host",
        source: "ent-user",
        target: "ent-host",
        animated: true,
        label: "RDP Session",
        style: { stroke: "#3b82f6", strokeWidth: 2 },
      },
      {
        id: "e-host-ps",
        source: "ent-host",
        target: "alt-ps",
        animated: true,
        label: "Spawned PID 4812",
        style: { stroke: "#a855f7", strokeWidth: 2 },
      },
      {
        id: "e-host-lsass",
        source: "ent-host",
        target: "alt-lsass",
        animated: true,
        label: "comsvcs Dump",
        style: { stroke: "#ef4444", strokeWidth: 2 },
      },
      {
        id: "e-lsass-dc",
        source: "alt-lsass",
        target: "ent-dc",
        animated: true,
        label: "Harvested Kerberos TGT",
        style: { stroke: "#f59e0b", strokeWidth: 2 },
      },
      {
        id: "e-host-dns",
        source: "ent-host",
        target: "alt-dns",
        animated: true,
        label: "ns1.dark-c2.net",
        style: { stroke: "#06b6d4", strokeWidth: 2 },
      },
    ],
    []
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data);
  }, []);

  const clusters = [
    { id: "cluster-corr-1", label: "Investigation #1: Operation DarkHydra", alerts: 86, risk: 98.4, phase: "Exfiltration" },
    { id: "cluster-corr-2", label: "Investigation #2: Scheduled Task Persistence", alerts: 42, risk: 78.2, phase: "Persistence" },
    { id: "cluster-corr-3", label: "Investigation #3: DCSync Kerberoasting", alerts: 38, risk: 92.0, phase: "Credential Access" },
    { id: "cluster-corr-4", label: "Investigation #4: Tor Ingress Proxy Relay", alerts: 29, risk: 84.5, phase: "C2 Communication" },
  ];

  return (
    <div className="space-y-6">
      {/* High-Impact Correlation Header Banner */}
      <Card glow="blue">
        <CardContent className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Badge variant="mitre">GRAPH CORRELATION ENGINE (NETWORKX)</Badge>
              <Badge variant="low">95.6% COMPRESSION RATIO</Badge>
            </div>
            <h2 className="text-lg font-bold font-mono text-white tracking-tight flex flex-wrap items-center gap-2">
              <span className="text-slate-300">412 Raw Telemetry Alerts</span>
              <span className="text-blue-400">─── Graph Clustering ───▶</span>
              <span className="text-cyan-300">18 Unified Investigations</span>
            </h2>
            <p className="text-xs text-slate-400 font-sans max-w-3xl">
              Collapses multi-source telemetry from CrowdStrike, Defender, Okta, and Zeek into cohesive,
              explainable multi-partite attack trees by resolving entity ancestry and temporal windows.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="cyber"
              size="sm"
              onClick={() => {
                setSelectedStoryId("story-001");
                setActiveTab("stories");
              }}
            >
              <span>Convert to Attack Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cluster Switcher and Algorithm Hyperparameters */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0c1322] space-y-3 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white text-xs uppercase">Select Synthesized Investigation:</span>
          </div>

          {/* Temporal Window Selector */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Temporal Window:</span>
            {["15m", "45m", "2h", "6h"].map((tw) => (
              <button
                key={tw}
                onClick={() => setTemporalWindow(tw)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  temporalWindow === tw ? "bg-blue-600 text-white font-bold" : "bg-slate-800/80 hover:text-white"
                }`}
              >
                {tw}
              </button>
            ))}
          </div>
        </div>

        {/* Investigation Cluster Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          {clusters.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClusterId(c.id)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between space-y-1.5 ${
                selectedClusterId === c.id
                  ? "bg-blue-950/40 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                  : "bg-[#080d19] border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">{c.phase}</span>
                <span className="text-[10px] font-bold text-red-400">{c.risk} Risk</span>
              </div>
              <div className="font-bold text-slate-200 text-xs truncate">{c.label}</div>
              <div className="text-[10px] text-slate-500">{c.alerts} alerts correlated</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas and Reasoning Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive React Flow Graph Canvas (2 Columns) */}
        <div className="lg:col-span-2 h-[560px] rounded-xl border border-slate-800 bg-[#070b16] relative overflow-hidden shadow-2xl">
          <div className="absolute top-3 left-3 z-10 font-mono text-[11px] bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Interactive Attack Tree (Drag, Zoom & Click Nodes)</span>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            className="cyber-grid"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#1f293d" />
            <Controls className="bg-[#0b101d] border border-slate-800 fill-white stroke-white" />
            <MiniMap
              nodeColor={(n) => (n.type === "threatActorNode" ? "#ef4444" : n.type === "alertNode" ? "#3b82f6" : "#a855f7")}
              className="bg-[#0b101d] border border-slate-800 rounded-lg overflow-hidden"
            />
          </ReactFlow>
        </div>

        {/* "Explain Why" Transparent Reasoning Panel (1 Column) */}
        <div className="space-y-4">
          <Card glow="blue">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
                  <Sparkles className="w-4 h-4" />
                </span>
                <CardTitle className="text-white font-mono text-sm">EXPLAIN WHY (AI RATIONALE)</CardTitle>
              </div>
              <CardDescription>
                Auditable graph-theoretic explanation for grouping these 86 alerts.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3.5 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">1. Shared Entity Ancestry</span>
                <p className="text-slate-200 font-sans text-xs leading-relaxed">
                  All alerts intersect on root endpoint <strong className="text-white font-mono">WKSTN-FIN-04</strong> and session token <strong className="text-white font-mono">j.doe@sentinel.corp</strong>.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">2. Temporal Burst Window</span>
                <p className="text-slate-200 font-sans text-xs leading-relaxed">
                  Telemetry spanned a tight 38-minute tactical execution window (within the configured 45m threshold).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">3. MITRE Technique Progression</span>
                <p className="text-slate-200 font-sans text-xs leading-relaxed">
                  Sequential kill chain chaining: <code className="text-cyan-300 font-mono">T1078.004</code> (VPN) → <code className="text-cyan-300 font-mono">T1059.001</code> (PowerShell) → <code className="text-cyan-300 font-mono">T1003.001</code> (LSASS Dump) → <code className="text-cyan-300 font-mono">T1048.003</code> (DNS Exfil).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#0e172a] border border-emerald-900/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400">Analyst Impact</div>
                  <div className="text-white font-bold text-sm">~54 Mins Saved</div>
                </div>
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>

              <Button
                variant="cyber"
                className="w-full justify-center"
                onClick={() => {
                  setSelectedStoryId("story-001");
                  setActiveTab("stories");
                }}
              >
                <span>Reconstruct Attack Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      <Panel
        isOpen={!!selectedNodeData}
        onClose={() => setSelectedNodeData(null)}
        title={selectedNodeData ? selectedNodeData.label : "Node Inspection"}
        subtitle={selectedNodeData ? `Category: ${selectedNodeData.category}` : undefined}
      >
        {selectedNodeData && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40">
              <span className="text-[10px] text-blue-300 font-bold uppercase">Graph Adjacency</span>
              <p className="text-slate-200 font-sans text-xs mt-1">
                Connected into active campaign cluster via multi-partite entity resolution algorithm.
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Node Metadata Payload</span>
              <pre className="mt-1.5 p-3 rounded-lg bg-black/70 border border-slate-800 text-[11px] text-cyan-300 overflow-x-auto">
                {JSON.stringify(selectedNodeData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}
