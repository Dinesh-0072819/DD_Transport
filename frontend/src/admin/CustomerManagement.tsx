import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  ClipboardList,
  CalendarCheck2,
  X,
  MessageCircle
} from 'lucide-react';
import { apiClient } from '../services/api';
import { Customer } from '../types';

export const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/customers');
      if (res.data && res.data.success) {
        setCustomers(res.data.customers || []);
      }
    } catch (e) {
      console.error('Failed to load customers:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = async (c: Customer) => {
    try {
      const res = await apiClient.get(`/customers/${c.id}`);
      if (res.data?.success) {
        setSelectedCustomer(res.data.customer);
      } else {
        setSelectedCustomer(c);
      }
    } catch {
      setSelectedCustomer(c);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.companyName && c.companyName.toLowerCase().includes(q)) ||
      (c.city && c.city.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Customer Directory</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Registered commercial consignors, past freight bookings, and transport history.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone number, company or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Customer / Company</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-center">Enquiries</th>
                <th className="py-3 px-4 text-center">Bookings</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    No customers found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-brand-navy block">{cust.name}</span>
                      {cust.companyName && (
                        <span className="text-[11px] text-gray-500">{cust.companyName}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-gray-800">
                      {cust.phone}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {cust.email || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {cust.city || 'Sivakasi'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full text-[11px]">
                        {cust._count?.enquiries ?? cust.enquiries?.length ?? 1}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[11px]">
                        {cust._count?.bookings ?? cust.bookings?.length ?? 1}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <a
                        href={`https://wa.me/${cust.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md inline-block"
                        title="WhatsApp Customer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleOpenDetail(cust)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md text-xs"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Drawer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] text-brand-orange uppercase font-bold tracking-wider">Customer Profile</span>
                <h3 className="text-lg font-bold text-brand-navy">{selectedCustomer.name}</h3>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Contact Number:</span>
                <strong className="text-brand-navy">{selectedCustomer.phone}</strong>
              </div>
              {selectedCustomer.email && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-800">{selectedCustomer.email}</span>
                </div>
              )}
              {selectedCustomer.companyName && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Company Name:</span>
                  <span className="text-gray-800 font-semibold">{selectedCustomer.companyName}</span>
                </div>
              )}
              {selectedCustomer.city && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Base City:</span>
                  <span className="text-gray-800">{selectedCustomer.city}</span>
                </div>
              )}
            </div>

            {/* Past Enquiries */}
            <div className="mb-4">
              <h4 className="font-bold text-brand-navy uppercase text-[10px] tracking-wider mb-2">
                Enquiry Records ({selectedCustomer.enquiries?.length || 0})
              </h4>
              <div className="space-y-2">
                {(selectedCustomer.enquiries || []).map((e) => (
                  <div key={e.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold text-brand-navy">{e.enquiryNumber}</span>
                      <span className="font-bold text-emerald-600">{e.status}</span>
                    </div>
                    <p className="text-gray-600">{e.pickupLocation} → {e.deliveryLocation}</p>
                    <p className="text-[11px] text-gray-500">{e.goodsType} ({e.weightApprox})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Bookings */}
            <div>
              <h4 className="font-bold text-brand-navy uppercase text-[10px] tracking-wider mb-2">
                Booking Records ({selectedCustomer.bookings?.length || 0})
              </h4>
              <div className="space-y-2">
                {(selectedCustomer.bookings || []).map((b) => (
                  <div key={b.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold text-brand-navy">{b.bookingNumber}</span>
                      <span className="font-bold text-brand-orange">{b.bookingStatus}</span>
                    </div>
                    <p className="text-gray-600">{b.pickupLocation} → {b.deliveryLocation}</p>
                    <p className="font-mono font-bold text-gray-800 mt-0.5">Freight: ₹{Number(b.totalFreightAmount).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-5 text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
