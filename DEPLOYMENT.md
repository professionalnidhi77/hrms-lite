# HRMS-Lite Deployment Guide

Complete guide to deploy your HRMS-Lite application to production.

## 📋 Prerequisites

Before deploying, ensure:
- ✅ Code pushed to GitHub repository
- ✅ All dependencies in `requirements.txt` and `package.json`
- ✅ Environment variables configured
- ✅ GitHub account
- ✅ Payment method on hosting platforms (some offer free tier)

---

## 🎯 Part 1: Setup GitHub Repository

### Step 1: Initialize Git Repository
```bash
cd c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite
git init
git add .
git commit -m "Initial commit: HRMS-Lite project"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create a repository named `hrms-lite`
3. Don't add README (you already have one)
4. Click "Create repository"

### Step 3: Push Code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/hrms-lite.git
git branch -M main
git push -u origin main
```

---

## 🚀 Part 2: Deploy Frontend (React + Vite)

### Using Vercel (Recommended - Easiest)

#### Step 1: Connect Repository
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New..." → "Project"
4. Select your `hrms-lite` repository
5. Click "Import"

#### Step 2: Configure Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Click "Deploy"

#### Step 3: Set Environment Variables
1. Go to Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. Redeploy from Deployments tab

#### Result
- Frontend URL will be: `https://hrms-lite.vercel.app` (auto-assigned)
- Automatic deployments on every push to `main` branch

---

### Alternative: Using Netlify

#### Step 1: Connect Repository
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub → Select `hrms-lite` → "Deploy site"

#### Step 2: Configure Build Settings
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

#### Step 3: Set Environment Variables
1. Go to Site settings → Build & deploy → Environment
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. Trigger new deploy

---

## 🔧 Part 3: Deploy Backend (FastAPI)

### Using Render (Recommended)

#### Step 1: Create PostgreSQL Database
1. Go to https://dashboard.render.com
2. Click "New+" → "PostgreSQL"
3. Fill in:
   - **Name**: `hrms-lite-db`
   - **Database**: `hrmsdb`
   - **User**: `postgres`
4. Click "Create Database"
5. Save the `Internal Database URL` (you'll need it)

#### Step 2: Create Web Service
1. Click "New+" → "Web Service"
2. Select your GitHub repository (`hrms-lite`)
3. Configure:
   - **Name**: `hrms-lite-api`
   - **Environment**: `Python 3.11`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - **Root Directory**: `backend`

#### Step 3: Set Environment Variables
Click "Environment" and add:
```
DATABASE_URL=postgresql://user:password@host:5432/hrmsdb
CORS_ORIGINS=https://your-frontend-url.vercel.app
```

#### Step 4: Deploy
Click "Create Web Service" and wait for deployment to complete.

---

### Alternative: Using Railway

#### Step 1: Create Database Service
1. Go to https://railway.app
2. Create account with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Accept defaults and wait for creation

#### Step 2: Create Backend Service
1. Click "New" → "GitHub Repo"
2. Select your `hrms-lite` repository
3. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`

#### Step 3: Set Environment Variables
In Railway dashboard, add:
```
DATABASE_URL=postgresql://postgres:PASSWORD@HOST:5432/DBNAME
CORS_ORIGINS=https://your-frontend-url.netlify.app
```

---

## 📡 Part 4: Update Frontend API Configuration

After deploying backend, update your frontend:

#### Edit `frontend/src/api.js`
```javascript
import axios from 'axios';

// Use deployed backend URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

#### Update Backend `cors` Configuration
In `backend/main.py`, update CORS settings:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Development
        "https://your-frontend-url.com",  # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ✅ Testing Your Deployment

### After Frontend Deployment
1. Visit your frontend URL
2. Check browser console (F12) for any errors
3. Verify API calls are reaching backend

### After Backend Deployment
1. Visit `https://your-backend-url/docs`
2. Test endpoints using Swagger UI
3. Check database connectivity

### Test Full Integration
1. Create an employee on frontend
2. Check if it appears in backend database
3. Mark attendance and verify it saves

---

## 🔒 Security Checklist

- [ ] Remove `.env` files from Git (use `.gitignore`)
- [ ] Set `CORS_ORIGINS` to only your frontend domain
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS (automatic on Vercel/Netlify/Render)
- [ ] Set strong database passwords
- [ ] Review database user permissions

---

## 🐛 Troubleshooting

### Frontend Shows "Failed to fetch"
- Check backend URL in `VITE_API_URL`
- Verify backend is running
- Check browser console for CORS errors
- Ensure CORS_ORIGINS includes frontend URL

### Backend Login Says "Could not connect to database"
- Verify DATABASE_URL format
- Check PostgreSQL is running
- Ensure database exists
- Test connection string locally

### Domain/SSL Issues
- Vercel/Netlify/Render provide free SSL
- Wait 15-30 minutes for DNS propagation
- Check domain settings in hosting dashboard

---

## 📊 Monitoring

### Vercel/Netlify
- Go to Analytics tab
- Monitor builds, deployments, and errors

### Render/Railway
- Go to Logs section
- Check for application errors and database issues

---

## 💰 Cost Estimate

| Service | Free Tier | Production |
|---------|-----------|-----------|
| Vercel (Frontend) | ✅ Unlimited | ✅ Included |
| Netlify (Frontend) | ✅ Unlimited | ✅ Included |
| Render (Backend) | ✅ Limited | ~$7/month |
| Railway (Backend) | ✅ $5/month | ~$15/month |

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:
1. Push to `main` branch
2. Automatic tests run (if configured)
3. Auto-deployment to production
4. No manual steps needed!

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/

---

**Last Updated**: February 19, 2026
**Status**: Ready for production deployment
