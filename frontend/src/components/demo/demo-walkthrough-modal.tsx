"use client";

import React, { useState, useEffect } from "react";
import { useSecurityStore } from "@/store/useSecurityStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Award,
  Play,
  Activity,
  ShieldAlert,
  GitFork,
  BookOpen,
  Fingerprint,
  Cpu,
  Bot,
  FileText,
  Keyboard,
} from "lucide-react";

export function DemoWalkthroughModal() {
  const {
    isDemoGuideOpen,
    setIsDemoGuideOpen,
    setActiveTab,
    setIsCopilotOpen,
  } = useSecurityStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const demoSteps = [
    {
      step: 1,
      tab: "dashboard" as const,
      icon: Activity,
      title: "Executive Dashboard: The Enterprise Problem",
      pitch:
        "Begin the pitch by showing the scale of the crisis: enterprise SOCs ingest 24,000+ alerts daily, drowning analysts in false positives. SentinelAI automatically suppresses 94.8% of noise while maintaining an active DEFCON threat posture.",
      highlights: [
        "24,680 raw alerts compressed with 94.8% noise suppression",
        "MTTD reduced to 4.2 mins; MTTR reduced to 14.8 mins",
        "Interactive MITRE ATT&CK Matrix heatmap across 10 tactics",
      ],
      actionLabel: "Navigate to Dashboard",
    },
    {
      step: 2,
      tab: "alerts" as const,
      icon: ShieldAlert,
      title: "Correlated Alert Feed: De-duplication in Action",
      pitch:
        "Show how disparate alerts from CrowdStrike, Defender, Okta, and Zeek are categorized and contextualized. Demonstrate the noise suppression toggle and explainable XAI reasoning chips on each alert card.",
      highlights: [
        "Multi-vendor telemetry normalized into unified alert schemas",
        "AI reasoning pill explaining why each alert belongs to Operation DarkHydra",
        "Toggle to reveal the 396 suppressed background scanner sweeps",
      ],
      actionLabel: "View Correlated Feed",
    },
    {
      step: 3,
      tab: "graph" as const,
      icon: GitFork,
      title: "Attack Graphs & Trees: Interactive Causal Lineage",
      pitch:
        "Walk the judges through the interactive React Flow attack tree canvas. Demonstrate the Time Window Slider (0h to 24h) and click 'Explain Why Connected' to prove causal graph linkage.",
      highlights: [
        "Graph-theoretic compression: 400 alerts -> 18 focused clusters",
        "Interactive entity nodes (Threat Actors, Users, Hosts, C2)",
        "Temporal playback slider demonstrating attack evolution",
      ],
      actionLabel: "Explore Attack Graph",
    },
    {
      step: 4,
      tab: "stories" as const,
      icon: BookOpen,
      title: "Attack Story Builder: The Centerpiece Innovation",
      pitch:
        "This is the heart of SentinelAI. Show judges how 86 raw events are synthesized into a single human-readable story: 'Operation DarkHydra'. Walk through the Blast Radius, Root Cause, and Entity Matrix tabs.",
      highlights: [
        "Natural language executive narrative generated with zero hallucinations",
        "Multi-entity blast radius (Compromised Users, Devices, Processes, IPs)",
        "Chronological kill-chain timeline from initial access to egress",
      ],
      actionLabel: "Inspect Attack Story",
    },
    {
      step: 5,
      tab: "novel" as const,
      icon: Fingerprint,
      title: "Novel Attack Detector: Catching Zero-Day Threats",
      pitch:
        "Differentiate SentinelAI from traditional rule-based SIEMs. Explain how unsupervised machine learning (Isolation Forests & Graph Lineage) flags 3.4σ behavioral outliers without predefined signatures.",
      highlights: [
        "Parent-child execution anomaly: explorer.exe -> powershell.exe",
        "Shannon Information Entropy spike: 5.92 bits/character",
        "Asynchronous UDP/53 DNS TXT volumetric data tunneling",
      ],
      actionLabel: "Inspect Novel Detection",
    },
    {
      step: 6,
      tab: "workspace" as const,
      icon: Cpu,
      title: "Analyst Workspace & SOAR Playbooks: Rapid Containment",
      pitch:
        "Demonstrate Tier-3 incident triage: 1-click SOAR mitigations (Host Quarantine, Token Revocation, IP Block), Forensic Evidence Inspector drawer, collaborative notebook, and active learning feedback.",
      highlights: [
        "1-click SOAR containment applied across EDR, Identity, and Firewalls",
        "Deep forensic drawer: Processes, Memory Dumps, Network sessions",
        "Human-in-the-loop feedback tuning the correlation graph in real time",
      ],
      actionLabel: "Open Analyst Workspace",
    },
    {
      step: 7,
      tab: "copilot" as const,
      icon: Bot,
      title: "AI SOC Copilot: Context-Aware Autonomous Assistant",
      pitch:
        "Showcase the natural language assistant grounded in Story #001. Click a quick prompt ('What happened?' or 'Summarize for CISO') to show instant grounded synthesis, MITRE tags, and executable containment buttons.",
      highlights: [
        "Grounded directly in 86 telemetry signals with verifiable citations",
        "Pre-prompt quick chips tailored for rapid incident response",
        "Direct execution of SOAR containment actions from the chat stream",
      ],
      actionLabel: "Launch SOC Copilot",
    },
    {
      step: 8,
      tab: "reports" as const,
      icon: FileText,
      title: "Executive Disclosure: Print-Ready Post-Mortem",
      pitch:
        "Conclude the judging demo with the formal incident report. Show the C-level executive summary, MTTC reduction (4m 12s vs 60m SLA), IOC matrix, and print/PDF export capabilities.",
      highlights: [
        "Formal confidentiality header and cryptographic audit signature",
        "3-Tier CISO strategic recommendations roadmap",
        "Print-ready CSS for physical executive briefings or PDF generation",
      ],
      actionLabel: "View Incident Report",
    },
  ];

  const currentStep = demoSteps[currentStepIndex];
  const StepIcon = currentStep.icon;

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    setActiveTab(demoSteps[index].tab);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDemoGuideOpen) {
        setIsDemoGuideOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDemoGuideOpen, setIsDemoGuideOpen]);

  if (!isDemoGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-2xl bg-[#090e1b] border border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.25)] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0c1324] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/80">
              <Award className="w-5 h-5 text-cyan-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-sm sm:text-base font-bold text-white">
                  SENTINELAI 5-MINUTE LIVE JUDGING WALKTHROUGH
                </h3>
                <Badge variant="mitre">DEMO SCRIPT</Badge>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Interactive presentation roadmap for hackathon &amp; ideathon pitch sessions
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDemoGuideOpen(false)}
            className="p-1.5 rounded-lg border border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="px-5 py-3 bg-[#070b14] border-b border-slate-800 flex items-center justify-between overflow-x-auto gap-2">
          {demoSteps.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => handleJumpToStep(idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
                idx === currentStepIndex
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40"
                  : idx < currentStepIndex
                  ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/60"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="text-[10px] w-4 h-4 rounded-full bg-black/40 flex items-center justify-center font-bold">
                {step.step}
              </span>
              <span className="hidden sm:inline truncate max-w-[100px]">{step.title.split(":")[0]}</span>
            </button>
          ))}
        </div>

        {/* Step Details Body */}
        <div className="p-6 space-y-5 text-xs font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0e172a] border border-blue-900/60">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-900/50 text-cyan-300 border border-blue-700">
                <StepIcon className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400">Step {currentStep.step} of 8</span>
                <h4 className="text-sm font-bold text-white">{currentStep.title}</h4>
              </div>
            </div>

            <Button
              variant="cyber"
              size="sm"
              onClick={() => {
                setActiveTab(currentStep.tab);
                setIsDemoGuideOpen(false);
              }}
              className="text-xs font-mono shrink-0"
            >
              <span>{currentStep.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          {/* Presenter Talking Points */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Presenter Live Pitch &amp; Script:
            </span>
            <div className="p-3.5 rounded-xl bg-[#070b14] border border-slate-800 text-slate-200 font-sans text-xs sm:text-sm leading-relaxed">
              &ldquo;{currentStep.pitch}&rdquo;
            </div>
          </div>

          {/* Key Differentiators / Highlights */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase text-cyan-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> What Judges Should Observe:
            </span>
            <div className="space-y-1.5">
              {currentStep.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#0b101e] border border-slate-800/80 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keyboard Shortcuts Cheatsheet */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400">
            <div className="flex items-center gap-2">
              <Keyboard className="w-3 h-3 text-blue-400" />
              <span>Keyboard Hotkeys:</span>
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">? : Guide</code>
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">C : Copilot</code>
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Esc : Close</code>
            </div>
            <span>Time Target: ~40s per step (5 mins total)</span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-800 bg-[#0a0f1e] flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={currentStepIndex === 0}
            onClick={() => handleJumpToStep(currentStepIndex - 1)}
            className="text-xs font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous Step
          </Button>

          <span className="text-xs font-mono text-slate-400">
            Checkpoint {currentStepIndex + 1} of {demoSteps.length}
          </span>

          <Button
            variant="default"
            size="sm"
            disabled={currentStepIndex === demoSteps.length - 1}
            onClick={() => handleJumpToStep(currentStepIndex + 1)}
            className="text-xs font-mono bg-blue-600 hover:bg-blue-500"
          >
            Next Step <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
