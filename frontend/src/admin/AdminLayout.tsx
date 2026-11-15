import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  CalendarCheck2,
  Users,
  Settings,
  Layers,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { AdminUser, WebsiteSettings } from '../types';

interface AdminLayoutProps {
  adminUser: AdminUser | null;
  onLogout: () => void;
  settings: WebsiteSettings;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ adminUser, onLogout, settings }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Enquiries Management', path: '/admin/enquiries', icon: ClipboardList },
    { name: 'Fleet Management', path: '/admin/fleet', icon: Truck },
    { name: 'Bookings Management', path: '/admin/bookings', icon: CalendarCheck2 },
    { name: 'Customers Directory', path: '/admin/customers', icon: Users },
    { name: 'Services Management', path: '/admin/services', icon: Layers },
    { name: 'Routes Management', path: '/admin/routes', icon: Navigation },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-brand-navy text-white px-4 py-3 flex items-center justify-between shadow z-30">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-xl bg-white border-2 border-brand-orange overflow-hidden shadow shrink-0 flex items-center justify-center p-0.5">
            <img src={settings.logoUrl || '/images/dd_logo.jpg'} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm tracking-wide">
            DD <span className="text-brand-orange">ADMIN</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-brand-navyLight text-gray-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-brand-navy text-white z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo in Sidebar */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-xl bg-white border-2 border-brand-orange shadow overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                <img src={settings.logoUrl || '/images/dd_logo.jpg'} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-base font-black text-white tracking-tight flex items-center">
                  DD <span className="text-brand-orange ml-1">TRANSPORT</span>
                </h2>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase block">
                  Operations Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            {navigation.map((item) => {
              const IconComp = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-orange text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-brand-navyLight'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-orange'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="flex items-center space-x-3 bg-brand-navyLight/60 p-2.5 rounded-xl border border-gray-800">
            <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold text-xs flex items-center justify-center shrink-0">
              {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                {adminUser?.name || 'Operations Officer'}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium block truncate">
                {adminUser?.role || 'Administrator'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-gray-400 hover:text-brand-orange flex items-center transition"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>

            <button
              onClick={onLogout}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center font-bold"
            >
              <LogOut className="w-3 h-3 mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar inside dashboard */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 hidden md:flex items-center justify-between shadow-sm sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-500 font-medium">Head Office:</span>
            <span className="text-xs font-bold text-brand-navy">Sivakasi, Tamil Nadu</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse"></span>
              Fleet Operational
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              className="text-xs text-brand-navy hover:text-brand-orange font-bold flex items-center space-x-1"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Sub-view outlet */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
