import os
import json
import pandas as pd


def get_mitre_mapping(filename):
    upload_path = os.path.join("uploads", filename)
    mapping_path = os.path.join("mitre", "mitre_mapping.json")

    if not os.path.exists(upload_path):
        return {"error": "Log file not found"}

    if not os.path.exists(mapping_path):
        return {"error": "MITRE mapping file not found"}

    df = pd.read_csv(upload_path)

    with open(mapping_path, "r") as f:
        mitre_db = json.load(f)

    techniques = []

    for _, row in df.iterrows():
        event = str(row.get("event", "")).strip()

        if event in mitre_db:
            techniques.append(mitre_db[event])

    unique = []
    seen = set()

    for item in techniques:
        if item["id"] not in seen:
            unique.append(item)
            seen.add(item["id"])

    return unique