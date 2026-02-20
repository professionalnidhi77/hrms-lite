# Render Backend Deployment - Complete Setup

## Step 1: Deploy Backend to Render (with PostgreSQL)

### 1.1 Create PostgreSQL Database on Render
1. Go to https://dashboard.render.com
2. Click **"+ New"** in top right
3. Select **"PostgreSQL"**
4. Fill in:
   - **Name**: `hrms-lite-db`
   - **Database**: `hrmsdb`
   - **User**: `postgres`
   - **Region**: Choose closest to you
5. Click **"Create Database"**
6. Wait 2-3 minutes for creation
7. **IMPORTANT**: Copy the **"Internal Database URL"** (looks like `postgresql://...`)
   - You'll need this in the next step

### 1.2 Create Backend Web Service on Render
1. Click **"+ New"** → **"Web Service"**
2. Click **"Connect Repository"**
   - Choose your GitHub `hrms-lite` repo
   - If not listed, click "Connect GitHub account" first
3. Fill in:
   - **Name**: `hrms-lite-api`
   - **Environment**: `Python 3.11`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - **Root Directory**: `backend` (important!)
4. Click **"Advanced"** ⬇️ at bottom
5. Add **Environment Variables**:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste the Internal Database URL from step 1.1 |
| `ALLOW_CORS_ALL` | `true` |

6. Click **"Create Web Service"**
7. Wait 3-5 minutes for deployment

### 1.3 Get Your Backend URL
Once deployed:
1. Go to Render dashboard
2. Click on your `hrms-lite-api` service
3. Copy the URL from the top (looks like `https://hrms-lite-api.onrender.com`)
4. **SAVE THIS URL** - you need it for Vercel

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project
1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub `hrms-lite` repo
4. Click **"Import"**

### 2.2 Configure Project
1. **Framework Preset**: Leave as `Other` (Vite auto-detects)
2. **Build & Development Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Development Command**: `npm run dev`
   - **Root Directory**: `./frontend`

### 2.3 Add Environment Variables
1. Click **"Environment Variables"** before deploying
2. Add variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL from step 1.3 (e.g., `https://hrms-lite-api.onrender.com`)
   - **Environments**: Select all (Production, Preview, Development)
3. Click **"Save"** then **"Deploy"**

### 2.4 Get Your Frontend URL
Once deployed:
- Vercel shows your URL (looks like `https://hrms-lite.vercel.app`)
- **SAVE THIS URL**

---

## Step 3: Final Backend Configuration

### 3.1 Update Backend CORS on Render
1. Go to Render dashboard
2. Click `hrms-lite-api` service
3. Go to **"Environment"** tab
4. Click **"Edit"** next to `ALLOW_CORS_ALL`
5. Change value from `true` to specific origins:
   ```
   https://your-vercel-url.vercel.app
   ```
   (Replace with your actual Vercel URL from step 2.4)

Actually, keep it as `true` for now, then set a proper CORS_ORIGINS:

6. Add new variable:
   - **Name**: `CORS_ORIGINS`
   - **Value**: `https://your-vercel-url.vercel.app`
7. Delete the `ALLOW_CORS_ALL` variable
8. Click **"Save"**
9. Render will auto-redeploy

---

## Step 4: Test Everything

### Test Backend API
1. Open: `https://hrms-lite-api.onrender.com/docs`
2. Should see Swagger API documentation
3. Click "Try it out" on `/employees` POST endpoint
4. Fill in data:
   ```json
   {
     "employee_id": "TEST001",
     "full_name": "Test User",
     "email": "test@example.com",
     "department": "IT"
   }
   ```
5. Click "Execute" - should return success

### Test Frontend
1. Open your Vercel URL: `https://your-project.vercel.app`
2. Open browser console: **F12** → **Console tab**
3. Should see: `✓ Connected` message (if not, check errors)
4. Try adding an employee through the form
5. Check Network tab (F12 → Network) to see API calls

---

## 🔧 Troubleshooting

### Problem: "CORS error" or "Failed to fetch"
**Solutions:**
- [ ] Check `VITE_API_URL` is set in Vercel environment variables
- [ ] Check backend CORS_ORIGINS includes your Vercel URL
- [ ] Restart both services (redeploy on Render/Vercel)
- [ ] Wait 1-2 minutes for environment changes to take effect

### Problem: "Cannot find module" on Render
**Solutions:**
- [ ] Check Root Directory is set to `backend`
- [ ] Check all Python packages are in `backend/requirements.txt`
- [ ] Redeploy the service

### Problem: "Database connection fails"
**Solutions:**
- [ ] Check DATABASE_URL starts with `postgresql://`
- [ ] Check database credentials are correct
- [ ] Verify database is still running on Render
- [ ] Check no special characters in password

### Problem: Vercel shows blank page
**Solutions:**
- [ ] Check build logs in Vercel Deployments
- [ ] Verify `npm run build` works locally:
  ```bash
  cd frontend
  npm install
  npm run build
  ```

---

## 📊 Final Checklist

- [ ] PostgreSQL database created on Render
- [ ] Backend deployed on Render with Python 3.11
- [ ] Backend environment variables set (DATABASE_URL, CORS_ORIGINS)
- [ ] Backend responds to `https://your-backend.onrender.com/docs`
- [ ] Frontend deployed on Vercel
- [ ] Frontend has `VITE_API_URL` environment variable
- [ ] Frontend shows "✓ Connected" message
- [ ] Can create employee on frontend
- [ ] Employee appears in backend API `/employees` endpoint

---

## 🚀 After Deployment

**For future updates:**
1. Make changes locally
2. Test with `npm run dev` (frontend) and `uvicorn main:app --reload` (backend)
3. Push to GitHub:
   ```bash
   git add .
   git commit -m "description"
   git push origin main
   ```
4. Render & Vercel auto-deploy!

---

## 💡 Quick Reference

| Service | Type | URL | Cost |
|---------|------|-----|------|
| Frontend | Vercel | `https://xxxx.vercel.app` | Free |
| Backend | Render | `https://xxxx.onrender.com` | Free (with limits) |
| Database | Render PostgreSQL | Managed by Render | Free (with limits) |

**Note**: Free tier services may sleep after 15 min inactivity. Upgrade for always-on.

