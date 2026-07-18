from fastapi import APIRouter

router = APIRouter()

@router.post("/investigate")
async def investigate():
    return {
        "summary": "Multiple suspicious events detected.",
        "risk": "High",
        "mitre": [
            "T1110 - Brute Force",
            "T1059 - Command and Scripting Interpreter"
        ],
        "recommendation": [
            "Block suspicious IP",
            "Reset affected credentials",
            "Review endpoint activity"
        ]
    }