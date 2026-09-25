export type Severity = "Critical" | "High" | "Medium" | "Low" | "Informational";

export interface MITREMapping {
  id: string;
  tactic: string;
  technique_id: string;
  technique_name: string;
  confidence: number;
}

export interface Alert {
  id: string;
  title: string;
  description?: string;
  severity: Severity;
  source: string;
  category: string;
  risk_score: number;
  confidence: number;
  is_suppressed: boolean;
  suppression_reason?: string;
  cluster_id?: string;
  created_at: string;
  mitre_mappings: MITREMapping[];
  raw_payload?: Record<string, any>;
}

export interface TimelineEvent {
  id: string;
  story_id: string;
  timestamp: string;
  phase: string;
  headline: string;
  details?: string;
  actor?: string;
  target?: string;
  evidence_type?: string;
  evidence_payload?: Record<string, any>;
}

export interface Recommendation {
  id: string;
  story_id: string;
  title: string;
  action_type: string;
  target_entity: string;
  urgency: "Critical" | "High" | "Medium";
  justification: string;
  status: "Pending" | "Approved" | "Executed" | "Rejected";
}

export interface AttackStory {
  id: string;
  title: string;
  narrative: string;
  kill_chain_phase: string;
  status: string;
  aggregate_risk: number;
  confidence: number;
  verdict: string;
  impact_scope?: string;
  created_at: string;
  updated_at: string;
  cluster_id?: string;
  timeline_events: TimelineEvent[];
  recommendations: Recommendation[];
}

export interface DashboardMetrics {
  threat_level: string;
  active_threat_score: number;
  mttd_minutes: number;
  mttr_minutes: number;
  analyst_workload_score: number;
  total_raw_alerts: number;
  suppressed_noise_alerts: number;
  active_attack_stories: number;
  noise_reduction_percentage: number;
  novel_attacks_detected: number;
  risk_trend: Array<{ day: string; risk: number; alerts: number }>;
  top_critical_assets: Array<{ id: string; name: string; type: string; risk: number; status: string }>;
}

export interface GraphNodeData {
  label: string;
  category: string;
  risk: number;
  [key: string]: any;
}

export interface AttackGraphNode {
  id: string;
  type: string;
  label: string;
  category: string;
  risk: number;
  data: GraphNodeData;
}

export interface AttackGraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  relation: string;
}

export interface AttackGraphData {
  story_id: string;
  nodes: AttackGraphNode[];
  edges: AttackGraphEdge[];
}
