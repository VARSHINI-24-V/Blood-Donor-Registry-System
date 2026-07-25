from fastapi import FastAPI

from app.routers import donor, donation
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blood Donor Registry API"
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

app.include_router(donor.router)
app.include_router(donation.router)

@app.get("/")
def home():
    return {
        "message": "Blood Donor Registry API Running 🚀"
    }