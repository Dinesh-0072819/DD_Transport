import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';
import { VehicleSchema } from '../validators/index.js';

export async function getVehicles(req: Request, res: Response) {
  try {
    const isPublicOnly = req.query.public === 'true' || req.query.isPublic === 'true';
    const categoryId = req.query.categoryId as string | undefined;
    const search = req.query.search as string | undefined;

    const vehicles = await DataStore.getVehicles({
      isPublic: isPublicOnly ? true : undefined,
      categoryId,
      search,
    });

    const categories = await DataStore.getCategories();

    return res.json({
      success: true,
      vehicles,
      categories,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getVehicleById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const vehicle = await DataStore.getVehicleById(id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    return res.json({ success: true, vehicle });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createVehicle(req: Request, res: Response) {
  try {
    const parsed = VehicleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.errors[0]?.message });
    }

    const newVehicle = await DataStore.createVehicle(parsed.data);
    return res.status(201).json({ success: true, message: 'Vehicle added successfully', vehicle: newVehicle });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateVehicle(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const updated = await DataStore.updateVehicle(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    return res.json({ success: true, message: 'Vehicle updated successfully', vehicle: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteVehicle(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const deleted = await DataStore.deleteVehicle(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    return res.json({ success: true, message: 'Vehicle removed successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
