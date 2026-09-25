from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/copilot", tags=["AI Copilot"])

class CopilotQuery(BaseModel):
    query: str
    story_id: Optional[str] = "story-001"

class CopilotResponse(BaseModel):
    reply: str
    suggested_actions: List[str]
    mitre_techniques: List[dict]
    evidence_citations: List[str]

@router.post("/chat", response_model=CopilotResponse)
async def chat_with_copilot(query_payload: CopilotQuery):
    q = query_payload.query.lower()
    
    if "what happened" in q or "explain" in q or "summary" in q or "incident" in q:
        reply = (
            "### Incident Synthesis: Operation DarkHydra (Story #001)\n\n"
            "- **Initial Access:** Adversary bypassed MFA via push-fatigue attack against user `j.doe@sentinel.corp` from Tor Exit Node `185.220.101.5`.\n"
            "- **Execution & Evasion:** Adversary spawned hidden `powershell.exe` with base64 encoded payload exhibiting an anomalous Shannon entropy of 5.92 bits.\n"
            "- **Credential Dumping:** Injected into `rundll32.exe` targeting `comsvcs.dll` to create an LSASS minidump at `C:\\Windows\\Temp\\debug.dmp`.\n"
            "- **Lateral Movement:** Reconnaissance and pass-the-hash queries initiated against Primary Domain Controller `DC-PRIMARY-01.corp`.\n"
            "- **Exfiltration:** Initiated asynchronous UDP DNS tunneling over port 53 to `ns1.dark-c2.net` (52.4 MB staged)."
        )
        actions = [
            "Quarantine Host WKSTN-FIN-04 via CrowdStrike Falcon",
            "Revoke Okta OAuth Tokens for j.doe@sentinel.corp",
            "Block 185.220.101.5 on Edge Palo Alto Firewalls",
            "Sinkhole *.dark-c2.net on Internal CoreDNS"
        ]
        mitre = [
            {"id": "T1078.004", "name": "Valid Accounts: Cloud Accounts"},
            {"id": "T1059.001", "name": "PowerShell Scripting"},
            {"id": "T1003.001", "name": "LSASS Memory Dumping"},
            {"id": "T1071.004", "name": "DNS Data Exfiltration"}
        ]
        citations = [
            "CrowdStrike Falcon Process Tree (PID 4812 -> 6104)",
            "Okta Identity Log: 14 push notifications in 90 seconds",
            "Zeek DNS Tunneling log: 52.4 MB base32 TXT records"
        ]

    elif "why" in q or "fire" in q or "alert" in q:
        reply = (
            "### Alert Activation Rationale & Telemetry Corroboration\n\n"
            "This critical alert fired because **4 distinct security sensors** independently corroborated malicious activity within a 12-minute window:\n\n"
            "1. **Identity (Okta):** Abnormal impossible travel and 14 MFA push requests in 90 seconds.\n"
            "2. **Endpoint (CrowdStrike):** High-entropy encoded PowerShell execution bypassing AMSI memory hooks.\n"
            "3. **Network (Zeek):** Asymmetric UDP/53 outbound bursts exceeding standard DNS query distributions by 42x.\n"
            "4. **Host (Defender):** LSASS memory read attempt initiated by `rundll32.exe`."
        )
        actions = [
            "Inspect raw process memory dump",
            "Check user's conditional access policies"
        ]
        mitre = [
            {"id": "T1003.001", "name": "LSASS Memory Dumping"},
            {"id": "T1059.001", "name": "PowerShell Scripting"}
        ]
        citations = [
            "Sensor Corroboration Score: 94.2% across 4 telemetries",
            "Isolation Forest Anomaly Score: 3.4σ"
        ]

    elif "ciso" in q or "executive" in q or "brief" in q:
        reply = (
            "### Executive Incident Brief for the CISO\n\n"
            "**Incident:** Multi-stage APT Intrusion (Operation DarkHydra)\n"
            "**Business Risk:** High — Active attempt to dump domain credentials and stage lateral movement to the Primary Domain Controller.\n"
            "**Current Status:** Contained at Host Level. WKSTN-FIN-04 quarantined; active identity session revoked within 4 minutes of narrative generation.\n"
            "**Data Exposure Risk:** Staged exfiltration over DNS was halted prior to bulk customer data egress.\n"
            "**Action Items:** Security audit of MFA fatigue bypass policies and Kerberos ticket lifetime reduction."
        )
        actions = [
            "Export Executive PDF Incident Report",
            "Notify Legal & Compliance of Contained Breach Attempt"
        ]
        mitre = [
            {"id": "T1078", "name": "Valid Accounts"},
            {"id": "T1048", "name": "Exfiltration Over Alternative Protocol"}
        ]
        citations = [
            "Incident Mean Time to Contain (MTTC): 4m 12s",
            "Suppression Efficiency: 94.8% of noise suppressed"
        ]

    else:
        reply = (
            f"### SentinelAI Incident Intelligence Response\n\n"
            f"Regarding your query **\"{query_payload.query}\"**:\n"
            f"SentinelAI has analyzed all 86 correlated telemetry events in Story #001.\n"
            f"The primary attack vector remains verified as credential stuffing & MFA fatigue leading to in-memory code execution on `WKSTN-FIN-04`.\n\n"
            f"Recommended operational posture: Ensure network isolation of subnet `10.0.4.0/24` and verify domain trust relationship integrity on `DC-PRIMARY-01.corp`."
        )
        actions = [
            "Verify Domain Controller Kerberos Logons",
            "Scan Subnet 10.0.4.0/24 with Qualys EDR"
        ]
        mitre = [
            {"id": "T1021.002", "name": "SMB/Windows Admin Shares"},
            {"id": "T1558", "name": "Steal or Forge Kerberos Tickets"}
        ]
        citations = [
            "Domain Controller Security Event ID 4624 / 4672",
            "Active Directory Replication Log"
        ]

    return CopilotResponse(
        reply=reply,
        suggested_actions=actions,
        mitre_techniques=mitre,
        evidence_citations=citations
    )
