# HRMS Lite - Human Resource Management System

A lightweight, production-ready Human Resource Management System built with modern web technologies. This application enables administrators to efficiently manage employee records and track daily attendance.

## 🎯 Overview

HRMS Lite is a web-based application designed for basic HR operations. It provides a clean, professional interface for managing employee information and attendance tracking without the complexity of enterprise HR systems.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript UI library
- **Axios** - Promise-based HTTP client
- **Vite** - Next-generation build tool
- **CSS3** - Responsive styling with flexbox and grid

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy 2.0** - Powerful ORM for database management
- **Pydantic** - Data validation using Python type hints
- **Python-dotenv** - Environment variable management

### Database
- **SQLite** - Lightweight database for development
- **PostgreSQL** - Recommended for production

## ✨ Features

### Core Features
✅ **Employee Management**
- Add new employees with full details (ID, Name, Email, Department)
- View comprehensive employee list with searchable records
- Delete employees from the system
- Automatic duplicate prevention

✅ **Attendance Management**
- Mark daily attendance (Present/Absent/Leave)
- View historical attendance records per employee
- Real-time attendance summary (Present/Absent counts)
- Date-based record sorting

✅ **Dashboard & Analytics**
- Overview of total employees
- Department-wise employee distribution
- Quick access statistics

### UI/UX Features
✅ Professional, responsive design
✅ Intuitive navigation with tabs
✅ Real-time search functionality
✅ Loading states for async operations
✅ Empty state handling
✅ Meaningful error messages
✅ Success notifications
✅ Mobile-friendly responsive layout

## 📋 API Endpoints

### Employee Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/employees` | Create new employee |
| GET | `/employees` | Get all employees |
| GET | `/employees/{emp_id}` | Get specific employee |
| DELETE | `/employees/{emp_id}` | Delete employee |

### Attendance Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/employees/{emp_id}/attendance` | Mark attendance |
| GET | `/employees/{emp_id}/attendance` | Get attendance records |
| GET | `/employees/{emp_id}/attendance/summary` | Get attendance summary |

## 🚀 Getting Started

### Prerequisites
- Python 3.8+ with pip
- Node.js 14+ with npm
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create and activate virtual environment:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create environment file:**
Create `.env` file in backend directory:
```
DATABASE_URL=sqlite:///./hrms.db
```

5. **Run the server:**
```bash
uvicorn main:app --reload
```

Backend will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
hrms-lite/
├── backend/
│   ├── main.py                 # FastAPI application & routes
│   ├── database.py             # Database configuration
│   ├── models.py               # SQLAlchemy ORM models
│   ├── schemas.py              # Pydantic validation schemas
│   ├── crud.py                 # CRUD operations (organized)
│   ├── requirements.txt         # Python dependencies
│   ├── .env                    # Environment variables
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx           # Dashboard & statistics
    │   │   ├── EmployeeForm.jsx        # Add employee form
    │   │   ├── EmployeeList.jsx        # Employee listing
    │   │   ├── AttendanceForm.jsx      # Mark attendance
    │   │   └── AttendanceList.jsx      # View records
    │   ├── App.jsx                     # Main application
    │   ├── App.css                     # Global styles
    │   ├── api.js                      # Axios configuration
    │   ├── main.jsx                    # Entry point
    │   └── index.css                   # Base styles
    │
    ├── index.html                      # HTML template
    ├── package.json                    # Node dependencies
    ├── vite.config.js                  # Vite configuration
    └── .gitignore
```

## 🔒 Validation & Error Handling

### Backend Validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Unique constraint enforcement
- ✅ Attendance duplicate prevention
- ✅ Proper HTTP status codes (400, 404, 500)
- ✅ Meaningful error messages

### Frontend Validation
- ✅ Form input validation
- ✅ Real-time error display
- ✅ User-friendly error messages
- ✅ Loading state management
- ✅ Success/failure notifications

## 🧪 Example API Calls

### Create Employee
```bash
curl -X POST http://localhost:8000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john@example.com",
    "department": "IT"
  }'
```

### Mark Attendance
```bash
curl -X POST http://localhost:8000/employees/1/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-02-18",
    "status": "Present"
  }'
```

### Get Attendance Summary
```bash
curl -X GET http://localhost:8000/employees/1/attendance/summary
```

## 📊 Database Schema

### Employees Table
- `id` - Primary key
- `employee_id` - Unique identifier (required)
- `full_name` - Employee name (required)
- `email` - Email address (required, unique)
- `department` - Department name (required)
- `created_at` - Timestamp

### Attendance Table
- `id` - Primary key
- `date` - Attendance date (required)
- `status` - Present/Absent/Leave (required)
- `employee_id` - Foreign key to Employee
- `created_at` - Timestamp

## 📱 Responsive Design

- ✅ Desktop (1200px and above)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (below 768px)
- ✅ Touch-optimized buttons and inputs
- ✅ Flexible grid layouts

## 🚢 Production Deployment

### Environment Variables (Production)
```
DATABASE_URL=postgresql://user:password@host:5432/hrms_lite
CORS_ORIGINS=https://yourdomain.com
```

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Configure build command: `npm run build`
4. Production URL will be automatically assigned

### Backend Deployment (Render/Railway)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables in dashboard
4. Automatic deployment on push

## 🐛 Troubleshooting

### Backend Issues
```bash
# Clear database and restart
rm hrms.db
uvicorn main:app --reload

# Check dependencies
pip list

# Verify database URL
echo $DATABASE_URL  # Linux/macOS
echo %DATABASE_URL%  # Windows
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev

# Check API connection
curl http://localhost:8000/
```

## 📝 Assumptions & Limitations

### Assumptions
- Single admin user (no multi-user authentication)
- Attendance is marked per day (one record per employee per date)
- Departments are predefined strings
- SQLite used for development, PostgreSQL for production
- All communications are over HTTP/HTTPS

### Limitations (Out of Scope)
- User authentication and authorization
- Advanced leave management
- Payroll calculations
- Performance reviews
- Email notifications
- Multi-language support
- Advanced reporting and analytics
- Audit logging

## 🎯 Feature Highlights

### Dashboard
- Quick overview of total employee count
- Department-wise distribution visualization
- Real-time statistics

### Smart Search
- Search employees by name, ID, or email
- Instant filtering of results
- Case-insensitive matching

### Attendance Tracking
- Mark attendance with date and status
- Prevent duplicate entries
- View complete attendance history
- Summary statistics (Present/Absent counts)

### Professional UI
- Gradient headers and cards
- Smooth transitions and animations
- Color-coded status badges
- Consistent spacing and typography

## 📚 Learning Resources

### Built with
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- SQLAlchemy: https://www.sqlalchemy.org/
- Vite: https://vitejs.dev/

## 📄 License

This project is open source and available under the MIT License.

---

**Version:** 1.0.0  
**Last Updated:** February 18, 2026  
**Status:** Production Ready ✅
