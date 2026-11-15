import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, RefreshCw, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { apiClient } from '../services/api';
import { AdminUser, WebsiteSettings } from '../types';

interface AdminLoginProps {
  onLoginSuccess: (token: string, admin: AdminUser) => void;
  settings: WebsiteSettings;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, settings }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await apiClient.post('/auth/login', {
        email: email.trim(),
        password,
      });

      if (response.data && response.data.success) {
        const { token, admin } = response.data;
        localStorage.setItem('dd_admin_token', token);
        localStorage.setItem('dd_admin_user', JSON.stringify(admin));
        onLoginSuccess(token, admin);
        navigate('/admin');
      } else {
        setErrorMessage(response.data?.message || 'Invalid username or password.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        // Fallback for offline dev verification - strictly only authorized admins
        const clean = email.trim().toLowerCase();
        if (
          (clean === 'mariappan' || clean === 'mariappan@ddtransport.com') &&
          password === '070280'
        ) {
          const adminObj: AdminUser = {
            id: 'admin-mariappan-01',
            name: 'P. Mariappan',
            email: 'mariappan@ddtransport.com',
            role: 'SUPER_ADMIN',
          };
          const devToken = 'dd_transport_local_dev_token';
          localStorage.setItem('dd_admin_token', devToken);
          localStorage.setItem('dd_admin_user', JSON.stringify(adminObj));
          onLoginSuccess(devToken, adminObj);
          navigate('/admin');
        } else if (
          (clean === 'dinesh' || clean === 'dinesh@ddtransport.com') &&
          password === 'dinesh2819'
        ) {
          const adminObj: AdminUser = {
            id: 'admin-dinesh-02',
            name: 'Dinesh Raja M',
            email: 'dinesh@ddtransport.com',
            role: 'SUPER_ADMIN',
          };
          const devToken = 'dd_transport_local_dev_token';
          localStorage.setItem('dd_admin_token', devToken);
          localStorage.setItem('dd_admin_user', JSON.stringify(adminObj));
          onLoginSuccess(devToken, adminObj);
          navigate('/admin');
        } else {
          setErrorMessage('Invalid username or password.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Top Logo Branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3.5 mb-3">
            <div className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-xl bg-white border-2 border-brand-orange shadow-lg overflow-hidden shrink-0 flex items-center justify-center p-1">
              <img
                src={settings.logoUrl || '/images/dd_logo.jpg'}
                alt="DD Transport Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white tracking-tight flex items-center">
                DD <span className="text-brand-orange ml-1.5">TRANSPORT</span>
              </span>
              <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase block">
                Enterprise Logistics Management
              </span>
            </div>
          </Link>
          <p className="text-xs text-gray-400">
            Secure Administrator Portal • Restricted Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700/50">
          <div className="flex items-center space-x-2 text-brand-navy font-bold text-sm mb-6 pb-3 border-b border-slate-100">
            <Lock className="w-4 h-4 text-brand-orange" />
            <span>Administrator Authentication</span>
          </div>

          {errorMessage && (
            <div className="mb-5 flex items-center space-x-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Enter admin username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-0.5 text-gray-400 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-navy hover:bg-brand-navyLight disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-brand-orange" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
