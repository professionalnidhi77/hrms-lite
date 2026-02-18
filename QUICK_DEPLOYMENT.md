# 🚀 Quick Deployment Checklist

Follow these steps to deploy your HRMS-Lite application to production.

---

## ✅ Step 1: Prepare Your Code (Local - 5 minutes)

- [ ] Activate Python virtual environment:
  ```bash
  cd backend
  .venv\Scripts\Activate.ps1
  ```
  
- [ ] Create backend `.env` file (copy from `.env.example`):
  ```bash
  DATABASE_URL=sqlite:///./hrms.db
  CORS_ORIGINS=http://localhost:5173
  ```

- [ ] Create frontend `.env` file (copy from `.env.example`):
  ```bash
  VITE_API_URL=http://localhost:8000
  ```

- [ ] Test locally:
  ```bash
  # Terminal 1 - Backend
  cd backend
  uvicorn main:app --reload
  
  # Terminal 2 - Frontend
  cd frontend
  npm run dev
  ```
  Access: http://localhost:5173

---

## ✅ Step 2: Push Code to GitHub (5 minutes)

- [ ] Initialize Git (if not already done):
  ```bash
  git init
  git add .
  git commit -m "Initial commit: HRMS-Lite"
  ```

- [ ] Create GitHub repository:
  https://github.com/new
  - Name: `hrms-lite`
  - Click "Create"

- [ ] Connect and push:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/hrms-lite.git
  git branch -M main
  git push -u origin main
  ```

---

## ✅ Step 3: Deploy Frontend (Vercel - 5 minutes)

### Option A: Vercel (Recommended)

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Import your `hrms-lite` repository
4. Configure project:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**
6. Wait 2-3 minutes for deployment

**Your frontend URL**: `https://hrms-lite.vercel.app` (or custom domain)

### Option B: Netlify

1. Go to https://app.netlify.com/start
2. Sign in with GitHub
3. Select `hrms-lite` repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Click **Deploy site**

**Your frontend URL**: https://your-site.netlify.app

---

## ✅ Step 4: Deploy Backend Database (Render - 5 minutes)

1. Go to https://dashboard.render.com
2. Sign up/Login with GitHub
3. Click **New+** → **PostgreSQL**
4. Configure:
   - **Name**: `hrms-lite-db`
   - **Database**: `hrmsdb`
   - **User**: `postgres`
5. Click **Create Database**
6. **Save the Internal Database URL** (you'll need this next!)

---

## ✅ Step 5: Deploy Backend API (Render - 5 minutes)

1. In Render dashboard, click **New+** → **Web Service**
2. Select your `hrms-lite` GitHub repository
3. Configure:
   - **Name**: `hrms-lite-api`
   - **Environment**: `Python 3.11`
   - **Region**: Choose nearest to you
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - **Root Directory**: `backend`
4. Click **Create Web Service**
5. Go to **Environment** tab and add:
   ```
   DATABASE_URL = (paste the PostgreSQL URL from Step 4)
   CORS_ORIGINS = https://your-frontend-url.vercel.app
   ```
6. Click **Save** to trigger automatic re-deployment
7. Wait 3-5 minutes for deployment

**Your backend URL**: `https://hrms-lite-api.onrender.com` (or shown in dashboard)

---

## ✅ Step 6: Update Frontend with Backend URL (2 minutes)

1. Go back to Vercel/Netlify dashboard
2. Open your frontend project **Settings**
3. Go to **Environment Variables**
4. Add/Update:
   ```
   VITE_API_URL = https://hrms-lite-api.onrender.com
   ```
5. Trigger a **Redeploy** from the **Deployments** tab
6. Wait 2-3 minutes for re-deployment

---

## ✅ Step 7: Test Your Deployment (5 minutes)

- [ ] Access your frontend: `https://your-frontend-url`
- [ ] Open browser DevTools (F12) → Console
- [ ] Check for any errors
- [ ] Test API connection:
  ```
  Visit: https://your-backend-url/docs
  ```
- [ ] Create a test employee:
  1. Click "Add Employee" button
  2. Fill in:
     - Employee ID: `TEST001`
     - Name: `Test User`
     - Email: `test@example.com`
     - Department: `IT`
  3. Click Submit
  4. If successful, data was saved to production database! ✅

---

## ✅ Step 8: Update CORS in Backend (If Needed)

If you see CORS errors in browser console:

1. Edit `.env` file in Render dashboard:
   ```
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```
2. Save and wait for automatic re-deployment

---

## 📱 Your Production URLs

After deployment, you'll have:

| Service | URL |
|---------|-----|
| **Frontend** | `https://your-frontend-url.vercel.app` |
| **Backend API** | `https://hrms-lite-api.onrender.com` |
| **API Docs** | `https://hrms-lite-api.onrender.com/docs` |
| **Database** | PostgreSQL (managed by Render) |

---

## 🔄 Continuous Deployment

Whenever you push changes to GitHub:
1. Code is automatically deployed
2. No manual steps needed
3. Your site updates within 2-5 minutes

---

## 🐛 Common Issues & Solutions

### "Failed to fetch" error in frontend
```
✓ Check VITE_API_URL environment variable in Vercel
✓ Verify backend URL is correct
✓ Check CORS_ORIGINS in Render backend .env
✓ Wait 5 minutes after deploying
```

### Database connection error
```
✓ Verify DATABASE_URL is correct in Render
✓ Check PostgreSQL database is created
✓ Ensure password is correct
```

### Page shows "Build failed" on Vercel
```
✓ Check build logs in Vercel dashboard
✓ Ensure root directory is set to 'frontend'
✓ Verify package.json exists in frontend
```

### Slow initial load
```
✓ Normal for free tier services
✓ Render turns off idle services - first load takes 30s
✓ Upgrade to paid plan for faster response
```

---

## 💡 Pro Tips

1. **Enable Notifications**: Render/Vercel can notify you of deployments
2. **View Logs**: Check logs if something goes wrong
3. **Monitor Performance**: Use Vercel Analytics for frontend insights
4. **Scale if Needed**: Upgrade plan when traffic increases
5. **Backup Database**: Render has built-in PostgreSQL backups

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/

---

**Estimated Total Time**: ~30 minutes
**Cost**: Free (with paid tier options)
**Status**: Ready to deploy! 🚀
