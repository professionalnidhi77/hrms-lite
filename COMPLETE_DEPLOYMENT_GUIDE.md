# Complete Deployment Guide: Render + Vercel

This guide will help you deploy and connect your HRMS Lite application completely.

---

## 📋 Quick Summary

| Component | Platform | URL |
|-----------|----------|-----|
| Backend API | Render | `https://hrms-lite-api.onrender.com` |
| Frontend Web | Vercel | `https://hrms-lite.vercel.app` |
| GitHub Repo | GitHub | `https://github.com/professionalnidhi77/hrms-lite` |

---

## ✅ Part 1: Verify GitHub Setup

Your code is already on GitHub. Let's verify:

```
Repository: https://github.com/professionalnidhi77/hrms-lite
Branch: main
Status: Ready for deployment
```

---

## 🚀 Part 2: Deploy Backend to Render

### Step 1: Go to Render Dashboard
1. Open: **https://dashboard.render.com**
2. Sign in with GitHub (if not already)

### Step 2: Create Web Service
1. Click: **"New +"** → **"Web Service"**
2. Select: **professionalnidhi77/hrms-lite** repository
3. Click: **"Connect"**

### Step 3: Configure Deployment
Fill in these settings:

```
Name:                   hrms-lite-api
Environment:            Python 3
Region:                 Singapore (or nearest to you)
Branch:                 main
Build Command:          pip install -r backend/requirements.txt
Start Command:          python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

### Step 4: Set Environment Variables
Click: **"Add Environment Variable"**

Add these variables:

```
CORS_ORIGINS = https://hrms-lite.vercel.app
DEBUG = false
ALLOW_CORS_ALL = false
DATABASE_URL = (leave empty for SQLite, or add PostgreSQL URL)
```

### Step 5: Deploy
1. Click: **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. When done, you'll see: ✅ **"Your service is live"**
4. Copy your backend URL: `https://hrms-lite-api.onrender.com`

### Step 6: Test Backend
Visit: `https://hrms-lite-api.onrender.com/`

You should see:
```json
{
  "message": "HRMS Lite API is running",
  "status": "ok",
  "version": "1.0.0"
}
```

✅ **Backend is deployed!**

---

## 🌐 Part 3: Deploy Frontend to Vercel

### Step 1: Go to Vercel Dashboard
1. Open: **https://vercel.com/dashboard**
2. Sign in with GitHub (if not already)

### Step 2: Import Project
1. Click: **"Add New"** → **"Project"**
2. Click: **"Import Git Repository"**
3. Search: `hrms-lite`
4. Select: `professionalnidhi77/hrms-lite`
5. Click: **"Import"**

### Step 3: Configure Build Settings
1. **Framework Preset:** Vite (should auto-detect)
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build` (auto-filled)
4. **Output Directory:** `dist` (auto-filled)

### Step 4: Set Environment Variables
Click: **"Environment Variables"**

Add:
```
VITE_API_URL = https://hrms-lite-api.onrender.com
```

**Important:** Use your actual Render backend URL from Step 2!

### Step 5: Deploy
1. Click: **"Deploy"**
2. Wait for build (1-2 minutes)
3. When done, you'll see: ✅ **"Congratulations! Your project has been successfully deployed"**
4. Copy your frontend URL: `https://hrms-lite.vercel.app`

### Step 6: Test Frontend
Visit: `https://hrms-lite.vercel.app/`

You should see the HRMS Lite application interface.

✅ **Frontend is deployed!**

---

## 🔗 Part 4: Connect Backend and Frontend

### Update Backend CORS Settings

The frontend and backend need to know about each other.

**On Render:**
1. Go to: **Render Dashboard** → **hrms-lite-api** → **Environment**
2. Find: `CORS_ORIGINS`
3. Update to: `https://hrms-lite.vercel.app`
4. Click: **"Save"**
5. Render will auto-redeploy

Wait for redeploy to complete (you'll see ✅ status).

### Verify Connection

1. Visit: `https://hrms-lite.vercel.app/`
2. Try to add a new employee
3. If it works → ✅ **Backend and Frontend are connected!**

---

## 🧪 Part 5: Comprehensive Testing

### Test Employee Management
1. Visit: `https://hrms-lite.vercel.app/`
2. **Add Employee:**
   - Employee ID: EMP001
   - Full Name: John Doe
   - Email: john@example.com
   - Department: Engineering
   - Click: **"Add Employee"**
3. **Verify:** Employee appears in the list

### Test Attendance Marking
1. Click: **"Mark Attendance"** for the employee
2. Select date and status (Present/Absent)
3. Click: **"Submit"**
4. **Verify:** Attendance is recorded

### Test API Directly
Visit: `https://hrms-lite-api.onrender.com/docs`

You should see interactive Swagger UI with all API endpoints.

---

## 📊 Monitor Deployments

### View Render Logs
1. Render Dashboard → **hrms-lite-api** → **Logs**
2. See real-time server logs

### View Vercel Logs
1. Vercel Dashboard → **hrms-lite** → **Deployments**
2. Click a deployment → **Logs**

---

## 🔄 Auto-Redeploy on Git Push

Both platforms watch your GitHub repository:

```powershell
# Make a change locally
git add .
git commit -m "feat: Add new feature"
git push

# Both Render and Vercel will automatically redeploy!
```

---

## 🐛 Troubleshooting

### Frontend shows but API not responding

**Fix:**
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify it matches your Render backend URL exactly
3. Redeploy Vercel

### 502 Bad Gateway on Frontend

**Fix:**
1. Check Render logs for errors
2. Verify `CORS_ORIGINS` includes Vercel URL
3. Manually redeploy on Render

### CORS Error when submitting form

**Fix:**
1. Go to Render → **hrms-lite-api** → **Environment**
2. Update `CORS_ORIGINS` to your Vercel URL
3. Save and redeploy

### Build fails on Vercel

**Fix:**
1. Check Vercel build logs
2. Verify `node_modules` isn't committed
3. Ensure `frontend/package.json` is correct

### Python module not found error on Render

**Fix:**
1. Check all packages in `backend/requirements.txt`
2. Verify build command: `pip install -r backend/requirements.txt`
3. Redeploy manually on Render

---

## ✨ Important URLs

Keep these bookmarked:

```
GitHub Repository:
https://github.com/professionalnidhi77/hrms-lite

Backend API (Render):
https://hrms-lite-api.onrender.com

Backend API Docs (Swagger):
https://hrms-lite-api.onrender.com/docs

Frontend App (Vercel):
https://hrms-lite.vercel.app

Render Dashboard:
https://dashboard.render.com

Vercel Dashboard:
https://vercel.com/dashboard
```

---

## 🎉 You're Done!

Your HRMS Lite application is now:
- ✅ Running on Render (Backend)
- ✅ Running on Vercel (Frontend)
- ✅ Connected and communicating
- ✅ Auto-deploying on Git push

Enjoy your live application!

---

## 📞 Need Help?

| Issue | Resources |
|-------|-----------|
| Render Issues | https://render.com/docs |
| Vercel Issues | https://vercel.com/docs |
| FastAPI Issues | https://fastapi.tiangolo.com/ |
| GitHub Issues | Create issue in repo |

---

**Last Updated:** February 21, 2026
**Version:** 1.0
