"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, User, Server, Globe, FileCode, CheckCircle2, Lock, ShieldAlert } from "lucide-react";

export function EvidenceInspectorDrawer() {
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<"processes" | "users" | "devices" | "network" | "files">("processes");

  const processes = [
    {
      name: "powershell.exe",
      pid: 4812,
      ppid: 2108,
      parent: "explorer.exe",
      cmd: "powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA...",
      hash: "a3f5b7c891e456d2039847120489571239847120394871239847120398471203",
      entropy: "5.92 bits",
      anomaly: "Reflective C2 Ingress",
    },
    {
      name: "rundll32.exe",
      pid: 6104,
      ppid: 4812,
      parent: "powershell.exe",
      cmd: "rundll32.exe C:\\Windows\\System32\\comsvcs.dll, #24 680 C:\\Windows\\Temp\\debug.dmp full",
      hash: "8841249712039487123984712039847120394871203948712039487120394871",
      entropy: "4.81 bits",
      anomaly: "LSASS Process Minidump",
    },
  ];

  const users = [
    {
      account: "j.doe@sentinel.corp",
      uid: "S-1-5-21-3928172-1002",
      role: "Finance Senior Lead",
      mfaState: "Push Fatigue Spam Approved",
      lastAuth: "Tor Exit Relay 185.220.101.5",
      privilege: "Standard Domain Account (Elevated locally via T1068)",
    },
  ];

  const devices = [
    {
      hostname: "WKSTN-FIN-04",
      ip: "10.0.4.112",
      mac: "00:1A:2B:3C:4D:5E",
      os: "Windows 11 Enterprise (Build 22631.3007)",
      agent: "CrowdStrike Falcon v7.14 (Active)",
      status: "Quarantine Recommended",
    },
    {
      hostname: "DC-PRIMARY-01.corp",
      ip: "10.0.1.10",
      mac: "00:1A:2B:3C:9F:88",
      os: "Windows Server 2022 Datacenter",
      agent: "Microsoft Defender XDR (Active)",
      status: "High Reconnaissance Target",
    },
  ];

  const networkConnections = [
    {
      proto: "UDP / DNS",
      source: "10.0.4.112:54812",
      destination: "185.220.101.5:53 (ns1.dark-c2.net)",
      bytes: "52,428,800 Bytes (52.4 MB)",
      channel: "Base32 Asynchronous DNS TXT Tunneling",
      status: "Malicious Egress Channel",
    },
  ];

  const files = [
    {
      path: "C:\\Windows\\Temp\\debug.dmp",
      type: "Full Process Memory Dump (LSASS)",
      size: "84.2 MB",
      sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      created: "18 mins ago",
      verdict: "Active TGT Kerberos Extraction Artifact",
    },
    {
      path: "C:\\Users\\j.doe\\AppData\\Local\\Temp\\stage2.dll",
      type: "Reflective PE Dynamic Library",
      size: "412 KB",
      sha256: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      created: "30 mins ago",
      verdict: "Cobalt Strike In-Memory Beacon DLL",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/80">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono text-sm">
              FORENSIC EVIDENCE &amp; TELEMETRY INSPECTOR
            </CardTitle>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-[#090e1b] p-1 rounded-lg border border-slate-800 text-xs font-mono">
            {[
              { id: "processes", label: "Processes (2)", icon: Terminal },
              { id: "users", label: "Users (1)", icon: User },
              { id: "devices", label: "Devices (2)", icon: Server },
              { id: "network", label: "Network (1)", icon: Globe },
              { id: "files", label: "Files (2)", icon: FileCode },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveEvidenceTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                    activeEvidenceTab === tab.id
                      ? "bg-blue-600 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <CardDescription>
          Detailed cross-telemetry artifacts captured from endpoints, identity brokers, and packet inspection.
        </CardDescription>
      </CardHeader>

      <CardContent className="font-mono text-xs">
        {/* Processes View */}
        {activeEvidenceTab === "processes" && (
          <div className="space-y-3">
            {processes.map((p, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#090e1b] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    {p.name} (PID {p.pid})
                  </span>
                  <Badge variant="critical">{p.anomaly}</Badge>
                </div>
                <div className="p-2 rounded bg-black/70 border border-slate-800 text-[11px] text-cyan-300 overflow-x-auto">
                  <code>{p.cmd}</code>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                  <span>Parent: <strong>{p.parent} (PPID {p.ppid})</strong></span>
                  <span>Entropy: <strong className="text-purple-400">{p.entropy}</strong></span>
                  <span className="truncate max-w-xs">SHA256: {p.hash}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users View */}
        {activeEvidenceTab === "users" && (
          <div className="space-y-3">
            {users.map((u, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#090e1b] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{u.account}</span>
                  <Badge variant="critical">COMPROMISED VIA MFA FATIGUE</Badge>
                </div>
                <div className="text-slate-300 font-sans text-xs">{u.role} • SID: {u.uid}</div>
                <div className="p-2 rounded bg-[#0d1424] border border-slate-800 text-[11px] space-y-1">
                  <div>Auth Geolocation: <strong className="text-red-400">{u.lastAuth}</strong></div>
                  <div>Privilege Tier: <strong className="text-amber-300">{u.privilege}</strong></div>
                  <div>MFA Sequence: <strong className="text-orange-400">{u.mfaState}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Devices View */}
        {activeEvidenceTab === "devices" && (
          <div className="space-y-3">
            {devices.map((d, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#090e1b] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-purple-400" />
                    {d.hostname} ({d.ip})
                  </span>
                  <Badge variant={d.status.includes("Quarantine") ? "critical" : "high"}>
                    {d.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div>OS: <span className="text-slate-200">{d.os}</span></div>
                  <div>MAC: <span className="text-slate-200">{d.mac}</span></div>
                  <div>Agent: <span className="text-emerald-400">{d.agent}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Network View */}
        {activeEvidenceTab === "network" && (
          <div className="space-y-3">
            {networkConnections.map((net, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#090e1b] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{net.channel}</span>
                  <Badge variant="critical">ACTIVE EXFILTRATION</Badge>
                </div>
                <div className="p-2.5 rounded bg-black/60 border border-slate-800 text-[11px] space-y-1">
                  <div>Flow: <span className="text-cyan-300">{net.source}</span> → <span className="text-red-400">{net.destination}</span></div>
                  <div>Volume Transferred: <strong className="text-amber-300">{net.bytes}</strong></div>
                  <div>Protocol: <strong className="text-purple-300">{net.proto}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Files View */}
        {activeEvidenceTab === "files" && (
          <div className="space-y-3">
            {files.map((f, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#090e1b] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-blue-400" />
                    {f.path}
                  </span>
                  <Badge variant="critical">{f.type}</Badge>
                </div>
                <div className="text-slate-300 font-sans text-xs">{f.verdict}</div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                  <span>File Size: <strong className="text-slate-200">{f.size}</strong></span>
                  <span>Created: <strong className="text-slate-200">{f.created}</strong></span>
                  <span className="truncate max-w-xs">SHA256: {f.sha256}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
