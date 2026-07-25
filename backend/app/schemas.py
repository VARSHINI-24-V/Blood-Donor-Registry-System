from datetime import date
from enum import Enum

from pydantic import BaseModel


class BloodGroup(str, Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS = "O+"
    O_NEG = "O-"


class Gender(str, Enum):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"


class DonorCreate(BaseModel):
    name: str
    phone: str
    blood_group: BloodGroup
    area: str
    gender: Gender
    dob: date


class DonorResponse(DonorCreate):
    id: int

    class Config:
        from_attributes = True

class DonationCreate(BaseModel):
    donor_id: int
    donation_date: date
    remarks: str


class DonationResponse(DonationCreate):
    id: int

    class Config:
        from_attributes = True

class EligibilityResponse(BaseModel):
    donor_id: int
    last_donation: date | None
    days_since_last_donation: int | None
    eligible: bool