from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas

router = APIRouter(prefix="/donations", tags=["Donations"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.DonationResponse)
def create_donation(
    donation: schemas.DonationCreate,
    db: Session = Depends(get_db)
):
    return crud.create_donation(db, donation)

@router.get("/{donor_id}", response_model=list[schemas.DonationResponse])
def get_donation_history(
    donor_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_donation_history(db, donor_id)

@router.get("/{donor_id}/eligibility",
            response_model=schemas.EligibilityResponse)
def check_eligibility(
    donor_id: int,
    db: Session = Depends(get_db)
):
    return crud.check_eligibility(db, donor_id)