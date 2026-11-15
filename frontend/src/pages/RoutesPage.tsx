import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Clock, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { WebsiteSettings, TransportRoute } from '../types';
import { apiClient } from '../services/api';

interface RoutesPageProps {
  settings: WebsiteSettings;
}

export const RoutesPage: React.FC<RoutesPageProps> = ({ settings }) => {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/routes')
      .then((res) => {
        if (res.data?.success && res.data.routes) {
          setRoutes(res.data.routes);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const defaultRoutes: TransportRoute[] = [
    {
      id: 'rt-1',
      origin: 'Sivakasi',
      destination: 'Chennai (Koyambedu / Ambattur / Sriperumbudur)',
      distance: '540 km',
      duration: '11 - 13 Hours',
      highways: 'NH 38 & NH 45 (GST Road)',
      typicalCargo: 'Printing & Packaging Cartons, Fireworks, Safety Matches, Industrial Machine Spares',
      frequency: 'Daily Departures',
    },
    {
      id: 'rt-2',
      origin: 'Sivakasi',
      destination: 'Coimbatore (Peelamedu / Tirupur Link)',
      distance: '260 km',
      duration: '6 - 7 Hours',
      highways: 'NH 209 via Dindigul & Dharapuram',
      typicalCargo: 'Textile Yarn, Machinery Fabrications, Raw Materials, Paper Sheets',
      frequency: 'Daily Departures',
    },
    {
      id: 'rt-3',
      origin: 'Sivakasi',
      destination: 'Bengaluru (Peenya / Hosur / Whitefield)',
      distance: '490 km',
      duration: '10 - 12 Hours',
      highways: 'NH 44 via Salem & Dharmapuri',
      typicalCargo: 'Commercial Books, Pharmaceutical Cartons, Retail Packaged Goods',
      frequency: 'Tri-Weekly & Full Dedicated Loads',
    },
    {
      id: 'rt-4',
      origin: 'Sivakasi',
      destination: 'Hyderabad / Secunderabad (TS)',
      distance: '1,050 km',
      duration: '22 - 25 Hours',
      highways: 'NH 44 Express Corridor via Kurnool',
      typicalCargo: 'Heavy Industrial Machinery, Bulk Consignments, Matches & Chemistry Feeds',
      frequency: 'Dedicated Full Truck Load',
    },
    {
      id: 'rt-5',
      origin: 'Sivakasi',
      destination: 'Tuticorin (V.O.C. Port)',
      distance: '110 km',
      duration: '2.5 - 3 Hours',
      highways: 'SH 42 / NH 38 Corridor',
      typicalCargo: 'Export Consignments, Container CFS Feeder Cargo, Processed Goods',
      frequency: 'Daily on Demand',
    },
    {
      id: 'rt-6',
      origin: 'Sivakasi',
      destination: 'Madurai (Kappalur Industrial Estate)',
      distance: '75 km',
      duration: '1.5 - 2 Hours',
      highways: 'NH 38 Corridor',
      typicalCargo: 'Local Regional Transport, Consumer Goods, Agro Supplies',
      frequency: 'Multiple Daily Runs',
    },
    {
      id: 'rt-7',
      origin: 'Sivakasi',
      destination: 'Salem & Erode',
      distance: '310 km',
      duration: '7 - 8 Hours',
      highways: 'NH 44 via Dindigul & Karur',
      typicalCargo: 'Steel Products, Agricultural Produce, Packaging Materials',
      frequency: 'Regular Scheduled Trips',
    },
    {
      id: 'rt-8',
      origin: 'Sivakasi',
      destination: 'Trichy (Thuvakudi Industrial Hub)',
      distance: '210 km',
      duration: '4.5 - 5 Hours',
      highways: 'NH 38 via Madurai',
      typicalCargo: 'Boiler Components, Fabrication Parts, Commercial Cartons',
      frequency: 'Daily Runs',
    },
  ];

  const displayRoutes = routes.length > 0 ? routes : defaultRoutes;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
            Highway Corridors
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
            Primary Transport Routes & Transit Corridors
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            DD Transport maintains active highway permits and reliable fleet coverage across Tamil Nadu and Interstate commercial centers.
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
