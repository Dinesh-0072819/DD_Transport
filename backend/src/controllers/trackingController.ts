import { Request, Response } from 'express';
import { DataStore } from '../services/store.js';
import { TrackingSchema } from '../validators/index.js';

export async function trackEnquiry(req: Request, res: Response) {
  try {
    const parsed = TrackingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message || 'Please provide both Enquiry ID and registered mobile number',
      });
    }

    const { enquiryNumber, customerPhone } = parsed.data;
    const enquiry = await DataStore.getEnquiryForTracking(enquiryNumber, customerPhone);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'No enquiry found matching the provided Enquiry ID and mobile number. Please check the details and try again.',
      });
    }

    // PRIVACY REQUIREMENT:
    // Return only public tracking milestones and non-sensitive status indicators.
    // Never expose private customer address or emails.
    const milestoneSteps = [
      { key: 'ENQUIRY_RECEIVED', label: 'Enquiry Received', description: 'Your request has been logged in our system.' },
      { key: 'UNDER_REVIEW', label: 'Under Review', description: 'Our logistics team is evaluating route & vehicle availability.' },
      { key: 'QUOTATION_SENT', label: 'Quotation Sent', description: 'Competitive quotation calculated and shared with you.' },
      { key: 'CONFIRMED', label: 'Confirmed', description: 'Transport booking confirmed and scheduled.' },
      { key: 'IN_PROGRESS', label: 'In Progress / Transit', description: 'Lorry allocated and cargo movement underway.' },
      { key: 'COMPLETED', label: 'Completed', description: 'Goods successfully delivered at destination.' },
    ];

    const isCancelled = enquiry.status === 'CANCELLED';

    return res.json({
      success: true,
      tracking: {
        enquiryNumber: enquiry.enquiryNumber,
        status: enquiry.status,
        goodsType: enquiry.goodsType,
        lorryTypePreferred: enquiry.lorryTypePreferred,
        approxWeight: enquiry.weightApprox,
        originCity: enquiry.pickupLocation.split(',')[0]?.trim() || 'Origin Hub',
        destinationCity: enquiry.deliveryLocation.split(',')[0]?.trim() || 'Destination Hub',
        createdAt: enquiry.createdAt,
        updatedAt: enquiry.updatedAt,
        isCancelled,
        milestones: milestoneSteps,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Unable to track enquiry at this time' });
  }
}
