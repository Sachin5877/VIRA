from fastapi import APIRouter
from services.investigation_service import investigate

router = APIRouter()


@router.get("/investigation/{filename}")
def investigation(filename: str):

    return investigate(filename)