import React, { useEffect } from "react";
import { ShieldAlert, Play, Sparkles, Award } from "lucide-react";
import { useSecurityStore } from "@/store/useSecurityStore";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  onRunDemo?: () => void;
  isSimulating?: boolean;
}

export function Topbar({ onRunDemo, isSimulating }: TopbarProps) {
  const {
    setIsCopilotOpen,
    setIsDemoGuideOpen,
    setActiveTab,
  } = useSecurityStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "?" || e.key === "h") {
        setIsDemoGuideOpen(true);
      } else if (e.key === "c" || e.key === "C") {
        setIsCopilotOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsDemoGuideOpen, setIsCopilotOpen]);

  return (
    <header className="h-14 border-b border-slate-800/80 bg-[#0a0f1d] px-4 sm:px-6 flex items-center justify-between z-30 select-none">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
          <ShieldAlert className="w-5 h-5 animate-pulse-subtle" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-white font-mono">SentinelAI</span>
            <span className="hidden sm:inline-block text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              XDR Autonomous Copilot
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono hidden md:block">
            From Millions of Alerts to One Attack Story
          </div>
        </div>
      </div>

      {/* Global Real-Time Telemetry Bar */}
      <div className="hidden lg:flex items-center gap-5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">DEFCON:</span>
          <span className="text-red-400 font-bold bg-red-950/70 px-2.5 py-0.5 rounded border border-red-800/80 shadow-[0_0_8px_rgba(239,68,68,0.25)]">
            LEVEL 2 (ACTIVE CAMPAIGN)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">NOISE FILTER:</span>
          <span className="text-emerald-400 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/80">
            94.8% SUPPRESSED
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">CORRELATION:</span>
          <span className="text-cyan-400 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            STREAMING
          </span>
        </div>
      </div>

      {/* Actions: Judging Guide, Copilot Drawer & Demo Scenario */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDemoGuideOpen(true)}
          className="font-mono text-xs border-amber-500/40 text-amber-300 hover:bg-amber-950/60 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
        >
          <Award className="w-3.5 h-3.5 mr-1 text-amber-400" />
          <span>Judging Guide</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCopilotOpen(true)}
          className="font-mono text-xs border-blue-500/40 text-blue-300 hover:bg-blue-950/60 shadow-[0_0_10px_rgba(59,130,246,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1 text-cyan-400" />
          <span>Ask SOC Copilot</span>
        </Button>

        <Button
          variant="cyber"
          size="sm"
          onClick={onRunDemo}
          isLoading={isSimulating}
          className="font-mono text-xs"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isSimulating ? "Synthesizing Attack..." : "Run Demo Scenario"}</span>
        </Button>
      </div>
    </header>
  );
}
