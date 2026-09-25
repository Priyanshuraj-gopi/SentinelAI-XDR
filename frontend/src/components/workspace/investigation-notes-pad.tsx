"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit3, Save, FileText, Check, Plus } from "lucide-react";

interface InvestigationNotesPadProps {
  onSaveNote?: (noteText: string) => void;
}

export function InvestigationNotesPad({ onSaveNote }: InvestigationNotesPadProps) {
  const [noteText, setNoteText] = useState(
    "### Analyst Investigation Summary\n- **Identified Threat:** APT Campaign (Operation DarkHydra) using Tor VPN ingress.\n- **Containment Action:** Endpoint WKSTN-FIN-04 quarantined; j.doe OAuth tokens revoked.\n- **Action Required by Next Shift:** Review Kerberos tickets on DC-PRIMARY-01 and verify DNS sinkhole status on external resolvers."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSaveNote?.(noteText);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const insertTemplate = (templateType: string) => {
    if (templateType === "handoff") {
      setNoteText((prev) => prev + "\n\n### Shift Handoff Checklist\n- [x] Host isolated\n- [x] Identity sessions killed\n- [ ] Forensic memory image acquired");
    } else if (templateType === "iocs") {
      setNoteText((prev) => prev + "\n\n### Extracted IOCs\n- IP: 185.220.101.5\n- Domain: ns1.dark-c2.net\n- Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-indigo-950/80 text-indigo-400 border border-indigo-800/80">
              <Edit3 className="w-4 h-4" />
            </span>
            <CardTitle className="text-white font-mono text-sm">
              COLLABORATIVE INVESTIGATION JOURNAL
            </CardTitle>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => insertTemplate("handoff")}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              + Handoff Checklist
            </button>
            <button
              onClick={() => insertTemplate("iocs")}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              + IOC Table
            </button>
          </div>
        </div>
        <CardDescription>
          Shared forensic workbench notebook synced with case record and analyst shift handoffs.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        <textarea
          rows={6}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add analyst observations, lateral pivot notes, or containment rationale..."
          className="w-full p-3 rounded-lg border border-slate-700/80 bg-[#080d19] text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400">
            Author: <strong className="text-slate-200">Lead SOC Analyst (soc-analyst-1)</strong>
          </span>

          <Button variant="cyber" size="sm" onClick={handleSave}>
            {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saved ? "Saved to Case Record" : "Save Journal Notes"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
