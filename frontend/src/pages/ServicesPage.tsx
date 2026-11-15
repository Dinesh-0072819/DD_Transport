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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
            Our Logistics Capabilities
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
            Freight & Lorry Transport Services
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Specialized solutions connecting factories, agricultural processors, printing mills, and construction companies across Tamil Nadu and Interstate networks.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12">
          {services
            .filter((s) => s.isPublic)
            .map((service, index) => {
              const features = parseFeatures(service.features);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id || index}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 relative min-h-[260px] lg:min-h-[380px] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={service.imageUrl || '/images/dd_truck_1.jpg'}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-brand-navy text-brand-orange p-3 rounded-xl shadow-lg border border-brand-orange/30">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Details Column */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                        <span>Service #{index + 1}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-brand-navy">{service.title}</h2>
                      <p className="text-sm text-gray-600 leading-relaxed font-normal">
                        {service.fullDescription || service.shortDescription}
                      </p>

                      {features.length > 0 && (
                        <div className="pt-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                            Key Service Features:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {features.map((feat, fidx) => (
                              <div key={fidx} className="flex items-start space-x-2 text-xs text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-4 mt-6">
                      <Link
                        to={`/quote?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow transition"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        <span>Enquire About This Service</span>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
