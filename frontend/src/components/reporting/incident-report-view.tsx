"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Printer,
  Copy,
  Download,
  Check,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Clock,
  Terminal,
  Server,
  User,
  Globe,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Building,
} from "lucide-react";

export function IncidentReportView() {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const markdownContent = `
# INCIDENT REPORT: OPERATION DARKHYDRA
**Report ID:** SEC-RPT-2026-0925-001 | **Classification:** CONFIDENTIAL // SOC TIER-3
**Date:** September 25, 2026 | **Risk Severity:** 98.4 / 100 (CRITICAL)
**Containment Status:** CONTAINED AT HOST LEVEL (MTTC: 4m 12s)

## Executive Summary
Adversary executed a targeted multi-stage intrusion against Sentinel Corp. Initial ingress occurred via Tor Exit Node (185.220.101.5) bypassing Okta MFA via push-fatigue against user j.doe@sentinel.corp. Host WKSTN-FIN-04 was infected with in-memory obfuscated PowerShell (entropy 5.92 bits), followed by an LSASS memory dump and pass-the-hash reconnaissance towards DC-PRIMARY-01.corp. Asynchronous DNS tunneling was initiated to ns1.dark-c2.net.

The campaign was automatically synthesized by SentinelAI across 86 raw telemetry events and neutralized via automated SOAR playbooks:
- Host WKSTN-FIN-04 isolated via CrowdStrike Falcon EDR.
- Okta sessions and refresh tokens invalidated for j.doe.
- Ingress IP 185.220.101.5 blocked on Palo Alto perimeter firewalls.
- Malicious DNS domain *.dark-c2.net sinkholed on internal CoreDNS.
    `.trim();

    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const auditData = {
      report_id: "SEC-RPT-2026-0925-001",
      story_id: "story-001",
      scenario: "Operation DarkHydra",
      severity_score: 98.4,
      status: "CONTAINED",
      mttc_seconds: 252,
      raw_alerts_correlated: 86,
      background_noise_suppressed: 396,
      mitre_techniques: ["T1078.004", "T1059.001", "T1003.001", "T1021.002", "T1071.004"],
      iocs: {
        ips: ["185.220.101.5"],
        domains: ["ns1.dark-c2.net"],
        hashes: [
          "a3f5b7c891e456d2039847120489571239847120394871239847120398471203",
          "8841249712039487123984712039487120394871203948712039487120394871"
        ]
      }
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `incident-audit-story-001.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar (Hidden during browser print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#090d1a] border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Executive Brief &amp; Incident Disclosure Generator</span>
          <Badge variant="mitre">SOC AUDIT READY</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="default" size="sm" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-500 font-mono text-xs">
            <Printer className="w-3.5 h-3.5 mr-1" />
            <span>Print / Save as PDF</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleCopyMarkdown} className="font-mono text-xs">
            {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            <span>{copied ? "Brief Copied!" : "Copy Executive Brief"}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleDownloadJson} className="font-mono text-xs">
            {downloaded ? <Check className="w-3.5 h-3.5 mr-1 text-cyan-400" /> : <Download className="w-3.5 h-3.5 mr-1" />}
            <span>{downloaded ? "Audit Downloaded" : "Download JSON Trace"}</span>
          </Button>
        </div>
      </div>

      {/* Main Printable Document Sheet */}
      <div className="bg-[#0b101d] text-slate-100 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-8 font-sans print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* Document Header & Security Classification */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
            <span className="px-2.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800 print:border-red-600 print:bg-red-100 print:text-red-700 font-bold uppercase tracking-wider">
              CONFIDENTIAL // TIER-3 INCIDENT DISCLOSURE
            </span>
            <span className="text-slate-400 print:text-slate-600">
              REPORT REF: <strong className="text-slate-200 print:text-black">SEC-RPT-2026-0925-001</strong>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white print:text-black">
                CYBER INCIDENT POST-MORTEM &amp; EXECUTIVE BRIEF
              </h1>
              <p className="text-sm text-cyan-400 print:text-blue-700 font-mono mt-1 font-semibold">
                Campaign: Operation DarkHydra (Story #001)
              </p>
            </div>

            <div className="text-right text-xs font-mono text-slate-400 print:text-slate-600 space-y-0.5">
              <div>Generated: <span className="text-slate-200 print:text-black font-bold">Sep 25, 2026 • 12:45 UTC</span></div>
              <div>Author: <span className="text-slate-200 print:text-black">SentinelAI Autonomous XDR &amp; Lead SOC Analyst</span></div>
              <div>Distribution: <span className="text-slate-200 print:text-black font-bold">CISO, CIO, Legal &amp; Audit Committee</span></div>
            </div>
          </div>
        </div>

        {/* Executive Threat Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:gap-2 font-mono">
          <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-slate-100 border border-slate-800 print:border-slate-300">
            <div className="text-[10px] text-slate-400 print:text-slate-600 uppercase">Risk Severity</div>
            <div className="text-xl font-bold text-rose-500 print:text-rose-700 mt-1">98.4 / 100</div>
            <div className="text-[10px] text-red-400">CRITICAL INTRUSION</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-slate-100 border border-slate-800 print:border-slate-300">
            <div className="text-[10px] text-slate-400 print:text-slate-600 uppercase">Containment Status</div>
            <div className="text-xl font-bold text-emerald-400 print:text-emerald-700 mt-1">CONTAINED</div>
            <div className="text-[10px] text-emerald-400">HOST &amp; IDENTITY ISOLATED</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-slate-100 border border-slate-800 print:border-slate-300">
            <div className="text-[10px] text-slate-400 print:text-slate-600 uppercase">Time to Contain (MTTC)</div>
            <div className="text-xl font-bold text-cyan-400 print:text-blue-700 mt-1">4m 12s</div>
            <div className="text-[10px] text-cyan-400">SLA: 60m (93% FASTER)</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-slate-100 border border-slate-800 print:border-slate-300">
            <div className="text-[10px] text-slate-400 print:text-slate-600 uppercase">Telemetry Compression</div>
            <div className="text-xl font-bold text-purple-400 print:text-purple-700 mt-1">94.8%</div>
            <div className="text-[10px] text-purple-400">396 NOISE ALERTS FILTERED</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2 border-b border-slate-800 print:border-slate-300 pb-6">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 flex items-center gap-2">
            <span>01</span> Executive Incident Narrative
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed font-sans">
            On September 25, 2026 at 11:42 UTC, an advanced threat group initiated a coordinated intrusion targeting corporate financial assets and domain authentication systems. 
            The adversary weaponized a compromised external proxy relay (<code className="text-cyan-300 print:text-black">185.220.101.5</code>) to execute an automated MFA push fatigue spam attack against Senior Finance Lead <strong className="text-white print:text-black">j.doe@sentinel.corp</strong>. 
            Upon obtaining interactive session access, an obfuscated in-memory PowerShell cradle was spawned on workstation <strong className="text-white print:text-black">WKSTN-FIN-04</strong> to dump the local LSASS process memory (<code className="text-cyan-300 print:text-black">debug.dmp</code>) and stage lateral reconnaissance against Primary Domain Controller <strong className="text-white print:text-black">DC-PRIMARY-01.corp</strong>. 
            Exfiltration staging was initiated over covert UDP DNS TXT tunneling to <code className="text-cyan-300 print:text-black">ns1.dark-c2.net</code>.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed font-sans mt-2">
            SentinelAI correlated all 86 dispersed telemetry events across CrowdStrike, Okta, Zeek, and Microsoft Defender into a single unified attack story, automatically eliminating 396 background decoy alerts. 
            Immediate SOAR playbook triggers quarantined the host and invalidated all identity tokens within 4 minutes and 12 seconds, preventing unauthorized customer data egress.
          </p>
        </div>

        {/* Section 2: Attack Progression Timeline */}
        <div className="space-y-3 border-b border-slate-800 print:border-slate-300 pb-6">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 flex items-center gap-2">
            <span>02</span> Technical Kill-Chain Progression
          </h2>
          <div className="space-y-2 text-xs font-mono">
            {[
              { time: "11:42:04 UTC", stage: "Initial Ingress", desc: "MFA push-fatigue bypass (14 notifications in 90s) originating from Tor Exit 185.220.101.5.", mitre: "T1078.004", sensor: "Okta Identity Cloud" },
              { time: "11:46:12 UTC", stage: "Execution & Evasion", desc: "Encoded PowerShell download cradle spawned with Shannon entropy 5.92 bits (PID 4812).", mitre: "T1059.001", sensor: "CrowdStrike Falcon" },
              { time: "11:51:30 UTC", stage: "Credential Access", desc: "Process injection into rundll32.exe creating full LSASS memory dump at C:\\Windows\\Temp\\debug.dmp.", mitre: "T1003.001", sensor: "Microsoft Defender XDR" },
              { time: "11:54:18 UTC", stage: "Lateral Reconnaissance", desc: "RPC and SMB pass-the-hash queries targeting DC-PRIMARY-01.corp for Domain Admin Kerberos tickets.", mitre: "T1021.002", sensor: "Zeek Network Security" },
              { time: "11:58:02 UTC", stage: "Exfiltration Staging", desc: "Asymmetric UDP/53 outbound bursts to ns1.dark-c2.net transferring 52.4 MB via Base32 TXT tunneling.", mitre: "T1071.004", sensor: "Palo Alto NGFW" },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-[#070b14] print:bg-slate-50 border border-slate-800 print:border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 print:text-blue-700 font-bold shrink-0">{step.time}</span>
                  <div>
                    <span className="text-white print:text-black font-bold mr-2">{step.stage}:</span>
                    <span className="text-slate-300 print:text-slate-700 font-sans text-xs">{step.desc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded bg-purple-950/60 print:bg-purple-100 text-purple-300 print:text-purple-800 border border-purple-800 print:border-purple-300 text-[10px]">
                    {step.mitre}
                  </span>
                  <span className="text-[10px] text-slate-400 print:text-slate-600">{step.sensor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Forensic Artifacts & IOCs */}
        <div className="space-y-3 border-b border-slate-800 print:border-slate-300 pb-6">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 flex items-center gap-2">
            <span>03</span> Indicators of Compromise (IOC) Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 print:border-slate-300 text-[10px] text-slate-400 print:text-slate-600 uppercase">
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Observed Value</th>
                  <th className="py-2 px-3">Role / Impact</th>
                  <th className="py-2 px-3">Mitigation Action Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3 text-cyan-400 print:text-blue-700 font-bold">IPv4 Address</td>
                  <td className="py-2.5 px-3 font-mono text-white print:text-black">185.220.101.5</td>
                  <td className="py-2.5 px-3 text-slate-300 print:text-slate-700">Tor Exit Node Ingress</td>
                  <td className="py-2.5 px-3 text-emerald-400 print:text-emerald-700 font-semibold">Blocked on Edge NGFW</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-cyan-400 print:text-blue-700 font-bold">DNS Domain</td>
                  <td className="py-2.5 px-3 font-mono text-white print:text-black">ns1.dark-c2.net</td>
                  <td className="py-2.5 px-3 text-slate-300 print:text-slate-700">C2 Exfiltration Receiver</td>
                  <td className="py-2.5 px-3 text-emerald-400 print:text-emerald-700 font-semibold">Sinkholed on CoreDNS</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-cyan-400 print:text-blue-700 font-bold">SHA-256 Hash</td>
                  <td className="py-2.5 px-3 font-mono text-white print:text-black truncate max-w-xs">a3f5b7c891e456d2039847120489571239847120394871239847120398471203</td>
                  <td className="py-2.5 px-3 text-slate-300 print:text-slate-700">Staged In-Memory PowerShell Cradle</td>
                  <td className="py-2.5 px-3 text-emerald-400 print:text-emerald-700 font-semibold">Blacklisted in EDR</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-cyan-400 print:text-blue-700 font-bold">Identity Account</td>
                  <td className="py-2.5 px-3 font-mono text-white print:text-black">j.doe@sentinel.corp</td>
                  <td className="py-2.5 px-3 text-slate-300 print:text-slate-700">Targeted Finance Lead Account</td>
                  <td className="py-2.5 px-3 text-emerald-400 print:text-emerald-700 font-semibold">OAuth Revoked &amp; Password Reset</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-cyan-400 print:text-blue-700 font-bold">Endpoint Device</td>
                  <td className="py-2.5 px-3 font-mono text-white print:text-black">WKSTN-FIN-04</td>
                  <td className="py-2.5 px-3 text-slate-300 print:text-slate-700">Infected Finance Endpoint</td>
                  <td className="py-2.5 px-3 text-emerald-400 print:text-emerald-700 font-semibold">Host Quarantined</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Strategic Recommendations & Posture Hardening */}
        <div className="space-y-3 border-b border-slate-800 print:border-slate-300 pb-6">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-cyan-400 print:text-blue-800 flex items-center gap-2">
            <span>04</span> CISO Strategic Recommendations Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
              <span className="text-[11px] font-bold font-mono text-rose-400 uppercase">Immediate (24 Hours)</span>
              <ul className="text-xs text-slate-300 print:text-slate-700 font-sans space-y-1 list-disc pl-4">
                <li>Deploy Number-Matching MFA across all Okta identity profiles to prevent push fatigue bypasses.</li>
                <li>Conduct forensic memory dump inspection of WKSTN-FIN-04.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
              <span className="text-[11px] font-bold font-mono text-amber-400 uppercase">Near-Term (30 Days)</span>
              <ul className="text-xs text-slate-300 print:text-slate-700 font-sans space-y-1 list-disc pl-4">
                <li>Enforce Credential Guard (LSA Protection) via Group Policy on all Windows endpoints.</li>
                <li>Reduce Kerberos TGT lifetime to 4 hours for privileged domain accounts.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
              <span className="text-[11px] font-bold font-mono text-emerald-400 uppercase">Strategic (90 Days)</span>
              <ul className="text-xs text-slate-300 print:text-slate-700 font-sans space-y-1 list-disc pl-4">
                <li>Migrate high-risk administrative tiers to FIDO2 WebAuthn hardware security keys.</li>
                <li>Automate deep Shannon entropy inspection on all PowerShell command invocations across EDR.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Formal Sign-off and Authorization */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-mono text-slate-400 print:text-slate-700">
          <div className="space-y-1">
            <div>Incident Commander: <strong className="text-white print:text-black">Lead SOC Analyst (Tier-3)</strong></div>
            <div>Autonomous Platform: <strong className="text-white print:text-black">SentinelAI XDR Correlation Engine v1.0-RC</strong></div>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 print:border-slate-300 bg-[#070b14] print:bg-white text-right space-y-1">
            <div className="flex items-center justify-end gap-1.5 text-emerald-400 print:text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>OFFICIALLY AUDITED &amp; SIGNED</span>
            </div>
            <div className="text-[10px] text-slate-500">Hash: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f</div>
          </div>
        </div>
      </div>
    </div>
  );
}
