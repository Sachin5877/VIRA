from fastapi import FastAPI

from api.auth import router as auth_router
from database.database import SessionLocal
from database.init_db import initialize_database
from database.schema import create_tables
from api.uploads import router as upload_router
from fastapi.middleware.cors import CORSMiddleware
from api.files import router as files_router
from api.viewer import router as viewer_router
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
@app.get("/")
def home():
    return {
        "project": "VIRA",
        "status": "Running",
        "version": "1.0.0",
        "message": "Welcome to VIRA API"
    }