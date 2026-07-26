from fastapi import APIRouter
from pathlib import Path
import json
from datetime import datetime

router = APIRouter()

REPORT_FILE = Path("reports/report_history.json")


def load_reports():
    if REPORT_FILE.exists():
        with open(REPORT_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def save_reports(data):
    REPORT_FILE.parent.mkdir(exist_ok=True)

    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


@router.get("/reports")
def get_reports():
    return load_reports()


@router.post("/reports/generate")
def generate_report(report: dict):

    reports = load_reports()

    reports.append(
        {
            "id": len(reports) + 1,
            "file": report.get("file"),
            "summary": report.get("summary"),
            "created": datetime.now().strftime("%d-%m-%Y %H:%M"),
        }
    )

    save_reports(reports)

    return {
        "message": "Report saved successfully."
    }