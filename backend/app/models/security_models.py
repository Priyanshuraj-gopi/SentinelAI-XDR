from datetime import datetime, timezone
import uuid
from sqlalchemy import (
    Column, String, Float, Integer, Boolean, DateTime, Text, JSON, ForeignKey, Table
)
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

# Association Table for Alerts and Entities
alert_entity_association = Table(
    "alert_entity_association",
    Base.metadata,
    Column("alert_id", String, ForeignKey("alerts.id"), primary_key=True),
    Column("entity_id", String, ForeignKey("entities.id"), primary_key=True)
)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    severity = Column(String, nullable=False, index=True) # Critical, High, Medium, Low, Informational
    source = Column(String, nullable=False, index=True)   # CrowdStrike, Defender, Zeek, Okta, etc.
    category = Column(String, nullable=False)             # CredentialAccess, Execution, LateralMovement
    risk_score = Column(Float, default=0.0, index=True)
    confidence = Column(Float, default=0.0)
    is_suppressed = Column(Boolean, default=False)
    suppression_reason = Column(Text, nullable=True)
    raw_payload = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=utc_now, index=True)

    cluster_id = Column(String, ForeignKey("alert_clusters.id"), nullable=True)
    cluster = relationship("AlertCluster", back_populates="alerts")
    
    entities = relationship("Entity", secondary=alert_entity_association, back_populates="alerts")
    mitre_mappings = relationship("MITREMapping", back_populates="alert")

class AlertCluster(Base):
    __tablename__ = "alert_clusters"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    summary = Column(Text, nullable=True)
    root_cause = Column(Text, nullable=True)
    alert_count = Column(Integer, default=0)
    noise_reduction_rate = Column(Float, default=0.0)
    created_at = Column(DateTime, default=utc_now)

    alerts = relationship("Alert", back_populates="cluster")
    attack_story = relationship("AttackStory", back_populates="cluster", uselist=False)

class Entity(Base):
    __tablename__ = "entities"

    id = Column(String, primary_key=True, default=generate_uuid)
    type = Column(String, nullable=False, index=True)  # user, host, ip, process, file, domain
    value = Column(String, nullable=False, index=True) # user@corp.local, 192.168.1.5, powershell.exe
    criticality = Column(String, default="Medium")     # Critical, High, Medium, Low
    threat_score = Column(Float, default=0.0)
    first_seen = Column(DateTime, default=utc_now)
    last_seen = Column(DateTime, default=utc_now)

    alerts = relationship("Alert", secondary=alert_entity_association, back_populates="entities")

class AttackStory(Base):
    __tablename__ = "attack_stories"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False, index=True)
    narrative = Column(Text, nullable=False)
    kill_chain_phase = Column(String, nullable=False)  # Initial Access -> Exfiltration
    status = Column(String, default="Active", index=True) # Active, In-Progress, Contained, Resolved
    aggregate_risk = Column(Float, default=0.0, index=True)
    confidence = Column(Float, default=0.0)
    verdict = Column(String, default="True Positive") # True Positive, Benign Anomaly, Suspicious
    impact_scope = Column(String, nullable=True)       # 3 Hosts, 1 Domain Controller, 2 Accounts
    created_at = Column(DateTime, default=utc_now, index=True)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    cluster_id = Column(String, ForeignKey("alert_clusters.id"), nullable=True)
    cluster = relationship("AlertCluster", back_populates="attack_story")

    timeline_events = relationship("TimelineEvent", back_populates="story", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="story", cascade="all, delete-orphan")
    feedback = relationship("AnalystFeedback", back_populates="story", cascade="all, delete-orphan")

class TimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(String, primary_key=True, default=generate_uuid)
    story_id = Column(String, ForeignKey("attack_stories.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False, index=True)
    phase = Column(String, nullable=False) # e.g. T1059.001 Execution
    headline = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    actor = Column(String, nullable=True)
    target = Column(String, nullable=True)
    evidence_type = Column(String, nullable=True) # ProcessTree, NetFlow, AuthLog
    evidence_payload = Column(JSON, nullable=True)

    story = relationship("AttackStory", back_populates="timeline_events")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String, primary_key=True, default=generate_uuid)
    story_id = Column(String, ForeignKey("attack_stories.id"), nullable=False)
    title = Column(String, nullable=False)
    action_type = Column(String, nullable=False) # IsolateHost, RevokeToken, BlockIP, ResetPassword
    target_entity = Column(String, nullable=False)
    urgency = Column(String, default="High")     # Critical, High, Medium
    justification = Column(Text, nullable=False)
    status = Column(String, default="Pending")   # Pending, Approved, Executed, Rejected

    story = relationship("AttackStory", back_populates="recommendations")

class AnalystFeedback(Base):
    __tablename__ = "analyst_feedback"

    id = Column(String, primary_key=True, default=generate_uuid)
    story_id = Column(String, ForeignKey("attack_stories.id"), nullable=False)
    analyst_id = Column(String, default="soc-analyst-1")
    verdict = Column(String, nullable=False) # Accurate, Inaccurate, SuppressSimilar
    notes = Column(Text, nullable=True)
    applied_at = Column(DateTime, default=utc_now)

    story = relationship("AttackStory", back_populates="feedback")

class MITREMapping(Base):
    __tablename__ = "mitre_mappings"

    id = Column(String, primary_key=True, default=generate_uuid)
    alert_id = Column(String, ForeignKey("alerts.id"), nullable=False)
    tactic = Column(String, nullable=False)      # e.g., Execution
    technique_id = Column(String, nullable=False) # e.g., T1059.001
    technique_name = Column(String, nullable=False) # PowerShell
    confidence = Column(Float, default=1.0)

    alert = relationship("Alert", back_populates="mitre_mappings")

class ThreatIntel(Base):
    __tablename__ = "threat_intel"

    id = Column(String, primary_key=True, default=generate_uuid)
    ioc_type = Column(String, nullable=False) # IP, Domain, Hash
    ioc_value = Column(String, nullable=False, index=True)
    threat_actor = Column(String, nullable=True)
    malware_family = Column(String, nullable=True)
    confidence = Column(Float, default=0.85)
    last_reported = Column(DateTime, default=utc_now)
