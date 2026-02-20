# Complete Vercel Deployment Guide - Step by Step

## ✅ What Was Fixed
1. ✓ `frontend/src/api.js` - Now uses `VITE_API_URL` environment variable
2. ✓ `frontend/src/App.jsx` - Fixed hardcoded localhost API check
3. ✓ `vercel.json` - Created proper Vercel configuration file

---

## 🚀 Step 1: Deploy Backend First (Render)

### 1.1 Create PostgreSQL Database
1. Go to https://dashboard.render.com
2. Click **"New+"** → **"PostgreSQL"**
3. Fill out:
   - **Name**: `hrms-lite-db`
   - **Database**: `hrmsdb`
   - **User**: `postgres`
4. Click **"Create Database"**
5. **SAVE** the "Internal Database URL" (you'll need it in Step 1.3)

### 1.2 Create Backend Web Service
1. Click **"New+"** → **"Web Service"**
2. Select your GitHub repository (`hrms-lite`)
3. Configure:
   - **Name**: `hrms-lite-api`
   - **Environment**: `Python 3.11`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`

### 1.3 Set Backend Environment Variables
Click **"Environment"** and add:
```
DATABASE_URL=<paste the Internal Database URL from Step 1.1>
CORS_ORIGINS=https://your-frontend-url.vercel.app
```
⚠️ **IMPORTANT**: Replace `your-frontend-url` with your actual Vercel URL (you'll get it in Step 2)

### 1.4 Deploy
Click **"Create Web Service"** and wait for deployment (2-5 minutes)

**SAVE YOUR BACKEND URL** - It will be something like:
```
https://hrms-lite-api.onrender.com
```

---

## 🌐 Step 2: Deploy Frontend (Vercel)

### 2.1 Connect GitHub Repository
1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Select your `hrms-lite` repository
4. Click **"Import"**

### 2.2 Configure Build Settings
- **Framework Preset**: `Other` (Vite will be auto-detected)
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.3 Set Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://hrms-lite-api.onrender.com` |

(Replace with your actual backend URL from Step 1.4)

### 2.4 Deploy
Click **"Deploy"** and wait (1-3 minutes)

**SAVE YOUR FRONTEND URL** - Vercel will provide it as:
```
https://your-project-name.vercel.app
```

---

## 🔗 Step 3: Update CORS in Backend

Your backend needs to know your frontend URL for CORS. 

Go back to **Render Dashboard** → Your Backend Service:
1. Click **"Settings"**
2. Find **"Environment"** section
3. Edit `CORS_ORIGINS` to your Vercel URL:
   ```
   https://your-project-name.vercel.app
   ```
4. Click **"Save"**
5. Go to **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Test Your Deployment

### Test Backend API
1. Open browser: `https://hrms-lite-api.onrender.com/docs`
2. You should see Swagger API documentation
3. Try creating an employee to test

### Test Frontend
1. Open your Vercel URL: `https://your-project-name.vercel.app`
2. Open browser console (**F12** → **Console tab**)
3. Should see: `✓ Connected` if backend is reachable
4. Try creating an employee

### Monitor for Errors
If something breaks:
1. **Frontend**: Check **F12 Console** for JavaScript errors
2. **Backend**: Check Render **Logs** tab for server errors
3. **Network**: Check **F12 Network tab** to see API requests

---

## 🔧 Troubleshooting

### Issue: "Failed to fetch" or CORS errors
**Solution**: 
- Make sure `CORS_ORIGINS` in backend includes your Vercel URL
- Make sure `VITE_API_URL` in Vercel env variables has your backend URL
- Redeploy both frontend and backend

### Issue: "Cannot reach backend"
**Solutions**:
1. Check backend is running: Visit `https://your-backend-url/docs`
2. Check CORS settings in `backend/main.py`
3. Check environment variables are set correctly
4. Redeploy backend after changing env vars

### Issue: Page shows but "Add Employee" button doesn't work
**Solution**:
- Check browser console (F12) for errors
- Verify `VITE_API_URL` is set in Vercel
- Make sure backend `CORS_ORIGINS` includes your frontend URL

---

## 📋 Quick Reference

### Environment Variables Needed

**Vercel (Frontend)**:
```
VITE_API_URL=https://hrms-lite-api.onrender.com
```

**Render (Backend)**:
```
DATABASE_URL=postgresql://...
CORS_ORIGINS=https://your-project-name.vercel.app
```

### Important URLs

| Service | URL Pattern |
|---------|------------|
| Frontend (Vercel) | `https://your-project-name.vercel.app` |
| Backend (Render) | `https://your-service-name.onrender.com` |
| Backend API Docs | `https://your-service-name.onrender.com/docs` |

---

## 🎯 Summary

After following these steps:
- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Render
- ✅ Database (PostgreSQL) on Render
- ✅ Auto-deployments on GitHub push
- ✅ Production-ready HRMS application

**Total time**: ~15 minutes first-time setup, then automatic on every git push!

