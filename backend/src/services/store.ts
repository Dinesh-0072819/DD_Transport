import { prisma, isDatabaseConnected } from '../config/database.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// In-memory fallback dataset for seamless dev & local testing when MySQL daemon is not running
const fallbackStore = {
  admins: [
    {
      id: 'admin-mariappan-01',
      name: 'P. Mariappan',
      username: 'mariappan',
      email: 'mariappan@ddtransport.com',
      // bcrypt hash for "070280"
      passwordHash: bcrypt.hashSync('070280', 10),
      role: 'SUPER_ADMIN',
      phone: '+91 97512 63370',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'admin-dinesh-02',
      name: 'Dinesh Raja M',
      username: 'dinesh',
      email: 'dinesh@ddtransport.com',
      // bcrypt hash for "dinesh2819"
      passwordHash: bcrypt.hashSync('dinesh2819', 10),
      role: 'SUPER_ADMIN',
      phone: '+91 63799 86208',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  customers: [
    {
      id: 'cust-1',
      name: 'Murugan Trading Co.',
      phone: '9842155670',
      email: 'murugan.trading@gmail.com' as string | null,
      companyName: 'Murugan Paper & Packaging Ltd' as string | null,
      address: '12/4 Industrial Estate' as string | null,
      city: 'Sivakasi' as string | null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cust-2',
      name: 'Shree Balaji Fireworks & Prints',
      phone: '9788012345',
      email: 'balaji.prints@gmail.com' as string | null,
      companyName: 'Balaji Industries' as string | null,
      address: 'Plot 45, Naranapuram Road' as string | null,
      city: 'Sivakasi' as string | null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  categories: [
    {
      id: 'cat-1',
      name: '10-Wheeler Taurus Lorry',
      slug: '10-wheeler-taurus',
      description: 'Multi-axle heavy haulers suitable for 16-18 tons payload across highway routes.',
      defaultCapacityTons: 16.0,
      displayOrder: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-2',
      name: '12-Wheeler Heavy Duty Lorry',
      slug: '12-wheeler-taurus',
      description: 'High payload trucks up to 25 tons for heavy industrial and bulk freight.',
      defaultCapacityTons: 25.0,
      displayOrder: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-3',
      name: 'Closed Container Lorry',
      slug: 'closed-container',
      description: 'All-weather waterproof containers protecting high-value and moisture-sensitive cargo.',
      defaultCapacityTons: 10.0,
      displayOrder: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-4',
      name: 'Medium 6-Wheeler Lorry',
      slug: 'medium-6-wheeler',
      description: 'Agile 6-wheeler trucks ideal for intra-state distribution and fast regional dispatch.',
      defaultCapacityTons: 9.0,
      displayOrder: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  vehicles: [
    {
      id: 'veh-1',
      categoryId: 'cat-1',
      registrationNumber: 'TN 28 AD 2467',
      modelName: 'Ashok Leyland 2518 Taurus',
      loadCapacityTons: 16.0,
      bodyType: 'Open High-Side Platform Body',
      dimensions: '24ft Length x 8ft Width x 7ft Height',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      description: 'Flagship Ashok Leyland 10-wheeler multi-axle lorry with heavy tarpaulin protection. Perfect for industrial goods, paper rolls, and full truck loads.',
      availabilityStatus: 'AVAILABLE',
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'veh-2',
      categoryId: 'cat-2',
      registrationNumber: 'TN 67 B 8912',
      modelName: 'Ashok Leyland 3118 Multi-Axle',
      loadCapacityTons: 25.0,
      bodyType: 'Heavy Duty Open Body',
      dimensions: '28ft Length x 8ft Width x 7.5ft Height',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      description: '25-ton heavy multi-axle carrier engineered for heavy engineering consignments, steel pipes, and large batch industrial logistics.',
      availabilityStatus: 'AVAILABLE',
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'veh-3',
      categoryId: 'cat-3',
      registrationNumber: 'TN 58 AX 4450',
      modelName: 'Eicher Pro 3019 Container',
      loadCapacityTons: 10.0,
      bodyType: 'Fully Enclosed Steel Container',
      dimensions: '22ft Length x 7.8ft Width x 8ft Height',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      description: 'Lockable waterproof container truck ensuring tamper-proof transit for commercial printing, packaging, and high-value cargo.',
      availabilityStatus: 'AVAILABLE',
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'veh-4',
      categoryId: 'cat-4',
      registrationNumber: 'TN 69 D 3119',
      modelName: 'Tata LPT 1613 Medium Goods Truck',
      loadCapacityTons: 9.0,
      bodyType: 'Wooden Deck Open Body',
      dimensions: '19ft Length x 7.5ft Width x 6.5ft Height',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      description: 'Versatile 6-wheeler truck optimized for agile city entry, regional warehouse links, and medium-sized industrial consignments.',
      availabilityStatus: 'ON_TRIP',
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  services: [
    {
      id: 'srv-1',
      title: 'Full Load Transportation',
      slug: 'full-load-transportation',
      shortDescription: 'Dedicated point-to-point lorries ensuring direct transit without midway loading delays.',
      fullDescription: 'Our Full Truck Load (FTL) service is engineered for shippers requiring dedicated trucks for bulk consignments. With dedicated lorries, direct origin-to-destination transit, and zero transshipment, your goods remain secure and intact from dispatch to delivery.',
      features: '["Direct door-to-door transit", "No transshipment or damage risk", "GPS tracked fleet availability", "Guaranteed dispatch times"]',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      iconName: 'Truck',
      displayOrder: 1,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'srv-2',
      title: 'Industrial Goods Transportation',
      slug: 'industrial-goods-transportation',
      shortDescription: 'Secure freight handling for manufacturing machinery, spare parts, and heavy equipment.',
      fullDescription: 'Tailored logistics for heavy machinery, fabrication goods, packaging materials, and raw industrial components. Our experienced heavy-duty drivers adhere strictly to tie-down and safety protocols.',
      features: '["Heavy payload multi-axle lorries", "Tarpaulin water-proof protection", "Trained loaders & experienced drivers", "Priority transit corridors"]',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      iconName: 'Factory',
      displayOrder: 2,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'srv-3',
      title: 'Commercial Goods Transportation',
      slug: 'commercial-goods-transportation',
      shortDescription: 'Reliable transit for paper reams, finished cartons, retail stock, and packaging goods.',
      fullDescription: 'Sivakasi is renowned for premier printing, packaging, and paper industries. DD Transport handles commercial goods with extreme precision, moisture-proof tarpaulins, and careful stacking.',
      features: '["Moisture and weather protection", "Spacious high-volume bodies", "Scheduled dispatches for wholesalers", "Prompt electronic proof of delivery"]',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      iconName: 'PackageCheck',
      displayOrder: 3,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'srv-4',
      title: 'Agricultural Goods Transportation',
      slug: 'agricultural-goods-transportation',
      shortDescription: 'Fast transit for agricultural yields, grain sacks, cotton bales, and agro-inputs.',
      fullDescription: 'Time-sensitive agricultural transport ensures farm products, grain harvests, fertilizer bags, and seeds reach processing plants and major mandis swiftly.',
      features: '["Ventilated or open body options", "Fast turnaround time", "Handling seasonal surge capacity", "Direct farm-to-warehouse dispatch"]',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      iconName: 'Wheat',
      displayOrder: 4,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'srv-5',
      title: 'Construction Material Transportation',
      slug: 'construction-material-transportation',
      shortDescription: 'Heavy-duty transport for cement, steel rods, tiles, pipes, and building hardware.',
      fullDescription: 'High-payload lorries built to transport heavy construction inventory including structural steel, cement sacks, tiles, aggregates, and sanitary hardware safely to project sites.',
      features: '["Robust multi-axle chassis", "High weight tolerance", "Direct on-site unloading capability", "Flexible trip scheduling"]',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      iconName: 'HardHat',
      displayOrder: 5,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'srv-6',
      title: 'Local Transportation',
      slug: 'local-transportation',
      shortDescription: 'Rapid intra-state transport across Sivakasi, Madurai, Virudhunagar, Rajapalayam, and nearby hubs.',
      fullDescription: 'Daily short-haul lorry services connecting regional clusters, industrial estates, and distribution centres with same-day or next-morning delivery guarantee.',
      features: '["Same-day & next-day delivery", "Deep local route knowledge", "Flexible pick-up time windows", "Economical regional freight"]',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      iconName: 'MapPin',
      displayOrder: 6,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'srv-7',
      title: 'Long-Distance Transportation',
      slug: 'long-distance-transportation',
      shortDescription: 'End-to-end interstate transport across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and North India.',
      fullDescription: 'Long-distance express freight with experienced highway drivers, national permit documentation, checkpoint compliance, and 24/7 status tracking for hassle-free interstate transport.',
      features: '["All-India national permit lorries", "24/7 active route coordination", "Toll & border checkpoint clearance", "Insured cargo support options"]',
      imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
      iconName: 'Navigation',
      displayOrder: 7,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  enquiries: [
    {
      id: 'enq-1001',
      enquiryNumber: 'DDT-2025-1001',
      customerId: 'cust-1',
      customerName: 'Murugan Trading Co.',
      customerPhone: '9842155670',
      customerEmail: 'murugan.trading@gmail.com',
      pickupLocation: 'Sivakasi, Tamil Nadu',
      deliveryLocation: 'Chennai Koyambedu, Tamil Nadu',
      goodsType: 'Printed Paper Cartons & Books',
      weightApprox: '16 Tons',
      lorryTypePreferred: '10-Wheeler Taurus Lorry',
      preferredDate: new Date(Date.now() + 86400000 * 2),
      additionalRequirements: 'Requires double heavy tarpaulin against rain. Driver should call before gate entry.',
      status: 'QUOTATION_SENT',
      quotedAmount: 28500,
      adminNotes: 'Quotation sent via phone & WhatsApp to Mr. Murugan at Rs. 28,500 all inclusive.',
      ipAddress: '127.0.0.1',
      createdAt: new Date(Date.now() - 86400000 * 3),
      updatedAt: new Date(Date.now() - 86400000 * 2),
      notes: [
        {
          id: 'note-1',
          enquiryId: 'enq-1001',
          authorName: 'P. Mariappan',
          note: 'Customer requested vehicle arrival by 6:00 PM for night loading.',
          createdAt: new Date(Date.now() - 86400000 * 2),
        },
      ],
    },
  ],
  bookings: [
    {
      id: 'bk-501',
      bookingNumber: 'BK-2025-0501',
      enquiryId: 'enq-1001',
      customerId: 'cust-1',
      vehicleId: 'veh-1',
      driverName: 'R. Kasi',
      driverPhone: '+91 94431 88721',
      pickupLocation: 'Sivakasi, Tamil Nadu',
      deliveryLocation: 'Chennai Koyambedu, Tamil Nadu',
      pickupDate: new Date(Date.now() + 86400000),
      deliveryDate: new Date(Date.now() + 86400000 * 2),
      goodsType: 'Printed Paper Cartons & Books',
      totalFreightAmount: 28500,
      advanceAmount: 10000,
      balanceAmount: 18500,
      bookingStatus: 'CONFIRMED',
      remarks: 'Driver assigned, loading scheduled at 6:00 PM.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  routes: [
    {
      id: 'rt-1',
      origin: 'Sivakasi',
      destination: 'Coimbatore (Peelamedu / Singanallur / Gandhipuram)',
      distance: '260 km',
      duration: '6 - 7 Hours',
      highways: 'NH 209 & NH 83 via Dindigul, Oddanchatram, Dharapuram & Palladam',
      typicalCargo: 'Textile Machinery, Industrial Castings, Paper Rolls, Safety Matches, Engineering Goods',
      frequency: 'Daily Departures (24/7 FTL)',
      isPopular: true,
    },
    {
      id: 'rt-2',
      origin: 'Kovilpatti',
      destination: 'Coimbatore (Industrial Estates & City Hubs)',
      distance: '290 km',
      duration: '6.5 - 7.5 Hours',
      highways: 'NH 44 & NH 83 via Sattur, Virudhunagar, Dindigul & Palladam',
      typicalCargo: 'Matches, Agro Products, Steel Fabrication, Industrial Components',
      frequency: 'Daily Departures',
      isPopular: true,
    },
    {
      id: 'rt-3',
      origin: 'Sivakasi / Kovilpatti',
      destination: 'Tiruppur (Textile & Garment Export Hub)',
      distance: '245 km',
      duration: '5.5 - 6.5 Hours',
      highways: 'via Dindigul, Dharapuram & Kangeyam',
      typicalCargo: 'Corrugated Boxes, Printed Cartons, Garment Packaging, Yarn, Textiles',
      frequency: 'Daily Direct Dispatch',
      isPopular: true,
    },
    {
      id: 'rt-4',
      origin: 'Sivakasi / Kovilpatti',
      destination: 'Palladam & Sulur (Textile & Weaving Hub)',
      distance: '235 km',
      duration: '5 - 6 Hours',
      highways: 'via Dharapuram & Kundadam Corridor',
      typicalCargo: 'Spinning Mill Freight, Feed Machinery, Industrial Fabrication, Paper Goods',
      frequency: 'Daily Scheduled Trips',
      isPopular: true,
    },
    {
      id: 'rt-5',
      origin: 'Sivakasi / Kovilpatti',
      destination: 'Pollachi & Udumalaipettai',
      distance: '230 km',
      duration: '5.5 - 6 Hours',
      highways: 'via Madurai, Dindigul & Palani Highway',
      typicalCargo: 'Agro Machinery, Coir & Coconut Products, Commercial Freight, Raw Materials',
      frequency: 'Daily Scheduled Runs',
      isPopular: true,
    },
    {
      id: 'rt-6',
      origin: 'Sivakasi / Kovilpatti',
      destination: 'Dharapuram & Kangeyam',
      distance: '190 km',
      duration: '4.5 - 5 Hours',
      highways: 'NH 83 via Oddanchatram & Dharapuram Bypass',
      typicalCargo: 'Rice Mills & Oil Expeller Goods, Matches, Agricultural & Packaging Cargo',
      frequency: 'Daily Scheduled Runs',
      isPopular: true,
    },
    {
      id: 'rt-7',
      origin: 'Sivakasi / Kovilpatti',
      destination: 'Palani & Oddanchatram',
      distance: '165 km',
      duration: '3.5 - 4 Hours',
      highways: 'via Sempatty & Oddanchatram Market Corridor',
      typicalCargo: 'Commercial Packaged Goods, Market Produce, Fireworks & Matches',
      frequency: 'Multiple Daily Trips',
      isPopular: true,
    },
    {
      id: 'rt-8',
      origin: 'Sivakasi / Kovilpatti',
      destination: 'Dindigul & Madurai (Transit Corridor)',
      distance: '75 - 140 km',
      duration: '1.5 - 3 Hours',
      highways: 'NH 44 / NH 38 Four-Lane Expressway',
      typicalCargo: 'Hardware Spares, Agro Commodities, Paper Reams, General Commercial Cargo',
      frequency: 'Continuous Daily Dispatch',
      isPopular: true,
    },
    {
      id: 'rt-9',
      origin: 'Coimbatore',
      destination: 'Sivakasi & Kovilpatti (Return Route)',
      distance: '260 - 290 km',
      duration: '6 - 7.5 Hours',
      highways: 'NH 83 & NH 44 via Palladam, Dharapuram, Oddanchatram & Madurai',
      typicalCargo: 'Engineering Castings, Pumps, Motors, Wet Grinders, Cotton Bales & Machine Parts',
      frequency: 'Daily Return Loads Available',
      isPopular: true,
    },
  ],
  settings: {
    id: 'default',
    companyName: 'DD Transport',
    tagline: 'Reliable Transport. On-Time Delivery.',
    proprietorName: 'P. Mariappan',
    primaryPhone: '+91 97512 63370',
    secondaryPhone: '+91 63799 86208',
    whatsappNumber: '+91 97512 63370',
    businessEmail: 'ddtransport.loads@gmail.com',
    headOfficeAddress: '6/400, Bose Colony, Naranapuram Road, Sivakasi - 626 189, Tamil Nadu, India',
    operatingHours: '24 Hours Lorry Fleet Operations | Office: 8:00 AM - 9:00 PM',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Naranapuram+Road+Sivakasi+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed',
    aboutCompany: 'DD Transport is a premier goods transportation and lorry logistics provider based in Sivakasi, Tamil Nadu. Established by Prop. P. Mariappan, we specialize in safe, dedicated Full Truck Load (FTL) services connecting South India to destinations nationwide.',
    ourStory: 'Founded in Sivakasi, the industrial manufacturing hub of Tamil Nadu, DD Transport was built on three core pillars: prompt punctuality, absolute cargo safety, and fair pricing. With our dedicated fleet including Ashok Leyland Taurus multi-axle lorries, we serve major commercial manufacturers, agricultural producers, and national distributors.',
    missionStatement: 'To provide seamless, secure, and on-time lorry transport logistics across Tamil Nadu and Interstate corridors with dedicated customer support.',
    visionStatement: 'To be the most dependable and sought-after transportation company in Tamil Nadu, recognized for fleet excellence and uncompromised cargo safety.',
    heroHeading: 'Reliable Lorry Transport & Logistics Solutions',
    heroSubheading: 'Moving Your Goods Safely, Efficiently and On Time.',
    logoUrl: '/images/dd_logo.jpg',
    updatedAt: new Date(),
  },
};

export const DataStore = {
  // Admin queries
  async findAdminByEmail(identifier: string) {
    const clean = identifier.trim().toLowerCase();
    if (isDatabaseConnected) {
      try {
        return await prisma.admin.findFirst({
          where: {
            OR: [
              { email: clean },
              { email: `${clean}@ddtransport.com` }
            ]
          }
        });
      } catch {}
    }
    return (
      fallbackStore.admins.find(
        (a) =>
          a.email.toLowerCase() === clean ||
          a.username.toLowerCase() === clean ||
          a.email.toLowerCase() === `${clean}@ddtransport.com`
      ) || null
    );
  },

  async findAdminById(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.admin.findUnique({ where: { id } });
      } catch {}
    }
    return fallbackStore.admins.find((a) => a.id === id) || null;
  },

  // Vehicles
  async getVehicles(filters?: { isPublic?: boolean; categoryId?: string; search?: string }) {
    if (isDatabaseConnected) {
      try {
        const where: any = {};
        if (filters?.isPublic !== undefined) where.isPublic = filters.isPublic;
        if (filters?.categoryId) where.categoryId = filters.categoryId;
        if (filters?.search) {
          where.OR = [
            { registrationNumber: { contains: filters.search } },
            { modelName: { contains: filters.search } },
            { bodyType: { contains: filters.search } },
          ];
        }
        return await prisma.vehicle.findMany({
          where,
          include: { category: true },
          orderBy: { createdAt: 'desc' },
        });
      } catch {}
    }
    let list = [...fallbackStore.vehicles];
    if (filters?.isPublic !== undefined) list = list.filter((v) => v.isPublic === filters.isPublic);
    if (filters?.categoryId) list = list.filter((v) => v.categoryId === filters.categoryId);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((v) => v.registrationNumber.toLowerCase().includes(q) || v.modelName.toLowerCase().includes(q));
    }
    return list.map((v) => ({
      ...v,
      category: fallbackStore.categories.find((c) => c.id === v.categoryId),
    }));
  },

  async getVehicleById(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.vehicle.findUnique({ where: { id }, include: { category: true } });
      } catch {}
    }
    const veh = fallbackStore.vehicles.find((v) => v.id === id);
    if (!veh) return null;
    return {
      ...veh,
      category: fallbackStore.categories.find((c) => c.id === veh.categoryId),
    };
  },

  async createVehicle(data: any) {
    const id = data.id || `veh-${crypto.randomUUID().slice(0, 8)}`;
    if (isDatabaseConnected) {
      try {
        return await prisma.vehicle.create({ data: { ...data, id }, include: { category: true } });
      } catch {}
    }
    const newVeh = {
      id,
      ...data,
      loadCapacityTons: Number(data.loadCapacityTons),
      availabilityStatus: data.availabilityStatus || 'AVAILABLE',
      isPublic: data.isPublic !== undefined ? data.isPublic : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fallbackStore.vehicles.unshift(newVeh);
    return {
      ...newVeh,
      category: fallbackStore.categories.find((c) => c.id === newVeh.categoryId),
    };
  },

  async updateVehicle(id: string, data: any) {
    if (isDatabaseConnected) {
      try {
        return await prisma.vehicle.update({ where: { id }, data, include: { category: true } });
      } catch {}
    }
    const idx = fallbackStore.vehicles.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    fallbackStore.vehicles[idx] = {
      ...fallbackStore.vehicles[idx],
      ...data,
      updatedAt: new Date(),
    };
    return {
      ...fallbackStore.vehicles[idx],
      category: fallbackStore.categories.find((c) => c.id === fallbackStore.vehicles[idx].categoryId),
    };
  },

  async deleteVehicle(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.vehicle.delete({ where: { id } });
      } catch {}
    }
    const idx = fallbackStore.vehicles.findIndex((v) => v.id === id);
    if (idx !== -1) {
      return fallbackStore.vehicles.splice(idx, 1)[0];
    }
    return null;
  },

  // Categories
  async getCategories() {
    if (isDatabaseConnected) {
      try {
        return await prisma.vehicleCategory.findMany({ orderBy: { displayOrder: 'asc' } });
      } catch {}
    }
    return fallbackStore.categories;
  },

  // Enquiries
  async getEnquiries(params?: { search?: string; status?: string; page?: number; limit?: number }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    if (isDatabaseConnected) {
      try {
        const where: any = {};
        if (params?.status) where.status = params.status;
        if (params?.search) {
          where.OR = [
            { customerName: { contains: params.search } },
            { customerPhone: { contains: params.search } },
            { enquiryNumber: { contains: params.search } },
            { pickupLocation: { contains: params.search } },
            { deliveryLocation: { contains: params.search } },
          ];
        }
        const [total, items] = await Promise.all([
          prisma.enquiry.count({ where }),
          prisma.enquiry.findMany({
            where,
            include: { notes: { orderBy: { createdAt: 'desc' } } },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
          }),
        ]);
        return { total, items, page, limit, totalPages: Math.ceil(total / limit) };
      } catch {}
    }

    let list = [...fallbackStore.enquiries];
    if (params?.status) list = list.filter((e) => e.status === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (e) =>
          e.customerName.toLowerCase().includes(q) ||
          e.customerPhone.includes(q) ||
          e.enquiryNumber.toLowerCase().includes(q)
      );
    }
    const total = list.length;
    const items = list.slice(skip, skip + limit);
    return { total, items, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async getEnquiryById(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.enquiry.findUnique({
          where: { id },
          include: { notes: { orderBy: { createdAt: 'desc' } } },
        });
      } catch {}
    }
    return fallbackStore.enquiries.find((e) => e.id === id) || null;
  },

  async getEnquiryForTracking(enquiryNumber: string, phone: string) {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (isDatabaseConnected) {
      try {
        const enquiry = await prisma.enquiry.findFirst({
          where: {
            enquiryNumber: { equals: enquiryNumber.trim() },
          },
          include: {
            bookings: {
              include: { vehicle: true },
            },
          },
        });
        if (enquiry && enquiry.customerPhone.replace(/\D/g, '').slice(-10) === cleanPhone) {
          return enquiry;
        }
        return null;
      } catch {}
    }

    const item = fallbackStore.enquiries.find(
      (e) =>
        e.enquiryNumber.toUpperCase() === enquiryNumber.trim().toUpperCase() &&
        e.customerPhone.replace(/\D/g, '').slice(-10) === cleanPhone
    );
    return item || null;
  },

  async createEnquiry(data: any) {
    const id = `enq-${crypto.randomUUID().slice(0, 8)}`;
    // Generate unique enquiry number: DDT-YYYY-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const enquiryNumber = `DDT-${year}-${randomSuffix}`;

    // Link or create customer
    let customerId = data.customerId;
    const phone = data.customerPhone.trim();
    const existingCust = fallbackStore.customers.find((c) => c.phone.replace(/\D/g, '').slice(-10) === phone.replace(/\D/g, '').slice(-10));
    if (existingCust) {
      customerId = existingCust.id;
    } else {
      const newCust: any = {
        id: `cust-${crypto.randomUUID().slice(0, 8)}`,
        name: data.customerName,
        phone: data.customerPhone,
        email: data.customerEmail || null,
        companyName: null,
        address: null,
        city: data.pickupLocation.split(',')[0]?.trim() || 'Sivakasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackStore.customers.push(newCust);
      customerId = newCust.id;
    }

    if (isDatabaseConnected) {
      try {
        return await prisma.enquiry.create({
          data: {
            ...data,
            id,
            enquiryNumber,
            customerId,
            status: 'ENQUIRY_RECEIVED',
          },
        });
      } catch {}
    }

    const newEnquiry: any = {
      id,
      enquiryNumber,
      customerId,
      ...data,
      status: 'ENQUIRY_RECEIVED',
      quotedAmount: null,
      adminNotes: null,
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fallbackStore.enquiries.unshift(newEnquiry);
    return newEnquiry;
  },

  async updateEnquiry(id: string, data: any) {
    if (isDatabaseConnected) {
      try {
        return await prisma.enquiry.update({
          where: { id },
          data,
          include: { notes: true },
        });
      } catch {}
    }
    const idx = fallbackStore.enquiries.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    fallbackStore.enquiries[idx] = {
      ...fallbackStore.enquiries[idx],
      ...data,
      updatedAt: new Date(),
    };
    return fallbackStore.enquiries[idx];
  },

  async addEnquiryNote(enquiryId: string, authorName: string, note: string) {
    const id = `note-${crypto.randomUUID().slice(0, 8)}`;
    if (isDatabaseConnected) {
      try {
        return await prisma.enquiryNote.create({
          data: { id, enquiryId, authorName, note },
        });
      } catch {}
    }
    const enquiry = fallbackStore.enquiries.find((e) => e.id === enquiryId);
    if (!enquiry) return null;
    const newNote = {
      id,
      enquiryId,
      authorName,
      note,
      createdAt: new Date(),
    };
    if (!enquiry.notes) enquiry.notes = [];
    enquiry.notes.unshift(newNote);
    return newNote;
  },

  async deleteEnquiry(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.enquiry.delete({ where: { id } });
      } catch {}
    }
    const idx = fallbackStore.enquiries.findIndex((e) => e.id === id);
    if (idx !== -1) {
      return fallbackStore.enquiries.splice(idx, 1)[0];
    }
    return null;
  },

  // Bookings
  async getBookings() {
    if (isDatabaseConnected) {
      try {
        return await prisma.booking.findMany({
          include: { customer: true, vehicle: true, enquiry: true },
          orderBy: { createdAt: 'desc' },
        });
      } catch {}
    }
    return fallbackStore.bookings.map((b) => ({
      ...b,
      customer: fallbackStore.customers.find((c) => c.id === b.customerId),
      vehicle: fallbackStore.vehicles.find((v) => v.id === b.vehicleId),
      enquiry: fallbackStore.enquiries.find((e) => e.id === b.enquiryId),
    }));
  },

  async createBooking(data: any) {
    const id = `bk-${crypto.randomUUID().slice(0, 8)}`;
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const bookingNumber = `BK-${new Date().getFullYear()}-${randomSuffix}`;

    if (isDatabaseConnected) {
      try {
        return await prisma.booking.create({
          data: { ...data, id, bookingNumber },
          include: { customer: true, vehicle: true },
        });
      } catch {}
    }

    const newBooking: any = {
      id,
      bookingNumber,
      ...data,
      totalFreightAmount: Number(data.totalFreightAmount || 0),
      advanceAmount: Number(data.advanceAmount || 0),
      balanceAmount: Number(data.balanceAmount || 0),
      bookingStatus: data.bookingStatus || 'CONFIRMED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fallbackStore.bookings.unshift(newBooking);

    // If enquiryId passed, update enquiry status to CONFIRMED
    if (data.enquiryId) {
      await this.updateEnquiry(data.enquiryId, { status: 'CONFIRMED' });
    }

    return {
      ...newBooking,
      customer: fallbackStore.customers.find((c) => c.id === newBooking.customerId),
      vehicle: fallbackStore.vehicles.find((v) => v.id === newBooking.vehicleId),
    };
  },

  async updateBooking(id: string, data: any) {
    if (isDatabaseConnected) {
      try {
        return await prisma.booking.update({
          where: { id },
          data,
          include: { customer: true, vehicle: true },
        });
      } catch {}
    }
    const idx = fallbackStore.bookings.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    fallbackStore.bookings[idx] = {
      ...fallbackStore.bookings[idx],
      ...data,
      updatedAt: new Date(),
    };
    return {
      ...fallbackStore.bookings[idx],
      customer: fallbackStore.customers.find((c) => c.id === fallbackStore.bookings[idx].customerId),
      vehicle: fallbackStore.vehicles.find((v) => v.id === fallbackStore.bookings[idx].vehicleId),
    };
  },

  async deleteBooking(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.booking.delete({ where: { id } });
      } catch {}
    }
    const idx = fallbackStore.bookings.findIndex((b) => b.id === id);
    if (idx !== -1) {
      return fallbackStore.bookings.splice(idx, 1)[0];
    }
    return null;
  },

  // Customers
  async getCustomers() {
    if (isDatabaseConnected) {
      try {
        return await prisma.customer.findMany({
          include: {
            _count: { select: { enquiries: true, bookings: true } },
          },
          orderBy: { createdAt: 'desc' },
        });
      } catch {}
    }
    return fallbackStore.customers.map((c) => ({
      ...c,
      _count: {
        enquiries: fallbackStore.enquiries.filter((e) => e.customerId === c.id).length,
        bookings: fallbackStore.bookings.filter((b) => b.customerId === c.id).length,
      },
    }));
  },

  async getCustomerById(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.customer.findUnique({
          where: { id },
          include: { enquiries: true, bookings: true },
        });
      } catch {}
    }
    const cust = fallbackStore.customers.find((c) => c.id === id);
    if (!cust) return null;
    return {
      ...cust,
      enquiries: fallbackStore.enquiries.filter((e) => e.customerId === id),
      bookings: fallbackStore.bookings.filter((b) => b.customerId === id),
    };
  },

  // Services
  async getServices(isPublicOnly = false) {
    if (isDatabaseConnected) {
      try {
        const where = isPublicOnly ? { isPublic: true } : {};
        return await prisma.service.findMany({ where, orderBy: { displayOrder: 'asc' } });
      } catch {}
    }
    let list = [...fallbackStore.services];
    if (isPublicOnly) list = list.filter((s) => s.isPublic);
    return list;
  },

  async createService(data: any) {
    const id = `srv-${crypto.randomUUID().slice(0, 8)}`;
    if (isDatabaseConnected) {
      try {
        return await prisma.service.create({ data: { ...data, id } });
      } catch {}
    }
    const newSrv = {
      id,
      ...data,
      features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features || []),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fallbackStore.services.push(newSrv);
    return newSrv;
  },

  async updateService(id: string, data: any) {
    if (isDatabaseConnected) {
      try {
        return await prisma.service.update({ where: { id }, data });
      } catch {}
    }
    const idx = fallbackStore.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    fallbackStore.services[idx] = { ...fallbackStore.services[idx], ...data, updatedAt: new Date() };
    return fallbackStore.services[idx];
  },

  async deleteService(id: string) {
    if (isDatabaseConnected) {
      try {
        return await prisma.service.delete({ where: { id } });
      } catch {}
    }
    const idx = fallbackStore.services.findIndex((s) => s.id === id);
    if (idx !== -1) {
      return fallbackStore.services.splice(idx, 1)[0];
    }
    return null;
  },

  // Routes
  async getRoutes() {
    return fallbackStore.routes;
  },

  async createRoute(data: any) {
    const id = `rt-${crypto.randomUUID().slice(0, 8)}`;
    const newRoute = {
      id,
      origin: data.origin,
      destination: data.destination,
      distance: data.distance || '0 km',
      duration: data.duration || 'Flexible',
      highways: data.highways || 'Highway Link',
      typicalCargo: data.typicalCargo || 'General Freight',
      frequency: data.frequency || 'Daily on Demand',
      isPopular: data.isPopular !== undefined ? data.isPopular : true,
    };
    fallbackStore.routes.unshift(newRoute);
    return newRoute;
  },

  async updateRoute(id: string, data: any) {
    const idx = fallbackStore.routes.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    fallbackStore.routes[idx] = { ...fallbackStore.routes[idx], ...data };
    return fallbackStore.routes[idx];
  },

  async deleteRoute(id: string) {
    const idx = fallbackStore.routes.findIndex((r) => r.id === id);
    if (idx !== -1) {
      return fallbackStore.routes.splice(idx, 1)[0];
    }
    return null;
  },

  // Settings
  async getSettings() {
    if (isDatabaseConnected) {
      try {
        const s = await prisma.websiteSettings.findUnique({ where: { id: 'default' } });
        if (s) return s;
      } catch {}
    }
    return fallbackStore.settings;
  },

  async updateSettings(data: any) {
    if (isDatabaseConnected) {
      try {
        return await prisma.websiteSettings.upsert({
          where: { id: 'default' },
          update: data,
          create: { id: 'default', ...data },
        });
      } catch {}
    }
    fallbackStore.settings = { ...fallbackStore.settings, ...data, updatedAt: new Date() };
    return fallbackStore.settings;
  },

  // Dashboard Stats
  async getDashboardStats() {
    const enquiries = fallbackStore.enquiries;
    const bookings = fallbackStore.bookings;
    const vehicles = fallbackStore.vehicles;

    const totalEnquiries = enquiries.length;
    const pendingEnquiries = enquiries.filter((e) => e.status === 'ENQUIRY_RECEIVED' || e.status === 'UNDER_REVIEW').length;
    const quotationsSent = enquiries.filter((e) => e.status === 'QUOTATION_SENT').length;
    const confirmedBookings = bookings.filter((b) => b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'IN_TRANSIT').length;
    const completedBookings = bookings.filter((b) => b.bookingStatus === 'DELIVERED').length;
    const totalVehicles = vehicles.length;
    const availableVehicles = vehicles.filter((v) => v.availabilityStatus === 'AVAILABLE').length;

    return {
      totalEnquiries,
      pendingEnquiries,
      quotationsSent,
      confirmedBookings,
      completedBookings,
      totalVehicles,
      availableVehicles,
      recentEnquiries: enquiries.slice(0, 5),
      recentBookings: bookings.slice(0, 5),
      monthlyVolume: [
        { month: 'Jun', count: 18 },
        { month: 'Jul', count: 24 },
        { month: 'Aug', count: 32 },
        { month: 'Sep', count: 29 },
        { month: 'Oct', count: 42 },
        { month: 'Nov', count: 48 },
      ],
    };
  },
};
