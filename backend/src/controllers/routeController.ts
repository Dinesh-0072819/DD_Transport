import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';

export async function getRoutes(req: Request, res: Response) {
  try {
    const routes = await DataStore.getRoutes();
    return res.json({ success: true, routes });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createRoute(req: Request, res: Response) {
  try {
    const { origin, destination, distance, duration, highways, typicalCargo, frequency } = req.body;
    if (!origin || !destination) {
      return res.status(400).json({ success: false, message: 'Origin and Destination are required' });
    }

    const newRoute = await DataStore.createRoute(req.body);
    return res.status(201).json({ success: true, message: 'Route added successfully', route: newRoute });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateRoute(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const updated = await DataStore.updateRoute(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    return res.json({ success: true, message: 'Route updated successfully', route: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteRoute(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const deleted = await DataStore.deleteRoute(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    return res.json({ success: true, message: 'Route deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
