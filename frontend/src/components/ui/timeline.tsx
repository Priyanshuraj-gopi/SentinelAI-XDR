import * as React from "react";
import { TimelineEvent } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "./badge";
import { Clock, ShieldAlert, Terminal, ArrowRight, User, Server } from "lucide-react";

interface TimelineProps {
  events: TimelineEvent[];
  onSelectEvent?: (event: TimelineEvent) => void;
  className?: string;
}

export function Timeline({ events, onSelectEvent, className }: TimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="p-8 text-center text-xs font-mono text-slate-500 border border-dashed border-slate-800 rounded-lg">
        No incident timeline events recorded.
      </div>
    );
  }

  return (
    <div className={`relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-red-500 before:via-blue-500 before:to-slate-800 ${className}`}>
      {events.map((event, index) => (
        <div
          key={event.id || index}
          onClick={() => onSelectEvent?.(event)}
          className="relative group cursor-pointer"
        >
          {/* Timeline Node Bullet */}
          <div className="absolute -left-6 top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#0a0f1d] border-2 border-blue-500 group-hover:border-red-500 transition-colors shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-red-400" />
          </div>

          {/* Event Content Card */}
          <div className="p-3.5 rounded-lg border border-slate-800 bg-[#0d1424]/90 hover:border-slate-700 transition-all hover:bg-[#10182c]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <Badge variant={index === events.length - 1 ? "critical" : "default"}>
                  {event.phase}
                </Badge>
                <h4 className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                  {event.headline}
                </h4>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{formatDateTime(event.timestamp)}</span>
              </div>
            </div>

            {event.details && (
              <p className="text-xs text-slate-400 leading-relaxed mb-2.5">
                {event.details}
              </p>
            )}

            {/* Ingress / Egress Actor / Target */}
            {(event.actor || event.target) && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                {event.actor && (
                  <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    <User className="w-3 h-3 text-blue-400" />
                    {event.actor}
                  </span>
                )}
                {event.actor && event.target && <ArrowRight className="w-3 h-3 text-slate-500" />}
                {event.target && (
                  <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    <Server className="w-3 h-3 text-purple-400" />
                    {event.target}
                  </span>
                )}
              </div>
            )}

            {/* Evidence payload snippet */}
            {event.evidence_payload && (
              <div className="mt-2.5 p-2 rounded bg-black/50 border border-slate-800/80 font-mono text-[10px] text-cyan-300/90 overflow-x-auto">
                <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                  <Terminal className="w-2.5 h-2.5" /> Telemetry Evidence Artifact
                </div>
                <code>{JSON.stringify(event.evidence_payload, null, 2)}</code>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
