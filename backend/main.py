from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models
import schemas
from datetime import datetime
import os
from dotenv import load_dotenv
import crud

# Load environment variables
load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HRMS Lite API",
    version="1.0.0",
    description="A lightweight Human Resource Management System API"
)

# Configure CORS based on environment
cors_origins_env = os.getenv("CORS_ORIGINS", "")

if cors_origins_env:
    # Production: use specific origins
    cors_origins = [origin.strip() for origin in cors_origins_env.split(",")]
else:
    # Development: allow localhost and common dev URLs
    cors_origins = [
        "http://localhost:5173",      # Vite dev server
        "http://localhost:3000",      # Alternative React dev
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "https://localhost:5173",
    ]

# For production deployment, also allow any HTTPS origin (Vercel/Netlify/etc)
# This is safe if your API only allows authenticated requests
if os.getenv("ALLOW_CORS_ALL") == "true":
    cors_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "HRMS Lite API is running",
        "status": "ok",
        "version": "1.0.0"
    }

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ============ EMPLOYEE ENDPOINTS ============

@app.post("/employees")
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    """Create a new employee"""
    try:
        existing = db.query(models.Employee).filter(
            (models.Employee.employee_id == emp.employee_id) |
            (models.Employee.email == emp.email)
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Employee with this ID or email already exists"
            )

        new_emp = models.Employee(
            employee_id=emp.employee_id,
            full_name=emp.full_name,
            email=emp.email,
            department=emp.department
        )
        
        db.add(new_emp)
        db.commit()
        db.refresh(new_emp)
        
        return {
            "message": "Employee created successfully",
            "data": {
                "id": new_emp.id,
                "employee_id": new_emp.employee_id,
                "full_name": new_emp.full_name,
                "email": new_emp.email,
                "department": new_emp.department
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {e}")

@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    """Get all employees"""
    try:
        employees = db.query(models.Employee).all()
        return [
            {
                "id": emp.id,
                "employee_id": emp.employee_id,
                "full_name": emp.full_name,
                "email": emp.email,
                "department": emp.department
            }
            for emp in employees
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {e}")

@app.get("/employees/{emp_id}")
def get_employee(emp_id: int, db: Session = Depends(get_db)):
    """Get a specific employee by ID"""
    emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return {
        "id": emp.id,
        "employee_id": emp.employee_id,
        "full_name": emp.full_name,
        "email": emp.email,
        "department": emp.department
    }

@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    """Delete an employee"""
    emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(emp)
    db.commit()
    
    return {"message": "Employee deleted successfully"}

# ============ ATTENDANCE ENDPOINTS ============

@app.post("/employees/{emp_id}/attendance")
def mark_attendance(emp_id: int, att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    """Mark attendance for an employee"""
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    existing = db.query(models.Attendance).filter(
        (models.Attendance.employee_id == emp_id) &
        (models.Attendance.date == att.date)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )

    attendance = models.Attendance(
        date=att.date,
        status=att.status,
        employee_id=emp_id
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    
    return {
        "message": "Attendance marked successfully",
        "data": {
            "id": attendance.id,
            "date": str(attendance.date),
            "status": attendance.status,
            "employee_id": attendance.employee_id
        }
    }

@app.get("/employees/{emp_id}/attendance")
def get_attendance(emp_id: int, db: Session = Depends(get_db)):
    """Get attendance records for an employee"""
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == emp_id
    ).order_by(models.Attendance.date.desc()).all()

    return [
        {
            "id": record.id,
            "date": str(record.date),
            "status": record.status
        }
        for record in records
    ]

@app.get("/employees/{emp_id}/attendance/summary")
def get_attendance_summary(emp_id: int, db: Session = Depends(get_db)):
    """Get attendance summary for an employee"""
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == emp_id
    ).all()

    total_present = sum(1 for r in records if r.status == "Present")
    total_absent = sum(1 for r in records if r.status == "Absent")
    
    return {
        "employee_id": employee.employee_id,
        "full_name": employee.full_name,
        "total_records": len(records),
        "total_present": total_present,
        "total_absent": total_absent
    }