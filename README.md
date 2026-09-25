# SentinelAI — Autonomous SOC Alert Correlation & Attack Narrative Reconstruction

> **Tagline:** *From Millions of Alerts to One Attack Story*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI%200.111-009688.svg)](https://fastapi.tiangolo.com)
[![Frontend: Next.js 15](https://img.shields.io/badge/Frontend-Next.js%2015%20%2F%20React%2019-black.svg)](https://nextjs.org)
[![Testing: Vitest](https://img.shields.io/badge/Tests-35%20Passing%20(11%20Suites)-emerald.svg)]()
[![Theme: CrowdStrike/Defender](https://img.shields.io/badge/Theme-Dark%20SOC%20Enterprise-1e293b.svg)]()

---

## Executive Summary

Traditional Security Operations Centers (SOCs) suffer from debilitating alert fatigue: tier-1 analysts confront tens of thousands of raw, disjointed alerts daily. 

**SentinelAI** collapses multi-source telemetry and high-velocity alerts into unified **Attack Stories**. Powered by a graph-theoretic correlation engine, behavioral anomaly detectors, and explainable AI reasoning, SentinelAI empowers analysts to triage, comprehend, and neutralize cyber attacks in minutes rather than hours.

```
+-------------------------------------------------------------------------------+
|                           SENTINELAI ARCHITECTURE                             |
|                                                                               |
|  [ CrowdStrike EDR ]  [ Okta Identity ]  [ Palo Alto NGFW ]  [ Zeek Network ] |
|            |                 |                   |                  |         |
|            +-----------------+-------------------+------------------+         |
|                                      |                                        |
|                         [ Normalization & Ingestion ]                         |
|                                      |                                        |
|                       [ Graph-Theoretic Correlation ]                         |
|                       (NetworkX • Multi-Sensor Lineage)                       |
|                                      |                                        |
|                       [ Attack Story Reconstruction ]                         |
|                      (Operation DarkHydra: Story #001)                        |
|                                      |                                        |
|    +--------------------+------------+------------+--------------------+      |
|    |                    |                         |                    |      |
| [ Novel Detection ]  [ Explainable AI ]     [ SOC Copilot ]  [ SOAR Playbook ]|
|  (Shannon Entropy)  (Factor Attribution)    (LLM Grounded)   (1-Click Actions)|
+-------------------------------------------------------------------------------+
```

---

## Key Differentiators & Live Prototype Features

1. **Graph-Theoretic Alert Correlation (Phase 5):**
   - Collapses **400 raw alerts into 18 high-confidence investigation clusters** using NetworkX temporal adjacency and entity ancestry.
   - Interactive `@xyflow/react` Attack Tree canvas with time window slider (0h to 24h) and causal explanation drawer.

2. **Attack Story Builder — Centerpiece (Phase 6):**
   - Synthesizes 86 dispersed telemetry events into **Operation DarkHydra (Story #001)**.
   - Plain-English narrative, Blast Radius across 4 entity tabs (Users, Devices, Processes, IPs), chronological kill-chain progression, and automated remediation recommendations.

3. **Behavioral Novel Attack Detector (Phase 8):**
   - Detects zero-day threats and living-off-the-land techniques without static signatures.
   - Pinpoints **3.4σ statistical outliers**, **Shannon Information Entropy spikes (5.92 bits/char)**, and asynchronous UDP/53 DNS TXT tunneling.

4. **Explainable AI Reasoning (Phase 7):**
   - Transparent, auditable mathematical factor attribution ($Risk = Base \times Identity \times Asset \times Lateral \times Anomaly$).
   - Interactive **Counterfactual Risk Mitigation Simulator** demonstrating real-time risk drop from 98.4 down to 32.1 upon host quarantine and token revocation.

5. **Enterprise Analyst Workspace & SOAR Playbooks (Phase 9):**
   - 1-Click SOAR containment: Host Quarantine (CrowdStrike), Token Revocation (Okta), Perimeter IP Block (Palo Alto), and DNS Sinkholing (CoreDNS).
   - Forensic Evidence Inspector drawer (Processes, Users, Devices, Network, Files).
   - Collaborative shift-handoff journal and Human-in-the-Loop active learning feedback bar.

6. **Context-Aware AI SOC Copilot (Phase 10):**
   - Natural language incident assistant grounded in the active story telemetry.
   - Pre-prompt quick chips: *"What happened?"*, *"Why did this alert fire?"*, *"What should I do?"*, *"Summarize for CISO"*.
   - Direct execution of SOAR containment actions from the assistant chat stream.

7. **Executive Incident Post-Mortem & Disclosure (Phase 11):**
   - Formal board-level disclosure report with classification header, Reference ID `SEC-RPT-2026-0925-001`, and cryptographic signature.
   - Print-ready `@media print` CSS for physical/PDF export, Markdown copy, and JSON audit trace download.

8. **5-Minute Live Judging Presentation Mode (Phase 12):**
   - Built-in interactive walkthrough guide modal with step-by-step presenter script, judging checkpoints, and global keyboard shortcuts (`?` for Guide, `C` for Copilot, `Esc` to close).

---

## 5-Minute Live Judging Presentation Walkthrough Script

| Time | Step & Screen | Presenter Script & Key Differentiator |
|---|---|---|
| **0:00 - 0:45** | **1. Executive Dashboard** | *"Notice the crisis facing modern SOCs: 24,680 alerts per day. SentinelAI's autonomous ingestion engine suppresses 94.8% of noise, driving MTTD down to 4.2 minutes."* |
| **0:45 - 1:30** | **2. Correlated Alert Feed** | *"Instead of siloed alerts, SentinelAI correlates events across CrowdStrike, Defender, Okta, and Zeek. Each alert features an XAI rationale explaining its role in the campaign."* |
| **1:30 - 2:15** | **3. Attack Graph & Trees** | *"Here is the graph-theoretic correlation visualizer. 400 alerts collapse into 18 clusters. We can scrub the timeline slider to watch the attacker move through the corporate perimeter."* |
| **2:15 - 3:00** | **4. Attack Story Builder** | *"Our centerpiece: Operation DarkHydra. 86 dispersed events become one coherent attack narrative with blast radius, root cause, and multi-entity matrix."* |
| **3:00 - 3:45** | **5. Novel Attack Detector** | *"SentinelAI catches zero-days without rules: an Isolation Forest flags a 3.4σ anomaly with a Shannon entropy of 5.92 bits in powershell.exe and covert DNS tunneling."* |
| **3:45 - 4:15** | **6. Analyst Workspace & SOAR** | *"The analyst takes action: with 1 click, we quarantine the host, revoke Okta tokens, and sinkhole the C2 domain. The counterfactual simulator proves risk drops by 66.3 points."* |
| **4:15 - 4:45** | **7. AI SOC Copilot** | *"Our context-aware Copilot answers natural language questions with zero hallucinations, citing exact PIDs, hashes, and offering direct execution buttons."* |
| **4:45 - 5:00** | **8. Executive Post-Mortem** | *"Finally, 1-click export of an executive disclosure ready for the CISO and board of directors, proving a Mean Time to Contain of just 4m 12s."* |

---

## Keyboard Hotkeys

- `?` or `h` : Open 5-Minute Live Judging Walkthrough Guide
- `c` or `C` : Toggle Slide-Over AI SOC Copilot Sidecar
- `Esc` : Close any active modal or drawer

---

## Quickstart & Local Setup

### Prerequisites
- Node.js 18+ (tested on Node v24.19.0)
- Python 3.10+ (tested on Python 3.14.0)

### 1. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### 2. Frontend Setup (Next.js 15)

```bash
cd frontend
npm install
npm run dev
```
- Application UI: `http://localhost:3000`

### 3. Run Automated Test Suite (100% Passing)

```bash
cd frontend
npm test
```
*Executes all 11 test suites (35 unit tests) across all phases.*

### 4. Build for Production

```bash
cd frontend
npm run build
```

---

## Technology Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, TailwindCSS v3/v4, Zustand, Lucide React, Recharts, `@xyflow/react` (React Flow), Vitest, Testing Library.
- **Backend:** FastAPI, Python, SQLAlchemy 2.0 (Async SQLite + Postgres ready), Pydantic v2, NetworkX, Scikit-Learn.
- **Theme:** Enterprise Cyber SOC Dark Mode (`#070b14` / `#0c1322`), high-density information architecture, zero placeholders.
