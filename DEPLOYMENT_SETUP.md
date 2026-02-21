# HRMS Lite - Deployment Setup Guide

This guide will help you deploy the HRMS Lite application to **Render** (Backend) and **Vercel** (Frontend).

---

## Prerequisites

✅ GitHub repository connected: `https://github.com/professionalnidhi77/hrms-lite`
✅ All code committed and pushed to GitHub
✅ Render account: https://render.com
✅ Vercel account: https://vercel.com

---

## Part 1: Deploy Backend on Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account (recommended)
3. Authorize access to GitHub repositories

### Step 2: Create New Web Service for Backend
1. Click "New +" → "Web Service"
2. Select repository: `professionalnidhi77/hrms-lite`
3. Fill in the settings:

| Field | Value |
|-------|-------|
| **Name** | hrms-lite-api |
| **Environment** | Python 3 |
| **Region** | Singapore / Nearest to you |
| **Branch** | main |
| **Build Command** | `cd backend && pip install -r requirements.txt` |
| **Start Command** | `cd backend && uvicorn main:app --host 0.0.0.0` |

### Step 3: Set Environment Variables
1. Scroll down to "Environment Variables"
2. Add these variables:

```
DATABASE_URL = postgresql://user:password@localhost/hrms_db
CORS_ORIGINS = https://your-vercel-domain.vercel.app
ALLOW_CORS_ALL = false
DEBUG = false
```

**For Development (optional):**
```
DEBUG = true
ALLOW_CORS_ALL = true
```

### Step 4: Create PostgreSQL Database (Optional)
1. Click "New +" → "PostgreSQL"
2. Name: `hrms-lite-db`
3. Region: Same as API
4. Copy connection string from database panel
5. Paste as `DATABASE_URL` in web service

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Copy your backend URL: `https://hrms-lite-api.onrender.com`

✅ **Backend deployed!** Your API is now live at: `https://hrms-lite-api.onrender.com`

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub account (recommended)
3. Authorize GitHub repositories

### Step 2: Import GitHub Repository
1. Click "Add New..." → "Project"
2. Click "Import Git Repository"
3. Search and select: `professionalnidhi77/hrms-lite`
4. Click "Import"

### Step 3: Configure Build Settings
1. **Framework Preset:** Vite
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

### Step 4: Set Environment Variables
1. Go to "Environment Variables"
2. Add:

```
VITE_API_URL = https://hrms-lite-api.onrender.com
```

**Replace** with your actual Render backend URL

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build (1-2 minutes)
3. Copy your frontend URL: `https://hrms-lite.vercel.app`

✅ **Frontend deployed!** Your app is now live at: `https://hrms-lite.vercel.app`

---

## Part 3: Enable Automatic Deployments

### GitHub → Render (Auto-deploy)
✅ Already configured - Render watches your GitHub main branch

### GitHub → Vercel (Auto-deploy)
✅ Already configured - Vercel watches your GitHub main branch

**To test:** Push a new commit to GitHub
- Render will redeploy backend automatically
- Vercel will rebuild frontend automatically

---

## Part 4: Connect Backend and Frontend

### Update Backend CORS Settings (Render)
1. Go to Render Dashboard → hrms-lite-api → Settings
2. Update `CORS_ORIGINS`:
   ```
   https://hrms-lite.vercel.app
   ```
3. Redeploy the service

### Verify Connection
Visit: `https://hrms-lite.vercel.app`

If you see the HRMS application working:
- ✅ Frontend loaded successfully from Vercel
- ✅ Backend API responding from Render
- ✅ Database connected properly

---

## Troubleshooting

### Frontend shows but backend not responding
**Solution:**
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify `CORS_ORIGINS` includes your frontend URL on Render
3. Test API directly: `https://hrms-lite-api.onrender.com/`

### Backend deployment fails
**Solution:**
1. Check build logs in Render Dashboard
2. Verify `DATABASE_URL` is set correctly
3. Ensure Python version is 3.9+

### Database connection error
**Solution:**
1. Create PostgreSQL database on Render
2. Copy connection string exactly
3. Set as `DATABASE_URL` environment variable
4. Trigger redeploy

### Changes not reflecting after push
**Solution:**
1. Render redeploy: Check "Settings" → Click "Manual Deploy" → "Latest Commit"
2. Vercel redeploy: Check "Deployments" → Click "Redeploy"

---

## Monitoring and Logs

### View Render Logs
1. Render Dashboard → hrms-lite-api → Logs
2. Real-time server logs shown

### View Vercel Logs
1. Vercel Dashboard → Project → Deployments
2. Click deployment → Logs tab

---

## Important URLs

| Service | Purpose | URL |
|---------|---------|-----|
| GitHub Repo | Source Code | https://github.com/professionalnidhi77/hrms-lite |
| Backend API | REST API | https://hrms-lite-api.onrender.com |
| API Docs | Swagger UI | https://hrms-lite-api.onrender.com/docs |
| Frontend | Web App | https://hrms-lite.vercel.app |

---

## Next Steps

1. ✅ Commit this file: `git add . && git commit -m "Add deployment setup guide"`
2. ✅ Push to GitHub: `git push`
3. ✅ Follow Part 1 to deploy backend on Render
4. ✅ Follow Part 2 to deploy frontend on Vercel
5. ✅ Test the complete application: `https://hrms-lite.vercel.app`

---

## Support

For issues with:
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **Your Project**: Check GitHub issues or logs

**Happy deploying! 🚀**
