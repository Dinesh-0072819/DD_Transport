import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';
import { ServiceSchema } from '../validators/index.js';

export async function getServices(req: Request, res: Response) {
  try {
    const isPublicOnly = req.query.public === 'true' || req.query.isPublic === 'true';
    const services = await DataStore.getServices(isPublicOnly);
    return res.json({ success: true, services });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createService(req: Request, res: Response) {
  try {
    const parsed = ServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.errors[0]?.message });
    }

    const created = await DataStore.createService(parsed.data);
    return res.status(201).json({ success: true, message: 'Service added successfully', service: created });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateService(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const updated = await DataStore.updateService(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    return res.json({ success: true, message: 'Service updated successfully', service: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteService(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const deleted = await DataStore.deleteService(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    return res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
