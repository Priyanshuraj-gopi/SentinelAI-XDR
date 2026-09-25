"use client";

import React, { useState } from "react";
import { User, Server, Terminal, Globe, Lock, ShieldAlert, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StoryEntitiesMatrixProps {
  onIsolateHost?: (host: string) => void;
  onRevokeUser?: (user: string) => void;
}

export function StoryEntitiesMatrix({ onIsolateHost, onRevokeUser }: StoryEntitiesMatrixProps) {
  const [activeTab, setActiveTab] = useState<"users" | "devices" | "processes" | "ips">("users");

  const users = [
    { name: "j.doe@sentinel.corp", role: "Finance Senior Lead", privilege: "Standard Domain User", status: "Compromised", threat: 92 },
    { name: "svc-backup@sentinel.corp", role: "Automated Backup Daemon", privilege: "Local Admin", status: "Targeted", threat: 74 },
  ];

  const devices = [
    { name: "WKSTN-FIN-04", ip: "10.0.4.112", os: "Windows 11 Enterprise", role: "Finance Workstation", status: "Infected (C2 Active)", risk: 96 },
    { name: "DC-PRIMARY-01.corp", ip: "10.0.1.10", os: "Windows Server 2022", role: "Active Directory Domain Controller", status: "Reconnaissance Target", risk: 99 },
  ];

  const processes = [
    { name: "powershell.exe", pid: 4812, parent: "explorer.exe", entropy: "5.92 bits", path: "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe", status: "Malicious Cradle" },
    { name: "rundll32.exe", pid: 6104, parent: "powershell.exe", entropy: "4.81 bits", path: "C:\\Windows\\System32\\rundll32.exe comsvcs.dll #24 MiniDump", status: "LSASS Dumper" },
    { name: "certutil.exe", pid: 7212, parent: "services.exe", entropy: "5.10 bits", path: "certutil.exe -urlcache -split -f http://...", status: "Payload Dropper" },
  ];

  const ips = [
    { address: "185.220.101.5", type: "External Tor Exit Relay", country: "NL / Germany", reputation: "Known Malicious", action: "Block Ingress" },
    { address: "ns1.dark-c2.net (DNS)", type: "External C2 Destination", country: "Anycast DNS", reputation: "Active Tunneling Target", action: "Sinkhole Domain" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-950/80 text-purple-400 border border-purple-800/80">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono">INCIDENT ENTITY BLAST-RADIUS MATRIX</CardTitle>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 bg-[#090e1b] p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeTab === "users" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Users (2)</span>
            </button>
            <button
              onClick={() => setActiveTab("devices")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeTab === "devices" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Devices (2)</span>
            </button>
            <button
              onClick={() => setActiveTab("processes")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeTab === "processes" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Processes (3)</span>
            </button>
            <button
              onClick={() => setActiveTab("ips")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeTab === "ips" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>IPs & C2 (2)</span>
            </button>
          </div>
        </div>
        <CardDescription>
          Multi-layer entity resolution correlating accounts, infected endpoints, execution trees, and remote C2 destinations.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-2 font-mono text-xs">
            {users.map((u, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/80">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{u.name}</div>
                    <div className="text-[11px] text-slate-400">{u.role} • {u.privilege}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={u.status === "Compromised" ? "critical" : "high"}>{u.status}</Badge>
                  <Button variant="containment" size="sm" onClick={() => onRevokeUser?.(u.name)}>
                    Revoke Tokens
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === "devices" && (
          <div className="space-y-2 font-mono text-xs">
            {devices.map((d, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-purple-950/80 text-purple-400 border border-purple-800/80">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs flex items-center gap-2">
                      <span>{d.name}</span>
                      <span className="text-slate-400 font-normal">({d.ip})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{d.role} • {d.os}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={d.risk >= 95 ? "critical" : "high"}>{d.status}</Badge>
                  <Button variant="containment" size="sm" onClick={() => onIsolateHost?.(d.name)}>
                    Isolate Host
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Processes Tab */}
        {activeTab === "processes" && (
          <div className="space-y-2 font-mono text-xs">
            {processes.map((p, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-bold text-white">{p.name} (PID {p.pid})</span>
                    <span className="text-slate-500">parent: {p.parent}</span>
                  </div>
                  <Badge variant="critical">{p.status}</Badge>
                </div>
                <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] text-cyan-300 overflow-x-auto">
                  {p.path}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Shannon Entropy: <strong className="text-purple-400">{p.entropy}</strong></span>
                  <span className="text-emerald-400">Memory Forensics Available</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IPs & C2 Tab */}
        {activeTab === "ips" && (
          <div className="space-y-2 font-mono text-xs">
            {ips.map((ip, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-red-950/80 text-red-400 border border-red-800/80">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{ip.address}</div>
                    <div className="text-[11px] text-slate-400">{ip.type} • {ip.country}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="critical">{ip.reputation}</Badge>
                  <Button variant="outline" size="sm">
                    {ip.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
