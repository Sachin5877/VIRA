from pathlib import Path
import csv
import json


UPLOAD_FOLDER = Path("uploads")


def investigate(filename):

    file = UPLOAD_FOLDER / filename

    logs = []

    if file.suffix.lower() == ".csv":

        with open(file, newline="", encoding="utf-8") as f:

            reader = csv.DictReader(f)

            logs = list(reader)

    elif file.suffix.lower() == ".json":

        with open(file, encoding="utf-8") as f:

            logs = json.load(f)

    incident = "Normal Activity"

    severity = "Low"

    confidence = 60

    risk_score = 20

    mitre = []

    recommendations = []

    timeline = []

    iocs = []

    for log in logs:

        event = log.get("event", "").lower()

        ip = (
            log.get("source_ip")
            or log.get("ip")
            or "Unknown"
        )

        timeline.append({

            "time": log.get("timestamp", ""),

            "event": log.get("event", ""),

            "ip": ip,

        })

        if ip not in iocs:

            iocs.append(ip)

        if "brute force" in event:

            incident = "Brute Force Attack"

            severity = "Critical"

            confidence = 96

            risk_score = 95

            mitre = [

                {

                    "id": "T1110",

                    "name": "Brute Force"

                }

            ]

            recommendations = [

                "Block attacker IP",

                "Enable MFA",

                "Reset affected passwords"

            ]

        elif "malware" in event:

            incident = "Malware Infection"

            severity = "Critical"

            confidence = 94

            risk_score = 92

            mitre = [

                {

                    "id": "T1204",

                    "name": "User Execution"

                }

            ]

            recommendations = [

                "Quarantine endpoint",

                "Run antivirus scan",

                "Collect malware sample"

            ]

        elif "port scan" in event:

            incident = "Port Scanning"

            severity = "Medium"

            confidence = 90

            risk_score = 70

            mitre = [

                {

                    "id": "T1046",

                    "name": "Network Service Scanning"

                }

            ]

            recommendations = [

                "Block scanner",

                "Review firewall"

            ]

    summary = (
        f"{incident} detected with "
        f"{severity} severity based on uploaded logs."
    )

    return {

        "summary": summary,

        "incident_type": incident,

        "severity": severity,

        "confidence": confidence,

        "risk_score": risk_score,

        "timeline": timeline,

        "iocs": iocs,

        "mitre": mitre,

        "recommendations": recommendations,

    }