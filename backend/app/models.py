from sqlalchemy import Column, Integer, String, Date, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Donor(Base):
    __tablename__ = "donor"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(10), unique=True, nullable=False)
    blood_group = Column(
        Enum('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
        nullable=False
    )
    area = Column(String(100), nullable=False)
    gender = Column(
        Enum('Male', 'Female', 'Other'),
        nullable=False
    )
    dob = Column(Date)

    donation_history = relationship(
        "DonationHistory",
        back_populates="donor",
        cascade="all, delete"
    )


class DonationHistory(Base):
    __tablename__ = "donation_history"

    id = Column(Integer, primary_key=True, index=True)
    donor_id = Column(Integer, ForeignKey("donor.id"))
    donation_date = Column(Date, nullable=False)
    remarks = Column(String(255))

    donor = relationship(
        "Donor",
        back_populates="donation_history"
    )