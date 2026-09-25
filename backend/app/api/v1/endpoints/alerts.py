from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timedelta, timezone
from app.schemas.security_schemas import AlertResponse, MITREMappingResponse

router = APIRouter()

# Realistic seed alerts for enterprise SOC demonstration
def get_sample_alerts() -> List[dict]:
    now = datetime.now(timezone.utc)
    return [
        {
            "id": "alt-101",
            "title": "Suspicious Encoded PowerShell Execution (Download Cradle)",
            "description": "powershell.exe executed with -EncodedCommand attempting outbound HTTP beacon.",
            "severity": "Critical",
            "source": "CrowdStrike Falcon",
            "category": "Execution",
            "risk_score": 94.0,
            "confidence": 0.96,
            "is_suppressed": False,
            "cluster_id": "cluster-corr-1",
            "created_at": (now - timedelta(minutes=15)),
            "mitre_mappings": [
                {"id": "m-1", "tactic": "Execution", "technique_id": "T1059.001", "technique_name": "PowerShell", "confidence": 0.98}
            ],
            "raw_payload": {"cmd": "powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA...", "pid": 4812}
        },
        {
            "id": "alt-102",
            "title": "LSASS Memory Dump via comsvcs.dll MiniDump",
            "description": "rundll32 comsvcs.dll #24 MiniDump executed on Domain Controller candidate.",
            "severity": "Critical",
            "source": "Microsoft Defender XDR",
            "category": "CredentialAccess",
            "risk_score": 98.5,
            "confidence": 0.99,
            "is_suppressed": False,
            "cluster_id": "cluster-corr-1",
            "created_at": (now - timedelta(minutes=10)),
            "mitre_mappings": [
                {"id": "m-2", "tactic": "Credential Access", "technique_id": "T1003.001", "technique_name": "LSASS Memory", "confidence": 0.99}
            ],
            "raw_payload": {"module": "comsvcs.dll", "target_process": "lsass.exe"}
        },
        {
            "id": "alt-103",
            "title": "Anomalous Ingress VPN Login from Tor Exit Node",
            "description": "Authentication for j.doe@sentinel.corp from known Tor relay 185.220.101.5.",
            "severity": "High",
            "source": "Okta Identity Cloud",
            "category": "InitialAccess",
            "risk_score": 88.0,
            "confidence": 0.92,
            "is_suppressed": False,
            "cluster_id": "cluster-corr-1",
            "created_at": (now - timedelta(minutes=35)),
            "mitre_mappings": [
                {"id": "m-3", "tactic": "Initial Access", "technique_id": "T1078.004", "technique_name": "Cloud Accounts", "confidence": 0.90}
            ],
            "raw_payload": {"ip": "185.220.101.5", "user": "j.doe@sentinel.corp", "mfa": "Passed-PushSpam"}
        },
        {
            "id": "alt-104",
            "title": "Large Volume Data Egress over DNS Tunneling",
            "description": "Unusually high TXT query frequency toward external authoritative domain ns1.dark-c2.net.",
            "severity": "Critical",
            "source": "Zeek / Corelight",
            "category": "Exfiltration",
            "risk_score": 95.0,
            "confidence": 0.94,
            "is_suppressed": False,
            "cluster_id": "cluster-corr-1",
            "created_at": (now - timedelta(minutes=5)),
            "mitre_mappings": [
                {"id": "m-4", "tactic": "Exfiltration", "technique_id": "T1048.003", "technique_name": "Exfiltration Over DNS", "confidence": 0.95}
            ],
            "raw_payload": {"dns_qtype": "TXT", "domain": "ns1.dark-c2.net", "bytes_transferred": 52428800}
        },
        {
            "id": "alt-105",
            "title": "Routine Vulnerability Scanner Port Sweep",
            "description": "Automated internal Nessus scanner querying ports 22, 80, 443 across subnet.",
            "severity": "Low",
            "source": "Palo Alto Networks",
            "category": "Reconnaissance",
            "risk_score": 12.0,
            "confidence": 0.99,
            "is_suppressed": True,
            "cluster_id": None,
            "created_at": (now - timedelta(minutes=50)),
            "mitre_mappings": [
                {"id": "m-5", "tactic": "Reconnaissance", "technique_id": "T1595", "technique_name": "Active Scanning", "confidence": 0.95}
            ],
            "raw_payload": {"scanner_ip": "10.0.10.15", "authorized": True}
        }
    ]

@router.get("/alerts", response_model=List[AlertResponse], tags=["Alerts"])
async def list_alerts(
    severity: Optional[str] = Query(None, description="Filter by severity: Critical, High, Medium, Low"),
    category: Optional[str] = Query(None, description="Filter by category"),
    include_suppressed: bool = Query(False, description="Whether to include suppressed noise alerts"),
    limit: int = Query(50, ge=1, le=500)
):
    alerts = get_sample_alerts()
    filtered = alerts
    if not include_suppressed:
        filtered = [a for a in filtered if not a["is_suppressed"]]
    if severity:
        filtered = [a for a in filtered if a["severity"].lower() == severity.lower()]
    if category:
        filtered = [a for a in filtered if a["category"].lower() == category.lower()]
    return filtered[:limit]

@router.get("/alerts/{alert_id}", response_model=AlertResponse, tags=["Alerts"])
async def get_alert(alert_id: str):
    alerts = get_sample_alerts()
    match = next((a for a in alerts if a["id"] == alert_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Alert not found")
    return match
