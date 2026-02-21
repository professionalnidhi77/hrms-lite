# Deployment Quick Reference Card

## 🎯 Deployment Checklist

### Backend (Render)
- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Select hrms-lite repo
- [ ] Name: `hrms-lite-api`
- [ ] Build: `pip install -r backend/requirements.txt`
- [ ] Start: `python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000`
- [ ] Add env var: `CORS_ORIGINS = https://hrms-lite.vercel.app`
- [ ] Click "Create Web Service"
- [ ] ⏳ Wait 2-3 minutes
- [ ] ✅ Backend live at: `https://hrms-lite-api.onrender.com`

### Frontend (Vercel)
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import: professionalnidhi77/hrms-lite
- [ ] Root Directory: `frontend`
- [ ] Add env var: `VITE_API_URL = https://hrms-lite-api.onrender.com`
- [ ] Click "Deploy"
- [ ] ⏳ Wait 1-2 minutes
- [ ] ✅ Frontend live at: `https://hrms-lite.vercel.app`

### Connect Both
- [ ] Go to Render dashboard
- [ ] Edit `CORS_ORIGINS` → `https://hrms-lite.vercel.app`
- [ ] Save and redeploy
- [ ] ✅ Visit frontend → test API calls

---

## 📊 Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 🟢 Running | Service is live | No action needed |
| 🟡 Building | Deployment in progress | Wait 2-3 minutes |
| 🔴 Failed | Error in build/deploy | Check logs |
| ⚪ Suspended | Service paused | Resume on dashboard |

---

## 🔗 Connection Test

After deploying both:

```bash
# Test backend is running
curl https://hrms-lite-api.onrender.com/

# Test frontend loads
# Open: https://hrms-lite.vercel.app in browser

# Test connection
# Try adding employee in frontend
# Check if it appears in the list
```

Expected responses:
- ✅ Backend returns JSON
- ✅ Frontend page loads
- ✅ Add/read data works

---

## 📱 Access Your App

| What | URL |
|-----|-----|
| **Live App** | https://hrms-lite.vercel.app |
| **API Docs** | https://hrms-lite-api.onrender.com/docs |
| **GitHub** | https://github.com/professionalnidhi77/hrms-lite |

---

## 🚨 Common Issues

| Issue | Fix |
|-------|-----|
| 502 Error on frontend | Check Render logs, redeploy |
| API not responding | Verify CORS_ORIGINS on Render |
| Frontend blank page | Check Vercel build logs |
| CORS error | Update CORS_ORIGINS to Vercel URL |
| Module not found | Check requirements.txt |

---

## 🎯 Auto-Deploy Workflow

```
Local Code Change
        ↓
git add . && git commit && git push
        ↓
GitHub Updated
        ↓
Render Auto-Deploys ┐
Vercel Auto-Builds  ├─→ 2-5 minutes
        ↓
Live App Updated ✅
```

No manual redeploy needed!

---

## 💾 Save These URLs

```
RENDER BACKEND:    https://hrms-lite-api.onrender.com
VERCEL FRONTEND:   https://hrms-lite.vercel.app
API DOCS:          https://hrms-lite-api.onrender.com/docs
GITHUB:            https://github.com/professionalnidhi77/hrms-lite
```

---

Print this card and keep it handy! 📌
