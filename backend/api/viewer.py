from fastapi import APIRouter, HTTPException
import os
import csv
import json

router = APIRouter(prefix="/viewer", tags=["Viewer"])

UPLOAD_FOLDER = "uploads"


@router.get("/{filename}")
def view_file(filename: str):

    path = os.path.join(UPLOAD_FOLDER, filename)

    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")

    if filename.endswith(".csv"):

        with open(path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            return list(reader)

    elif filename.endswith(".json"):

        with open(path, encoding="utf-8") as f:
            return json.load(f)

    raise HTTPException(status_code=400, detail="Unsupported file")