# Render Backend Deployment - Troubleshooting & Fixes

## ✅ Fixed Issues

Your `render.yaml` has been updated with correct configurations:

```yaml
buildCommand: pip install -r backend/requirements.txt
startCommand: python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

**Key Fixes:**
- ✅ Corrected path to `backend/requirements.txt`
- ✅ Changed start command to use full module path
- ✅ Added Python version specification (3.9)
- ✅ Updated CORS_ORIGINS to match your Vercel domain

---

## 🚀 Redeploy on Render

### Option 1: Manual Redeploy (Recommended)
1. Go to: **https://dashboard.render.com**
2. Select: **hrms-lite-api** service
3. Click: **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait 2-3 minutes for deployment
5. Check **Logs** tab for any errors

### Option 2: Push to GitHub (Auto-Deploy)
```powershell
git add render.yaml Procfile
git commit -m "fix: Correct Render deployment configuration"
git push
```

Render will automatically redeploy within 1-2 minutes.

---

## 🔍 Verify Backend is Working

### Check API is Running:
```
https://hrms-lite-api.onrender.com/
```

Should return:
```json
{
  "message": "HRMS Lite API is running",
  "status": "ok",
  "version": "1.0.0"
}
```

### Check API Documentation:
```
https://hrms-lite-api.onrender.com/docs
```

Should show interactive Swagger UI

---

## 🐛 Common Render Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| **Build fails - Module not found** | Wrong paths in buildCommand | Use `pip install -r backend/requirements.txt` |
| **App crashes on start** | Wrong startCommand | Use `python -m uvicorn backend.main:app --host 0.0.0.0` |
| **502 Bad Gateway** | Port configuration | Port must be 8000 |
| **Module import error** | Wrong import paths | Use absolute imports (`from backend.x import y`) |
| **CORS error** | Frontend URL mismatch | Update `CORS_ORIGINS` in environment variables |
| **Database connection error** | Missing DATABASE_URL | Create PostgreSQL database on Render |

---

## 📋 Render Environment Variables

Make sure these are set in Render Dashboard → **hrms-lite-api** → **Environment**:

```
DATABASE_URL = postgresql://user:pass@host/db (if using PostgreSQL)
CORS_ORIGINS = https://hrms-lite.vercel.app
DEBUG = false
ALLOW_CORS_ALL = false
```

---

## 📊 View Render Logs

1. Go to: Render Dashboard → **hrms-lite-api**
2. Click: **"Logs"** tab
3. Scroll to see deployment and runtime logs
4. Look for error messages

Common error patterns:
- `ModuleNotFoundError` → Import path issue
- `Connection refused` → Port/configuration issue
- `uvicorn: command not found` → Start command issue

---

## ✨ Files Changed

- ✅ `render.yaml` - Fixed build and start commands
- ✅ `Procfile` - Added as backup deployment configuration

---

## 🎯 Next Steps

1. **Commit & Push:**
   ```powershell
   git add render.yaml Procfile
   git commit -m "fix: Correct Render deployment configuration"
   git push
   ```

2. **Redeploy on Render:**
   - Render watches your repository
   - It will auto-deploy when you push
   - Or manually trigger redeploy

3. **Test Backend:**
   - Visit: `https://hrms-lite-api.onrender.com/`
   - Check logs for errors

4. **Update Vercel CORS:**
   - Once backend is working, update CORS_ORIGINS
   - Set to your Vercel frontend URL

---

## 🆘 Still Having Issues?

1. **Check Render Logs:** Render Dashboard → Logs tab
2. **Verify Requirements:** All packages in `backend/requirements.txt`
3. **Test Locally First:**
   ```powershell
   & ".\.venv\Scripts\Activate.ps1"
   python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
   ```
4. **Check GitHub:** Ensure latest code is pushed

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **Your Repository:** https://github.com/professionalnidhi77/hrms-lite

**Backend deployment should be working now!** 🎉
