import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_copilot_chat():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Query "What happened?"
        res = await client.post(
            "/api/v1/copilot/chat",
            json={"query": "What happened in this incident?", "story_id": "story-001"}
        )
        assert res.status_code == 200
        data = res.json()
        assert "Operation DarkHydra" in data["reply"]
        assert len(data["suggested_actions"]) > 0
        assert len(data["mitre_techniques"]) > 0
        assert len(data["evidence_citations"]) > 0

        # 2. Query CISO summary
        res_ciso = await client.post(
            "/api/v1/copilot/chat",
            json={"query": "Summarize for CISO", "story_id": "story-001"}
        )
        assert res_ciso.status_code == 200
        data_ciso = res_ciso.json()
        assert "Executive Incident Brief" in data_ciso["reply"]

@pytest.mark.asyncio
async def test_clusters_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/api/v1/clusters")
        assert res.status_code == 200
        data = res.json()
        assert data["summary"]["total_raw_alerts_processed"] == 412
        assert data["summary"]["investigation_clusters_synthesized"] == 18
        assert len(data["clusters"]) > 0
