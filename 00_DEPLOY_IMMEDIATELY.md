# ⚡ DEPLOY IMMEDIATELY — Copy & Paste Commands

**Status:** ✅ Backend verified on port 8888  
**Status:** ✅ Frontend built successfully  
**Status:** ✅ All configs ready (`render.yaml`, `vercel.json`, `.vercelignore`)

---

## Step 1: Git Commit & Push (2 minutes)

```powershell
cd "c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite"
git add .
git commit -m "Production ready: Render + Vercel deployment configs"
git push origin main
```

**What this does:** Pushes all deployment configs to GitHub (render.yaml, .vercelignore, docs, env templates)

---

## Step 2: Deploy Backend on Render (3 minutes)

### 2a. Visit Render & Create Service
- Go to **https://render.com/dashboard**
- Click **New +** → **Blueprint**
- Select your GitHub repo
- Render auto-reads `render.yaml` and deploys:
  - Root: `backend`
  - Build: `pip install -r requirements.txt`
  - Start: `uvicorn main:app --host 0.0.0.0 --port 8000`

### 2b. Add Environment Variables (BEFORE deploying)
In Render dashboard → Environment Variables, add:

```
CORS_ORIGINS=https://placeholder-set-after-vercel.vercel.app
ALLOW_CORS_ALL=false
DEBUG=false
DATABASE_URL=(leave empty for SQLite, or paste your Postgres URL)
```

Click **Deploy**

### 2c. Wait ~2 minutes
You'll see: `https://hrms-lite-api.onrender.com` (or auto-named URL)

**Copy this URL** ← You need it for Step 3

---

## Step 3: Deploy Frontend on Vercel (2 minutes)

### 3a. Visit Vercel & Import Project
- Go to **https://vercel.com/dashboard**
- Click **Add New** → **Project**
- Select your GitHub repo

### 3b. Configure Build Settings
- **Project Name:** `hrms-lite` (or your choice)
- **Framework:** `Vite`
- **Root Directory:** `./frontend`
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `dist` (auto-filled)

### 3c. Add Environment Variable (CRITICAL)
Before clicking "Deploy", add:
- **Key:** `VITE_API_URL`
- **Value:** `https://hrms-lite-api.onrender.com` (from your Render service)

Click **Add** → **Deploy**

### 3d. Wait ~1 minute
You'll see: `https://hrms-lite.vercel.app` (or your domain)

**Copy this URL**

---

## Step 4: Update Backend CORS (1 minute)

Go back to **Render dashboard** → **hrms-lite-api** → **Environment**

Update:
```
CORS_ORIGINS=https://hrms-lite.vercel.app
```
(Use your **actual** Vercel URL from Step 3)

Click **Save** (auto-redeploy)

---

## ✅ Verify It's LIVE

### Test Backend API
```powershell
$url = "https://hrms-lite-api.onrender.com/"
(Invoke-WebRequest -Uri $url -UseBasicParsing).Content
```

Expected:
```json
{"message":"HRMS Lite API is running","status":"ok","version":"1.0.0"}
```

### Test Frontend
- Open browser: `https://hrms-lite.vercel.app`
- You should see **HRMS Lite Dashboard** ✓
- Click **Employees** tab → should show list ✓
- Try **Add Employee** → should save to backend ✓

---

## 🎉 Done!

**Total time:** ~8 minutes end-to-end

Your app is now:
- **Live on Render:** https://hrms-lite-api.onrender.com
- **Live on Vercel:** https://hrms-lite.vercel.app
- **Auto-deploys:** Push to GitHub → both services redeploy automatically
- **Production-ready:** CORS restricted, Debug disabled, security hardened

---

## 🐛 If Something Breaks

| Issue | Check |
|-------|-------|
| Frontend shows error | Open Vercel Logs → check for build errors |
| Backend 404/error | Open Render Logs → check startup |
| CORS blocked | Verify `CORS_ORIGINS` on Render matches your Vercel URL |
| API not responding | Confirm `VITE_API_URL` on Vercel matches your Render URL |

---

**Full detailed guide:** [`RENDER_VERCEL_DEPLOYMENT.md`](RENDER_VERCEL_DEPLOYMENT.md)  
**Quick checklist:** [`DEPLOY_NOW_CHECKLIST.md`](DEPLOY_NOW_CHECKLIST.md)

👉 **Next:** Run the git commands above and start deploying!
