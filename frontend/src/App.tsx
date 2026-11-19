import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingActions } from './components/common/FloatingWhatsApp';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FleetPage } from './pages/FleetPage';
import { ServicesPage } from './pages/ServicesPage';
import { RoutesPage } from './pages/RoutesPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { TrackPage } from './pages/TrackPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardOverview } from './admin/DashboardOverview';
import { EnquiryManagement } from './admin/EnquiryManagement';
import { FleetManagement } from './admin/FleetManagement';
import { BookingManagement } from './admin/BookingManagement';
import { CustomerManagement } from './admin/CustomerManagement';
import { ServiceManagement } from './admin/ServiceManagement';
import { RouteManagement } from './admin/RouteManagement';
import { WebsiteSettingsAdmin } from './admin/WebsiteSettingsAdmin';

import { apiClient, DEFAULT_SETTINGS, INITIAL_SERVICES, INITIAL_VEHICLES } from './services/api';
import { WebsiteSettings, Vehicle, ServiceItem, VehicleCategory, AdminUser } from './types';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(DEFAULT_SETTINGS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/admin/login';

  useEffect(() => {
    // Check existing auth token
    const token = localStorage.getItem('dd_admin_token');
    if (token) {
      apiClient
        .get('/auth/me')
        .then((res) => {
          if (res.data?.success && res.data.admin) {
            setAdminUser(res.data.admin);
          } else {
            localStorage.removeItem('dd_admin_token');
          }
        })
        .catch(() => {
          // If offline token is present
          if (token === 'dd_transport_local_dev_token') {
            const saved = localStorage.getItem('dd_admin_user');
            if (saved) {
              try {
                setAdminUser(JSON.parse(saved));
                return;
              } catch {}
            }
            setAdminUser({
              id: 'admin-mariappan-01',
              name: 'P. Mariappan',
              email: 'mariappan@ddtransport.com',
              role: 'SUPER_ADMIN',
            });
          }
        })
        .finally(() => setIsLoadingAuth(false));
    } else {
      setIsLoadingAuth(false);
    }

    // Load initial settings and public fleet
    apiClient
      .get('/settings')
      .then((res) => {
        if (res.data?.success && res.data.settings) {
          setSettings({
            ...res.data.settings,
            businessEmail: 'ddtransport.loads@gmail.com',
          });
        }
      })
      .catch((e) => console.log('Using default company settings'));

    apiClient
      .get('/vehicles')
      .then((res) => {
        if (res.data?.success) {
          if (res.data.vehicles && res.data.vehicles.length > 0) {
            setVehicles(res.data.vehicles);
          }
          if (res.data.categories) {
            setCategories(res.data.categories);
          }
        }
      })
      .catch((e) => console.log('Using initial vehicles list'));

    apiClient
      .get('/services')
      .then((res) => {
        if (res.data?.success && res.data.services && res.data.services.length > 0) {
          setServices(res.data.services);
        }
      })
      .catch((e) => console.log('Using initial services list'));
  }, []);

  const handleLoginSuccess = (token: string, admin: AdminUser) => {
    setAdminUser(admin);
  };

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {}
    localStorage.removeItem('dd_admin_token');
    setAdminUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Public Header on Customer Pages */}
      {!isAdminPath && <Navbar settings={settings} />}

      {/* Main Routes */}
      <div className="flex-1">
        <Routes>
          {/* Public Customer Pages */}
          <Route
            path="/"
            element={<HomePage settings={settings} vehicles={vehicles} services={services} />}
          />
          <Route path="/about" element={<AboutPage settings={settings} />} />
          <Route
            path="/fleet"
            element={<FleetPage vehicles={vehicles} categories={categories} />}
          />
          <Route
            path="/services"
            element={<ServicesPage services={services} settings={settings} />}
          />
          <Route path="/routes" element={<RoutesPage settings={settings} />} />
          <Route path="/quote" element={<QuotePage settings={settings} />} />
          <Route path="/contact" element={<ContactPage settings={settings} />} />
          <Route path="/track" element={<TrackPage settings={settings} />} />

          {/* Admin Login Route */}
          <Route
            path="/admin/login"
            element={
              adminUser ? (
                <Navigate to="/admin" replace />
              ) : (
                <AdminLogin onLoginSuccess={handleLoginSuccess} settings={settings} />
              )
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              adminUser ? (
                <AdminLayout adminUser={adminUser} onLogout={handleLogout} settings={settings} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="enquiries" element={<EnquiryManagement />} />
            <Route path="fleet" element={<FleetManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="routes" element={<RouteManagement />} />
            <Route
              path="settings"
              element={
                <WebsiteSettingsAdmin
                  settings={settings}
                  onUpdateSettings={(s) => setSettings(s)}
                />
              }
            />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Floating Action Buttons on Customer Pages */}
      {!isAdminPath && <FloatingActions settings={settings} />}

      {/* Public Footer on Customer Pages */}
      {!isAdminPath && <Footer settings={settings} />}
    </div>
  );
};
