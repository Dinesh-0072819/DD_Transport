-- ==============================================================
-- DD TRANSPORT - PRODUCTION MYSQL 8 DATABASE ARCHITECTURE
-- Database: dd_transport_db
-- Compatible with MySQL 8.x, MySQL Workbench, Railway & Render
-- ==============================================================

CREATE DATABASE IF NOT EXISTS `dd_transport_db`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `dd_transport_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. Table structure for table `admins`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
  `phone` VARCHAR(30) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. Table structure for table `customers`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(150) NULL,
  `company_name` VARCHAR(200) NULL,
  `address` TEXT NULL,
  `city` VARCHAR(100) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `customers_phone_idx` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. Table structure for table `vehicle_categories`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `vehicle_categories`;
CREATE TABLE `vehicle_categories` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `default_capacity_tons` DECIMAL(6,2) NOT NULL DEFAULT 16.00,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicle_categories_name_unique` (`name`),
  UNIQUE KEY `vehicle_categories_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. Table structure for table `vehicles`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles` (
  `id` VARCHAR(36) NOT NULL,
  `category_id` VARCHAR(36) NOT NULL,
  `registration_number` VARCHAR(50) NOT NULL,
  `model_name` VARCHAR(100) NOT NULL,
  `load_capacity_tons` DECIMAL(6,2) NOT NULL,
  `body_type` VARCHAR(100) NOT NULL,
  `dimensions` VARCHAR(100) NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `description` TEXT NULL,
  `availability_status` VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE',
  `is_public` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicles_reg_number_unique` (`registration_number`),
  CONSTRAINT `fk_vehicles_category` FOREIGN KEY (`category_id`) REFERENCES `vehicle_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. Table structure for table `services`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL,
  `short_description` TEXT NOT NULL,
  `full_description` TEXT NOT NULL,
  `features` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `icon_name` VARCHAR(50) NOT NULL DEFAULT 'Truck',
  `display_order` INT NOT NULL DEFAULT 0,
  `is_public` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 6. Table structure for table `enquiries`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `enquiries`;
CREATE TABLE `enquiries` (
  `id` VARCHAR(36) NOT NULL,
  `enquiry_number` VARCHAR(50) NOT NULL,
  `customer_id` VARCHAR(36) NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(30) NOT NULL,
  `customer_email` VARCHAR(150) NULL,
  `pickup_location` VARCHAR(255) NOT NULL,
  `delivery_location` VARCHAR(255) NOT NULL,
  `goods_type` VARCHAR(150) NOT NULL,
  `weight_approx` VARCHAR(100) NOT NULL,
  `lorry_type_preferred` VARCHAR(100) NOT NULL,
  `preferred_date` DATETIME NULL,
  `additional_requirements` TEXT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'ENQUIRY_RECEIVED',
  `quoted_amount` DECIMAL(10,2) NULL,
  `admin_notes` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `enquiries_number_unique` (`enquiry_number`),
  INDEX `enquiries_phone_idx` (`customer_phone`),
  INDEX `enquiries_number_idx` (`enquiry_number`),
  CONSTRAINT `fk_enquiries_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 7. Table structure for table `enquiry_notes`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `enquiry_notes`;
CREATE TABLE `enquiry_notes` (
  `id` VARCHAR(36) NOT NULL,
  `enquiry_id` VARCHAR(36) NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `note` TEXT NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_enquiry_notes_enquiry` FOREIGN KEY (`enquiry_id`) REFERENCES `enquiries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 8. Table structure for table `bookings`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings` (
  `id` VARCHAR(36) NOT NULL,
  `booking_number` VARCHAR(50) NOT NULL,
  `enquiry_id` VARCHAR(36) NULL,
  `customer_id` VARCHAR(36) NOT NULL,
  `vehicle_id` VARCHAR(36) NULL,
  `driver_name` VARCHAR(100) NULL,
  `driver_phone` VARCHAR(30) NULL,
  `pickup_location` VARCHAR(255) NOT NULL,
  `delivery_location` VARCHAR(255) NOT NULL,
  `pickup_date` DATETIME NULL,
  `delivery_date` DATETIME NULL,
  `goods_type` VARCHAR(150) NOT NULL,
  `total_freight_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `advance_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `balance_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `booking_status` VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
  `remarks` TEXT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookings_number_unique` (`booking_number`),
  INDEX `bookings_number_idx` (`booking_number`),
  CONSTRAINT `fk_bookings_enquiry` FOREIGN KEY (`enquiry_id`) REFERENCES `enquiries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 9. Table structure for table `website_settings`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `website_settings`;
CREATE TABLE `website_settings` (
  `id` VARCHAR(36) NOT NULL,
  `company_name` VARCHAR(150) NOT NULL DEFAULT 'DD Transport',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'Reliable Transport. On-Time Delivery.',
  `proprietor_name` VARCHAR(150) NOT NULL DEFAULT 'P. Mariappan',
  `primary_phone` VARCHAR(50) NOT NULL DEFAULT '+91 97512 63370',
  `secondary_phone` VARCHAR(50) NOT NULL DEFAULT '+91 63799 86208',
  `whatsapp_number` VARCHAR(50) NOT NULL DEFAULT '+91 97512 63370',
  `business_email` VARCHAR(150) NOT NULL DEFAULT 'contact@ddtransport.com',
  `head_office_address` TEXT NOT NULL,
  `operating_hours` VARCHAR(255) NOT NULL DEFAULT '24 Hours Lorry Fleet Operations | Office: 8:00 AM - 9:00 PM',
  `google_maps_embed_url` TEXT NULL,
  `about_company` TEXT NULL,
  `our_story` TEXT NULL,
  `mission_statement` TEXT NULL,
  `vision_statement` TEXT NULL,
  `hero_heading` VARCHAR(255) NOT NULL DEFAULT 'Reliable Lorry Transport & Logistics Solutions',
  `hero_subheading` TEXT NOT NULL,
  `logo_url` VARCHAR(500) NOT NULL DEFAULT '/images/dd_logo.jpg',
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- SEED DATA: INITIAL REAL-WORLD BUSINESS RECORDS
-- =============================================================

-- 1. Initial Admins (Mariappan & Dinesh)
INSERT INTO `admins` (`id`, `name`, `email`, `password_hash`, `role`, `phone`)
VALUES 
(
  'admin-mariappan-01',
  'P. Mariappan',
  'mariappan@ddtransport.com',
  '$2a$10$rrpvagu7j1V3jogv4J8AFuAA2S9KhguzCu3Zxk0qmHmtuVxVnMLaK',
  'SUPER_ADMIN',
  '+91 97512 63370'
),
(
  'admin-dinesh-02',
  'Dinesh Raja M',
  'dinesh@ddtransport.com',
  '$2a$10$TOj1ACar2F16yRs.yNs6iOkdnzw/SxPKCLHDzUVYBYrEP/7h5DYIm',
  'SUPER_ADMIN',
  '+91 63799 86208'
)
ON DUPLICATE KEY UPDATE `email` = `email`;

-- 2. Website Settings
INSERT INTO `website_settings` (
  `id`, `company_name`, `tagline`, `proprietor_name`, `primary_phone`, `secondary_phone`,
  `whatsapp_number`, `business_email`, `head_office_address`, `operating_hours`,
  `google_maps_embed_url`, `about_company`, `our_story`, `mission_statement`, `vision_statement`,
  `hero_heading`, `hero_subheading`, `logo_url`
) VALUES (
  'default',
  'DD Transport',
  'Reliable Transport. On-Time Delivery.',
  'P. Mariappan',
  '+91 97512 63370',
  '+91 63799 86208',
  '+91 97512 63370',
  'contact@ddtransport.com',
  '6/400, Bose Colony, Naranapuram Road, Sivakasi - 626 189, Tamil Nadu, India',
  '24 Hours Lorry Fleet Operations | Office: 8:00 AM - 9:00 PM',
  'https://maps.google.com/maps?q=Naranapuram+Road+Sivakasi+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed',
  'DD Transport is a premier goods transportation and lorry logistics provider based in Sivakasi, Tamil Nadu. Established by Prop. P. Mariappan, we specialize in safe, dedicated Full Truck Load (FTL) services connecting South India to destinations nationwide.',
  'Founded in Sivakasi, the industrial manufacturing hub of Tamil Nadu, DD Transport was built on three core pillars: prompt punctuality, absolute cargo safety, and fair pricing. With our dedicated fleet including Ashok Leyland Taurus multi-axle lorries, we serve major commercial manufacturers, agricultural producers, and national distributors.',
  'To provide seamless, secure, and on-time lorry transport logistics across Tamil Nadu and Interstate corridors with dedicated customer support.',
  'To be the most dependable and sought-after transportation company in Tamil Nadu, recognized for fleet excellence and uncompromised cargo safety.',
  'Reliable Lorry Transport & Logistics Solutions',
  'Moving Your Goods Safely, Efficiently and On Time.',
  '/images/dd_logo.jpg'
) ON DUPLICATE KEY UPDATE `id` = `id`;

-- 3. Vehicle Categories
INSERT INTO `vehicle_categories` (`id`, `name`, `slug`, `description`, `default_capacity_tons`, `display_order`, `is_active`) VALUES
('cat-1', '10-Wheeler Taurus Lorry', '10-wheeler-taurus', 'Multi-axle heavy haulers suitable for 16-18 tons payload across highway routes.', 16.00, 1, 1),
('cat-2', '12-Wheeler Heavy Duty Lorry', '12-wheeler-taurus', 'High payload trucks up to 25 tons for heavy industrial and bulk freight.', 25.00, 2, 1),
('cat-3', 'Closed Container Lorry', 'closed-container', 'All-weather waterproof containers protecting high-value and moisture-sensitive cargo.', 10.00, 3, 1),
('cat-4', 'Medium 6-Wheeler Lorry', 'medium-6-wheeler', 'Agile 6-wheeler trucks ideal for intra-state distribution and fast regional dispatch.', 9.00, 4, 1)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 4. Vehicles (Including real vehicle TN 28 AD 2467)
INSERT INTO `vehicles` (
  `id`, `category_id`, `registration_number`, `model_name`, `load_capacity_tons`,
  `body_type`, `dimensions`, `image_url`, `description`, `availability_status`, `is_public`
) VALUES
('veh-1', 'cat-1', 'TN 28 AD 2467', 'Ashok Leyland 2518 Taurus', 16.00, 'Open High-Side Platform Body', '24ft Length x 8ft Width x 7ft Height', '/images/dd_truck_1.jpg', 'Flagship Ashok Leyland 10-wheeler multi-axle lorry with heavy tarpaulin protection. Perfect for industrial goods, paper rolls, and full truck loads.', 'AVAILABLE', 1),
('veh-2', 'cat-2', 'TN 67 B 8912', 'Ashok Leyland 3118 Multi-Axle', 25.00, 'Heavy Duty Open Body', '28ft Length x 8ft Width x 7.5ft Height', '/images/dd_truck_2.jpg', '25-ton heavy multi-axle carrier engineered for heavy engineering consignments, steel pipes, and large batch industrial logistics.', 'AVAILABLE', 1),
('veh-3', 'cat-3', 'TN 58 AX 4450', 'Eicher Pro 3019 Container', 10.00, 'Fully Enclosed Steel Container', '22ft Length x 7.8ft Width x 8ft Height', '/images/dd_truck_1.jpg', 'Lockable waterproof container truck ensuring tamper-proof transit for commercial printing, packaging, and high-value cargo.', 'AVAILABLE', 1),
('veh-4', 'cat-4', 'TN 69 D 3119', 'Tata LPT 1613 Medium Goods Truck', 9.00, 'Wooden Deck Open Body', '19ft Length x 7.5ft Width x 6.5ft Height', '/images/dd_truck_2.jpg', 'Versatile 6-wheeler truck optimized for agile city entry, regional warehouse links, and medium-sized industrial consignments.', 'ON_TRIP', 1)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 5. Services
INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `full_description`, `features`, `image_url`, `icon_name`, `display_order`, `is_public`) VALUES
('srv-1', 'Full Load Transportation', 'full-load-transportation', 'Dedicated point-to-point lorries ensuring direct transit without midway loading delays.', 'Our Full Truck Load (FTL) service is engineered for shippers requiring dedicated trucks for bulk consignments. With dedicated lorries, direct origin-to-destination transit, and zero transshipment, your goods remain secure and intact from dispatch to delivery.', '["Direct door-to-door transit", "No transshipment or damage risk", "GPS tracked fleet availability", "Guaranteed dispatch times"]', '/images/dd_truck_1.jpg', 'Truck', 1, 1),
('srv-2', 'Industrial Goods Transportation', 'industrial-goods-transportation', 'Secure freight handling for manufacturing machinery, spare parts, and heavy equipment.', 'Tailored logistics for heavy machinery, fabrication goods, packaging materials, and raw industrial components. Our experienced heavy-duty drivers adhere strictly to tie-down and safety protocols.', '["Heavy payload multi-axle lorries", "Tarpaulin water-proof protection", "Trained loaders & experienced drivers", "Priority transit corridors"]', '/images/dd_truck_2.jpg', 'Factory', 2, 1),
('srv-3', 'Commercial Goods Transportation', 'commercial-goods-transportation', 'Reliable transit for paper reams, finished cartons, retail stock, and packaging goods.', 'Sivakasi is renowned for premier printing, packaging, and paper industries. DD Transport handles commercial goods with extreme precision, moisture-proof tarpaulins, and careful stacking.', '["Moisture and weather protection", "Spacious high-volume bodies", "Scheduled dispatches for wholesalers", "Prompt electronic proof of delivery"]', '/images/dd_truck_1.jpg', 'PackageCheck', 3, 1),
('srv-4', 'Agricultural Goods Transportation', 'agricultural-goods-transportation', 'Fast transit for agricultural yields, grain sacks, cotton bales, and agro-inputs.', 'Time-sensitive agricultural transport ensures farm products, grain harvests, fertilizer bags, and seeds reach processing plants and major mandis swiftly.', '["Ventilated or open body options", "Fast turnaround time", "Handling seasonal surge capacity", "Direct farm-to-warehouse dispatch"]', '/images/dd_truck_2.jpg', 'Wheat', 4, 1),
('srv-5', 'Construction Material Transportation', 'construction-material-transportation', 'Heavy-duty transport for cement, steel rods, tiles, pipes, and building hardware.', 'High-payload lorries built to transport heavy construction inventory including structural steel, cement sacks, tiles, aggregates, and sanitary hardware safely to project sites.', '["Robust multi-axle chassis", "High weight tolerance", "Direct on-site unloading capability", "Flexible trip scheduling"]', '/images/dd_truck_1.jpg', 'HardHat', 5, 1),
('srv-6', 'Local Transportation', 'local-transportation', 'Rapid intra-state transport across Sivakasi, Madurai, Virudhunagar, Rajapalayam, and nearby hubs.', 'Daily short-haul lorry services connecting regional clusters, industrial estates, and distribution centres with same-day or next-morning delivery guarantee.', '["Same-day & next-day delivery", "Deep local route knowledge", "Flexible pick-up time windows", "Economical regional freight"]', '/images/dd_truck_2.jpg', 'MapPin', 6, 1),
('srv-7', 'Long-Distance Transportation', 'long-distance-transportation', 'End-to-end interstate transport across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and North India.', 'Long-distance express freight with experienced highway drivers, national permit documentation, checkpoint compliance, and 24/7 status tracking for hassle-free interstate transport.', '["All-India national permit lorries", "24/7 active route coordination", "Toll & border checkpoint clearance", "Insured cargo support options"]', '/images/dd_truck_1.jpg', 'Navigation', 7, 1)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 6. Sample Customer
INSERT INTO `customers` (`id`, `name`, `phone`, `email`, `company_name`, `address`, `city`) VALUES
('cust-1', 'Murugan Trading Co.', '9842155670', 'murugan.trading@gmail.com', 'Murugan Paper & Packaging Ltd', '12/4 Industrial Estate', 'Sivakasi')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 7. Sample Initial Enquiry
INSERT INTO `enquiries` (
  `id`, `enquiry_number`, `customer_id`, `customer_name`, `customer_phone`, `customer_email`,
  `pickup_location`, `delivery_location`, `goods_type`, `weight_approx`, `lorry_type_preferred`,
  `preferred_date`, `additional_requirements`, `status`, `quoted_amount`, `admin_notes`
) VALUES
(
  'enq-1001',
  'DDT-2025-1001',
  'cust-1',
  'Murugan Trading Co.',
  '9842155670',
  'murugan.trading@gmail.com',
  'Sivakasi, Tamil Nadu',
  'Chennai Koyambedu, Tamil Nadu',
  'Printed Paper Cartons & Books',
  '16 Tons',
  '10-Wheeler Taurus Lorry',
  NOW() + INTERVAL 2 DAY,
  'Requires double heavy tarpaulin against rain. Driver should call before gate entry.',
  'QUOTATION_SENT',
  28500.00,
  'Quotation sent via phone & WhatsApp to Mr. Murugan at Rs. 28,500 all inclusive.'
) ON DUPLICATE KEY UPDATE `id` = `id`;

-- 8. Sample Note for Enquiry
INSERT INTO `enquiry_notes` (`id`, `enquiry_id`, `author_name`, `note`, `created_at`) VALUES
('note-1', 'enq-1001', 'P. Mariappan', 'Customer requested vehicle arrival by 6:00 PM for night loading.', NOW());
