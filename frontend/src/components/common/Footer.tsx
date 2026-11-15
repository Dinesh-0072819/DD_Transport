import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface FooterProps {
  settings: WebsiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');

  return (
    <footer className="bg-brand-navy text-gray-300 border-t border-gray-800">
      {/* Top Banner inside Footer */}
      <div className="bg-brand-navyLight/70 border-b border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white text-lg font-bold">Have Urgent Goods to Transport from Sivakasi or Tamil Nadu?</h4>
              <p className="text-sm text-gray-400">Speak directly with Prop. P. Mariappan for immediate vehicle dispatch and competitive freight rates.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white text-brand-navy font-bold text-sm shadow hover:bg-gray-100 transition"
            >
              <Phone className="w-4 h-4 text-brand-orange mr-2" />
              <span>Call {settings.primaryPhone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanPhone}?text=Hello%20DD%20Transport,%20I%20need%20a%20lorry%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow hover:bg-emerald-500 transition"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-brand-orange bg-white shadow-md flex items-center justify-center shrink-0">
                <img
                  src={settings.logoUrl || '/images/dd_logo.jpg'}
                  alt="DD Transport Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  DD <span className="text-brand-orange">TRANSPORT</span>
                </span>
                <p className="text-[11px] text-gray-400 font-semibold">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Specialized Full Truck Load (FTL) lorry logistics provider based in Sivakasi. Connecting commercial, industrial, agricultural, and manufacturing consignors across Tamil Nadu and All-India highways.
            </p>
            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p><strong className="text-gray-300">Proprietor:</strong> {settings.proprietorName}</p>
              <p><strong className="text-gray-300">Official Domain:</strong> <a href="https://www.ddtransport.com" className="hover:text-brand-orange underline">www.ddtransport.com</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide border-b border-gray-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  About DD Transport
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Our Vehicle Fleet
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Transport Services
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Popular Routes
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Track Your Enquiry
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Get Freight Quotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Transport Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide border-b border-gray-800 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Full Truck Load (FTL)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Industrial Machinery Cargo
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Printing & Paper Cartons
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Agricultural Freight
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Construction Materials
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-brand-orange flex items-center transition">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-orange" />
                  Interstate Long Distance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details from Real Business Card */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide border-b border-gray-800 pb-2">
              Head Office Contact
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.headOfficeAddress}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${cleanPhone}`} className="hover:text-white transition">
                    {settings.primaryPhone}
                  </a>
                  {settings.secondaryPhone && (
                    <a href={`tel:${settings.secondaryPhone.replace(/\D/g, '')}`} className="hover:text-white transition text-xs text-gray-400">
                      {settings.secondaryPhone}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`mailto:${settings.businessEmail}`} className="hover:text-white transition">
                  {settings.businessEmail}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-xs leading-relaxed">{settings.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} DD Transport. All Rights Reserved. Official Website: ddtransport.com</p>
          <div className="flex items-center space-x-6">
            <span>Sivakasi, Tamil Nadu</span>
            <span>•</span>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-brand-orange flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
