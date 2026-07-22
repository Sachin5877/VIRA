import csv
import os


def get_timeline(filename):
    path = os.path.join("uploads", filename)

    if not os.path.exists(path):
        return []

    timeline = []

    with open(path, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        for row in reader:
            timeline.append({
                "time": row.get("timestamp", ""),
                "event": row.get("event", ""),
                "ip": row.get("source_ip", "")
            })

    return timeline