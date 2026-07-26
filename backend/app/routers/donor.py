from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.database import SessionLocal
from app import crud, schemas

router = APIRouter(prefix="/donors", tags=["Donors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.DonorResponse)
def create_donor(
    donor: schemas.DonorCreate,
    db: Session = Depends(get_db)
):
    return crud.create_donor(db, donor)


@router.get("/", response_model=list[schemas.DonorResponse])
def get_donors(db: Session = Depends(get_db)):
    return crud.get_all_donors(db)

@router.get("/search", response_model=list[schemas.DonorResponse])
def search_donors(
    blood_group: str = "",
    area: str = "",
    db: Session = Depends(get_db)
):
    return crud.search_donors(db, blood_group, area)


@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return crud.get_dashboard_stats(db)
@router.get("/{donor_id}", response_model=schemas.DonorResponse)
def get_donor(
    donor_id: int,
    db: Session = Depends(get_db)
):
    donor = crud.get_donor_by_id(db, donor_id)

    if donor is None:
        raise HTTPException(
            status_code=404,
            detail="Donor not found"
        )

    return donor

@router.put("/{donor_id}", response_model=schemas.DonorResponse)
def update_donor(
    donor_id: int,
    donor: schemas.DonorCreate,
    db: Session = Depends(get_db)
):

    updated = crud.update_donor(db, donor_id, donor)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Donor not found"
        )

    return updated

@router.delete("/{donor_id}")
def delete_donor(
    donor_id: int,
    db: Session = Depends(get_db)
):

    donor = crud.delete_donor(db, donor_id)

    if donor is None:
        raise HTTPException(
            status_code=404,
            detail="Donor not found"
        )

    return {
        "message": "Donor deleted successfully"
    }