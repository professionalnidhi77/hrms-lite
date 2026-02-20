# Vercel Deployment - Troubleshooting Guide

## ✅ Fixed Your Configuration
- Updated `vercel.json` for correct build process
- Ready for fresh deployment

---

## 🔧 Fix Vercel Deployment Error

### Option 1: Redeploy Button (Easiest)
1. Go to https://vercel.com/dashboard
2. Click on your `hrms-lite` project
3. Go to **Deployments** tab
4. Click on the latest failed deployment
5. Click **"Redeploy"** button
6. Wait 2-3 minutes

### Option 2: Trigger New Deploy (Github Push)
```bash
cd c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite
git add .
git commit -m "fix: update vercel configuration"
git push origin main
```
Vercel will auto-deploy when you push to main.

---

## 🔍 Common Vercel Errors & Fixes

### Error 1: "Build failed"
**Cause**: Build script failed

**Fix**:
1. Test build locally:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. Check for errors in console
3. Fix errors, then push to GitHub
4. Vercel will auto-rebuild

### Error 2: "Module not found" 
**Cause**: Missing dependencies

**Fix**:
1. Make sure all packages are in `frontend/package.json`
2. Run locally: `npm install`
3. Check node_modules is working
4. Push and redeploy

### Error 3: "VITE_API_URL is undefined"
**Cause**: Environment variable not set

**Fix**:
1. Go to Vercel Dashboard → Your Project
2. Click **Settings**
3. Go to **Environment Variables**
4. Add: `VITE_API_URL=https://your-backend-url.com`
5. Redeploy

### Error 4: "Cannot find dist folder"
**Cause**: Build output path wrong

**Fix**: Already fixed in `vercel.json` ✓

---

## 📋 Vercel Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub repo connected to Vercel
- [ ] `vercel.json` is correct
- [ ] `VITE_API_URL` env variable is set in Vercel
- [ ] Build command: `cd frontend && npm install && npm run build`
- [ ] Output directory: `frontend/dist`
- [ ] Rewrites configured for SPA routing

---

## 🚀 Complete Fix Steps

### Step 1: Delete Old Project on Vercel (Optional)
If stuck in failed state:
1. Go to https://vercel.com/dashboard
2. Click on `hrms-lite` project
3. Go to **Settings** → **Advanced**
4. Click **"Delete Project"**

### Step 2: Reimport Project
1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Select `hrms-lite` from GitHub
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: ./frontend
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables
Click **"Environment Variables"** **BEFORE** deploying:

| Name | Value | Apply to |
|------|-------|----------|
| `VITE_API_URL` | Your Render backend URL | All environments |

Example: `https://hrms-lite-api.onrender.com`

### Step 4: Deploy
Click **"Deploy"** and wait 2-3 minutes ⏳

---

## ✅ After Deployment

1. Check build logs:
   - Go to Deployments → Click latest → View Build Logs
   - Look for any errors

2. Test frontend:
   - Click preview URL or visit main URL
   - Should see HRMS app
   - Open F12 Console - check for API errors

3. Test API connection:
   - Should see `✓ Connected` message
   - If not, check `VITE_API_URL` is correct

---

## 🆘 Still Having Issues?

### Check These Files Exist:
```
frontend/
  ├── package.json ✓
  ├── vite.config.js ✓
  ├── index.html ✓
  └── src/
      ├── main.jsx ✓
      ├── App.jsx ✓
      └── api.js ✓
```

### Check Frontend Build Works Locally:
```bash
cd frontend
npm install
npm run build
```
Should create `dist/` folder without errors ✓

### Check Vercel Logs:
1. Vercel Dashboard → Your Project → Deployments
2. Click failed/latest deployment
3. Click "Build Logs" tab
4. Read error message and fix locally
5. Push to GitHub → Vercel rebuilds

---

## 📞 Get Exact Error

**Please share screenshot showing:**
1. Error message text
2. Error timestamp
3. Whether it's in Build or Deployment phase

Then I can give specific fix! 👍

