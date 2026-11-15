import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';
import { EnquiryCreateSchema, EnquiryUpdateSchema } from '../validators/index.js';
import { AuthRequest } from '../middleware/auth.js';

export async function createEnquiry(req: Request, res: Response) {
  try {
    const parsed = EnquiryCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message || 'Validation error',
      });
    }

    const clientIp = req.ip || req.socket.remoteAddress;
    const enquiry = await DataStore.createEnquiry({
      ...parsed.data,
      ipAddress: clientIp,
    });

    return res.status(201).json({
      success: true,
      message: 'Transport enquiry registered successfully',
      enquiryNumber: enquiry.enquiryNumber,
      enquiry,
    });
  } catch (error: any) {
    console.error('Enquiry creation error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getEnquiries(req: Request, res: Response) {
  try {
    const search = req.query.search as string | undefined;
    const status = req.query.status as string | undefined;
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);

    const result = await DataStore.getEnquiries({ search, status, page, limit });
    return res.json({ success: true, ...result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getEnquiryById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const enquiry = await DataStore.getEnquiryById(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    return res.json({ success: true, enquiry });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateEnquiry(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string;
    const parsed = EnquiryUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message,
      });
    }

    const updated = await DataStore.updateEnquiry(id, parsed.data);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    // If a new note was supplied in req.body.note, append it
    if (req.body.note && typeof req.body.note === 'string' && req.body.note.trim()) {
      await DataStore.addEnquiryNote(
        id,
        req.user?.email || 'Operations Admin',
        req.body.note.trim()
      );
    }

    return res.json({ success: true, message: 'Enquiry updated successfully', enquiry: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function addNote(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string;
    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({ success: false, message: 'Note content is required' });
    }

    const author = req.user?.email || 'Admin';
    const createdNote = await DataStore.addEnquiryNote(id, author, note.trim());
    return res.status(201).json({ success: true, note: createdNote });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteEnquiry(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const deleted = await DataStore.deleteEnquiry(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
