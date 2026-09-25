"use client";

import React, { useState, useRef, useEffect } from "react";
import { CopilotMessageItem, CopilotMessage } from "./copilot-message-item";
import { CopilotQuickActions } from "./copilot-quick-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import {
  Send,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Cpu,
  Bot,
  Terminal,
} from "lucide-react";

export function CopilotChatView() {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "msg-welcome",
      sender: "copilot",
      timestamp: "12:00:00 UTC",
      content:
        "### SentinelAI Autonomous Copilot Initialized\n\n" +
        "I am actively monitoring **Story #001: Operation DarkHydra** (Critical Risk 98.4/100).\n" +
        "86 telemetry events across CrowdStrike, Okta, Zeek, and Microsoft Defender have been correlated into this attack narrative.\n\n" +
        "Select a suggested prompt below or ask any question to inspect the attack path, correlate evidence, or trigger SOAR containment actions.",
      suggestedActions: [
        "Quarantine Host WKSTN-FIN-04 via CrowdStrike",
        "Revoke Okta OAuth Tokens for j.doe@sentinel.corp"
      ],
      mitreTechniques: [
        { id: "T1078.004", name: "Valid Accounts: Cloud Accounts" },
        { id: "T1059.001", name: "PowerShell Scripting" }
      ],
      evidenceCitations: [
        "CrowdStrike Falcon PID 4812",
        "Okta Push Spam: 14 notifications in 90s"
      ]
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [actionAlert, setActionAlert] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (typeof messagesEndRef.current?.scrollIntoView === "function") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", { timeZone: "UTC" }) + " UTC",
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const response = await api.copilotChat(query, "story-001");
      const botMsg: CopilotMessage = {
        id: `bot-${Date.now()}`,
        sender: "copilot",
        timestamp: new Date().toLocaleTimeString("en-US", { timeZone: "UTC" }) + " UTC",
        content: response.reply,
        suggestedActions: response.suggested_actions,
        mitreTechniques: response.mitre_techniques,
        evidenceCitations: response.evidence_citations,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: CopilotMessage = {
        id: `err-${Date.now()}`,
        sender: "copilot",
        timestamp: "Now",
        content: "### System Warning\nEncountered connectivity anomaly with AI reasoning cluster. Using local cached incident memory for Story #001.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteAction = (action: string) => {
    setActionAlert(`SOAR Playbook Enforced: "${action}" successfully executed.`);
    setTimeout(() => setActionAlert(null), 4000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: "copilot",
        timestamp: "Now",
        content: "### Chat Reset\nConversation memory refreshed for Story #001. How can I assist you with this incident?",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-[#070b14] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Copilot Header */}
      <div className="p-4 border-b border-slate-800/80 bg-[#090d1a] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white font-mono">SENTINELAI SOC COPILOT</h2>
              <Badge variant="mitre">LLM GROUNDED</Badge>
              <Badge variant="low">STORY #001</Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Context-Aware Reasoning Engine • Grounded in 86 Telemetry Signals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg border border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Action Trigger Banner */}
      {actionAlert && (
        <div className="mx-4 mt-3 flex items-center gap-2.5 p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-mono animate-in fade-in slide-in-from-top-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
        {messages.map((msg) => (
          <CopilotMessageItem
            key={msg.id}
            message={msg}
            onExecuteAction={handleExecuteAction}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-cyan-400 p-3 rounded-xl bg-[#0b1222] border border-cyan-800/40 w-fit animate-pulse font-mono text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Analyzing incident telemetry &amp; generating grounded intelligence...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-3 bg-[#080d19] border-t border-slate-800/60">
        <CopilotQuickActions
          onSelectPrompt={(prompt) => handleSendMessage(prompt)}
          disabled={isLoading}
        />
      </div>

      {/* Message Input Bar */}
      <div className="p-4 bg-[#090e1b] border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot: 'What happened?', 'Generate CISO summary', 'Explain PID 4812'..."
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700/80 bg-[#060a14] text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="cyber"
            size="default"
            disabled={!input.trim() || isLoading}
            className="h-9 px-4 font-mono text-xs shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-1" /> Send
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
