import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  Send,
  CalendarCheck2,
  CheckCircle2,
  Truck,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Phone
} from 'lucide-react';
import { apiClient } from '../services/api';
import { DashboardStats, Enquiry, Booking, Vehicle } from '../types';

export const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/dashboard/stats');
      if (res.data && res.data.success) {
        setStats(res.data.stats);
      }
    } catch (e) {
      console.error('Failed to load dashboard stats:', e);
    } finally {
      setLoading(false);
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
      default:
        return <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Quick Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Operations Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Real-time overview of enquiries, fleet dispatch, and customer bookings.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow transition"
          >
            Manage Enquiries
          </Link>
          <button
            onClick={fetchDashboardStats}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Enquiries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-brand-navy">{stats?.totalEnquiries ?? 0}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Customer freight requests</span>
        </div>

        {/* Pending Review */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">{stats?.pendingEnquiries ?? 0}</div>
          <span className="text-[11px] text-amber-700 font-medium mt-1 block">Requires rate calculation</span>
        </div>

        {/* Quotations Sent */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quotations Sent</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-600">{stats?.quotationsSent ?? 0}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Rates communicated</span>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">{stats?.confirmedBookings ?? 0}</div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">Allocated / In Transit</span>
        </div>

        {/* Completed Trips */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed Trips</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-brand-navy">{stats?.completedBookings ?? 0}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Safely delivered PODs</span>
        </div>

        {/* Total Fleet Lorries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Fleet</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-brand-navy">{stats?.totalVehicles ?? 0}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Registered lorries</span>
        </div>

        {/* Available Fleet */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-2">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Available Lorries Right Now</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">{stats?.availableVehicles ?? 0} Available</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Ready for immediate loading at Sivakasi depot</span>
        </div>
      </div>

      {/* ACTIVITY CHART & RECENT ENQUIRIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Enquiry Activity Chart Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-brand-navy flex items-center">
                <TrendingUp className="w-4 h-4 text-brand-orange mr-1.5" />
                Monthly Freight Enquiry Volume
              </h3>
              <span className="text-[11px] text-gray-400">Past 6 Months</span>
            </div>

            {/* Custom Bar Graph */}
            <div className="space-y-3 pt-2">
              {(stats?.monthlyVolume || []).map((vol, i) => {
                const max = 50;
                const pct = Math.min(100, Math.round((vol.count / max) * 100));
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span className="font-semibold">{vol.month}</span>
                      <strong className="text-brand-navy">{vol.count} Enquiries</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-brand-navy h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-gray-500 flex justify-between items-center">
            <span>Average turnaround: <strong>18 mins</strong></span>
            <span className="text-emerald-600 font-bold">100% Response Rate</span>
          </div>
        </div>

        {/* Recent Enquiries Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-brand-navy">Recent Transport Enquiries</h3>
            <Link to="/admin/enquiries" className="text-xs text-brand-orange hover:underline font-bold">
              View All Enquiries →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-gray-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Enquiry ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Route</th>
                  <th className="py-2.5 px-3">Goods</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(stats?.recentEnquiries || []).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">
                      No recent enquiries logged yet.
                    </td>
                  </tr>
                ) : (
                  (stats?.recentEnquiries || []).map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-mono font-bold text-brand-navy">
                        {enq.enquiryNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-gray-800 block">{enq.customerName}</span>
                        <span className="text-[11px] text-gray-400">{enq.customerPhone}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-600 truncate max-w-[140px]">
                        {enq.pickupLocation.split(',')[0]} → {enq.deliveryLocation.split(',')[0]}
                      </td>
                      <td className="py-3 px-3 text-gray-600 truncate max-w-[120px]">
                        {enq.goodsType} ({enq.weightApprox})
                      </td>
                      <td className="py-3 px-3">{getStatusBadge(enq.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
