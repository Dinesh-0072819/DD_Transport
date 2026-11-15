import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface NavbarProps {
  settings: WebsiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Fleet', path: '/fleet' },
    { name: 'Services', path: '/services' },
    { name: 'Routes', path: '/routes' },
    { name: 'Track Enquiry', path: '/track' },
    { name: 'Contact', path: '/contact' },
  ];

  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');

  return (
    <>
      {/* Top Notification / Contact Bar */}
      <div className="bg-brand-navy text-gray-300 text-xs py-2 px-4 border-b border-gray-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse"></span>
              24/7 Tamil Nadu & Interstate Lorry Logistics
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">Prop. {settings.proprietorName} (Sivakasi)</span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center space-x-1 hover:text-brand-orange transition-colors text-white font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>{settings.primaryPhone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanPhone}?text=Hello%20DD%20Transport,%20I%20need%20a%20lorry%20transport%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              to="/admin/login"
              className="text-gray-400 hover:text-gray-200 transition-colors text-[11px] underline"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-brand-navy py-4 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center space-x-3.5 group">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-brand-orange bg-white shadow-md flex items-center justify-center shrink-0">
                <img
                  src={settings.logoUrl || '/images/dd_logo.jpg'}
                  alt="DD Transport Logo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center">
                  DD <span className="text-brand-orange ml-1.5">TRANSPORT</span>
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-gray-300 font-semibold">
                  {settings.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-brand-navyLight border border-brand-orange/40 font-semibold shadow-inner'
                        : 'text-gray-200 hover:text-brand-orange hover:bg-brand-navyLight/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Button */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to="/quote"
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white transition-all bg-brand-orange rounded-lg shadow-md hover:bg-brand-orangeHover hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Truck className="w-4 h-4 mr-2" />
                <span>Get a Quote</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                to="/quote"
                className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-white bg-brand-orange rounded-md shadow"
              >
                Quote
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-brand-navyLight focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-navy border-t border-gray-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-brand-orange bg-brand-navyLight font-semibold'
                      : 'text-gray-200 hover:text-brand-orange hover:bg-brand-navyLight'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-2">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center space-x-2 w-full py-2.5 bg-brand-navyLight text-white rounded-lg font-medium text-sm border border-gray-700"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call {settings.primaryPhone}</span>
              </a>
              <a
                href={`https://wa.me/${cleanPhone}?text=Hello%20DD%20Transport,%20I%20need%20a%20lorry%20transport%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
