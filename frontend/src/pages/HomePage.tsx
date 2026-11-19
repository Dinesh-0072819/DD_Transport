import React from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Award,
  Users,
  Navigation,
  FileCheck2,
  Package,
  Layers,
  Sparkles,
  Factory,
  PackageCheck,
  Wheat,
  HardHat
} from 'lucide-react';
import { WebsiteSettings, Vehicle, ServiceItem } from '../types';

interface HomePageProps {
  settings: WebsiteSettings;
  vehicles: Vehicle[];
  services: ServiceItem[];
}

export const HomePage: React.FC<HomePageProps> = ({ settings, vehicles, services }) => {
  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory':
        return <Factory className="w-5 h-5" />;
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5" />;
      case 'Wheat':
        return <Wheat className="w-5 h-5" />;
      case 'HardHat':
        return <HardHat className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'Navigation':
        return <Navigation className="w-5 h-5" />;
      default:
        return <Truck className="w-5 h-5" />;
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

  const popularRoutes = [
    { from: 'Sivakasi', to: 'Coimbatore', distance: '260 km', time: '6-7 hrs', load: 'Machinery Parts, Paper Rolls, Castings, Yarn' },
    { from: 'Kovilpatti', to: 'Coimbatore', distance: '290 km', time: '6.5-7.5 hrs', load: 'Matches, Agro Products, Industrial Spares' },
    { from: 'Sivakasi / Kovilpatti', to: 'Tiruppur', distance: '245 km', time: '5.5-6.5 hrs', load: 'Textiles, Printed Cartons, Garment Packaging' },
    { from: 'Sivakasi / Kovilpatti', to: 'Palladam & Sulur', distance: '235 km', time: '5-6 hrs', load: 'Spinning Mill Freight, Weaving & Industrial' },
    { from: 'Sivakasi / Kovilpatti', to: 'Pollachi & Udumalpet', distance: '230 km', time: '5.5-6 hrs', load: 'Agro Machinery, Coir Goods, Raw Materials' },
    { from: 'Sivakasi / Kovilpatti', to: 'Dharapuram & Kangeyam', distance: '190 km', time: '4.5-5 hrs', load: 'Rice Mills, Oil Expeller Freight, Matches' },
    { from: 'Sivakasi / Kovilpatti', to: 'Palani & Oddanchatram', distance: '165 km', time: '3.5-4 hrs', load: 'Market Produce, Packaging Cartons, Matches' },
    { from: 'Sivakasi / Kovilpatti', to: 'Dindigul & Madurai', distance: '75-140 km', time: '1.5-3 hrs', load: 'Hardware Spares, Agro Cargo, General Freight' },
    { from: 'Coimbatore', to: 'Sivakasi / Kovilpatti', distance: '260-290 km', time: '6-7.5 hrs', load: 'Return Loads: Motors, Castings, Pumps & Fabrications' },
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Submit Transport Request',
      desc: 'Provide your cargo details, pickup location, delivery point, and preferred lorry size via our online quote form or WhatsApp.',
      icon: FileCheck2,
    },
    {
      num: '02',
      title: 'Quick Rate & Fleet Allocation',
      desc: 'Our logistics team evaluates route feasibility and quotes competitive freight charges, assigning an available lorry immediately.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Secure Loading & Safe Transit',
      desc: 'Our trained drivers oversee careful stacking, weather-proof tarpaulin tie-down, and proceed along optimal highway corridors.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'On-Time Delivery & Clear POD',
      desc: 'Goods reach consignee safely on schedule with verified electronic or physical Proof of Delivery (POD) returned promptly.',
      icon: CheckCircle2,
    },
  ];

  const whyChooseUsPoints = [
    {
      title: 'Reliable Transportation',
      desc: 'Verified multi-axle Ashok Leyland Taurus lorries and experienced drivers guarantee reliable transit with zero midway offloading.',
      icon: ShieldCheck,
    },
    {
      title: 'Experienced Service',
      desc: 'Headed by Prop. P. Mariappan with deep expertise in regional and interstate highway routes, industrial goods handling, and checkpoint logistics.',
      icon: Award,
    },
    {
      title: 'Customer Satisfaction',
      desc: 'Personalized attention for every consignment, direct proprietor phone contact, and prompt status updates from loading to un-docking.',
      icon: Users,
    },
    {
      title: 'Flexible Transport Solutions',
      desc: 'From full truck loads of industrial machinery to delicate printed carton consignments and agricultural harvests, we adapt to your cargo needs.',
      icon: Layers,
    },
    {
      title: 'Timely Delivery',
      desc: 'Strict adherence to transit schedules ensures your commercial commitments, supply chain deadlines, and warehouse dock times are always met.',
      icon: Clock,
    },
    {
      title: 'Professional Support',
      desc: '24/7 dedicated dispatch coordination, immediate resolution of road contingencies, and genuine transit paperwork assistance.',
      icon: Phone,
    },
  ];

  const testimonials = [
    {
      name: 'R. Soundararajan',
      role: 'Operations Head, Commercial Print Pack Ltd',
      location: 'Sivakasi',
      text: 'DD Transport has been our trusted logistics partner for moving heavy paper reels and finished carton shipments to Chennai and Bengaluru. Their trucks arrive clean, tarpaulins are water-tight, and delivery is consistently on time.',
    },
    {
      name: 'M. Senthil Kumar',
      role: 'Managing Partner, Sri Murugan Fireworks & Logistics',
      location: 'Virudhunagar',
      text: 'Prop. Mariappan is known throughout the region for personal integrity and swift lorry arrangement. When we have bulk festive or industrial dispatches, DD Transport always arranges safe, compliant vehicles.',
    },
    {
      name: 'K. Balakrishnan',
      role: 'Procurement Manager, Southern Agro Feeds',
      location: 'Madurai',
      text: 'We regularly move 16-ton bulk loads between Madurai and Coimbatore. DD Transport provides clear rates with no hidden demands, respectful drivers, and prompt delivery receipts.',
    },
  ];

  return (
    <div className="bg-slate-50 text-brand-darkText">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative bg-brand-navy min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden">
        {/* Background lorry image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/dd_truck_1.jpg"
            alt="DD Transport Ashok Leyland Lorry"
            className="w-full h-full object-cover object-center brightness-[0.38] scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Top pill badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-orange/20 border border-brand-orange/50 px-4 py-1.5 rounded-full text-brand-orange text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span>Sivakasi & Tamil Nadu’s Trusted Lorry Fleet Provider</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
              Reliable Lorry Transport & <span className="text-brand-orange">Logistics Solutions</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-lg sm:text-xl text-gray-200 mb-8 font-normal leading-relaxed">
              Moving Your Goods Safely, Efficiently and On Time. Dedicated Full Truck Load (FTL) services across Tamil Nadu and All-India Corridors.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-base font-bold rounded-xl shadow-xl hover:shadow-orange-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Truck className="w-5 h-5 mr-2.5" />
                <span>Get a Quote</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-base font-semibold rounded-xl border border-white/25 backdrop-blur-md transition-all duration-200"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center space-x-2 text-gray-200 hover:text-white px-3 py-2 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call {settings.primaryPhone}</span>
              </a>
            </div>

            {/* Highlights pill bar */}
            <div className="mt-12 pt-8 border-t border-gray-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">100% Safe Transit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">Taurus Multi-Axle Fleet</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">Punctual Schedules</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">All-India Permits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPANY INTRODUCTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/images/dd_original_truck.jpg"
                  alt="DD Transport Fleet at Sivakasi"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-wider text-brand-orange font-bold">Depot Location</div>
                  <div className="text-sm font-semibold">Naranapuram Road, Sivakasi - 626 189</div>
                </div>
              </div>

              {/* Floating visiting card snapshot badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-2 bg-brand-navy text-white p-4 rounded-xl shadow-xl border-2 border-brand-orange/50 max-w-[260px] hidden sm:block">
                <div className="flex items-center space-x-3 mb-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Direct Contact</span>
                </div>
                <div className="text-sm font-bold">Prop. {settings.proprietorName}</div>
                <div className="text-xs text-brand-orange font-medium mt-1">{settings.primaryPhone}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Speed & Safe Service</div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-brand-orange font-bold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-md">
                <span>About DD Transport</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                Your Direct Link to Reliable Full Truck Load Logistics
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Headquartered in Sivakasi—the manufacturing capital for matches, fireworks, commercial printing, and corrugated packaging—<strong>DD Transport</strong> was founded by <strong>Prop. P. Mariappan</strong> with a dedicated pledge: complete cargo protection, transparent freight rates, and unfailing punctuality.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Whether you need our 10-wheeler Ashok Leyland Taurus lorry for multi-ton industrial cargo or a weather-proof container for sensitive printed matter, our well-maintained vehicles and experienced highway drivers ensure stress-free transit across Tamil Nadu and Interstate corridors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">Direct Point-to-Point FTL</h4>
                    <p className="text-xs text-gray-500">No intermediate hubs or goods shifting. Direct delivery.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">Industrial Load Specialists</h4>
                    <p className="text-xs text-gray-500">Heavy tarpaulins, side tie-down rods & careful weight balancing.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <Link
                  to="/about"
                  className="inline-flex items-center text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
                >
                  <span>Learn more about our company story</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRANSPORTATION SERVICES */}
      <section className="py-16 lg:py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-orange-100/70 px-3 py-1 rounded-md">
              What We Move
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-3">
              Comprehensive Transportation Services
            </h2>
            <p className="text-base text-gray-600 mt-3">
              Engineered for manufacturers, traders, and agricultural distributors requiring dedicated lorries and prompt freight delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => {
              const features = parseFeatures(service.features);

              return (
                <div
                  key={service.id || index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                      <div className="bg-brand-navy text-brand-orange p-2.5 rounded-xl border border-brand-orange/30 shadow-sm">
                        {getIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">
                          Service #{index + 1}
                        </span>
                        <h3 className="text-base font-bold text-brand-navy">{service.title}</h3>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {service.shortDescription || service.fullDescription}
                    </p>

                    {features.length > 0 && (
                      <div className="pt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="space-y-1.5">
                          {features.slice(0, 2).map((feat, fidx) => (
                            <div key={fidx} className="flex items-start space-x-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="text-[11px]">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                    <Link
                      to={`/quote?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center px-3.5 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow-sm transition"
                    >
                      <Truck className="w-3.5 h-3.5 mr-1.5" />
                      <span>Book Service</span>
                    </Link>
                    <Link
                      to="/services"
                      className="text-xs font-semibold text-brand-navy hover:text-brand-orange transition"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-sm rounded-lg shadow transition"
            >
              <span>Explore All 7 Transport Services</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR VEHICLE FLEET */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-md">
                Verified Vehicles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-3">
                Our Lorry Fleet
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Inspect our multi-axle trucks, registration numbers, and load capacities. Each vehicle is road-tested, insured, and verified.
              </p>
            </div>
            <Link
              to="/fleet"
              className="inline-flex items-center text-sm font-bold text-brand-orange hover:text-brand-orangeHover"
            >
              <span>Browse Full Fleet & Filters</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.slice(0, 3).map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={vehicle.imageUrl || '/images/dd_truck_1.jpg'}
                    alt={vehicle.modelName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-brand-navy text-white text-xs font-mono font-bold px-3 py-1 rounded shadow border border-brand-orange/40">
                    {vehicle.registrationNumber}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow ${
                        vehicle.availabilityStatus === 'AVAILABLE'
                          ? 'bg-emerald-500 text-white'
                          : vehicle.availabilityStatus === 'ON_TRIP'
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {vehicle.availabilityStatus === 'AVAILABLE' ? 'Available' : vehicle.availabilityStatus === 'ON_TRIP' ? 'On Trip' : 'Maintenance'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">{vehicle.modelName}</h3>
                    <p className="text-xs text-gray-500 mb-3">{vehicle.category?.name || 'Heavy Commercial Vehicle'}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                      <div>
                        <span className="block text-gray-400 text-[10px] uppercase">Payload Capacity</span>
                        <strong className="text-brand-navy font-bold text-sm">{vehicle.loadCapacityTons} Tons</strong>
                      </div>
                      <div>
                        <span className="block text-gray-400 text-[10px] uppercase">Body Structure</span>
                        <strong className="text-brand-navy font-semibold text-xs truncate block">{vehicle.bodyType}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {vehicle.description}
                    </p>
                  </div>

                  <Link
                    to={`/quote?lorry=${encodeURIComponent(vehicle.registrationNumber)}&capacity=${vehicle.loadCapacityTons}`}
                    className="w-full py-2.5 px-4 bg-brand-navy hover:bg-brand-orange text-white text-center text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <Truck className="w-4 h-4 mr-1.5" />
                    <span>Book This Lorry</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE DD TRANSPORT */}
      <section className="py-16 lg:py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-brand-orange/20 border border-brand-orange/40 px-3 py-1 rounded-md">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Why Choose DD Transport?
            </h2>
            <p className="text-base text-gray-300 mt-3">
              Delivering authentic reliability, disciplined schedules, and dedicated lorry fleet solutions across Tamil Nadu and South India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsPoints.map((point, index) => {
              const IconComp = point.icon;
              return (
                <div
                  key={index}
                  className="bg-brand-navyLight/70 border border-gray-700/60 p-6 rounded-xl hover:border-brand-orange/60 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR TRANSPORTATION PROCESS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-md">
              Step-by-Step
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-3">
              Our Transportation Process
            </h2>
            <p className="text-base text-gray-600 mt-3">
              How we ensure seamless, punctual, and safe delivery from your warehouse dock to consignee gates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={idx} className="relative bg-slate-50 border border-slate-200 p-6 rounded-xl">
                  <div className="text-4xl font-black text-slate-200 absolute top-4 right-4">
                    {step.num}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-orange text-white flex items-center justify-center mb-5 shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: POPULAR TRANSPORT ROUTES */}
      <section className="py-16 lg:py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-orange-100/70 px-3 py-1 rounded-md">
              Active Corridors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-3">
              Sivakasi & Kovilpatti ➔ Coimbatore Routes
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Daily and scheduled Full Truck Load trips connecting Sivakasi and Kovilpatti with Coimbatore, Tiruppur, Pollachi, and Western Tamil Nadu corridors.
            </p>
          </div>

          {/* Routes Card & Lorry Images (Exact before View Route Details) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-4xl mx-auto my-8">
            {/* 1st: Route Card */}
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
              <div className="bg-brand-navy p-4 flex items-center justify-between border-t border-brand-orange/30">
                <span className="text-white font-bold text-sm">
                  Ashok Leyland Taurus 10-Wheeler (TN 28 AD 2467)
                </span>
                <span className="text-brand-orange font-semibold text-xs">
                  16 to 20 Tons FTL
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <Link
              to="/routes"
              className="inline-flex items-center text-sm font-bold text-brand-orange hover:text-brand-orangeHover"
            >
              <span>View Route Details</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-brand-orange/40 transition"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-orange" />
                    <span className="font-bold text-brand-navy text-sm">{route.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-bold text-brand-orange text-sm">{route.to}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {route.distance}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span>Estimated Transit:</span>
                  <span className="font-bold text-brand-navy">{route.time}</span>
                </div>
                <div className="text-xs text-gray-600 bg-slate-50 p-2.5 rounded border border-slate-100 mb-3">
                  <strong className="text-gray-700">Typical Cargo:</strong> {route.load}
                </div>
                <Link
                  to={`/quote?pickup=${encodeURIComponent(route.from)}&delivery=${encodeURIComponent(route.to)}`}
                  className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center justify-end"
                >
                  <span>Book this route</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CUSTOMER TESTIMONIALS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-md">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-3">
              Trusted by Leading Consignors
            </h2>
            <p className="text-base text-gray-600 mt-3">
              Hear from manufacturing directors, printing presses, and traders across Tamil Nadu who rely on DD Transport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 p-6 rounded-xl flex flex-col justify-between"
              >
                <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
                  “{item.text}”
                </p>
                <div className="border-t border-slate-200 pt-4 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.role}</p>
                    <span className="text-[11px] font-semibold text-brand-orange">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: QUICK QUOTE BANNER & CONTACT INFORMATION */}
      <section className="py-16 bg-gradient-to-r from-brand-navy to-brand-navyLight text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-navy/90 border-2 border-brand-orange/40 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/20 px-3 py-1 rounded-full border border-brand-orange/30">
                Direct Dispatch Line
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Dispatch Your Goods with DD Transport?
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                Submit an online enquiry for accurate freight evaluation or call Prop. P. Mariappan directly for immediate truck allocation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/quote"
                className="px-8 py-3.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-center font-bold rounded-xl shadow-lg transition"
              >
                Request a Quote
              </Link>
              <a
                href={`tel:${cleanPhone}`}
                className="px-8 py-3.5 bg-white text-brand-navy hover:bg-gray-100 text-center font-bold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call {settings.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
