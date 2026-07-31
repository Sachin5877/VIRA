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

    attack_stage = "Monitoring"

    attack_chain = []

    mitre = []

    recommendations = []

    timeline = []

    iocs = []

    affected_assets = []

    for log in logs:

        event = log.get("event", "").strip()
        event_lower = event.lower()

        source_ip = (
            log.get("source_ip")
            or log.get("ip")
            or "Unknown"
        )

        destination_ip = (
            log.get("destination_ip")
            or "Unknown"
        )

        timeline.append(
            {
                "time": log.get("timestamp", ""),
                "event": event,
                "ip": source_ip,
            }
        )

        if source_ip not in iocs:
            iocs.append(source_ip)

        if destination_ip not in affected_assets:
            affected_assets.append(destination_ip)

        if "brute force" in event_lower:

            incident = "Brute Force Attack"
            severity = "Critical"
            confidence = 96
            risk_score = 95

            attack_stage = "Credential Access"

            attack_chain = [
                "Failed Login",
                "Brute Force Attempt",
                "Credential Access",
            ]

            mitre = [
                {
                    "id": "T1110",
                    "name": "Brute Force",
                }
            ]

            recommendations = [
                "Block attacker IP",
                "Reset affected passwords",
                "Enable Multi-Factor Authentication",
                "Review authentication logs",
            ]

        elif "malware" in event_lower:

            incident = "Malware Infection"
            severity = "Critical"
            confidence = 94
            risk_score = 92

            attack_stage = "Execution"

            attack_chain = [
                "Malicious Download",
                "Execution",
                "Persistence",
            ]

            mitre = [
                {
                    "id": "T1204",
                    "name": "User Execution",
                }
            ]

            recommendations = [
                "Quarantine infected endpoint",
                "Run antivirus scan",
                "Collect malware sample",
                "Disconnect affected host",
            ]

        elif "port scan" in event_lower:

            incident = "Port Scanning"
            severity = "Medium"
            confidence = 90
            risk_score = 70

            attack_stage = "Reconnaissance"

            attack_chain = [
                "Reconnaissance",
                "Port Scanning",
            ]

            mitre = [
                {
                    "id": "T1046",
                    "name": "Network Service Scanning",
                }
            ]

            recommendations = [
                "Block scanning IP",
                "Review firewall rules",
                "Monitor repeated scans",
            ]

    summary = (
        f"{incident} detected with {severity} severity. "
        f"The investigation identified {len(iocs)} indicator(s) of compromise "
        f"affecting {len(affected_assets)} asset(s). "
        f"Attack stage: {attack_stage}."
    )

    return {
        "summary": summary,
        "incident_type": incident,
        "severity": severity,
        "confidence": confidence,
        "risk_score": risk_score,
        "attack_stage": attack_stage,
        "attack_chain": attack_chain,
        "timeline": timeline,
        "iocs": iocs,
        "affected_assets": affected_assets,
        "mitre": mitre,
        "recommendations": recommendations,
    }