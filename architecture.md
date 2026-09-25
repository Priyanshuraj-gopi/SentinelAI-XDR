# SentinelAI — System Architecture Blueprint

## 1. High-Level Architecture

SentinelAI follows an event-driven, graph-accelerated microservices architecture designed to ingest high-throughput alerts, perform multi-attribute entity resolution, and synthesize unified attack narratives.

```mermaid
flowchart TD
    subgraph Ingestion["Ingestion & Normalization Layer"]
        A1["EDR Telemetry (CrowdStrike / Defender)"] --> ING["Alert Normalizer"]
        A2["Network Flow Logs (Zeek / Suricata)"] --> ING
        A3["Identity / Cloud Auth (Okta / Azure AD)"] --> ING
    end

    subgraph Processing["AI & Analytics Pipeline"]
        ING --> NOISE["Noise Suppression Engine"]
        NOISE --> CORR["Graph Correlation Engine (NetworkX)"]
        CORR --> STORY["Attack Story Builder"]
        STORY --> RISK["Dynamic Risk Engine"]
        STORY --> NOVEL["Novel Attack Detector (Isolation Forest / Heuristic)"]
        STORY --> XAI["Explainability Engine (XAI)"]
    end

    subgraph Persistence["Storage & State Layer"]
        CORR <--> PG[("PostgreSQL / SQLite State Store")]
        NOISE <--> RD[("Redis Cache / In-Memory State")]
    end

    subgraph Presentation["Enterprise SOC Single-Pane-of-Glass"]
        API["FastAPI Async REST & WebSocket API"]
        FE["Next.js 15 / React 19 Frontend"]
        API <--> PG
        API <--> STORY
        FE <--> API
        
        FE --> UI1["Executive Threat Overview"]
        FE --> UI2["Interactive React Flow Attack Tree"]
        FE --> UI3["Temporal Incident Timeline"]
        FE --> UI4["Transparent XAI Explainability Drawer"]
        FE --> UI5["Analyst Feedback & Mitigation Engine"]
    end
```

---

## 2. Attack Correlation Pipeline

The correlation engine reduces alert volume by over 95% via graph clustering:

```mermaid
flowchart LR
    R1["Raw Alerts (400+)"] --> F1["Noise Filter (Benign Baseline)"]
    F1 --> F2["Temporal Windowing (30m - 4h)"]
    F2 --> G1["Entity Graph Synthesis"]
    G1 --> CL["Graph Community Detection"]
    CL --> S1["Story 1: Kerberoasting to Domain Admin"]
    CL --> S2["Story 2: Living-off-the-Land Data Exfil"]
```

---

## 3. Database Schema Overview

```mermaid
erDiagram
    ALERTS }|..|| ALERT_CLUSTERS : "belongs to"
    ALERT_CLUSTERS ||--|| ATTACK_STORIES : "synthesized into"
    ATTACK_STORIES ||--|{ TIMELINE_EVENTS : "contains"
    ATTACK_STORIES ||--|{ RECOMMENDATIONS : "generates"
    ATTACK_STORIES ||--|{ ANALYST_FEEDBACK : "receives"
    ALERTS }|..|{ ENTITIES : "associates"
    ALERTS ||--|{ MITRE_MAPPINGS : "tags"

    ALERTS {
        string id PK
        string title
        string severity
        string source
        float risk_score
        json raw_payload
        datetime timestamp
    }
    ATTACK_STORIES {
        string id PK
        string title
        string narrative
        string kill_chain_phase
        float aggregate_risk
        string status
        datetime detected_at
    }
    ENTITIES {
        string id PK
        string type
        string value
        float threat_score
    }
```
