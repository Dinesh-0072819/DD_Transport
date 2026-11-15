import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const stats = await DataStore.getDashboardStats();
    return res.json({ success: true, stats });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
