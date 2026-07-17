from fastapi import APIRouter
import os
from datetime import datetime

router = APIRouter(prefix="/files", tags=["Files"])

UPLOAD_FOLDER = "uploads"

@router.get("/")
def get_uploaded_files():
    files = []

    if os.path.exists(UPLOAD_FOLDER):
        for filename in os.listdir(UPLOAD_FOLDER):
            path = os.path.join(UPLOAD_FOLDER, filename)

            if os.path.isfile(path):
                files.append({
                    "filename": filename,
                    "size": round(os.path.getsize(path) / 1024, 2),
                    "uploaded_at": datetime.fromtimestamp(
                        os.path.getmtime(path)
                    ).strftime("%d-%m-%Y %H:%M")
                })

    return files