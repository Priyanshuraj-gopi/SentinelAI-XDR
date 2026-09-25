import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_health_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        assert data["service"] == "SentinelAI Engine"

@pytest.mark.asyncio
async def test_dashboard_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/dashboard")
        assert response.status_code == 200
        data = response.json()
        assert "threat_level" in data
        assert data["noise_reduction_percentage"] > 90.0

@pytest.mark.asyncio
async def test_stories_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/stories")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        assert "narrative" in data[0]

@pytest.mark.asyncio
async def test_clusters_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/v1/clusters")
        assert response.status_code == 200
        data = response.json()
        assert data["summary"]["investigation_clusters_synthesized"] == 18
        assert data["summary"]["total_raw_alerts_processed"] == 412
        assert len(data["clusters"]) == 18
