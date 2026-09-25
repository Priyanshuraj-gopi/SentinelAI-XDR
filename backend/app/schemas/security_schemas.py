from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Entity Schemas ---
class EntityBase(BaseModel):
    type: str
    value: str
    criticality: str = "Medium"
    threat_score: float = 0.0

class EntityResponse(EntityBase):
    id: str
    first_seen: datetime
    last_seen: datetime

    class Config:
        from_attributes = True

# --- MITRE Schemas ---
class MITREMappingResponse(BaseModel):
    id: str
    tactic: str
    technique_id: str
    technique_name: str
    confidence: float

    class Config:
        from_attributes = True

# --- Alert Schemas ---
class AlertBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: str
    source: str
    category: str
    risk_score: float = Field(ge=0.0, le=100.0)
    confidence: float = Field(ge=0.0, le=1.0)
    is_suppressed: bool = False
    suppression_reason: Optional[str] = None
    raw_payload: Optional[Dict[str, Any]] = None

class AlertResponse(AlertBase):
    id: str
    cluster_id: Optional[str] = None
    created_at: datetime
    mitre_mappings: List[MITREMappingResponse] = []

    class Config:
        from_attributes = True

# --- Timeline & Recommendations ---
class TimelineEventResponse(BaseModel):
    id: str
    story_id: str
    timestamp: datetime
    phase: str
    headline: str
    details: Optional[str] = None
    actor: Optional[str] = None
    target: Optional[str] = None
    evidence_type: Optional[str] = None
    evidence_payload: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class RecommendationResponse(BaseModel):
    id: str
    story_id: str
    title: str
    action_type: str
    target_entity: str
    urgency: str
    justification: str
    status: str

    class Config:
        from_attributes = True

class FeedbackCreate(BaseModel):
    story_id: str
    analyst_id: str = "analyst-primary"
    verdict: str # Accurate, Inaccurate, SuppressSimilar
    notes: Optional[str] = None

class FeedbackResponse(BaseModel):
    id: str
    story_id: str
    analyst_id: str
    verdict: str
    notes: Optional[str] = None
    applied_at: datetime

    class Config:
        from_attributes = True

# --- Attack Story Schemas ---
class AttackStoryResponse(BaseModel):
    id: str
    title: str
    narrative: str
    kill_chain_phase: str
    status: str
    aggregate_risk: float
    confidence: float
    verdict: str
    impact_scope: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    cluster_id: Optional[str] = None
    timeline_events: List[TimelineEventResponse] = []
    recommendations: List[RecommendationResponse] = []

    class Config:
        from_attributes = True

# --- Graph Schemas (for React Flow frontend) ---
class GraphNode(BaseModel):
    id: str
    type: str # alertNode, entityNode, attackRoot
    label: str
    category: str
    risk: float
    data: Dict[str, Any]

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None
    relation: str

class AttackGraphResponse(BaseModel):
    story_id: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]

# --- Dashboard Metrics Schemas ---
class DashboardMetricsResponse(BaseModel):
    threat_level: str
    active_threat_score: float
    mttd_minutes: float
    mttr_minutes: float
    analyst_workload_score: float
    total_raw_alerts: int
    suppressed_noise_alerts: int
    active_attack_stories: int
    noise_reduction_percentage: float
    novel_attacks_detected: int
    risk_trend: List[Dict[str, Any]]
    top_critical_assets: List[Dict[str, Any]]
