from fastapi import APIRouter
from app.api.v1.endpoints import (
    health,
    dashboard,
    alerts,
    stories,
    graph,
    risk,
    feedback,
    novel_attacks,
    simulation,
    clusters,
    copilot
)

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(dashboard.router)
api_router.include_router(alerts.router)
api_router.include_router(stories.router)
api_router.include_router(graph.router)
api_router.include_router(risk.router)
api_router.include_router(feedback.router)
api_router.include_router(novel_attacks.router)
api_router.include_router(simulation.router)
api_router.include_router(clusters.router)
api_router.include_router(copilot.router)
