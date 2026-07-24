from fastapi import APIRouter
from pydantic import BaseModel

from services.chat_service import ask_vira

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(data: ChatRequest):
    answer = ask_vira(data.question)

    return {
        "answer": answer
    }