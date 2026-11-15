import React, { useState } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  XCircle,
  MapPin,
  RefreshCw,
  Phone,
  MessageCircle
} from 'lucide-react';
import { apiClient } from '../services/api';
import { WebsiteSettings } from '../types';

interface TrackPageProps {
  settings: WebsiteSettings;
}

export const TrackPage: React.FC<TrackPageProps> = ({ settings }) => {
  const [enquiryNumber, setEnquiryNumber] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryNumber.trim() || !customerPhone.trim()) {
      setErrorMessage('Please enter both your Enquiry ID and registered mobile number.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTrackingResult(null);

    try {
      const response = await apiClient.post('/tracking', {
        enquiryNumber: enquiryNumber.trim(),
        customerPhone: customerPhone.trim(),
      });

      if (response.data && response.data.success) {
        setTrackingResult(response.data.tracking);
      } else {
        setErrorMessage(response.data?.message || 'Enquiry not found matching the provided details.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Unable to track enquiry at this time. Please check your Enquiry ID and phone number.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ENQUIRY_RECEIVED':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-xs">Enquiry Received</span>;
      case 'UNDER_REVIEW':
        return <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold text-xs">Under Review</span>;
      case 'QUOTATION_SENT':
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold text-xs">Quotation Sent</span>;
      case 'CONFIRMED':
        return <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold text-xs">Booking Confirmed</span>;
      case 'IN_PROGRESS':
        return <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-bold text-xs">Lorry In Transit</span>;
      case 'COMPLETED':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-xs">Delivered & Completed</span>;
      case 'CANCELLED':
        return <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full font-bold text-xs">Cancelled</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-bold text-xs">{status}</span>;
    }
  };

  // Determine which step index is active (0 to 5)
  const getStepIndex = (status: string) => {
    const order = ['ENQUIRY_RECEIVED', 'UNDER_REVIEW', 'QUOTATION_SENT', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED'];
    const idx = order.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
            Live Status Tracker
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
            Track Transport Enquiry
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Enter your Unique Enquiry ID and registered mobile number to verify freight quotation status and lorry dispatch milestones.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Unique Enquiry ID *
                </label>
                <div className="relative">
                  <Truck className="w-4 h-4 text-brand-orange absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. DDT-2025-1001"
                    value={enquiryNumber}
                    onChange={(e) => setEnquiryNumber(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9842155670"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center space-x-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-navy hover:bg-brand-navyLight disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Enquiry with Server...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-brand-orange" />
                  <span>Track Status</span>
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center space-x-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Privacy Guaranteed:</strong> For commercial security, detailed addresses and billing documents are never exposed in public tracking.
            </span>
          </div>
        </div>

        {/* Tracking Results Stepper & Details */}
        {trackingResult && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in duration-300">
            {/* Header Result Bar */}
            <div className="bg-brand-navy text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-brand-orange uppercase font-bold tracking-wider">
                  Enquiry Reference
                </span>
                <h3 className="text-2xl font-mono font-black">{trackingResult.enquiryNumber}</h3>
                <p className="text-xs text-gray-300 mt-1">
                  Registered on: {new Date(trackingResult.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div>{getStatusBadge(trackingResult.status)}</div>
            </div>

            {/* Stepper Progress */}
            <div className="p-6 sm:p-8">
              {trackingResult.isCancelled ? (
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center space-x-3 text-rose-800 mb-6">
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">This Enquiry Was Cancelled</h4>
                    <p className="text-xs mt-0.5">Please contact our operations desk if you wish to re-open or request a new quote.</p>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Transit & Dispatch Milestones
                  </h4>

                  {/* Desktop Step Indicator */}
                  <div className="hidden sm:grid sm:grid-cols-6 gap-2">
                    {trackingResult.milestones.map((ms: any, index: number) => {
                      const activeIndex = getStepIndex(trackingResult.status);
                      const isDone = index <= activeIndex;
                      const isCurrent = index === activeIndex;

                      return (
                        <div key={ms.key} className="flex flex-col items-center text-center">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                              isCurrent
                                ? 'bg-brand-orange text-white ring-4 ring-orange-200'
                                : isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isDone ? '✓' : index + 1}
                          </div>
                          <span
                            className={`text-xs font-semibold ${
                              isCurrent ? 'text-brand-orange font-bold' : isDone ? 'text-brand-navy' : 'text-gray-400'
                            }`}
                          >
                            {ms.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Vertical Stepper */}
                  <div className="sm:hidden space-y-4">
                    {trackingResult.milestones.map((ms: any, index: number) => {
                      const activeIndex = getStepIndex(trackingResult.status);
                      const isDone = index <= activeIndex;
                      const isCurrent = index === activeIndex;

                      return (
                        <div key={ms.key} className="flex items-start space-x-3">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                              isCurrent
                                ? 'bg-brand-orange text-white ring-4 ring-orange-200'
                                : isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isDone ? '✓' : index + 1}
                          </div>
                          <div>
                            <span
                              className={`text-xs block font-bold ${
                                isCurrent ? 'text-brand-orange' : isDone ? 'text-brand-navy' : 'text-gray-400'
                              }`}
                            >
                              {ms.label}
                            </span>
                            <span className="text-[11px] text-gray-500">{ms.description}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Transit Parameters */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-6">
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-semibold">Origin Hub</span>
                  <strong className="text-brand-navy font-bold">{trackingResult.originCity}</strong>
                </div>
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-semibold">Destination Hub</span>
                  <strong className="text-brand-navy font-bold">{trackingResult.destinationCity}</strong>
                </div>
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-semibold">Goods Category</span>
                  <strong className="text-brand-navy font-bold">{trackingResult.goodsType}</strong>
                </div>
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-semibold">Lorry Type</span>
                  <strong className="text-brand-navy font-bold">{trackingResult.lorryTypePreferred}</strong>
                </div>
              </div>

              {/* Help & Support strip */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-gray-500 text-center sm:text-left">
                  Have urgent dispatch questions regarding this consignment?
                </span>
                <div className="flex gap-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="px-3 py-1.5 bg-brand-navy text-white font-bold rounded-lg hover:bg-brand-navyLight transition"
                  >
                    Call Dispatch ({settings.primaryPhone})
                  </a>
                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hi%20DD%20Transport,%20checking%20status%20for%20Enquiry%20${trackingResult.enquiryNumber}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition"
                  >
                    WhatsApp Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
