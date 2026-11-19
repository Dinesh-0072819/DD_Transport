import React from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  Factory,
  PackageCheck,
  Wheat,
  HardHat,
  MapPin,
  Navigation,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { ServiceItem, WebsiteSettings } from '../types';

interface ServicesPageProps {
  services: ServiceItem[];
  settings: WebsiteSettings;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ services, settings }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory':
        return <Factory className="w-6 h-6" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6" />;
      case 'Wheat':
        return <Wheat className="w-6 h-6" />;
      case 'HardHat':
        return <HardHat className="w-6 h-6" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6" />;
      case 'Navigation':
        return <Navigation className="w-6 h-6" />;
      default:
        return <Truck className="w-6 h-6" />;
    }
  };

  const parseFeatures = (features: any): string[] => {
    if (Array.isArray(features)) return features;
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return features.split(',').map((f) => f.trim());
      }
    }
    return [];
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
            Our Logistics Capabilities
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
            Freight & Lorry Transport Services
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Specialized solutions connecting factories, agricultural processors, printing mills, and commercial industries across Sivakasi, Kovilpatti, Coimbatore, and South India.
          </p>
        </div>

        {/* Featured Showcase: 1st Route Image, then 2nd Lorry Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto mb-14">
          {/* 1st: Route & Services Card */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-brand-navy">
            <img
              src="/images/dd_routes_card.png"
              alt="DD Transport Freight Services & Sivakasi Kovilpatti Coimbatore Routes"
              className="w-full h-auto block"
            />
          </div>

          {/* 2nd: Lorry Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-brand-navy flex flex-col justify-between">
            <img
              src="/images/dd_lorry_only.jpg"
              alt="DD Transport Ashok Leyland Taurus 10 Wheeler TN 28 AD 2467 - 16 to 20 Tons Capacity Loads"
              className="w-full h-auto block"
            />
            <div className="bg-brand-navy p-5 flex flex-col sm:flex-row items-center justify-between border-t border-brand-orange/30 gap-3">
              <div>
                <span className="text-white font-bold text-base sm:text-lg block">
                  Ashok Leyland Taurus 10-Wheeler (TN 28 AD 2467)
                </span>
                <span className="text-brand-orange font-semibold text-xs sm:text-sm block">
                  10-Wheel Lorry • 16 to 20 Tons Capacity Loads
                </span>
              </div>
              <Link
                to="/quote"
                className="inline-flex items-center px-4 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow transition shrink-0"
              >
                <Truck className="w-4 h-4 mr-1.5" />
                <span>Book Lorry</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Services List - Clean, Image-Free Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services
            .filter((s) => s.isPublic)
            .map((service, index) => {
              const features = parseFeatures(service.features);

              return (
                <div
                  key={service.id || index}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-brand-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="bg-brand-navy text-brand-orange p-2.5 rounded-xl border border-brand-orange/30 shadow-sm">
                          {getIcon(service.iconName)}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">
                            Service #{index + 1}
                          </span>
                          <h2 className="text-xl font-bold text-brand-navy">{service.title}</h2>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {service.fullDescription || service.shortDescription}
                    </p>

                    {features.length > 0 && (
                      <div className="pt-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                          Key Service Features:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {features.map((feat, fidx) => (
                            <div key={fidx} className="flex items-start space-x-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 mt-6">
                    <Link
                      to={`/quote?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center px-4 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow-sm transition"
                    >
                      <Truck className="w-3.5 h-3.5 mr-1.5" />
                      <span>Book Service</span>
                    </Link>
                    <a
                      href={`https://wa.me/${settings.primaryPhone.replace(/\D/g, '')}?text=Hello%20DD%20Transport,%20I%20am%20inquiring%20about%20${encodeURIComponent(service.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Ask on WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
