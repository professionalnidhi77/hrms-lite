# HRMS Lite — Render + Vercel Deployment Guide

## Quick Summary
- **Backend:** Render (Python FastAPI + PostgreSQL)  
- **Frontend:** Vercel (React + Vite)
- **Steps:** ~10 minutes total

---

## Step 1: Deploy Backend to Render

### 1a. Create Render Account & Connect GitHub
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended for auto-deploy)
3. Connect your GitHub repo with the HRMS code

### 1b. Create Render Service from render.yaml

Option A: **Automatic (recommended)**
- Push code to GitHub
- Render will detect `render.yaml` and auto-create service
- Click "Create Web Service" and let it build

Option B: **Manual**
1. Click **New +** → **Web Service**
2. Connect your GitHub repo
3. Fill in:
   - **Name:** `hrms-lite-api`
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 8000`
4. Click **Advanced** and add environment variables:
   - `CORS_ORIGINS` = `https://YOUR_VERCEL_DOMAIN.vercel.app` (set this after Vercel deploy)
   - `ALLOW_CORS_ALL` = `false`
   - `DEBUG` = `false`
5. Click **Create Web Service**

### 1c. Create PostgreSQL Database (if using paid Render)
For **free tier**, Render provides inline SQLite—no extra DB needed.
For **paid tier PostgreSQL**:
1. Click **New +** → **PostgreSQL**
2. Name: `hrms-postgres`
3. Click **Create Database**
4. Copy the connection string → paste into **Environment** → `DATABASE_URL`

**For free tier SQLite (default):**
- Set `DATABASE_URL` to empty or omit it
- Database will auto-initialize at `sqlite:///./test.db`

### 1d. Wait for Build & Get Backend URL
- Render builds automatically
- Once live, you'll see: `https://hrms-lite-api.onrender.com` (or similar)
- **Copy this URL** — you'll need it for Vercel

---

## Step 2: Deploy Frontend to Vercel

### 2a. Sign Up on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### 2b. Import Project
1. Click **Add New** → **Project**
2. Select your GitHub repo
3. Fill in:
   - **Project Name:** `hrms-lite` (or your choice)
   - **Framework:** `Vite`
   - **Root Directory:** `./frontend`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)

### 2c. Add Environment Variables
Before clicking **Deploy**, add:
- **Key:** `VITE_API_URL`  
- **Value:** `https://hrms-lite-api.onrender.com` (or your Render backend URL)

Click **Add** → then **Deploy**

### 2d. Wait for Build
- Vercel builds and deploys automatically
- You'll get a URL like: `https://hrms-lite.vercel.app`
- **Copy this URL**

---

## Step 3: Update Backend CORS (if not using Vercel subdomain)

Once you have your **Vercel frontend URL**:

1. Go back to **Render dashboard** → **hrms-lite-api** → **Environment**
2. Update `CORS_ORIGINS`:
   - Old: `https://YOUR_VERCEL_DOMAIN.vercel.app`
   - New: `https://your-actual-domain.vercel.app` (the one Vercel gave you)
3. Click **Save** (auto-redeploy)

---

## Step 4: Verify Deployment

### Test Backend
```bash
# Replace with your actual Render URL
curl https://hrms-lite-api.onrender.com/

# Should return:
# {"message":"HRMS Lite API is running","status":"ok","version":"1.0.0"}

# Check API docs
https://hrms-lite-api.onrender.com/docs
```

### Test Frontend
1. Open your Vercel URL: `https://YOUR_VERCEL_DOMAIN.vercel.app`
2. You should see the **HRMS Dashboard**
3. Navigate to **Employees** → should show empty list or seeded data
4. Try adding an employee → should work with backend

---

## Troubleshooting

### Frontend shows "Error loading dashboard"
1. Check Vercel logs: **Deployments** → Click latest → **Logs**
2. Confirm `VITE_API_URL` is set correctly
3. Check backend `CORS_ORIGINS` includes your Vercel domain
4. Test backend directly with `curl https://hrms-lite-api.onrender.com/employees`

### Backend returns 404
1. Check Render logs: **Service** → **Logs**
2. Confirm `python -m uvicorn main:app` started successfully
3. Visit `/docs` to verify API is live
4. Check `DATABASE_URL` is set (or empty for SQLite)

### CORS blocked in browser
1. Backend logs should show: "Allowing origin: https://your-vercel-domain..."
2. If not, update `CORS_ORIGINS` in Render environment and redeploy

---

## Environment Variables Reference

| Var | Where | Value | Example |
|-----|-------|-------|---------|
| `DATABASE_URL` | Render | PostgreSQL or SQLite | `postgresql://...` or empty |
| `CORS_ORIGINS` | Render | Frontend URL | `https://app.vercel.app` |
| `ALLOW_CORS_ALL` | Render | false (production) | `false` |
| `DEBUG` | Render | false (production) | `false` |
| `VITE_API_URL` | Vercel | Backend URL | `https://hrms-lite-api.onrender.com` |

---

## Next Steps

1. **Push to GitHub:** Git commit & push the updated code
2. **Monitor both services** for 2-5 min while building
3. **Test endpoints** once live
4. **Celebrate!** 🎉

For ongoing changes:
- Push to GitHub → Both Render & Vercel auto-redeploy
- Environment variable updates require manual redeploy or webhook trigger

---

**Questions?** Check Render/Vercel docs or re-read Step 1-4 above.
