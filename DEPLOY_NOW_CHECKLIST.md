# ⚡ DEPLOY NOW — Action Checklist

## 3-Step Rapid Deployment (5 minutes)

### Step 1: Push to GitHub
```bash
cd c:\Users\Nidhi Tripathi\OneDrive\Desktop\hrms-lite
git add .
git commit -m "Production deployment configs: render.yaml, .vercelignore, env templates"
git push origin main
```

### Step 2: Deploy Backend on Render
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click **New +** → **Blueprint** (auto-detects `render.yaml`)
   - OR: Click **Web Service**, select repo, set Root to `backend`, Build/Start cmds as in render.yaml
4. **Add Environment Variables** (Before deploying):
   - `CORS_ORIGINS` = `https://your-app-name.vercel.app` (set after Vercel, can update later)
   - `ALLOW_CORS_ALL` = `false`
   - `DEBUG` = `false`
5. Click **Deploy**
6. ⏳ Wait ~2 min for build
7. **Copy the URL** that appears (e.g., `https://hrms-lite-api.onrender.com`)

### Step 3: Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Select your repo
5. Fill in:
   - Project Name: `hrms-lite-frontend` (or choice)
   - Framework: `Vite`
   - Root: `./frontend`
   - Build: `npm run build`
   - Output: `dist`
6. **Add Environment Variable** (Click **Environment Variables** first):
   - `VITE_API_URL` = `https://hrms-lite-api.onrender.com` (from Step 2)
7. Click **Deploy**
8. ⏳ Wait ~1 min for build
9. **Copy your frontend URL** (e.g., `https://hrms-lite-frontend.vercel.app`)

### Step 4: Update Backend CORS (Final)
Back to Render → hrms-lite-api → Environment:
- Update `CORS_ORIGINS` to match your **actual** Vercel URL from Step 3
- Save (auto-redeploy)

---

## ✅ Verify It Works

### Test Backend API
```bash
# Replace URL with your Render backend
curl https://hrms-lite-api.onrender.com/

# Should return: {"message":"HRMS Lite API is running",...}
```

### Test Frontend
- Open: `https://your-frontend.vercel.app`
- you should see the **HRMS Lite Dashboard**
- Click **Employees** tab → should show list (or empty if no data)
- Try **Add Employee** → should save to backend ✓

---

## 📋 What's Different This Time?

| File | Purpose |
|------|---------|
| `render.yaml` | Render auto-reads this for build/start commands |
| `.vercelignore` | Tells Vercel to skip backend/Python files |
| `.env.production.backend` | Reference for backend env vars (manual entry on Render) |
| `RENDER_VERCEL_DEPLOYMENT.md` | Full detailed guide (read if stuck) |

---

## 🚀 That's It!

Once you see both URLs working and the dashboard loading data, you're **done**.

Ongoing:
- Push to GitHub → both services auto-redeploy
- Change env vars in Render/Vercel dashboard → auto-redeploy

**Stuck?** See `RENDER_VERCEL_DEPLOYMENT.md` (Step 1–4 detail).
