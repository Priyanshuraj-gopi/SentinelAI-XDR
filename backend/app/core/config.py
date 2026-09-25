import os
from typing import List, Union
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SentinelAI"
    API_V1_STR: str = "/api/v1"
    
    # Defaults to local async SQLite for friction-free setup, supports Postgres seamlessly
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./sentinelai.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000"
    ]
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEMO_MODE: bool = True

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
