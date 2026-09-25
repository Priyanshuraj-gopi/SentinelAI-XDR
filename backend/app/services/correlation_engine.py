import networkx as nx
from typing import List, Dict, Any
from datetime import datetime, timezone

class AlertCorrelationEngine:
    """
    Graph-theoretic correlation engine. Builds multi-partite graphs connecting
    alerts through shared entities (Hosts, Users, IP addresses, Parent Processes).
    Computes connected components to group isolated alerts into incident clusters.
    """

    def __init__(self, time_window_seconds: int = 14400):
        self.time_window_seconds = time_window_seconds
        self.graph = nx.Graph()

    def build_correlation_graph(self, alerts: List[Dict[str, Any]]) -> nx.Graph:
        """Constructs an entity-alert bipartite graph."""
        self.graph.clear()

        for alert in alerts:
            alert_id = alert["id"]
            self.graph.add_node(
                alert_id,
                node_type="alert",
                title=alert.get("title", "Alert"),
                severity=alert.get("severity", "Medium"),
                risk_score=alert.get("risk_score", 50.0),
                timestamp=alert.get("created_at", datetime.now(timezone.utc).isoformat())
            )

            # Connect alert to its associated entities
            for entity in alert.get("entities", []):
                entity_key = f"{entity['type']}:{entity['value']}"
                if not self.graph.has_node(entity_key):
                    self.graph.add_node(
                        entity_key,
                        node_type="entity",
                        entity_type=entity["type"],
                        value=entity["value"],
                        criticality=entity.get("criticality", "Medium")
                    )

                self.graph.add_edge(alert_id, entity_key, relation="involves")

        return self.graph

    def cluster_alerts(self, alerts: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Extracts connected components from the entity-alert graph to identify
        coherent attack clusters.
        """
        graph = self.build_correlation_graph(alerts)
        clusters = []

        components = list(nx.connected_components(graph))
        for idx, component in enumerate(components):
            alert_nodes = [node for node in component if graph.nodes[node].get("node_type") == "alert"]
            entity_nodes = [node for node in component if graph.nodes[node].get("node_type") == "entity"]

            if not alert_nodes:
                continue

            max_risk = max([graph.nodes[a].get("risk_score", 0.0) for a in alert_nodes])
            cluster_id = f"cluster-corr-{idx + 1}"

            clusters.append({
                "cluster_id": cluster_id,
                "name": f"Correlated Attack Vector #{idx + 1}",
                "alert_count": len(alert_nodes),
                "alert_ids": alert_nodes,
                "involved_entities": [graph.nodes[e]["value"] for e in entity_nodes],
                "max_risk_score": max_risk,
                "noise_reduction_ratio": round((1.0 - (1.0 / max(len(alert_nodes), 1))) * 100, 1),
                "status": "Active"
            })

        # Sort clusters by severity/risk
        clusters.sort(key=lambda x: x["max_risk_score"], reverse=True)
        return clusters

correlation_engine = AlertCorrelationEngine()
