import ollama

def analyze_logs(log_text):
    prompt = f"""
You are a SOC Security Analyst.

Analyze the following security logs and return:

1. Threat Summary
2. Risk Score (Low / Medium / High)
3. MITRE ATT&CK Techniques
4. Recommended Actions

Security Logs:

{log_text}
"""

    response = ollama.chat(
        model="llama3.1:8b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]