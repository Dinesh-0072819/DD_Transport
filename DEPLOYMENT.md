# DD TRANSPORT – Production Deployment & Custom Domain Guide

Official Brand: **DD TRANSPORT**  
Official Production Domain: **https://ddtransport.com**  
Preferred URL: **https://www.ddtransport.com**

This guide provides end-to-end instructions for deploying DD Transport across Vercel (Frontend), Render (Backend), Railway (MySQL), and setting up Cloudflare/GoDaddy DNS with automatic non-www to www redirection.

---

## 1. Architecture Summary

| Tier | Provider | Configuration |
| :--- | :--- | :--- |
| **Frontend** | Vercel | Single-Page Application (React 18 + Vite + Tailwind CSS) |
| **Backend** | Render | Node.js / Express TypeScript REST API |
| **Database** | Railway | Managed MySQL 8 Database (`dd_transport_db`) |
| **Domain & DNS** | Cloudflare / Registrar | `ddtransport.com` → `www.ddtransport.com` |

---

## 2. Step 1: Database Setup on Railway

1. Log in to [railway.app](https://railway.app/).
2. Click **New Project** → Select **Provision MySQL**.
3. Under the **Connect** tab in Railway, copy the `DATABASE_URL` (e.g. `mysql://root:password@viaduct.proxy.rlwy.net:PORT/railway`).
4. To initialize tables and initial data:
   - Connect via MySQL Workbench (see `MYSQL_WORKBENCH_GUIDE.md`) and run `dd_transport_db.sql`.
   - OR run via CLI:
     ```bash
     cd backend
     DATABASE_URL="<your_railway_mysql_url>" npx prisma db push
     ```

---

## 3. Step 2: Backend REST API Deployment on Render

1. Create a private GitHub repository for DD Transport and push the project.
2. Log in to [render.com](https://render.com/).
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository.
5. Configure the service settings:
   - **Name**: `dd-transport-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
6. Add Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: *Your Railway MySQL connection string*
   - `JWT_SECRET`: *A secure 64-character random string*
   - `JWT_EXPIRES_IN`: `7d`
   - `CLIENT_URL`: `https://www.ddtransport.com,https://ddtransport.com`
7. Click **Deploy Web Service**.
8. Note down your production API URL: `https://dd-transport-api.onrender.com`.
9. Test endpoint in browser: `https://dd-transport-api.onrender.com/health`.

---

## 4. Step 3: Frontend Deployment on Vercel

1. Log in to [vercel.com](https://vercel.com/).
2. Click **Add New...** → **Project**.
3. Select your GitHub repository.
4. Set **Root Directory**: `frontend`.
5. Framework Preset: **Vite**.
6. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://dd-transport-api.onrender.com/api`
7. In `frontend/vercel.json`, ensure the proxy rewrite points to your Render backend:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://dd-transport-api.onrender.com/api/$1"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
8. Click **Deploy**. Your frontend is now live on Vercel!

---

## 5. Step 4: Custom Domain Configuration (`ddtransport.com`)

### Preferred Domain Strategy:
The preferred domain is **`https://www.ddtransport.com`**, with `https://ddtransport.com` automatically redirecting to `www`.

### DNS Record Setup at Registrar (GoDaddy / Namecheap / Cloudflare):

1. **CNAME Record (Preferred Domain):**
   - **Type**: `CNAME`
   - **Name / Host**: `www`
   - **Value / Target**: `cname.vercel-dns.com`
   - **TTL**: Auto / 3600

2. **A Record (Apex / Root Redirection):**
   - **Type**: `A`
   - **Name / Host**: `@` (or leave empty)
   - **Value / Target**: `76.76.21.21` (Vercel IP)
   - **TTL**: Auto / 3600

3. **In Vercel Dashboard:**
   - Go to your Project → **Settings** → **Domains**.
   - Add `www.ddtransport.com`.
   - Add `ddtransport.com` and select the option: **Redirect to www.ddtransport.com**.
   - Vercel automatically provisions and renews SSL (HTTPS) certificates for both names.

---

## 6. Step 5: Google Search Console Setup

Once DNS is active:
1. Visit [Google Search Console](https://search.google.com/search-console).
2. Choose **URL Prefix**: `https://www.ddtransport.com`.
3. Verification: Add the HTML tag to `frontend/index.html` or choose DNS TXT record verification.
4. After verification, click **Sitemaps** in the left menu.
5. Submit sitemap URL:
   `https://www.ddtransport.com/sitemap.xml`
6. Test your live robots file:
   `https://www.ddtransport.com/robots.txt`
