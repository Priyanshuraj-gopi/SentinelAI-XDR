"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  User,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Flame,
} from "lucide-react";

export interface CopilotMessage {
  id: string;
  sender: "user" | "copilot";
  timestamp: string;
  content: string;
  suggestedActions?: string[];
  mitreTechniques?: Array<{ id: string; name: string }>;
  evidenceCitations?: string[];
}

interface CopilotMessageItemProps {
  message: CopilotMessage;
  onExecuteAction?: (action: string) => void;
}

export function CopilotMessageItem({ message, onExecuteAction }: CopilotMessageItemProps) {
  const [copied, setCopied] = useState(false);
  const [executedActions, setExecutedActions] = useState<Record<string, boolean>>({});

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunAction = (action: string) => {
    setExecutedActions((prev) => ({ ...prev, [action]: true }));
    onExecuteAction?.(action);
  };

  const isUser = message.sender === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} group`}>
      {/* Copilot Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-400/40 flex items-center justify-center text-white shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.3)] mt-0.5">
          <Sparkles className="w-4 h-4 text-cyan-300" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-[85%] rounded-2xl p-4 space-y-3 text-xs font-sans leading-relaxed shadow-xl ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-none border border-blue-500/50"
            : "bg-[#0b1222] text-slate-200 rounded-tl-none border border-slate-800"
        }`}
      >
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-3 text-[10px] font-mono border-b border-slate-800/60 pb-2">
          <span className={`font-bold flex items-center gap-1 ${isUser ? "text-blue-100" : "text-cyan-400"}`}>
            {isUser ? "You (Lead SOC Analyst)" : "SentinelAI Autonomous Copilot"}
          </span>
          <div className="flex items-center gap-2 text-slate-400">
            <span>{message.timestamp}</span>
            {!isUser && (
              <button
                onClick={handleCopy}
                className="hover:text-white transition-colors"
                title="Copy message"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>

        {/* Message Content with Markdown Formatting */}
        <div className="space-y-2 whitespace-pre-line font-mono text-[11px] leading-relaxed">
          {message.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h4 key={idx} className="font-bold text-white text-xs text-cyan-300 border-l-2 border-cyan-400 pl-2">
                  {paragraph.replace("### ", "")}
                </h4>
              );
            }
            return <p key={idx} className="text-slate-300">{paragraph}</p>;
          })}
        </div>

        {/* MITRE ATT&CK Techniques Badges */}
        {message.mitreTechniques && message.mitreTechniques.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
            <span className="text-[10px] uppercase font-mono font-bold text-purple-400 flex items-center gap-1">
              <Flame className="w-3 h-3" /> MITRE ATT&amp;CK Mappings
            </span>
            <div className="flex flex-wrap gap-1.5">
              {message.mitreTechniques.map((tech) => (
                <span
                  key={tech.id}
                  className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-purple-300 font-mono text-[10px] flex items-center gap-1"
                >
                  <strong className="text-white">{tech.id}</strong> {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Evidence Citations */}
        {message.evidenceCitations && message.evidenceCitations.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
            <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 flex items-center gap-1">
              <Terminal className="w-3 h-3" /> Telemetry Grounding &amp; Citations
            </span>
            <div className="space-y-1">
              {message.evidenceCitations.map((cit, i) => (
                <div
                  key={i}
                  className="p-1.5 rounded bg-black/40 border border-slate-800/80 text-[10px] font-mono text-cyan-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">{cit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested SOAR Containment Actions */}
        {message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Recommended SOAR Mitigations
            </span>
            <div className="space-y-1.5">
              {message.suggestedActions.map((action, i) => {
                const isExecuted = executedActions[action];
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#070b14] border border-slate-800"
                  >
                    <span className="text-[11px] font-mono text-slate-300 truncate">{action}</span>
                    <Button
                      variant={isExecuted ? "secondary" : "default"}
                      size="sm"
                      disabled={isExecuted}
                      onClick={() => handleRunAction(action)}
                      className={`h-6 px-2 text-[10px] font-mono shrink-0 ${
                        isExecuted ? "bg-slate-800 text-slate-400" : "bg-emerald-600 hover:bg-emerald-500 text-white"
                      }`}
                    >
                      {isExecuted ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" /> Executed
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3 h-3 mr-1" /> Execute
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
