# 🩸 Blood Donor Registry System

## 📖 Project Description

The Blood Donor Registry System is a full-stack web application that helps hospitals efficiently manage blood donor information. It enables staff to register donors, search donors based on blood group and area, maintain donation history, and determine donor eligibility based on the 90-day donation rule.

---

# 🚀 Technology Stack

## Frontend

- React.js
- Bootstrap 5
- Axios
- React Router DOM
- React Icons

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

## Database

- MySQL

---

# 📂 Project Structure

```
Blood-Donor-Registry-System
│
├── frontend
├── backend
├── database
│   ├── ER_Diagram.png
│   └── Database_Design.md
├── README.md
```

---

# ✨ Features

- Dashboard
- Add Donor
- Edit Donor
- Delete Donor
- Search Donors
- Filter by Blood Group
- Filter by Area
- Donation History
- Eligibility Checker
- Responsive Bootstrap UI

---

# 🗄 Database Fields

## Donor Table

| Field | Description |
|--------|-------------|
| id | Unique Donor ID |
| name | Donor Name |
| phone | Contact Number |
| blood_group | Blood Group |
| area | Residential Area |
| gender | Gender |
| dob | Date of Birth |

---

## Donation Table

| Field | Description |
|--------|-------------|
| id | Donation Record ID |
| donor_id | References Donor Table |
| donation_date | Date of Blood Donation |
| remarks | Additional Notes |

---

# 📊 Derived Figure Calculation

The donor eligibility is calculated on the server.

```
Days Since Last Donation =
Current Date − Last Donation Date
```

If the number of days is **90 or more**, the donor is **Eligible**.

Otherwise, the donor is **Not Eligible**.

This calculation is performed in the FastAPI backend and returned to the frontend.

---

# ⚙ Installation & Execution

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run application

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🔗 API Endpoints

## Donors

- POST /donors
- GET /donors
- GET /donors/{id}
- PUT /donors/{id}
- DELETE /donors/{id}
- GET /donors/search
- GET /donors/dashboard

## Donations

- POST /donations
- GET /donations/{donor_id}
- GET /donations/{donor_id}/eligibility

---

# 🖼 ER Diagram

The ER Diagram and database design are available in the `database/` folder.

---

# 👩‍💻 Author

**Varshini V**

B.Tech Artificial Intelligence and Data Science

Prince Dr. K. Vasudevan College of Engineering and Technology