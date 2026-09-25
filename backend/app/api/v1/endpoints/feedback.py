from fastapi import APIRouter
from app.schemas.security_schemas import FeedbackCreate, FeedbackResponse
from datetime import datetime, timezone

router = APIRouter()

@router.post("/feedback", response_model=FeedbackResponse, tags=["Analyst Feedback"])
async def submit_feedback(payload: FeedbackCreate):
    return FeedbackResponse(
        id="fb-1092",
        story_id=payload.story_id,
        analyst_id=payload.analyst_id,
        verdict=payload.verdict,
        notes=payload.notes,
        applied_at=datetime.now(timezone.utc)
    )
