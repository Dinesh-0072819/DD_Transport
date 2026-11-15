# DD TRANSPORT – MySQL Workbench Connection & Database Guide

Official Database Name: `dd_transport_db`  
Compatible with: **MySQL 8.x**, **MySQL Workbench**, **Railway MySQL**, **Render**, **AWS RDS**

---

## 1. Overview of Database Architecture

DD Transport uses a production-grade relational MySQL 8 schema with referential integrity, indexes, foreign keys, and timestamps (`created_at`, `updated_at`).

### Core Relational Tables:
1. **`admins`**: Secure credential store with bcrypt password hashes for logistics staff and proprietors.
2. **`customers`**: Consignors, manufacturing firms, contact numbers, and commercial directories.
3. **`vehicle_categories`**: Standard lorry types (Taurus 10-Wheeler, Heavy 12-Wheeler, Closed Containers, Medium 6-Wheelers).
4. **`vehicles`**: Lorry fleet registry including registration numbers (e.g., `TN 28 AD 2467`), dimensions, load capacities, live availability, and public visibility.
5. **`services`**: Transportation service offerings (FTL, Industrial Cargo, Commercial Goods, Agricultural Freight, etc.).
6. **`enquiries`**: Customer transport quotation requests with unique tracking IDs (e.g., `DDT-2025-1001`).
7. **`enquiry_notes`**: Timestamped operational notes and communication audit trail.
8. **`bookings`**: Confirmed consignments with vehicle assignment, driver contact, route, and advance/balance accounts.
9. **`website_settings`**: Dynamically editable branding, contact numbers, and office addresses.

---

## 2. Setting Up the Database via SQL Dump

A full SQL dump is provided at the root and in the backend folder:
- **`dd_transport_db.sql`** (Root directory)
- **`backend/dd_transport_db.sql`**

### Step-by-Step Import in MySQL Workbench:
1. Open **MySQL Workbench**.
2. Connect to your MySQL 8 instance (Local or Railway / Cloud).
3. In the top menu, go to **Server** → **Data Import**.
4. Select **Import from Self-Contained File**.
5. Browse and select `/path/to/dd_transport_db.sql`.
6. Select **Default Target Schema**: Create new database `dd_transport_db` (or leave as self-contained).
7. Click **Start Import**.
8. Refresh your Schemas panel in MySQL Workbench. You will now see all 9 tables populated with the authentic seed records!

---

## 3. Connecting to MySQL Database in Workbench

### A. Local MySQL 8 Connection:
- **Hostname**: `127.0.0.1` or `localhost`
- **Port**: `3306`
- **Username**: `root` (or your local user)
- **Password**: Your MySQL root password
- **Default Schema**: `dd_transport_db`

**Backend `.env` configuration:**
```env
DATABASE_URL="mysql://root:YourPassword@localhost:3306/dd_transport_db"
```

### B. Railway MySQL (Cloud Production):
1. In your Railway project, add a **MySQL** plugin service.
2. Under the **Connect** tab in Railway, copy the connection variables:
   - Host (e.g. `viaduct.proxy.rlwy.net`)
   - Port (e.g. `45678`)
   - User (e.g. `root`)
   - Password (e.g. `YourGeneratedPassword`)
   - Database: `railway` or `dd_transport_db`
3. In MySQL Workbench:
   - Click the **+** icon beside MySQL Connections.
   - Set **Connection Name**: `Railway - DD Transport Prod`.
   - Paste Hostname, Port, and Username.
   - Click **Store in Vault** to input the Railway password.
   - Click **Test Connection** → Click **OK**.
4. In the Railway backend environment variables on Render or Railway, set:
```env
DATABASE_URL="mysql://root:YourGeneratedPassword@viaduct.proxy.rlwy.net:45678/railway"
```

---

## 4. Useful MySQL Verification Queries

Run these queries in MySQL Workbench query tab:

```sql
USE `dd_transport_db`;

-- 1. Verify fleet vehicles (including real truck TN 28 AD 2467)
SELECT registration_number, model_name, load_capacity_tons, availability_status, is_public 
FROM vehicles;

-- 2. Inspect active customer enquiries
SELECT enquiry_number, customer_name, customer_phone, pickup_location, delivery_location, status, quoted_amount
FROM enquiries;

-- 3. Review bookings and freight balance
SELECT booking_number, pickup_location, delivery_location, total_freight_amount, advance_amount, balance_amount, booking_status
FROM bookings;

-- 4. Check initial admin account
SELECT id, name, email, role, phone FROM admins;
```

---

## 5. Prisma Migrations & Schema Sync

If you modify `backend/prisma/schema.prisma`, sync to your MySQL database with:

```bash
cd backend
# Generate Prisma Client
npx prisma generate

# Apply migrations to live MySQL database
npx prisma migrate dev --name init

# Or push schema directly to existing MySQL database
npx prisma db push
```
