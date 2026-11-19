import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Clock, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { WebsiteSettings, TransportRoute } from '../types';
import { apiClient } from '../services/api';

interface RoutesPageProps {
  settings: WebsiteSettings;
}

const ALL_COIMBATORE_ROUTES: TransportRoute[] = [
  {
    id: 'rt-1',
    origin: 'Sivakasi',
    destination: 'Coimbatore (Peelamedu / Singanallur / Gandhipuram)',
    distance: '260 km',
    duration: '6 - 7 Hours',
    highways: 'NH 209 & NH 83 via Dindigul, Oddanchatram, Dharapuram & Palladam',
    typicalCargo: 'Textile Machinery, Industrial Castings, Paper Rolls, Safety Matches, Engineering Goods',
    frequency: 'Daily Departures (24/7 FTL)',
  },
  {
    id: 'rt-2',
    origin: 'Kovilpatti',
    destination: 'Coimbatore (Industrial Estates & City Hubs)',
    distance: '290 km',
    duration: '6.5 - 7.5 Hours',
    highways: 'NH 44 & NH 83 via Sattur, Virudhunagar, Dindigul & Palladam',
    typicalCargo: 'Matches, Agro Products, Steel Fabrication, Industrial Components',
    frequency: 'Daily Departures',
  },
  {
    id: 'rt-3',
    origin: 'Sivakasi / Kovilpatti',
    destination: 'Tiruppur (Textile & Garment Export Hub)',
    distance: '245 km',
    duration: '5.5 - 6.5 Hours',
    highways: 'via Dindigul, Dharapuram & Kangeyam',
    typicalCargo: 'Corrugated Boxes, Printed Cartons, Garment Packaging, Yarn, Textiles',
    frequency: 'Daily Direct Dispatch',
  },
  {
    id: 'rt-4',
    origin: 'Sivakasi / Kovilpatti',
    destination: 'Palladam & Sulur (Textile & Weaving Hub)',
    distance: '235 km',
    duration: '5 - 6 Hours',
    highways: 'via Dharapuram & Kundadam Corridor',
    typicalCargo: 'Spinning Mill Freight, Feed Machinery, Industrial Fabrication, Paper Goods',
    frequency: 'Daily Scheduled Trips',
  },
  {
    id: 'rt-5',
    origin: 'Sivakasi / Kovilpatti',
    destination: 'Pollachi & Udumalaipettai',
    distance: '230 km',
    duration: '5.5 - 6 Hours',
    highways: 'via Madurai, Dindigul & Palani Highway',
    typicalCargo: 'Agro Machinery, Coir & Coconut Products, Commercial Freight, Raw Materials',
    frequency: 'Daily Scheduled Runs',
  },
  {
    id: 'rt-6',
    origin: 'Sivakasi / Kovilpatti',
    destination: 'Dharapuram & Kangeyam',
    distance: '190 km',
    duration: '4.5 - 5 Hours',
    highways: 'NH 83 via Oddanchatram & Dharapuram Bypass',
    typicalCargo: 'Rice Mills & Oil Expeller Goods, Matches, Agricultural & Packaging Cargo',
    frequency: 'Daily Scheduled Runs',
  },
  {
    id: 'rt-7',
    origin: 'Sivakasi / Kovilpatti',
    destination: 'Palani & Oddanchatram',
    distance: '165 km',
    duration: '3.5 - 4 Hours',
    highways: 'via Sempatty & Oddanchatram Market Corridor',
    typicalCargo: 'Commercial Packaged Goods, Market Produce, Fireworks & Matches',
    frequency: 'Multiple Daily Trips',
  },
  {
    id: 'rt-8',
    origin: 'Sivakasi / Kovilpatti',
    destination: 'Dindigul & Madurai (Transit Corridor)',
    distance: '75 - 140 km',
    duration: '1.5 - 3 Hours',
    highways: 'NH 44 / NH 38 Four-Lane Expressway',
    typicalCargo: 'Hardware Spares, Agro Commodities, Paper Reams, General Commercial Cargo',
    frequency: 'Continuous Daily Dispatch',
  },
  {
    id: 'rt-9',
    origin: 'Coimbatore',
    destination: 'Sivakasi & Kovilpatti (Return Route)',
    distance: '260 - 290 km',
    duration: '6 - 7.5 Hours',
    highways: 'NH 83 & NH 44 via Palladam, Dharapuram, Oddanchatram & Madurai',
    typicalCargo: 'Engineering Castings, Pumps, Motors, Wet Grinders, Cotton Bales & Machine Parts',
    frequency: 'Daily Return Loads Available',
  },
];

export const RoutesPage: React.FC<RoutesPageProps> = ({ settings }) => {
  const [routes, setRoutes] = useState<TransportRoute[]>(ALL_COIMBATORE_ROUTES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient
      .get('/routes')
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.routes)) {
          // Strictly filter out any old non-corridor cities
          const valid = res.data.routes.filter((r: TransportRoute) =>
            !r.destination.toLowerCase().includes('bengaluru') &&
            !r.destination.toLowerCase().includes('hyderabad') &&
            !r.destination.toLowerCase().includes('chennai')
          );
          if (valid.length >= 5) {
            setRoutes(valid);
          }
        }
      })
      .catch(() => {});
  }, []);

  const defaultRoutes = ALL_COIMBATORE_ROUTES;

  const displayRoutes = routes.length > 0 ? routes : defaultRoutes;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
            Dedicated Highway Corridors
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
            Sivakasi & Kovilpatti ➔ Coimbatore Routes
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            DD Transport operates daily Full Truck Load (FTL) services connecting Sivakasi and Kovilpatti with Coimbatore, Tiruppur, Pollachi, and all intermediate towns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {displayRoutes.map((route, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                    <span className="text-base font-bold text-brand-navy">{route.origin}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-base font-bold text-brand-orange">{route.destination}</span>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full shrink-0">
                    {route.distance}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Average Transit</span>
                    <strong className="text-brand-navy font-bold text-xs">{route.duration}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Corridor / Highway</span>
                    <strong className="text-brand-navy font-bold text-xs">{route.highways}</strong>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  <p><strong className="text-gray-700">Typical Cargo:</strong> {route.typicalCargo}</p>
                  <p><strong className="text-gray-700">Frequency:</strong> <span className="text-emerald-700 font-semibold">{route.frequency}</span></p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Full Truck Load (FTL)</span>
                <Link
                  to={`/quote?pickup=${encodeURIComponent(route.origin)}&delivery=${encodeURIComponent(route.destination)}`}
                  className="inline-flex items-center px-4 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg transition"
                >
                  <Truck className="w-3.5 h-3.5 mr-1.5" />
                  <span>Get Quote for This Route</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
