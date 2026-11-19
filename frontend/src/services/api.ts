import axios from 'axios';
import {
  Vehicle,
  VehicleCategory,
  ServiceItem,
  Enquiry,
  Booking,
  Customer,
  WebsiteSettings,
  DashboardStats,
  AdminUser
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Attach JWT token if present in localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('dd_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Default Fallback Settings based on the authentic business card & images
export const DEFAULT_SETTINGS: WebsiteSettings = {
  id: 'settings-1',
  companyName: 'DD Transport',
  tagline: 'Reliable Transport. On-Time Delivery.',
  proprietorName: 'P. Mariappan',
  primaryPhone: '+91 97512 63370',
  secondaryPhone: '+91 63799 86208',
  whatsappNumber: '+91 97512 63370',
  businessEmail: 'contact@ddtransport.com',
  headOfficeAddress: '6/400, Bose Colony, Naranapuram Road, Sivakasi - 626 189, Tamil Nadu',
  operatingHours: '24/7 Transport Operations | Office: 8:00 AM - 9:00 PM (All Days)',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Naranapuram+Road+Sivakasi+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed',
  aboutCompany: 'DD Transport is a premier goods transportation and lorry logistics provider based in Sivakasi, Tamil Nadu. Established by Prop. P. Mariappan, we specialize in safe, dedicated Full Truck Load (FTL) services connecting South India to destinations nationwide.',
  ourStory: 'With deep roots in Sivakasi—the manufacturing capital for matches, printing, and packaging—DD Transport was founded with a single mission: to deliver unfailing freight dependability to local and regional industries. What started with dedicated routes has evolved into an agile, highly reliable transport network trusted by leading industrial houses.',
  missionStatement: 'To empower businesses with seamless, safe, and punctual freight movement across India through our verified fleet, trained drivers, and transparent customer service.',
  visionStatement: 'To be the most trusted and preferred lorry transportation partner in Tamil Nadu and South India, recognized for absolute reliability, speed, and integrity.',
  heroHeading: 'Reliable Lorry Transport & Logistics Solutions',
  heroSubheading: 'Moving Your Goods Safely, Efficiently and On Time across Tamil Nadu and All-India Routes.',
  logoUrl: '/images/dd_logo.jpg',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Full Truck Load (FTL) Transportation',
    slug: 'full-truck-load',
    shortDescription: 'Dedicated point-to-point lorries ensuring direct transit without midway loading or handling delays.',
    fullDescription: 'Our Full Truck Load (FTL) service is engineered for shippers requiring dedicated trucks for bulk consignments. With dedicated lorries, direct origin-to-destination transit, and zero transshipment, your goods remain secure and intact from dispatch to delivery.',
    features: ['Direct door-to-door transit', 'No transshipment or damage risk', 'GPS tracked fleet availability', 'Guaranteed dispatch times'],
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    iconName: 'Truck',
    displayOrder: 1,
    isPublic: true,
  },
  {
    id: 'srv-2',
    title: 'Industrial Goods Transportation',
    slug: 'industrial-goods',
    shortDescription: 'Secure freight handling for manufacturing machinery, spare parts, and heavy equipment.',
    fullDescription: 'Tailored logistics for heavy machinery, fabrication goods, packaging materials, and raw industrial components. Our experienced heavy-duty drivers adhere strictly to tie-down and safety protocols.',
    features: ['Heavy payload multi-axle lorries', 'Tarpaulin water-proof protection', 'Trained loaders & experienced drivers', 'Priority transit corridors'],
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    iconName: 'Factory',
    displayOrder: 2,
    isPublic: true,
  },
  {
    id: 'srv-3',
    title: 'Commercial Goods Transportation',
    slug: 'commercial-goods',
    shortDescription: 'Reliable transit for paper reams, finished cartons, retail stock, and packaging goods.',
    fullDescription: 'Sivakasi is renowned for premier printing, packaging, and paper industries. DD Transport handles commercial goods with extreme precision, moisture-proof tarpaulins, and careful stacking.',
    features: ['Moisture and weather protection', 'Spacious high-volume bodies', 'Scheduled dispatches for wholesalers', 'Prompt electronic proof of delivery'],
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    iconName: 'PackageCheck',
    displayOrder: 3,
    isPublic: true,
  },
  {
    id: 'srv-4',
    title: 'Agricultural Goods Transportation',
    slug: 'agricultural-goods',
    shortDescription: 'Fast transit for agricultural yields, grain sacks, cotton bales, and agro-inputs.',
    fullDescription: 'Time-sensitive agricultural transport ensures farm products, grain harvests, fertilizer bags, and seeds reach processing plants and major mandis swiftly.',
    features: ['Ventilated or open body options', 'Fast turnaround time', 'Handling seasonal surge capacity', 'Direct farm-to-warehouse dispatch'],
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    iconName: 'Wheat',
    displayOrder: 4,
    isPublic: true,
  },
  {
    id: 'srv-5',
    title: 'Construction Material Transportation',
    slug: 'construction-materials',
    shortDescription: 'Heavy-duty transport for cement, steel rods, tiles, pipes, and building hardware.',
    fullDescription: 'High-payload lorries built to transport heavy construction inventory including structural steel, cement sacks, tiles, aggregates, and sanitary hardware safely to project sites.',
    features: ['Robust multi-axle chassis', 'High weight tolerance', 'Direct on-site unloading capability', 'Flexible trip scheduling'],
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    iconName: 'HardHat',
    displayOrder: 5,
    isPublic: true,
  },
  {
    id: 'srv-6',
    title: 'Local & Regional Transportation',
    slug: 'local-transportation',
    shortDescription: 'Rapid intra-state transport across Sivakasi, Madurai, Virudhunagar, Rajapalayam, and nearby hubs.',
    fullDescription: 'Daily short-haul lorry services connecting regional clusters, industrial estates, and distribution centres with same-day or next-morning delivery guarantee.',
    features: ['Same-day & next-day delivery', 'Deep local route knowledge', 'Flexible pick-up time windows', 'Economical regional freight'],
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    iconName: 'MapPin',
    displayOrder: 6,
    isPublic: true,
  },
  {
    id: 'srv-7',
    title: 'Long-Distance & Interstate Transport',
    slug: 'long-distance-interstate',
    shortDescription: 'End-to-end interstate transport across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and North India.',
    fullDescription: 'Long-distance express freight with experienced highway drivers, national permit documentation, checkpoint compliance, and 24/7 status tracking for hassle-free interstate transport.',
    features: ['All-India national permit lorries', '24/7 active route coordination', 'Toll & border checkpoint clearance', 'Insured cargo support options'],
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    iconName: 'Navigation',
    displayOrder: 7,
    isPublic: true,
  },
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    categoryId: 'cat-taurus-10',
    category: {
      id: 'cat-taurus-10',
      name: '10-Wheeler Taurus Lorry',
      slug: '10-wheeler-taurus',
      defaultCapacityTons: 16.0,
      displayOrder: 1,
      isActive: true,
    },
    registrationNumber: 'TN 28 AD 2467',
    modelName: 'Ashok Leyland 2518 Multi-Axle Taurus',
    loadCapacityTons: 16.0,
    bodyType: 'Open High-Side Platform Body with Heavy Tarpaulin',
    dimensions: '24ft Length x 8ft Width x 7ft Height',
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    description: 'Our flagship Ashok Leyland Taurus 10-wheeler. Ideal for full truckloads of industrial goods, paper rolls, matches, and heavy bulk freight.',
    availabilityStatus: 'AVAILABLE',
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'veh-2',
    categoryId: 'cat-taurus-12',
    category: {
      id: 'cat-taurus-12',
      name: '12-Wheeler Heavy Duty Lorry',
      slug: '12-wheeler-taurus',
      defaultCapacityTons: 25.0,
      displayOrder: 2,
      isActive: true,
    },
    registrationNumber: 'TN 67 B 8912',
    modelName: 'Ashok Leyland 3118 Heavy Hauler',
    loadCapacityTons: 25.0,
    bodyType: 'Heavy Duty Open Body with Tie-Down Points',
    dimensions: '28ft Length x 8ft Width x 7.5ft Height',
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    description: 'Heavy multi-axle vehicle engineered for massive consignments, steel coils, machinery, and large batch industrial logistics.',
    availabilityStatus: 'AVAILABLE',
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'veh-3',
    categoryId: 'cat-container',
    category: {
      id: 'cat-container',
      name: 'Closed Container Lorry',
      slug: 'closed-container',
      defaultCapacityTons: 9.5,
      displayOrder: 3,
      isActive: true,
    },
    registrationNumber: 'TN 58 AX 4450',
    modelName: 'Eicher Pro 3019 Container Body',
    loadCapacityTons: 9.5,
    bodyType: 'All-Weather Closed Steel Container',
    dimensions: '22ft Length x 7.8ft Width x 8ft Height',
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    description: 'Fully enclosed lockable container lorry providing absolute protection against rain, moisture, and dust. Ideal for premium print boxes and high-value cargo.',
    availabilityStatus: 'AVAILABLE',
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'veh-4',
    categoryId: 'cat-open-medium',
    category: {
      id: 'cat-open-medium',
      name: 'Medium 6-Wheeler Lorry',
      slug: 'medium-6-wheeler',
      defaultCapacityTons: 10.0,
      displayOrder: 4,
      isActive: true,
    },
    registrationNumber: 'TN 69 D 3119',
    modelName: 'Tata LPT 1613 Medium Goods Truck',
    loadCapacityTons: 10.0,
    bodyType: 'Wooden Deck Open Body',
    dimensions: '19ft Length x 7.5ft Width x 6.5ft Height',
    imageUrl: '/images/DD_Transport_Action_Lorry_Banner.jpg',
    description: 'Versatile 6-wheeler truck optimized for agile city entry, regional warehouse links, and medium-sized industrial consignments.',
    availabilityStatus: 'ON_TRIP',
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper to interact with LocalStorage when offline or backend starting
const LOCAL_STORAGE_KEY_ENQUIRIES = 'dd_local_enquiries';
const LOCAL_STORAGE_KEY_BOOKINGS = 'dd_local_bookings';
const LOCAL_STORAGE_KEY_SETTINGS = 'dd_local_settings';
const LOCAL_STORAGE_KEY_VEHICLES = 'dd_local_vehicles';

export function getLocalStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setLocalStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage write error', e);
  }
}
