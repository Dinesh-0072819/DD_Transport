import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, 'Please enter your admin username or email'),
  password: z.string().min(1, 'Password is required'),
});

export const EnquiryCreateSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Please enter a valid 10-digit mobile number'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  pickupLocation: z.string().min(2, 'Pickup location is required'),
  deliveryLocation: z.string().min(2, 'Delivery location is required'),
  goodsType: z.string().min(2, 'Goods type is required'),
  weightApprox: z.string().min(1, 'Approximate weight is required'),
  lorryTypePreferred: z.string().min(2, 'Preferred lorry type is required'),
  preferredDate: z.string().optional().or(z.literal('')),
  additionalRequirements: z.string().optional().or(z.literal('')),
});

export const EnquiryUpdateSchema = z.object({
  status: z.enum([
    'ENQUIRY_RECEIVED',
    'UNDER_REVIEW',
    'QUOTATION_SENT',
    'CONFIRMED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
  ]).optional(),
  quotedAmount: z.number().optional().nullable(),
  adminNotes: z.string().optional().nullable(),
});

export const TrackingSchema = z.object({
  enquiryNumber: z.string().min(3, 'Enquiry ID is required'),
  customerPhone: z.string().min(10, 'Valid mobile number is required'),
});

export const VehicleSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  registrationNumber: z.string().min(4, 'Registration number is required'),
  modelName: z.string().min(2, 'Vehicle model is required'),
  loadCapacityTons: z.number().positive('Capacity must be positive'),
  bodyType: z.string().min(2, 'Body type is required'),
  dimensions: z.string().optional().or(z.literal('')),
  imageUrl: z.string().min(1, 'Image URL is required'),
  description: z.string().optional().or(z.literal('')),
  availabilityStatus: z.enum(['AVAILABLE', 'ON_TRIP', 'UNDER_MAINTENANCE']).optional(),
  isPublic: z.boolean().optional(),
});

export const BookingSchema = z.object({
  enquiryId: z.string().optional().nullable(),
  customerId: z.string().min(1, 'Customer ID is required'),
  vehicleId: z.string().optional().nullable(),
  driverName: z.string().optional().nullable(),
  driverPhone: z.string().optional().nullable(),
  pickupLocation: z.string().min(2, 'Pickup location is required'),
  deliveryLocation: z.string().min(2, 'Delivery location is required'),
  goodsType: z.string().min(2, 'Goods type is required'),
  totalFreightAmount: z.number().min(0, 'Total freight amount must be positive'),
  advanceAmount: z.number().min(0).optional(),
  balanceAmount: z.number().min(0).optional(),
  bookingStatus: z.enum(['CONFIRMED', 'LOADING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']).optional(),
  remarks: z.string().optional().nullable(),
});

export const ServiceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  shortDescription: z.string().min(5, 'Short description is required'),
  fullDescription: z.string().min(10, 'Full description is required'),
  features: z.array(z.string()).or(z.string()),
  imageUrl: z.string().min(1, 'Image URL is required'),
  iconName: z.string().default('Truck'),
  displayOrder: z.number().default(0),
  isPublic: z.boolean().default(true),
});
