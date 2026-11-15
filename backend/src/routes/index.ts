import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requireAuth } from '../middleware/auth.js';
import * as authController from '../controllers/authController.js';
import * as vehicleController from '../controllers/vehicleController.js';
import * as enquiryController from '../controllers/enquiryController.js';
import * as trackingController from '../controllers/trackingController.js';
import * as bookingController from '../controllers/bookingController.js';
import * as customerController from '../controllers/customerController.js';
import * as serviceController from '../controllers/serviceController.js';
import * as routeController from '../controllers/routeController.js';
import * as settingsController from '../controllers/settingsController.js';
import * as dashboardController from '../controllers/dashboardController.js';

export const apiRouter = Router();

// Rate limiter for tracking to prevent brute-forcing
const trackingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 30,
  message: { success: false, message: 'Too many tracking attempts. Please wait 15 minutes before retrying.' },
});

// Rate limiter for enquiries to prevent spam
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many enquiry submissions from this IP. Please try again shortly.' },
});

// --- AUTHENTICATION ---
apiRouter.post('/auth/login', authController.login);
apiRouter.post('/auth/logout', authController.logout);
apiRouter.get('/auth/me', requireAuth as any, authController.getMe as any);

// --- VEHICLES ---
// Public: list vehicles, view single vehicle
apiRouter.get('/vehicles', vehicleController.getVehicles);
apiRouter.get('/vehicles/:id', vehicleController.getVehicleById);
// Admin protected
apiRouter.post('/vehicles', requireAuth as any, vehicleController.createVehicle);
apiRouter.put('/vehicles/:id', requireAuth as any, vehicleController.updateVehicle);
apiRouter.delete('/vehicles/:id', requireAuth as any, vehicleController.deleteVehicle);

// --- ENQUIRIES ---
// Public: submit enquiry
apiRouter.post('/enquiries', enquiryLimiter, enquiryController.createEnquiry);
// Admin protected
apiRouter.get('/enquiries', requireAuth as any, enquiryController.getEnquiries);
apiRouter.get('/enquiries/:id', requireAuth as any, enquiryController.getEnquiryById);
apiRouter.put('/enquiries/:id', requireAuth as any, enquiryController.updateEnquiry as any);
apiRouter.post('/enquiries/:id/notes', requireAuth as any, enquiryController.addNote as any);
apiRouter.delete('/enquiries/:id', requireAuth as any, enquiryController.deleteEnquiry);

// --- TRACKING ---
// Public with rate limiting
apiRouter.post('/tracking', trackingLimiter, trackingController.trackEnquiry);

// --- BOOKINGS ---
// Admin protected
apiRouter.get('/bookings', requireAuth as any, bookingController.getBookings);
apiRouter.post('/bookings', requireAuth as any, bookingController.createBooking);
apiRouter.put('/bookings/:id', requireAuth as any, bookingController.updateBooking);
apiRouter.delete('/bookings/:id', requireAuth as any, bookingController.deleteBooking);

// --- CUSTOMERS ---
// Admin protected
apiRouter.get('/customers', requireAuth as any, customerController.getCustomers);
apiRouter.get('/customers/:id', requireAuth as any, customerController.getCustomerById);

// --- SERVICES ---
// Public: list services
apiRouter.get('/services', serviceController.getServices);
// Admin protected
apiRouter.post('/services', requireAuth as any, serviceController.createService);
apiRouter.put('/services/:id', requireAuth as any, serviceController.updateService);
apiRouter.delete('/services/:id', requireAuth as any, serviceController.deleteService);

// --- ROUTES ---
// Public: list routes
apiRouter.get('/routes', routeController.getRoutes);
// Admin protected
apiRouter.post('/routes', requireAuth as any, routeController.createRoute);
apiRouter.put('/routes/:id', requireAuth as any, routeController.updateRoute);
apiRouter.delete('/routes/:id', requireAuth as any, routeController.deleteRoute);

// --- WEBSITE SETTINGS ---
// Public: view settings
apiRouter.get('/settings', settingsController.getSettings);
// Admin protected: update settings
apiRouter.put('/settings', requireAuth as any, settingsController.updateSettings);

// --- DASHBOARD STATS ---
apiRouter.get('/dashboard/stats', requireAuth as any, dashboardController.getDashboardStats);
