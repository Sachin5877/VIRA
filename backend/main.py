import os
from fastapi import FastAPI
from api import reports

from api.auth import router as auth_router
from database.database import SessionLocal
from database.init_db import initialize_database
from database.schema import create_tables
from api.uploads import router as upload_router
from fastapi.middleware.cors import CORSMiddleware
from api.files import router as files_router
from api.viewer import router as viewer_router
from api.investigate import router as investigate_router
from fastapi.responses import FileResponse
from services.pdf_service import generate_report
from services.ai_service import analyze_logs
from services.ioc_service import extract_iocs
from services.mitre_service import get_mitre_mapping
from services.timeline_service import get_timeline
from api.chat import router as chat_router
from api.dashboard import router as dashboard_router
from api.logs import router as logs_router
from api import investigation

app = FastAPI(
    title="VIRA API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    create_tables()

    db = SessionLocal()
    initialize_database(db)
    db.close()


app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(files_router)
app.include_router(viewer_router)
app.include_router(investigate_router)
app.include_router(chat_router)
app.include_router(dashboard_router)
app.include_router(reports.router)
app.include_router(logs_router)
app.include_router(investigation.router)
@app.get("/")
def home():
    return {
        "project": "VIRA",
        "status": "Running",
        "version": "1.0.0",
        "message": "Welcome to VIRA API"
    }
@app.post("/report/{filename}")
def create_report(filename: str):

    path = os.path.join("uploads", filename)

    with open(path, "r", encoding="utf-8") as f:
        logs = f.read()

    analysis = analyze_logs(logs)

    pdf = generate_report(filename, analysis)

    return FileResponse(
        pdf,
        media_type="application/pdf",
        filename=os.path.basename(pdf),
    )
@app.get("/ioc/{filename}")
def get_iocs(filename: str):

    path = os.path.join("uploads", filename)

    with open(path, "r", encoding="utf-8") as f:
        logs = f.read()

    return extract_iocs(logs)
@app.get("/mitre/{filename}")
def mitre(filename: str):
    return get_mitre_mapping(filename)
@app.get("/timeline/{filename}")
def timeline(filename: str):
    return get_timeline(filename)