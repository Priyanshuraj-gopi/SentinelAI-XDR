from typing import Dict, Any, List

class DynamicRiskEngine:
    """
    Computes contextual risk scores combining threat severity, asset criticality,
    user privilege tier, and kill chain progression weight.
    """

    CRITICALITY_WEIGHTS = {
        "Critical": 1.5,
        "High": 1.25,
        "Medium": 1.0,
        "Low": 0.75
    }

    PHASE_WEIGHTS = {
        "Initial Access": 1.1,
        "Execution": 1.2,
        "Privilege Escalation": 1.35,
        "Lateral Movement": 1.5,
        "Exfiltration": 1.7,
        "Impact": 1.8
    }

    def calculate_story_risk(self, base_severity_score: float, max_asset_criticality: str, phase: str) -> Dict[str, Any]:
        crit_weight = self.CRITICALITY_WEIGHTS.get(max_asset_criticality, 1.0)
        phase_weight = self.PHASE_WEIGHTS.get(phase, 1.1)

        raw_score = base_severity_score * crit_weight * phase_weight
        final_risk = min(max(round(raw_score, 1), 5.0), 99.9)

        return {
            "score": final_risk,
            "breakdown": {
                "base_telemetry_score": base_severity_score,
                "asset_criticality_multiplier": crit_weight,
                "kill_chain_severity_multiplier": phase_weight
            },
            "tier": "Critical" if final_risk >= 85 else "High" if final_risk >= 65 else "Medium"
        }

risk_engine = DynamicRiskEngine()
