from fastapi import APIRouter
from app.services.risk_engine import risk_engine
from app.services.explainability import explainability_engine

router = APIRouter()

@router.get("/risk", tags=["Risk Engine"])
async def get_risk_assessment(severity: float = 75.0, asset_criticality: str = "Critical", phase: str = "Lateral Movement"):
    risk_calc = risk_engine.calculate_story_risk(severity, asset_criticality, phase)
    explanation = explainability_engine.explain_risk(risk_calc["score"], risk_calc["breakdown"])
    return {
        "assessment": risk_calc,
        "explainable_ai": explanation
    }
