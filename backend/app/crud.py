from sqlalchemy.orm import Session
from datetime import date
from app import models, schemas
from app import models
def get_dashboard_stats(db: Session):

    total_donors = db.query(models.Donor).count()

    total_donations = db.query(models.DonationHistory).count()

    return {
        "total_donors": total_donors,
        "total_donations": total_donations
    }
def create_donor(db: Session, donor: schemas.DonorCreate):

    db_donor = models.Donor(
        name=donor.name,
        phone=donor.phone,
        blood_group=donor.blood_group.value,
        area=donor.area,
        gender=donor.gender.value,
        dob=donor.dob
    )

    db.add(db_donor)

    db.commit()

    db.refresh(db_donor)

    return db_donor


def get_all_donors(db: Session):

    return db.query(models.Donor).all()

def search_donors(db: Session, blood_group: str, area: str):
    return db.query(models.Donor).filter(
        models.Donor.blood_group == blood_group,
        models.Donor.area == area
    ).all()

def create_donation(
    db: Session,
    donation: schemas.DonationCreate
):

    db_donation = models.DonationHistory(
        donor_id=donation.donor_id,
        donation_date=donation.donation_date,
        remarks=donation.remarks
    )

    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)

    return db_donation
def get_donation_history(
    db: Session,
    donor_id: int
):

    return (
        db.query(models.DonationHistory)
        .filter(models.DonationHistory.donor_id == donor_id)
        .all()
    )

def check_eligibility(db: Session, donor_id: int):

    latest = (
        db.query(models.DonationHistory)
        .filter(models.DonationHistory.donor_id == donor_id)
        .order_by(models.DonationHistory.donation_date.desc())
        .first()
    )

    if latest is None:
        return {
            "donor_id": donor_id,
            "last_donation": None,
            "days_since_last_donation": None,
            "eligible": True
        }

    days = (date.today() - latest.donation_date).days

    return {
        "donor_id": donor_id,
        "last_donation": latest.donation_date,
        "days_since_last_donation": days,
        "eligible": days >= 90
    }

def update_donor(
    db: Session,
    donor_id: int,
    donor: schemas.DonorCreate
):

    db_donor = (
        db.query(models.Donor)
        .filter(models.Donor.id == donor_id)
        .first()
    )

    if db_donor is None:
        return None

    db_donor.name = donor.name
    db_donor.phone = donor.phone
    db_donor.blood_group = donor.blood_group.value
    db_donor.area = donor.area
    db_donor.gender = donor.gender.value
    db_donor.dob = donor.dob

    db.commit()
    db.refresh(db_donor)

    return db_donor

def delete_donor(db: Session, donor_id: int):

    donor = (
        db.query(models.Donor)
        .filter(models.Donor.id == donor_id)
        .first()
    )

    if donor is None:
        return None

    db.delete(donor)

    db.commit()

    return donor

def get_donor_by_id(db: Session, donor_id: int):
    return db.query(models.Donor).filter(models.Donor.id == donor_id).first()