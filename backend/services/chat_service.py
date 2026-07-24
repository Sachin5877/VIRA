import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.1:8b"


def ask_vira(question):
    prompt = f"""
You are VIRA (Virtual Incident Response Assistant).

You are a cybersecurity SOC analyst.

Answer briefly and professionally.

User Question:
{question}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False,
        },
        timeout=120,
    )

    response.raise_for_status()

    return response.json()["response"]