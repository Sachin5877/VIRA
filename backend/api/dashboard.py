from fastapi import APIRouter
from pathlib import Path
import csv
import json

router = APIRouter()

UPLOAD_FOLDER = Path("uploads")


@router.get("/dashboard")
def dashboard():

    uploaded_files = list(UPLOAD_FOLDER.glob("*"))

    total_logs = 0
    critical_alerts = 0
    recent_alerts = []

    event_counts = {}
    severity_counts = {}

    for file in uploaded_files:

        if file.suffix.lower() == ".csv":

            with open(file, newline="", encoding="utf-8") as f:

                reader = csv.DictReader(f)

                for row in reader:

                    total_logs += 1

                    event = row.get("event", "").strip()

                    event_lower = event.lower()

                    ip = (
                        row.get("ip")
                        or row.get("source_ip")
                        or row.get("source")
                        or row.get("src_ip")
                        or "Unknown"
                    )

                    severity = "Low"

                    if "malware" in event_lower:
                        severity = "Critical"

                    elif "failed login" in event_lower:
                        severity = "High"

                    elif "brute force" in event_lower:
                        severity = "Critical"

                    elif "port scan" in event_lower:
                        severity = "Medium"

                    elif "ransomware" in event_lower:
                        severity = "Critical"

                    elif "sql injection" in event_lower:
                        severity = "Critical"

                    elif "xss" in event_lower:
                        severity = "Medium"

                    elif "phishing" in event_lower:
                        severity = "High"

                    # Count events
                    event_counts[event] = event_counts.get(event, 0) + 1

                    # Count severities
                    severity_counts[severity] = severity_counts.get(severity, 0) + 1

                    if severity in ["High", "Critical"]:

                        critical_alerts += 1

                        if len(recent_alerts) < 5:

                            recent_alerts.append(
                                {
                                    "event": event,
                                    "severity": severity,
                                    "ip": ip,
                                }
                            )

        elif file.suffix.lower() == ".json":

            with open(file, encoding="utf-8") as f:

                data = json.load(f)

                if isinstance(data, list):

                    total_logs += len(data)

    security_score = max(0, 100 - (critical_alerts * 5))

    return {
        "total_logs": total_logs,
        "uploaded_files": len(uploaded_files),
        "critical_alerts": critical_alerts,
        "active_investigations": len(uploaded_files),
        "reports_generated": 0,
        "mitre_techniques": 0,
        "security_score": security_score,
        "recent_alerts": recent_alerts,
        "event_distribution": event_counts,
        "severity_distribution": severity_counts,
        "summary": "Dashboard updated successfully.",
    }