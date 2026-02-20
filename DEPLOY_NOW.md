# 🚀 DEPLOYMENT QUICK START - Copy & Paste Instructions

Your HRMS app is ready to deploy! Follow these exact steps.

---

## STEP 1: Deploy Backend (Render)

### Copy everything from Here ⬇️

**[1]** Go to https://dashboard.render.com

**[2]** Click **"+ New"** → **"PostgreSQL"**
- **Name**: `hrms-lite-db`
- **Database**: `hrmsdb`
- **User**: `postgres`
- Click **"Create Database"**
- **COPY & SAVE the "Internal Database URL"** (you'll need it next)

**[3]** Click **"+ New"** → **"Web Service"**
- Click **"Connect Repository"** 
- Select your GitHub `hrms-lite` repo
- **Name**: `hrms-lite-api`
- **Environment**: `Python 3.11`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
- **Root Directory**: `backend`
- Click **"Advanced"** section at bottom
- **Add Environment Variables**:

```
DATABASE_URL = (PASTE the Internal Database URL from [2])
ALLOW_CORS_ALL = true
```

- Click **"Create Web Service"**
- Wait 3-5 minutes ⏳
- **COPY & SAVE your Backend URL** (shown at top, like `https://hrms-lite-api.onrender.com`)

---

## STEP 2: Deploy Frontend (Vercel)

**[4]** Go to https://vercel.com

**[5]** Click **"Add New..."** → **"Project"**
- Select your `hrms-lite` GitHub repo
- Click **"Import"**

**[6]** Configure:
- **Framework Preset**: `Other`
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build`
- Click **"Environment Variables"** (before deploy!)

**[7]** Add Environment Variables:
```
VITE_API_URL = (PASTE your Backend URL from [3])
```

**[8]** Click **"Deploy"**
- Wait 1-3 minutes ⏳
- **COPY & SAVE your Frontend URL** (shown as "Domains", like `https://hrms-lite.vercel.app`)

---

## STEP 3: Fix Backend CORS

**[9]** Go back to Render dashboard

**[10]** Click your `hrms-lite-api` service

**[11]** Go to **"Environment"** tab

**[12]** Click **"Edit"** next to `ALLOW_CORS_ALL`
- Change to: (your Vercel URL from [8])
- **OR** keep as `true` for now (easier testing)

**[13]** Click **"Save"** - Render auto-redeploys

---

## STEP 4: Test

✅ **Test Backend API:**
- Open: `https://hrms-lite-api.onrender.com/docs`
- You should see Swagger docs
- Try creating an employee

✅ **Test Frontend:**
- Open: `https://hrms-lite.vercel.app` (your Vercel URL)
- You should see "✓ Connected"
- Try adding an employee

---

## ❌ Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "CORS Error" | Make sure `VITE_API_URL` is set in Vercel |
| "Failed to fetch" | Check backend URL is correct in Vercel env |
| "Can't connect" | Wait 1-2 min for services to start |
| Page is blank | Check browser console (F12) for errors |
| "Can't find database" | Verify DATABASE_URL in Render has right password |

---

## 📋 Environment Variables You Need

**On Render (Backend) - Environment Tab:**
- `DATABASE_URL` = Your PostgreSQL internal URL
- `ALLOW_CORS_ALL` = `true` (or your Vercel URL)

**On Vercel (Frontend) - Environment Variables:**
- `VITE_API_URL` = Your Render backend URL

---

## 🎉 Success = 

- [ ] Backend responds at `https://your-backend.onrender.com/docs` ✓
- [ ] Frontend loads at `https://your-app.vercel.app` ✓
- [ ] Frontend shows "✓ Connected" when you open it ✓
- [ ] You can add an employee from the UI ✓
- [ ] Employee appears in backend API ✓

---

**Questions?** Check `RENDER_VERCEL_SETUP.md` for detailed troubleshooting.

