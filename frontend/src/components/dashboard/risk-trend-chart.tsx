"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskTrendChartProps {
  data?: Array<{ day: string; risk: number; alerts: number }>;
}

export function RiskTrendChart({
  data = [
    { day: "Mon", risk: 42, alerts: 3200 },
    { day: "Tue", risk: 48, alerts: 3850 },
    { day: "Wed", risk: 55, alerts: 4100 },
    { day: "Thu", risk: 68, alerts: 4900 },
    { day: "Fri", risk: 74, alerts: 5200 },
    { day: "Sat", risk: 89, alerts: 6100 },
    { day: "Today", risk: 94, alerts: 6840 },
  ],
}: RiskTrendChartProps) {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-lg bg-[#0a0f1d] border border-slate-700 shadow-xl font-mono text-xs space-y-1.5">
          <div className="text-slate-300 font-bold border-b border-slate-800 pb-1">{label}</div>
          <div className="text-red-400 font-semibold flex items-center justify-between gap-4">
            <span>Enterprise Risk:</span>
            <span>{payload[0].value} / 100</span>
          </div>
          <div className="text-blue-400 flex items-center justify-between gap-4">
            <span>Raw Ingested Alerts:</span>
            <span>{payload[1]?.value?.toLocaleString()}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-950/80 text-purple-400 border border-purple-800/80">
              <Activity className="w-4 h-4" />
            </span>
            <div>
              <CardTitle className="text-white font-mono">ENTERPRISE RISK & ATTACK VELOCITY TREND</CardTitle>
              <CardDescription>
                Temporal progression of composite threat score vs raw alert ingestion rate.
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090e1b] p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setTimeRange("24h")}
              className={`px-2 py-0.5 rounded transition-colors ${
                timeRange === "24h" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              24H
            </button>
            <button
              onClick={() => setTimeRange("7d")}
              className={`px-2 py-0.5 rounded transition-colors ${
                timeRange === "7d" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-2 py-0.5 rounded transition-colors ${
                timeRange === "30d" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              30D
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[260px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} fontFamily="monospace" tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="risk"
                name="Risk Score"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#riskGradient)"
              />
              <Area
                type="monotone"
                dataKey="alerts"
                name="Raw Alerts"
                stroke="#3b82f6"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#alertGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              Composite Threat Score
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Raw Telemetry Volume
            </span>
          </div>
          <span className="text-red-400 font-bold">+28% Threat Spike in Last 48h</span>
        </div>
      </CardContent>
    </Card>
  );
}
