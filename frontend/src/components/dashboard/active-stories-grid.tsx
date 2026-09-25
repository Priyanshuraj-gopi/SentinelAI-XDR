"use client";

import React from "react";
import { BookOpen, ArrowRight, ShieldAlert, Users, Server, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusPill } from "@/components/ui/status-pill";
import { RiskIndicator } from "@/components/ui/risk-indicator";
import { Button } from "@/components/ui/button";
import { AttackStory } from "@/types";

interface ActiveStoriesGridProps {
  stories?: AttackStory[];
  onSelectStory?: (storyId: string) => void;
}

export function ActiveStoriesGrid({ stories, onSelectStory }: ActiveStoriesGridProps) {
  const defaultStories: AttackStory[] = [
    {
      id: "story-001",
      title: "Operation DarkHydra: Ingress VPN to Domain Admin Ransomware Staging",
      narrative:
        "External adversary authenticated via Tor VPN into j.doe@sentinel.corp, deployed in-memory PowerShell cradle, harvested LSASS credentials on WKSTN-FIN-04, and initiated outbound DNS exfiltration.",
      kill_chain_phase: "Lateral Movement / Exfiltration",
      status: "Active - Action Required",
      aggregate_risk: 98.4,
      confidence: 0.97,
      verdict: "True Positive - Malicious Campaign",
      impact_scope: "2 Hosts, 1 Domain Controller, 1 User",
      created_at: new Date(Date.now() - 80 * 60000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60000).toISOString(),
      timeline_events: [],
      recommendations: [],
    },
    {
      id: "story-002",
      title: "Living-off-the-Land: Scheduled Task Backdoor via certutil.exe",
      narrative:
        "Low-privilege service account registered persistent task running certutil -urlcache download toward dynamic DNS host. No known malware signatures observed.",
      kill_chain_phase: "Persistence / Defense Evasion",
      status: "In-Progress",
      aggregate_risk: 78.2,
      confidence: 0.89,
      verdict: "Suspicious - Zero-Day Behavioral Anomaly",
      impact_scope: "1 Host (SRV-APP-02), 1 Service Account",
      created_at: new Date(Date.now() - 180 * 60000).toISOString(),
      updated_at: new Date(Date.now() - 40 * 60000).toISOString(),
      timeline_events: [],
      recommendations: [],
    },
  ];

  const storyList = stories && stories.length > 0 ? stories : defaultStories;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-red-950/80 text-red-400 border border-red-800/80">
              <BookOpen className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">SYNTHESIZED ATTACK STORIES (PRIORITIZED)</CardTitle>
          </div>
          <Badge variant="critical">14 ACTIVE NARRATIVES</Badge>
        </div>
        <CardDescription>
          Multi-alert clusters automatically transformed into contextual attack stories by the Correlation Engine.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {storyList.map((story) => (
            <div
              key={story.id}
              className="p-4 rounded-xl border border-slate-800 bg-[#090e1b] hover:border-blue-500/60 transition-all flex flex-col justify-between space-y-3 cursor-pointer group"
              onClick={() => onSelectStory?.(story.id)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={story.aggregate_risk >= 85 ? "critical" : "high"}>
                      {story.kill_chain_phase}
                    </Badge>
                    <StatusPill status={story.status} size="sm" />
                  </div>
                  <RiskIndicator score={story.aggregate_risk} size="sm" showLabel={false} />
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
                  {story.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {story.narrative}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">{story.impact_scope}</span>
                <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Investigate Story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
