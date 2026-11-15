import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Truck,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { WebsiteSettings } from '../types';

interface AboutPageProps {
  settings: WebsiteSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings }) => {
  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/dd_truck_2.jpg"
            alt="Lorry Fleet"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-orange/20 border border-brand-orange/40 px-3 py-1 rounded-md mb-4">
              <span>About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              DD Transport: Built on Reliability & Punctual Commitment
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Leading goods transportation and lorry logistics provider founded in Sivakasi, Tamil Nadu by Prop. P. Mariappan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
                Our Story & Business
              </span>
              <h2 className="text-3xl font-extrabold text-brand-navy">
                Rooted in Industrial Sivakasi, Serving Commercial Corridors
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {settings.aboutCompany}
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                {settings.ourStory}
              </p>

              <div className="bg-slate-50 border-l-4 border-brand-orange p-4 rounded-r-lg">
                <h4 className="font-bold text-brand-navy text-sm">Direct Proprietor Accountability</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Unlike anonymous digital brokers, every consignment booked with DD Transport is supervised directly by Prop. P. Mariappan and our local operations team.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100">
                <img
                  src="/images/dd_truck_1.jpg"
                  alt="DD Transport Taurus Lorry TN 28 AD 2467"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="bg-brand-navy p-5 rounded-xl text-white">
                <h4 className="font-bold text-sm text-brand-orange mb-2">Depot & Headquarters</h4>
                <p className="text-xs text-gray-300 flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>{settings.headOfficeAddress}</span>
                </p>
                <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Cell: {settings.primaryPhone}</span>
                  <span className="text-emerald-400 font-semibold">24/7 Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {settings.missionStatement}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-navy flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {settings.visionStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
              Standards
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy mt-3">
              Our Uncompromised Commitments
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Every trip is executed with disciplined road safety and commercial responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <Clock className="w-8 h-8 text-brand-orange mb-4" />
              <h4 className="text-lg font-bold text-brand-navy mb-2">On-Time Loading & Dispatch</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Vehicles arrive promptly at consignor docks as scheduled, ensuring zero bottleneck or overtime labor expenses at your warehouse.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-brand-orange mb-4" />
              <h4 className="text-lg font-bold text-brand-navy mb-2">Cargo Protection First</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We equip our lorries with heavy industrial water-proof tarpaulins, high-strength rope bindings, and corner guards to safeguard boxes and bulk goods against rain and transit vibrations.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <Users className="w-8 h-8 text-brand-orange mb-4" />
              <h4 className="text-lg font-bold text-brand-navy mb-2">Direct Communication</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                No IVR queues or unhelpful call centres. Speak directly with dispatcher and driver for real-time progress along national highways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-12 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Need a Verified Lorry for Your Goods Today?</h3>
            <p className="text-sm text-gray-400 mt-1">Get an accurate quotation or talk to Prop. P. Mariappan.</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/quote"
              className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm rounded-lg shadow"
            >
              Get a Quote
            </Link>
            <a
              href={`tel:${cleanPhone}`}
              className="px-6 py-3 bg-brand-navyLight border border-gray-600 hover:border-gray-400 text-white font-semibold text-sm rounded-lg"
            >
              Call {settings.primaryPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
