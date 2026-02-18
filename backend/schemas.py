# schemas.py - Fixed version with response models
from typing import Annotated, Literal
from pydantic import BaseModel, EmailStr, Field
from datetime import date as DateType

class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    department: str = Field(..., min_length=1, max_length=50)

class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str

    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    date: DateType = Field(..., description="Attendance date")
    status: Literal["Present", "Absent", "Leave"]

class AttendanceResponse(BaseModel):
    id: int
    date: DateType
    status: str
    employee_id: int

    class Config:
        from_attributes = True