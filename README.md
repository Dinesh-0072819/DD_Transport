# DD TRANSPORT – Premium Lorry Transport & Logistics Web Application

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MySQL 8](https://img.shields.io/badge/MySQL_8-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)

---

## 🏢 Company Profile & Real Business Details

- **Company Name:** DD Transport
- **Tagline:** Reliable Transport. On-Time Delivery.
- **Official Domain:** [https://ddtransport.com](https://ddtransport.com)
- **Preferred Domain:** [https://www.ddtransport.com](https://www.ddtransport.com)
- **Proprietor:** P. Mariappan
- **Primary Mobile:** `+91 97512 63370`
- **Secondary Mobile:** `+91 63799 86208`
- **Head Office Address:** 6/400, Bose Colony, Naranapuram Road, Sivakasi - 626 189, Tamil Nadu, India.
- **Flagship Fleet Lorry:** Ashok Leyland Taurus 10-Wheeler (`TN 28 AD 2467`, 16-Ton Capacity)

---

## 🚀 Key Features

### 1. Customer Website (Public Access, No Login Required)
- **Hero & Trust Sections:** High-definition lorry fleet photography, authentic business details, Sivakasi depot location.
- **Our Fleet (`/fleet`):** Filter by category (10-Wheeler Taurus, 12-Wheeler, Closed Container, 6-Wheeler), filter by payload, search by registration number, detailed cargo deck dimensions, and "Book This Lorry" button.
- **Services (`/services`):** Full Truck Load (FTL), Industrial Goods, Commercial Printing & Cartons, Agricultural Goods, Construction Materials, Regional Delivery, Interstate Logistics.
- **Routes (`/routes`):** Sivakasi corridors connecting Chennai, Coimbatore, Madurai, Bengaluru, Hyderabad, Salem, and Tuticorin Port.
- **Quotation System (`/quote`):** Validated multi-step freight enquiry generator with instant tracking ID generation (e.g. `DDT-2025-1001`) and direct pre-formatted WhatsApp enquiry sharing.
- **Enquiry Tracking (`/track`):** Privacy-safe tracking showing 7 real-time milestones:
  1. Enquiry Received
  2. Under Review
  3. Quotation Sent
  4. Confirmed
  5. In Progress
  6. Completed
  7. Cancelled
- **Contact Us (`/contact`):** Click-to-call, direct WhatsApp chat, working contact form, Google Maps embed for Sivakasi.
- **Floating Actions:** Persistent 24/7 direct call and WhatsApp floating buttons.

### 2. Admin Dashboard (`/admin`)
- **Protected Login (`/admin/login`):** JWT token authentication, bcrypt password hashing, secure session storage.
- **Initial Setup Credentials:**
  - **Email:** `admin@ddtransport.com`
  - **Password:** `Admin@DDTransport2025!`
- **Overview Dashboard:** Total enquiries, pending reviews, active bookings, completed trips, live lorry availability, and 6-month volume trend.
- **Enquiry Management:** Status stepper updates, freight rate calculation in ₹ INR, internal operational notes audit log, and one-click WhatsApp quote generator.
- **Fleet Management:** Add/edit/delete lorries, upload photo URLs, update availability (Available, On Trip, Maintenance), toggle public website visibility.
- **Booking Management:** Assign vehicles, record drivers & phone numbers, track advances and balance dues, maintain trip history.
- **Customer Directory:** Track repeat consignors, past freight volumes, and customer enquiry archives.
- **Service Management:** Dynamically add and modify transport service offerings.
- **Website Settings:** Live editor for phone numbers, addresses, social channels, and homepage marketing copy.

---

## 🛠️ Project Structure

```
DD_Transport/
├── frontend/                     # React 18 + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── admin/                # Admin Console Pages & Submodules
│   │   ├── components/
│   │   │   └── common/           # Navbar, Footer, Floating WhatsApp
│   │   ├── pages/                # Public Customer Pages (Home, Fleet, Quote, Track...)
│   │   ├── services/             # Axios API Client & Mock State Engine
│   │   ├── styles/               # Tailwind CSS & Font Styling
│   │   ├── types/                # TypeScript Interfaces
│   │   ├── App.tsx               # Main Router & Provider
│   │   └── main.tsx              # Application Root
│   ├── public/
│   │   ├── images/               # Authentic DD Transport Fleet Photos & Logo
│   │   ├── robots.txt            # Search Engine Directives
│   │   └── sitemap.xml           # Google Sitemap Specification
│   ├── vercel.json               # Vercel Deployment & API Proxy Config
│   └── package.json
│
├── backend/                      # Express.js + TypeScript REST API Backend
│   ├── src/
│   │   ├── config/               # Environment & Database Configuration
│   │   ├── controllers/          # Business Logic for Enquiries, Fleet, Bookings...
│   │   ├── middleware/           # JWT Auth, Rate Limiter, Error Handling
│   │   ├── routes/               # REST API Endpoint Definitions
│   │   ├── services/             # Prisma ORM & Fallback Data Store Engine
│   │   ├── validators/           # Zod Input Validation Schemas
│   │   └── server.ts             # Express Server Entry Point
│   ├── prisma/
│   │   └── schema.prisma         # MySQL 8 Relational Schema
│   ├── dd_transport_db.sql       # Pure MySQL 8 Database Dump & Seed
│   ├── render.yaml               # Render Cloud Deployment Blueprint
│   └── package.json
│
├── dd_transport_db.sql           # Root MySQL Database Dump for MySQL Workbench
├── DEPLOYMENT.md                 # Complete Vercel, Render & Railway Deployment Guide
├── MYSQL_WORKBENCH_GUIDE.md      # MySQL Workbench Step-by-Step Connection Guide
├── .gitignore
└── README.md
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js v18 or later
- npm v9 or later
- (Optional) Local MySQL 8 server or Railway MySQL instance

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npm run dev
```
The backend starts on `http://localhost:5001`.

### 3. Frontend Setup
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
The customer website opens at `http://localhost:3000`.

---

## 🗄️ Database Setup (MySQL 8)

Import the provided `dd_transport_db.sql` directly into MySQL Workbench or via terminal:

```bash
mysql -u root -p < dd_transport_db.sql
```

For detailed MySQL Workbench instructions, see [MYSQL_WORKBENCH_GUIDE.md](./MYSQL_WORKBENCH_GUIDE.md).

---

## 🌐 Production Deployment

Refer to [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions on:
- Deploying Frontend to **Vercel**
- Deploying Backend to **Render**
- Deploying Database to **Railway MySQL**
- Pointing Custom Domain **`ddtransport.com`** and **`www.ddtransport.com`** with SSL/HTTPS
- Setting up Google Search Console and sitemaps
