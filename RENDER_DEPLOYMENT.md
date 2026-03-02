# Quick Render Deployment Guide

## 🚀 Deploy Backend (Server) to Render

### Configuration Settings

When creating your Web Service on Render:

| Setting            | Value                                                 |
| ------------------ | ----------------------------------------------------- |
| **Root Directory** | `server` ⚠️ **CRITICAL**                              |
| **Build Command**  | `npm install && npm run db:generate && npm run build` |
| **Start Command**  | `npm start`                                           |
| **Runtime**        | Node                                                  |

### Environment Variables

Add these in Render Dashboard → Environment:

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRE=7d
API_VERSION=v1
CORS_ORIGIN=https://your-frontend.onrender.com
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### After Deployment

1. **Run Migrations** (in Render Shell):

   ```bash
   npm run db:push
   ```

2. **Seed Database** (optional):

   ```bash
   npm run seed
   ```

3. **Test Health Check**:
   ```
   https://your-service.onrender.com/api/v1/health
   ```

## 🎯 Deploy Frontend (Client) to Render

### Configuration Settings

| Setting            | Value                          |
| ------------------ | ------------------------------ |
| **Root Directory** | `client` ⚠️ **CRITICAL**       |
| **Build Command**  | `npm install && npm run build` |
| **Start Command**  | `npm start`                    |
| **Runtime**        | Node                           |

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1
```

## 📝 Common Issues

### Issue: Build Fails

**Solution**: Make sure Root Directory is set correctly:

- Backend: `server`
- Frontend: `client`

### Issue: Database Connection Error

**Solution**: Add `?sslmode=require` to DATABASE_URL:

```
postgresql://user:pass@host/db?sslmode=require
```

### Issue: CORS Error

**Solution**: Update CORS_ORIGIN in backend environment variables with your frontend URL.

## 🔗 Useful Links

- [Render Dashboard](https://dashboard.render.com)
- [Render Docs](https://render.com/docs)
- [PostgreSQL on Render](https://render.com/docs/databases)

## 📞 Need Help?

Check the detailed deployment guide in:

- `server/README.md` - Backend deployment
- `client/README.md` - Frontend deployment
