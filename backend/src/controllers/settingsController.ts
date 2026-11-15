import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';

export async function getSettings(req: Request, res: Response) {
  try {
    const settings = await DataStore.getSettings();
    return res.json({ success: true, settings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateSettings(req: Request, res: Response) {
  try {
    const updated = await DataStore.updateSettings(req.body);
    return res.json({ success: true, message: 'Settings saved successfully', settings: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
