Set-Location "c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite\backend"
& "c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite\.venv\Scripts\Activate.ps1"
python -m uvicorn main:app --reload --host 0.0.0.0
