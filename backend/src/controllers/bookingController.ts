import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';
import { BookingSchema } from '../validators/index.js';

export async function getBookings(req: Request, res: Response) {
  try {
    const bookings = await DataStore.getBookings();
    return res.json({ success: true, bookings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createBooking(req: Request, res: Response) {
  try {
    const parsed = BookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message,
      });
    }

    const booking = await DataStore.createBooking(parsed.data);
    return res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateBooking(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const updated = await DataStore.updateBooking(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    return res.json({ success: true, message: 'Booking updated successfully', booking: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteBooking(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const deleted = await DataStore.deleteBooking(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    return res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
