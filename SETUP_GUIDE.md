# HRMS-Lite Setup Guide

## Prerequisites
- Python 3.13+
- PostgreSQL 12+
- Node.js 16+

## Backend Setup

### 1. Update Environment Variables
Edit `.env` file in the `backend/` folder:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/hrmsdb
```
Replace `YOUR_PASSWORD` with your PostgreSQL password.

### 2. Install Python Dependencies
```powershell
cd backend
pip install -r requirements.txt
```

### 3. Create Database Tables
The tables will be created automatically when the FastAPI app starts:
```powershell
cd backend
python -m uvicorn main:app --reload
```

This will:
- Connect to PostgreSQL
- Create the `employees` table
- Create the `attendance` table

### 4. Test Backend API
Once the server is running on `http://127.0.0.1:8000`:
- Open `http://127.0.0.1:8000/docs` for Swagger UI
- Or use curl/Postman to test endpoints

## Available API Endpoints

### Employee Endpoints
- `POST /employees` - Create employee
- `GET /employees` - Get all employees
- `GET /employees/{emp_id}` - Get specific employee
- `DELETE /employees/{emp_id}` - Delete employee

### Attendance Endpoints
- `POST /employees/{emp_id}/attendance` - Mark attendance
- `GET /employees/{emp_id}/attendance` - Get attendance records
- `GET /employees/{emp_id}/attendance/summary` - Get attendance summary

## Frontend Setup

### 1. Install Dependencies
```powershell
cd frontend
npm install
```

### 2. Configure API URL
Create a `.env` file:
```
VITE_API_URL=http://127.0.0.1:8000
```

### 3. Start Development Server
```powershell
npm run dev
```

## Database Verification

### In pgAdmin 4:
1. Connect to Local PostgreSQL
2. Expand `hrmsdb` database
3. Check `Schemas > Public > Tables`
4. Verify `employees` and `attendance` tables exist

### Using SQL:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

## Testing Workflow

1. Start Backend: `python -m uvicorn main:app --reload`
2. Start Frontend: `npm run dev`
3. Access Frontend: `http://localhost:5173`
4. API Docs: `http://localhost:8000/docs`

## Troubleshooting

### "Could not connect to PostgreSQL"
- Check PostgreSQL is running: `pg_isready`
- Verify password in .env is correct
- Ensure `hrmsdb` database exists in pgAdmin

### "Module not found" errors
- Activate venv: `.venv\Scripts\Activate.ps1`
- Reinstall: `pip install -r requirements.txt`

### Port already in use
- Change port: `python -m uvicorn main:app --port 8001`
