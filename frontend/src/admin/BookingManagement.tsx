import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  Plus,
  Search,
  Truck,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  Trash2,
  Edit,
  X,
  AlertTriangle
} from 'lucide-react';
import { apiClient } from '../services/api';
import { Booking, Vehicle, Customer } from '../types';

export const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form Fields
  const [customerId, setCustomerId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [driverName, setDriverName] = useState('R. Kasi');
  const [driverPhone, setDriverPhone] = useState('+91 94431 88721');
  const [pickupLocation, setPickupLocation] = useState('Sivakasi, Tamil Nadu');
  const [deliveryLocation, setDeliveryLocation] = useState('Chennai Koyambedu');
  const [goodsType, setGoodsType] = useState('Printed Cartons & Paper Rolls');
  const [totalFreightAmount, setTotalFreightAmount] = useState('28500');
  const [advanceAmount, setAdvanceAmount] = useState('10000');
  const [balanceAmount, setBalanceAmount] = useState('18500');
  const [bookingStatus, setBookingStatus] = useState<'CONFIRMED' | 'LOADING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'>('CONFIRMED');
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const [bookRes, vehRes, custRes] = await Promise.all([
        apiClient.get('/bookings'),
        apiClient.get('/vehicles'),
        apiClient.get('/customers'),
      ]);
      if (bookRes.data?.success) setBookings(bookRes.data.bookings || []);
      if (vehRes.data?.success) {
        setVehicles(vehRes.data.vehicles || []);
        if (vehRes.data.vehicles.length > 0 && !vehicleId) {
          setVehicleId(vehRes.data.vehicles[0].id);
        }
      }
      if (custRes.data?.success) {
        setCustomers(custRes.data.customers || []);
        if (custRes.data.customers.length > 0 && !customerId) {
          setCustomerId(custRes.data.customers[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to load bookings:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingBooking(null);
    setPickupLocation('Sivakasi, Tamil Nadu');
    setDeliveryLocation('Chennai Koyambedu');
    setGoodsType('Printed Cartons & Paper Rolls');
    setTotalFreightAmount('28500');
    setAdvanceAmount('10000');
    setBalanceAmount('18500');
    setBookingStatus('CONFIRMED');
    setRemarks('Driver assigned for night loading.');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: Booking) => {
    setEditingBooking(b);
    setCustomerId(b.customerId);
    setVehicleId(b.vehicleId || '');
    setDriverName(b.driverName || '');
    setDriverPhone(b.driverPhone || '');
    setPickupLocation(b.pickupLocation);
    setDeliveryLocation(b.deliveryLocation);
    setGoodsType(b.goodsType);
    setTotalFreightAmount(String(b.totalFreightAmount));
    setAdvanceAmount(String(b.advanceAmount));
    setBalanceAmount(String(b.balanceAmount));
    setBookingStatus(b.bookingStatus);
    setRemarks(b.remarks || '');
    setIsModalOpen(true);
  };

  const handleSaveBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const tot = Number(totalFreightAmount) || 0;
      const adv = Number(advanceAmount) || 0;
      const bal = tot - adv;

      const payload = {
        customerId,
        vehicleId: vehicleId || undefined,
        driverName: driverName.trim() || undefined,
        driverPhone: driverPhone.trim() || undefined,
        pickupLocation: pickupLocation.trim(),
        deliveryLocation: deliveryLocation.trim(),
        goodsType: goodsType.trim(),
        totalFreightAmount: tot,
        advanceAmount: adv,
        balanceAmount: bal,
        bookingStatus,
        remarks: remarks.trim() || undefined,
      };

      if (editingBooking) {
        const res = await apiClient.put(`/bookings/${editingBooking.id}`, payload);
        if (res.data?.success) {
          setBookings((prev) =>
            prev.map((b) => (b.id === editingBooking.id ? res.data.booking : b))
          );
        }
      } else {
        const res = await apiClient.post('/bookings', payload);
        if (res.data?.success) {
          setBookings((prev) => [res.data.booking, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Error saving booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await apiClient.delete(`/bookings/${deletingId}`);
      setBookings((prev) => prev.filter((b) => b.id !== deletingId));
      setDeletingId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting booking');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Confirmed</span>;
      case 'LOADING':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Loading Dock</span>;
      case 'IN_TRANSIT':
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">In Transit</span>;
      case 'DELIVERED':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Delivered</span>;
      case 'CANCELLED':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Active Bookings & Trips</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage assigned vehicles, drivers, freight balance, and delivery receipts.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Booking</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Lorry / Reg</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Total Freight</th>
                <th className="py-3 px-4">Balance Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-400">
                    No bookings logged yet. Click "Create New Booking" or approve an enquiry.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-navy">
                      {b.bookingNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {b.customer?.name || 'Consignor'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {b.vehicle?.registrationNumber || 'Not Allocated'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 truncate max-w-[150px]">
                      {b.pickupLocation} → {b.deliveryLocation}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">
                      <span className="font-bold block">{b.driverName || 'TBD'}</span>
                      <span className="text-[10px] text-gray-400">{b.driverPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-800">
                      ₹{Number(b.totalFreightAmount).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                      ₹{Number(b.balanceAmount).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(b.bookingStatus)}</td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-md"
                        title="Edit Booking"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingId(b.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md"
                        title="Delete Booking"
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

      {/* CREATE / EDIT BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
              <h3 className="font-bold text-base text-brand-navy flex items-center">
                <CalendarCheck2 className="w-5 h-5 text-brand-orange mr-2" />
                <span>{editingBooking ? 'Edit Booking' : 'New Transport Booking'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBooking} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Customer / Consignor</label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Assign Fleet Vehicle</label>
                  <select
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.registrationNumber} ({v.modelName} - {v.loadCapacityTons}T)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Driver Name</label>
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Driver Mobile</label>
                  <input
                    type="text"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Pickup Location</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Delivery Destination</label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Goods Description</label>
                <input
                  type="text"
                  value={goodsType}
                  onChange={(e) => setGoodsType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Total Freight (₹)</label>
                  <input
                    type="number"
                    value={totalFreightAmount}
                    onChange={(e) => {
                      setTotalFreightAmount(e.target.value);
                      const bal = (Number(e.target.value) || 0) - (Number(advanceAmount) || 0);
                      setBalanceAmount(String(bal));
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Advance Received (₹)</label>
                  <input
                    type="number"
                    value={advanceAmount}
                    onChange={(e) => {
                      setAdvanceAmount(e.target.value);
                      const bal = (Number(totalFreightAmount) || 0) - (Number(e.target.value) || 0);
                      setBalanceAmount(String(bal));
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Balance Due (₹)</label>
                  <input
                    type="number"
                    readOnly
                    value={balanceAmount}
                    className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg font-bold text-amber-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Trip Status</label>
                  <select
                    value={bookingStatus}
                    onChange={(e) => setBookingStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="LOADING">Loading Dock</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Remarks / Toll Notes</label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold rounded-lg shadow"
                >
                  {isSubmitting ? 'Saving...' : 'Save Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200">
            <AlertTriangle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-base font-bold text-brand-navy">Delete Booking?</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              This trip record will be removed from active logs.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
