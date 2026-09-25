from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime, timedelta, timezone
from app.schemas.security_schemas import AttackStoryResponse

router = APIRouter()

def get_sample_stories() -> List[dict]:
    now = datetime.now(timezone.utc)
    return [
        {
            "id": "story-001",
            "title": "Adversary Campaign: VPN Ingress to Domain Admin Ransomware Staging",
            "narrative": (
                "An external adversary compromised account 'j.doe@sentinel.corp' via MFA fatigue from Tor Exit Node "
                "(185.220.101.5). Following access, interactive PowerShell c2 download was executed on endpoint "
                "'WKSTN-FIN-04'. The attacker dumped LSASS credentials via comsvcs.dll, moved laterally to "
                "'DC-PRIMARY-01.corp', and commenced encrypted DNS exfiltration."
            ),
            "kill_chain_phase": "Lateral Movement / Exfiltration",
            "status": "Active - Action Required",
            "aggregate_risk": 98.4,
            "confidence": 0.97,
            "verdict": "True Positive - Critical APT Campaign",
            "impact_scope": "2 Hosts (WKSTN-FIN-04, DC-PRIMARY-01), 1 User (j.doe), 1 Subnet",
            "created_at": now - timedelta(hours=1, minutes=20),
            "updated_at": now - timedelta(minutes=5),
            "cluster_id": "cluster-corr-1",
            "timeline_events": [
                {
                    "id": "te-1",
                    "story_id": "story-001",
                    "timestamp": now - timedelta(minutes=45),
                    "phase": "Initial Access",
                    "headline": "Compromised Credentials via Tor VPN",
                    "details": "User j.doe authenticated from 185.220.101.5 bypassing geolocation policy.",
                    "actor": "j.doe@sentinel.corp",
                    "target": "VPN-GW-EAST.corp",
                    "evidence_type": "AuthTelemetry",
                    "evidence_payload": {"mfa": "Push-Spam-Approved", "client_ip": "185.220.101.5"}
                },
                {
                    "id": "te-2",
                    "story_id": "story-001",
                    "timestamp": now - timedelta(minutes=30),
                    "phase": "Execution",
                    "headline": "In-Memory PowerShell C2 Cradle",
                    "details": "powershell.exe -Enc downloaded stage2 DLL into WKSTN-FIN-04 memory space.",
                    "actor": "j.doe",
                    "target": "WKSTN-FIN-04",
                    "evidence_type": "ProcessTree",
                    "evidence_payload": {"parent": "explorer.exe", "child": "powershell.exe", "pid": 4812}
                },
                {
                    "id": "te-3",
                    "story_id": "story-001",
                    "timestamp": now - timedelta(minutes=18),
                    "phase": "Credential Access",
                    "headline": "LSASS Process Memory Minidump",
                    "details": "comsvcs.dll #24 invoked against lsass.exe to harvest Kerberos tickets.",
                    "actor": "NT AUTHORITY\\SYSTEM",
                    "target": "WKSTN-FIN-04",
                    "evidence_type": "MemoryTelemetry",
                    "evidence_payload": {"dump_file": "C:\\Windows\\Temp\\debug.dmp"}
                },
                {
                    "id": "te-4",
                    "story_id": "story-001",
                    "timestamp": now - timedelta(minutes=5),
                    "phase": "Exfiltration",
                    "headline": "Outbound DNS Tunneling to dark-c2.net",
                    "details": "50MB of compressed enterprise credentials exfiltrated via base32 TXT queries.",
                    "actor": "WKSTN-FIN-04",
                    "target": "ns1.dark-c2.net",
                    "evidence_type": "NetworkFlow",
                    "evidence_payload": {"dns_queries": 4200, "protocol": "DNS-over-UDP"}
                }
            ],
            "recommendations": [
                {
                    "id": "rec-101",
                    "story_id": "story-001",
                    "title": "Isolate Endpoint WKSTN-FIN-04",
                    "action_type": "IsolateHost",
                    "target_entity": "WKSTN-FIN-04",
                    "urgency": "Critical",
                    "justification": "Active C2 beaconing and credential harvesting detected locally.",
                    "status": "Pending"
                },
                {
                    "id": "rec-102",
                    "story_id": "story-001",
                    "title": "Revoke All Active Sessions for j.doe",
                    "action_type": "RevokeToken",
                    "target_entity": "j.doe@sentinel.corp",
                    "urgency": "Critical",
                    "justification": "Primary identity hijacked via external VPN endpoint.",
                    "status": "Pending"
                },
                {
                    "id": "rec-103",
                    "story_id": "story-001",
                    "title": "Null-Route Domain dark-c2.net on DNS Firewalls",
                    "action_type": "BlockDomain",
                    "target_entity": "dark-c2.net",
                    "urgency": "High",
                    "justification": "Identified destination for ongoing exfiltration channel.",
                    "status": "Pending"
                }
            ]
        },
        {
            "id": "story-002",
            "title": "Living-off-the-Land: Scheduled Task Persistence via certutil.exe",
            "narrative": "Low-privilege service account registered persistent task running certutil -urlcache download.",
            "kill_chain_phase": "Persistence",
            "status": "In-Progress",
            "aggregate_risk": 78.2,
            "confidence": 0.89,
            "verdict": "Suspicious - Likely Secondary Backdoor",
            "impact_scope": "1 Host (SRV-APP-02)",
            "created_at": now - timedelta(hours=3),
            "updated_at": now - timedelta(minutes=40),
            "cluster_id": "cluster-corr-2",
            "timeline_events": [],
            "recommendations": []
        }
    ]

@router.get("/stories", response_model=List[AttackStoryResponse], tags=["Attack Stories"])
async def list_attack_stories():
    return get_sample_stories()

@router.get("/stories/{story_id}", response_model=AttackStoryResponse, tags=["Attack Stories"])
async def get_attack_story(story_id: str):
    stories = get_sample_stories()
    match = next((s for s in stories if s["id"] == story_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Attack story not found")
    return match
