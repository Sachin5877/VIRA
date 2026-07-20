from fastapi import APIRouter
from services.ai_service import analyze_logs
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

@router.post("/investigate/{filename}")
async def investigate(filename: str):

    file_path = os.path.join(UPLOAD_FOLDER, filename)

    if not os.path.exists(file_path):
        return {"error": "File not found"}

    with open(file_path, "r", encoding="utf-8") as f:
        log_text = f.read()

    analysis = analyze_logs(log_text)

    return {
        "summary": analysis
    }