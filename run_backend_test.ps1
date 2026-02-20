# Activate venv and run backend
& "c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite\.venv\Scripts\Activate.ps1"
cd "c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite\backend"
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
