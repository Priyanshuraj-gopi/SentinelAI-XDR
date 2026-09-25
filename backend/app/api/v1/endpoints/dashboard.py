from fastapi import APIRouter
from app.schemas.security_schemas import DashboardMetricsResponse
from datetime import datetime, timedelta, timezone

router = APIRouter()

@router.get("/dashboard", response_model=DashboardMetricsResponse, tags=["Dashboard"])
async def get_dashboard_metrics():
    now = datetime.now(timezone.utc)
    
    # 7-day risk trend
    risk_trend = [
        {"day": (now - timedelta(days=6)).strftime("%a"), "risk": 42, "alerts": 3200},
        {"day": (now - timedelta(days=5)).strftime("%a"), "risk": 48, "alerts": 3850},
        {"day": (now - timedelta(days=4)).strftime("%a"), "risk": 55, "alerts": 4100},
        {"day": (now - timedelta(days=3)).strftime("%a"), "risk": 68, "alerts": 4900},
        {"day": (now - timedelta(days=2)).strftime("%a"), "risk": 74, "alerts": 5200},
        {"day": (now - timedelta(days=1)).strftime("%a"), "risk": 89, "alerts": 6100},
        {"day": "Today", "risk": 94, "alerts": 6840},
    ]

    top_critical_assets = [
        {"id": "ast-1", "name": "DC-PRIMARY-01.corp", "type": "Domain Controller", "risk": 96.4, "status": "Critical"},
        {"id": "ast-2", "name": "DB-PROD-FINANCE.corp", "type": "SQL Cluster", "risk": 91.2, "status": "High"},
        {"id": "ast-3", "name": "VPN-GW-EAST.corp", "type": "Firewall / Gateway", "risk": 84.7, "status": "High"},
        {"id": "ast-4", "name": "WKSTN-EXEC-CFO", "type": "VIP Endpoint", "risk": 78.5, "status": "Medium"},
    ]

    return DashboardMetricsResponse(
        threat_level="DEFCON 2 - Elevated Active Campaign",
        active_threat_score=94.2,
        mttd_minutes=4.2,
        mttr_minutes=14.8,
        analyst_workload_score=38.5, # 61.5% reduction
        total_raw_alerts=24680,
        suppressed_noise_alerts=23412,
        active_attack_stories=14,
        noise_reduction_percentage=94.8,
        novel_attacks_detected=3,
        risk_trend=risk_trend,
        top_critical_assets=top_critical_assets
    )
