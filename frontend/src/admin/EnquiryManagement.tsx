import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  Eye,
  Trash2,
  MessageCircle,
  Phone,
  Plus,
  Send,
  CalendarCheck2,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { apiClient } from '../services/api';
import { Enquiry, EnquiryStatus } from '../types';

export const EnquiryManagement: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Status update modal state
  const [newStatus, setNewStatus] = useState<EnquiryStatus>('ENQUIRY_RECEIVED');
  const [newQuotedAmount, setNewQuotedAmount] = useState<string>('');
  const [newInternalNote, setNewInternalNote] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, [searchTerm, statusFilter]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (statusFilter !== 'ALL') params.status = statusFilter;

      const res = await apiClient.get('/enquiries', { params });
      if (res.data && res.data.success) {
        setEnquiries(res.data.items || []);
      }
    } catch (e) {
      console.error('Failed to fetch enquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setNewStatus(enq.status);
    setNewQuotedAmount(enq.quotedAmount ? String(enq.quotedAmount) : '');
    setNewInternalNote('');
  };

  const handleUpdateEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setIsUpdating(true);
    try {
      const payload: any = {
        status: newStatus,
        quotedAmount: newQuotedAmount ? Number(newQuotedAmount) : null,
      };
      if (newInternalNote.trim()) {
        payload.note = newInternalNote.trim();
      }

      const res = await apiClient.put(`/enquiries/${selectedEnquiry.id}`, payload);
      if (res.data && res.data.success) {
        // Refresh local list
        setEnquiries((prev) =>
          prev.map((item) => (item.id === selectedEnquiry.id ? res.data.enquiry : item))
        );
        setSelectedEnquiry(res.data.enquiry);
        setNewInternalNote('');
        alert('Enquiry updated successfully');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update enquiry');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!deletingId) return;
    try {
      await apiClient.delete(`/enquiries/${deletingId}`);
      setEnquiries((prev) => prev.filter((e) => e.id !== deletingId));
      if (selectedEnquiry?.id === deletingId) {
        setSelectedEnquiry(null);
      }
      setDeletingId(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ENQUIRY_RECEIVED':
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">New Enquiry</span>;
      case 'UNDER_REVIEW':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Under Review</span>;
      case 'QUOTATION_SENT':
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Quoted</span>;
      case 'CONFIRMED':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Confirmed</span>;
      case 'IN_PROGRESS':
        return <span className="bg-cyan-100 text-cyan-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">In Transit</span>;
      case 'COMPLETED':
        return <span className="bg-green-100 text-green-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Completed</span>;
      case 'CANCELLED':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  const getWhatsAppLink = (enq: Enquiry) => {
    const cleanNum = enq.customerPhone.replace(/\D/g, '');
    const quoteText = enq.quotedAmount ? `₹${enq.quotedAmount.toLocaleString('en-IN')}` : '[RATE]';
    const text = encodeURIComponent(
      `Hello ${enq.customerName},\n\nRegarding your DD Transport Enquiry *#${enq.enquiryNumber}*:\nRoute: ${enq.pickupLocation} to ${enq.deliveryLocation}\nGoods: ${enq.goodsType} (${enq.weightApprox})\n\nOur freight quotation is: *${quoteText}*.\nPlease confirm if we may arrange the vehicle.\n\nWarm regards,\nProp. P. Mariappan\nDD Transport, Sivakasi`
    );
    return `https://wa.me/${cleanNum}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Customer Transport Enquiries</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review freight requests, calculate quotations, and communicate with consignors.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone, enquiry ID or route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
          >
            <option value="ALL">All Statuses</option>
            <option value="ENQUIRY_RECEIVED">New Enquiry</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="QUOTATION_SENT">Quotation Sent</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Transit</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Enquiry ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Goods & Lorry</th>
                <th className="py-3 px-4">Quoted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-gray-400">
                    No enquiries match the selected filters.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-navy">
                      {enq.enquiryNumber}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-brand-navy block">{enq.customerName}</span>
                      <span className="text-[11px] text-gray-400">{enq.customerPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 truncate max-w-[150px]">
                      {enq.pickupLocation} → {enq.deliveryLocation}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-800 block truncate max-w-[140px]">{enq.goodsType}</span>
                      <span className="text-[11px] text-gray-500">{enq.lorryTypePreferred}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                      {enq.quotedAmount ? `₹${Number(enq.quotedAmount).toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(enq.status)}</td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDetail(enq)}
                        className="p-1.5 text-brand-navy hover:bg-slate-100 rounded-md"
                        title="View & Edit Enquiry"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={getWhatsAppLink(enq)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md inline-block"
                        title="Quote on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setDeletingId(enq.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL & STATUS UPDATE DRAWER/MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-brand-navy text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-brand-orange uppercase font-bold tracking-wider">
                  Enquiry Review & Rate Quoting
                </span>
                <h3 className="text-xl font-mono font-bold">{selectedEnquiry.enquiryNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Customer Contact */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Consignor / Customer</span>
                  <strong className="text-brand-navy text-sm font-bold">{selectedEnquiry.customerName}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <a href={`tel:${selectedEnquiry.customerPhone}`} className="text-brand-navy font-bold hover:underline">
                      {selectedEnquiry.customerPhone}
                    </a>
                    <a
                      href={getWhatsAppLink(selectedEnquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                {selectedEnquiry.customerEmail && (
                  <div className="col-span-2">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Email</span>
                    <span className="text-gray-700">{selectedEnquiry.customerEmail}</span>
                  </div>
                )}
              </div>

              {/* Route & Cargo */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-gray-500">Pickup Location:</span>
                  <strong className="text-brand-navy">{selectedEnquiry.pickupLocation}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-gray-500">Delivery Location:</span>
                  <strong className="text-brand-navy">{selectedEnquiry.deliveryLocation}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-gray-500">Goods Description:</span>
                  <strong className="text-brand-navy">{selectedEnquiry.goodsType}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-gray-500">Approximate Weight:</span>
                  <strong className="text-brand-navy">{selectedEnquiry.weightApprox}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-gray-500">Requested Lorry:</span>
                  <strong className="text-brand-navy">{selectedEnquiry.lorryTypePreferred}</strong>
                </div>
                {selectedEnquiry.additionalRequirements && (
                  <div>
                    <span className="text-gray-500 block">Tarpaulin / Special Handling:</span>
                    <span className="text-slate-700 font-medium block mt-0.5">
                      {selectedEnquiry.additionalRequirements}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdateEnquiry} className="space-y-4 border-t border-slate-200 pt-4">
                <h4 className="font-bold text-sm text-brand-navy">Update Status & Set Quoted Amount</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-500 font-bold mb-1">Enquiry Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as EnquiryStatus)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                    >
                      <option value="ENQUIRY_RECEIVED">Enquiry Received</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="QUOTATION_SENT">Quotation Sent</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="IN_PROGRESS">In Progress / Transit</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-500 font-bold mb-1">Quoted Freight (₹ INR)</label>
                    <input
                      type="number"
                      placeholder="e.g. 28500"
                      value={newQuotedAmount}
                      onChange={(e) => setNewQuotedAmount(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 font-bold mb-1">Add Operational Internal Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Quoted ₹28,500 over phone. Customer requested vehicle arrival at 7 PM."
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <a
                    href={getWhatsAppLink(selectedEnquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center space-x-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quote to Customer</span>
                  </a>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold rounded-lg shadow"
                  >
                    {isUpdating ? 'Saving...' : 'Save Updates'}
                  </button>
                </div>
              </form>

              {/* Internal Notes History */}
              {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 && (
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-bold text-gray-500 uppercase tracking-wider text-[10px] mb-2">
                    Internal Operation Notes
                  </h4>
                  <div className="space-y-2">
                    {selectedEnquiry.notes.map((note) => (
                      <div key={note.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                          <span className="font-bold text-gray-600">{note.authorName}</span>
                          <span>{new Date(note.createdAt).toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-gray-700">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-brand-navy">Delete Enquiry Record?</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              Are you sure you want to permanently delete this transport enquiry? This action cannot be reversed.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEnquiry}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
