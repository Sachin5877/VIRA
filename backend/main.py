from fastapi import FastAPI
from database.schema import create_tables

app = FastAPI(title="VIRA API")

@app.on_event("startup")
def startup():
    create_tables()

@app.get("/")
def home():
    return {
        "message": "Welcome to VIRA API"
    }