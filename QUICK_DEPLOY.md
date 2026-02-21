# Quick Deployment Checklist

## ✅ GitHub Setup (DONE)
- ✅ Repository: https://github.com/professionalnidhi77/hrms-lite
- ✅ All code pushed to main branch
- ✅ Deployment configuration files committed
- ✅ Environment template added (.env.example)

---

## 🚀 Deploy Backend on Render (NEXT)

### Quick Steps:
1. **Go to:** https://render.com/dashboard
2. **Click:** "New +" → "Web Service"
3. **Connect GitHub:** Select your hrms-lite repository
4. **Settings:**
   - Name: `hrms-lite-api`
   - Runtime: Python 3
   - Build: `cd backend && pip install -r requirements.txt`
   - Start: `cd backend && uvicorn main:app --host 0.0.0.0`

5. **Environment Variables:**
   ```
   CORS_ORIGINS = https://your-vercel-domain.vercel.app
   DEBUG = false
   ALLOW_CORS_ALL = false
   ```

6. **Click:** "Create Web Service"
7. **Wait:** 2-3 minutes for deployment
8. **Copy your URL:** `https://hrms-lite-api.onrender.com`

---

## 🌐 Deploy Frontend on Vercel (AFTER BACKEND)

### Quick Steps:
1. **Go to:** https://vercel.com/dashboard
2. **Click:** "Add New" → "Project"
3. **Import Git Repository:** Select `professionalnidhi77/hrms-lite`
4. **Framework:** Vite (should auto-detect)
5. **Root Directory:** `frontend`
6. **Environment Variables:**
   ```
   VITE_API_URL = https://hrms-lite-api.onrender.com
   ```
   *(Use your actual Render backend URL)*

7. **Click:** "Deploy"
8. **Wait:** 1-2 minutes for build
9. **Copy your URL:** `https://hrms-lite.vercel.app`

---

## 🔗 Connect Backend & Frontend

### Update Backend CORS (in Render):
1. Go to: Render Dashboard → hrms-lite-api → Environment
2. Update `CORS_ORIGINS`:
   ```
   https://hrms-lite.vercel.app
   ```
3. Click "Save" → "Manual Deploy"

### Test Connection:
1. Visit: https://hrms-lite.vercel.app
2. If page loads + can add employees = ✅ **Success!**

---

## 📊 Monitor Deployments

### See Render Logs:
- Render Dashboard → hrms-lite-api → Logs

### See Vercel Logs:
- Vercel Dashboard → Project → Deployments → Click a deployment → Logs

### Auto-Redeploy on Git Push:
- ✅ Render watches main branch
- ✅ Vercel watches main branch
- Just `git push` → automatic redeploy!

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend won't load | Check Vercel deployment logs |
| API calls fail | Verify VITE_API_URL in Vercel |
| CORS error | Update CORS_ORIGINS in Render |
| Backend won't start | Check Python version (3.9+) and pip install |
| Database error | Create PostgreSQL on Render, set DATABASE_URL |

---

## 📝 Important URLs After Deployment

```
GitHub:  https://github.com/professionalnidhi77/hrms-lite
Backend: https://hrms-lite-api.onrender.com
API Docs: https://hrms-lite-api.onrender.com/docs
Frontend: https://hrms-lite.vercel.app
```

---

## ✨ Done! Your app is live 🎉

Once deployed:
- Frontend: Visit https://hrms-lite.vercel.app
- Backend API: Test at https://hrms-lite-api.onrender.com/docs
- Automatic redeploys on every git push!

---

For detailed step-by-step guide, see: [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
