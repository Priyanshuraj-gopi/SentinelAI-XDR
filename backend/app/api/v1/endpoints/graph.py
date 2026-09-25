from fastapi import APIRouter, Query
from app.schemas.security_schemas import AttackGraphResponse, GraphNode, GraphEdge

router = APIRouter()

@router.get("/graph", response_model=AttackGraphResponse, tags=["Attack Graph"])
async def get_attack_graph(story_id: str = Query("story-001")):
    nodes = [
        GraphNode(
            id="node-threat-actor",
            type="threatActorNode",
            label="External Adversary (Tor Node 185.220.101.5)",
            category="Threat Actor",
            risk=95.0,
            data={"ip": "185.220.101.5", "country": "Exit Relay", "status": "Malicious"}
        ),
        GraphNode(
            id="node-user-jdoe",
            type="entityNode",
            label="User: j.doe@sentinel.corp",
            category="Identity",
            risk=92.0,
            data={"role": "Finance Senior Analyst", "privilege": "Standard", "compromised": True}
        ),
        GraphNode(
            id="node-host-wkstn",
            type="entityNode",
            label="Host: WKSTN-FIN-04",
            category="Endpoint",
            risk=96.0,
            data={"os": "Windows 11 Enterprise", "ip": "10.0.4.112", "isolated": False}
        ),
        GraphNode(
            id="node-proc-ps",
            type="processNode",
            label="Process: powershell.exe (PID 4812)",
            category="Execution",
            risk=94.0,
            data={"cmd": "powershell.exe -Enc ...", "entropy": 5.8}
        ),
        GraphNode(
            id="node-target-dc",
            type="entityNode",
            label="Host: DC-PRIMARY-01.corp",
            category="Crown Jewel",
            risk=99.0,
            data={"role": "Active Directory Domain Controller", "criticality": "Critical"}
        ),
        GraphNode(
            id="node-c2-domain",
            type="c2Node",
            label="C2: ns1.dark-c2.net",
            category="Exfiltration Destination",
            risk=98.0,
            data={"channel": "DNS Tunneling", "bytes": "50MB"}
        )
    ]

    edges = [
        GraphEdge(id="e1", source="node-threat-actor", target="node-user-jdoe", relation="credential_theft", label="Compromised via VPN"),
        GraphEdge(id="e2", source="node-user-jdoe", target="node-host-wkstn", relation="interactive_login", label="RDP Session"),
        GraphEdge(id="e3", source="node-host-wkstn", target="node-proc-ps", relation="spawned", label="Spawned C2 Process"),
        GraphEdge(id="e4", source="node-proc-ps", target="node-target-dc", relation="lateral_recon", label="SMB/RPC Ticket Request"),
        GraphEdge(id="e5", source="node-host-wkstn", target="node-c2-domain", relation="exfiltrated_to", label="DNS Tunneling TXT")
    ]

    return AttackGraphResponse(story_id=story_id, nodes=nodes, edges=edges)
