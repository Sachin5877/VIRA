from fastapi import APIRouter, HTTPException
from pathlib import Path
import csv
import json

router = APIRouter(prefix="/logs", tags=["Logs"])

UPLOAD_FOLDER = Path("uploads")


@router.get("/")
def get_uploaded_logs():

    files = []

    if not UPLOAD_FOLDER.exists():
        return []

    for file in UPLOAD_FOLDER.iterdir():

        files.append({
            "filename": file.name,
            "type": file.suffix.replace(".", "").upper(),
            "size": round(file.stat().st_size / 1024, 2)
        })

    return files


@router.get("/{filename}")
def read_log(filename: str):

    file_path = UPLOAD_FOLDER / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    if file_path.suffix.lower() == ".csv":

        with open(file_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            return list(reader)

    elif file_path.suffix.lower() == ".json":

        with open(file_path, encoding="utf-8") as f:
            return json.load(f)

    raise HTTPException(status_code=400, detail="Unsupported file type")