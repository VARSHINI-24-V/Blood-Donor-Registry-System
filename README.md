# 🩸 Blood Donor Registry System

## 📖 Project Description

The Blood Donor Registry System is a full-stack web application developed to manage blood donors efficiently.

The system allows users to:

- Register new blood donors
- View all registered donors
- Search donors by blood group and area
- Update donor information
- Delete donor records
- Record blood donations
- View donation history
- Check donor eligibility based on the last donation date (90-day rule)
- View dashboard statistics

This project is built using React for the frontend and FastAPI for the backend with MySQL as the database.

---

## 🚀 Technology Stack

### Frontend

- React.js
- Bootstrap 5
- React Router DOM
- Axios
- React Icons

### Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database

- MySQL

---

## 📂 Project Structure

```
Blood Donor Registry

Frontend
│
├── React
├── Bootstrap
├── Axios

Backend
│
├── FastAPI
├── SQLAlchemy
├── MySQL
```

---

## ⚙️ Installation & Execution Steps

### Clone Repository

```bash
git clone <repository-link>
```

---

### Backend Setup

Navigate to backend folder

```bash
cd backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

Start FastAPI server

```bash
uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

### Frontend Setup

Navigate to frontend folder

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run React application

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## ✨ Features

- Dashboard
- Add Donor
- Edit Donor
- Delete Donor
- Search Donor
- Donation History
- Eligibility Checker
- Responsive Bootstrap UI

---

## 👨‍💻 Author

**Varshini V**
