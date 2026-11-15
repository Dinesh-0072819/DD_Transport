export interface VehicleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  defaultCapacityTons: number;
  displayOrder: number;
  isActive: boolean;
}

export interface Vehicle {
  id: string;
  categoryId: string;
  category?: VehicleCategory;
  registrationNumber: string;
  modelName: string;
  loadCapacityTons: number;
  bodyType: string;
  dimensions?: string;
  imageUrl: string;
  description?: string;
  availabilityStatus: 'AVAILABLE' | 'ON_TRIP' | 'UNDER_MAINTENANCE';
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  imageUrl: string;
  iconName: string;
  displayOrder: number;
  isPublic: boolean;
}

export interface TransportRoute {
  id: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  highways: string;
  typicalCargo: string;
  frequency: string;
  isPopular?: boolean;
}

export type EnquiryStatus =
  | 'ENQUIRY_RECEIVED'
  | 'UNDER_REVIEW'
  | 'QUOTATION_SENT'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface EnquiryNote {
  id: string;
  enquiryId: string;
  authorName: string;
  note: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  enquiryNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupLocation: string;
  deliveryLocation: string;
  goodsType: string;
  weightApprox: string;
  lorryTypePreferred: string;
  preferredDate?: string;
  additionalRequirements?: string;
  status: EnquiryStatus;
  quotedAmount?: number;
  adminNotes?: string;
  notes?: EnquiryNote[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  enquiryId?: string;
  customerId: string;
  vehicleId?: string;
  customer?: Customer;
  vehicle?: Vehicle;
  driverName?: string;
  driverPhone?: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate?: string;
  deliveryDate?: string;
  goodsType: string;
  totalFreightAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  bookingStatus: 'CONFIRMED' | 'LOADING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  companyName?: string;
  address?: string;
  city?: string;
  enquiries?: Enquiry[];
  bookings?: Booking[];
  _count?: {
    enquiries: number;
    bookings: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteSettings {
  id: string;
  companyName: string;
  tagline: string;
  proprietorName: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  businessEmail: string;
  headOfficeAddress: string;
  operatingHours: string;
  googleMapsEmbedUrl?: string;
  aboutCompany: string;
  ourStory: string;
  missionStatement: string;
  visionStatement: string;
  heroHeading: string;
  heroSubheading: string;
  logoUrl: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  totalEnquiries: number;
  pendingEnquiries: number;
  quotationsSent: number;
  confirmedBookings: number;
  completedBookings: number;
  totalVehicles: number;
  availableVehicles: number;
  recentEnquiries: Enquiry[];
  recentBookings: Booking[];
  monthlyVolume: { month: string; count: number }[];
}
