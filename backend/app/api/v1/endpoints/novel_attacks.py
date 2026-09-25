from fastapi import APIRouter
from app.services.novel_detector import novel_detector

router = APIRouter()

@router.get("/novel-attacks", tags=["Novel Attack Detection"])
async def get_novel_attack_analysis():
    sample_telemetry = {
        "process": "powershell.exe",
        "parent": "explorer.exe",
        "outbound_traffic": True,
        "entropy": 5.92
    }
    result = novel_detector.detect_novelty(sample_telemetry)
    return {
        "telemetry_subject": "WKSTN-FIN-04 (PID 4812)",
        "analysis": result
    }
