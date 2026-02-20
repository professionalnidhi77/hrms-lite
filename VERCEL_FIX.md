# Vercel Deployment Fix - API URL Configuration

## ❌ Problem
Your Vercel frontend was showing errors because the API was hardcoded to `http://localhost:8000`. This URL doesn't exist on Vercel's servers.

## ✅ Solution Applied
Updated `frontend/src/api.js` to use environment variables dynamically:
- Uses `VITE_API_URL` environment variable in production
- Falls back to `http://localhost:8000` for local development

## 🔧 Step-by-Step Fix for Vercel

### Step 1: Update Vercel Environment Variables
1. Go to your Vercel dashboard → Your Project → Settings
2. Click on "Environment Variables"
3. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your deployed backend URL (e.g., `https://hrms-lite-api.render.com`)
   - **Environments**: Select "Production", "Preview", and "Development"
4. Click "Save"

### Step 2: Redeploy Your Frontend
1. In Vercel dashboard, go to "Deployments"
2. Click the three-dot menu on the latest deployment
3. Select "Redeploy"
4. Or simply push a new commit to GitHub (it auto-deploys)

### Step 3: Verify Deployment
1. Visit your Vercel frontend URL
2. Open browser DevTools (F12)
3. Go to Console tab
4. Check if there are any CORS or fetch errors
5. Test creating an employee

---

## 🔗 Finding Your Backend URL

If deploying backend to:
- **Render**: `https://your-service-name.onrender.com`
- **Railway**: `https://your-project-url.railway.app`
- **Heroku** (free tier ended): Check your dashboard

---

## 📝 Backend Configuration

Make sure your backend's CORS settings include your Vercel URL:

**File**: `backend/main.py`

```python
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
```

Set on your backend hosting:
- **Render/Railway Settings** → Environment Variables
- Add: `CORS_ORIGINS=https://your-frontend-url.vercel.app`

---

## ✨ Complete Production Setup

| Component | Service | URL Format |
|-----------|---------|-----------|
| Frontend | Vercel | `https://your-app.vercel.app` |
| Backend API | Render/Railway | `https://your-api.onrender.com` or `https://your-api.railway.app` |
| Database | PostgreSQL | Provided by Render/Railway |

---

## 🐛 Still Having Issues?

### Check Frontend Logs
- Vercel Dashboard → Deployments → Click deployment → Logs
- Or in browser console (F12) → Network tab → Check API requests

### Check Backend Logs
- Render Dashboard → Logs tab
- Railway Dashboard → Logs section
- Look for any error messages

### Common Issues
1. **"CORS error"** → Backend CORS_ORIGINS doesn't include your Vercel URL
2. **"Failed to fetch"** → Backend URL is incorrect or service is down
3. **"404 not found"** → Backend API endpoints have changed

---

**Updated**: February 20, 2026
