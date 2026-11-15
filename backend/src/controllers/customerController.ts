import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';

export async function getCustomers(req: Request, res: Response) {
  try {
    const customers = await DataStore.getCustomers();
    return res.json({ success: true, customers });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getCustomerById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const customer = await DataStore.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    return res.json({ success: true, customer });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
