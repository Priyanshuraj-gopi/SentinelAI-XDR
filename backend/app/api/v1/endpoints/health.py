from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/health", tags=["Health"])
async def get_health():
    return {
        "status": "online",
        "service": "SentinelAI Engine",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "demo_mode": settings.DEMO_MODE
    }
