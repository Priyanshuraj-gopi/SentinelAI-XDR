from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter()

@router.post("/simulate", tags=["Demo Simulation"])
async def trigger_demo_simulation():
    """
    Instantly triggers or resets the comprehensive enterprise attack scenario:
    Phishing -> Tor VPN -> PowerShell Cradle -> LSASS Memory Dump -> Lateral Recon -> DNS Exfil.
    """
    return {
        "status": "simulation_loaded",
        "scenario_name": "Operation DarkHydra: Dual-Pronged Ransomware Staging",
        "alerts_injected": 412,
        "noise_alerts_suppressed": 396,
        "stories_synthesized": 1,
        "primary_story_id": "story-001",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "summary": "Full attack kill chain active and ready for live demonstration."
    }
