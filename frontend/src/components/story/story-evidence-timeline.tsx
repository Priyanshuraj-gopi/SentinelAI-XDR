"use client";

import React, { useState } from "react";
import { TimelineEvent } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, Terminal, ArrowRight, User, Server, ChevronDown, ChevronUp, FileCode } from "lucide-react";

interface StoryEvidenceTimelineProps {
  events: TimelineEvent[];
}

export function StoryEvidenceTimeline({ events }: StoryEvidenceTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-red-500 via-amber-500 to-blue-500">
        {events.map((ev, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div key={ev.id || idx} className="relative group">
              {/* Bullet */}
              <div className="absolute -left-6 top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#090e1b] border-2 border-red-500 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              </div>

              {/* Event card */}
              <div className="p-4 rounded-xl border border-slate-800 bg-[#090e1b] hover:border-slate-700 transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={idx === events.length - 1 ? "critical" : "high"}>
                      Phase {idx + 1}: {ev.phase}
                    </Badge>
                    <span className="text-xs font-bold text-white">{ev.headline}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDateTime(ev.timestamp)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {ev.details}
                </p>

                {/* Actor & Target Strip */}
                {(ev.actor || ev.target) && (
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono pt-1 text-slate-400">
                    {ev.actor && (
                      <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                        <User className="w-3 h-3 text-blue-400" />
                        Actor: {ev.actor}
                      </span>
                    )}
                    {ev.actor && ev.target && <ArrowRight className="w-3 h-3 text-slate-600" />}
                    {ev.target && (
                      <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                        <Server className="w-3 h-3 text-purple-400" />
                        Target: {ev.target}
                      </span>
                    )}
                  </div>
                )}

                {/* Expandable Payload Toggle */}
                {ev.evidence_payload && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>{isExpanded ? "Hide Forensic Evidence" : "Inspect Raw Forensic Evidence"}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 p-3 rounded-lg bg-black/70 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto animate-in fade-in duration-150">
                        <pre>{JSON.stringify(ev.evidence_payload, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
