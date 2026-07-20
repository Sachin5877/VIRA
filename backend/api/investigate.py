from fastapi import APIRouter
from services.ai_service import analyze_logs

router = APIRouter()

@router.post("/investigate")
async def investigate():

    sample_logs = """
2026-07-16,192.168.1.100,Failed Login
2026-07-16,10.0.0.5,Malware Detected
"""

    analysis = analyze_logs(sample_logs)

    return {
        "summary": analysis
    }