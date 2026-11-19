import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Filter, ShieldCheck, CheckCircle, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { Vehicle, VehicleCategory } from '../types';

interface FleetPageProps {
  vehicles: Vehicle[];
  categories: VehicleCategory[];
}

export const FleetPage: React.FC<FleetPageProps> = ({ vehicles, categories }) => {
  const [selectedVehicleModal, setSelectedVehicleModal] = useState<Vehicle | null>(null);

  // Show all publicly active fleet lorries
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => v.isPublic);
  }, [vehicles]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
            Our Transport Fleet
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
            Commercial Lorries & Heavy Multi-Axle Trucks
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Every lorry in the DD Transport fleet is road-worthy, certified, fitted with heavy industrial tarpaulins, and piloted by verified drivers.
          </p>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-brand-navy">No Vehicles Available</h3>
            <p className="text-xs text-gray-500 mt-1">
              Please contact our dispatch team for current fleet allocation.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img
                    src={vehicle.imageUrl || '/images/dd_truck_1.jpg'}
                    alt={vehicle.modelName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                          {vehicle.modelName}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3 font-medium">
                          {vehicle.category?.name || 'Heavy Commercial Vehicle'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                      <div>
                        <span className="block text-gray-400 text-[10px] uppercase font-semibold">Load Capacity</span>
                        <strong className="text-brand-navy font-black text-sm">{vehicle.loadCapacityTons} Tons</strong>
                      </div>
                      <div>
                        <span className="block text-gray-400 text-[10px] uppercase font-semibold">Body Structure</span>
                        <strong className="text-brand-navy font-semibold text-xs truncate block">{vehicle.bodyType}</strong>
                      </div>
                      {vehicle.dimensions && (
                        <div className="col-span-2 pt-1 border-t border-slate-200">
                          <span className="block text-gray-400 text-[10px] uppercase font-semibold">Cargo Deck Dimensions</span>
                          <span className="text-slate-700 font-medium text-xs">{vehicle.dimensions}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {vehicle.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <Link
                      to={`/quote?lorry=${encodeURIComponent(vehicle.registrationNumber)}&capacity=${vehicle.loadCapacityTons}&type=${encodeURIComponent(vehicle.category?.name || '')}`}
                      className="w-full py-2.5 px-4 bg-brand-orange hover:bg-brand-orangeHover text-white text-center text-xs font-bold rounded-lg shadow transition flex items-center justify-center space-x-1"
                    >
                      <Truck className="w-4 h-4 mr-1.5" />
                      <span>Book This Lorry</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedVehicleModal(vehicle)}
                      className="w-full py-1.5 text-center text-xs font-semibold text-gray-500 hover:text-brand-navy"
                    >
                      View Full Vehicle Specifications
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Vehicle Specifications */}
        {selectedVehicleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
              <div className="relative h-64 bg-slate-900">
                <img
                  src={selectedVehicleModal.imageUrl || '/images/dd_truck_1.jpg'}
                  alt={selectedVehicleModal.modelName}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedVehicleModal(null)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
                >
                  ✕
                </button>
                <div className="absolute bottom-3 left-3 bg-brand-navy text-white text-xs font-mono font-bold px-3 py-1 rounded shadow">
                  {selectedVehicleModal.registrationNumber}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-navy">{selectedVehicleModal.modelName}</h3>
                <p className="text-xs text-gray-500 mb-4">{selectedVehicleModal.category?.name}</p>

                <div className="space-y-2.5 text-xs text-gray-700 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payload Capacity:</span>
                    <strong className="text-brand-navy font-bold">{selectedVehicleModal.loadCapacityTons} Tons</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Body Configuration:</span>
                    <strong className="text-brand-navy font-bold">{selectedVehicleModal.bodyType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Deck Dimensions:</span>
                    <strong className="text-brand-navy font-bold">{selectedVehicleModal.dimensions || 'Standard Industrial Deck'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Status:</span>
                    <span className="font-bold text-emerald-600">{selectedVehicleModal.availabilityStatus}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  {selectedVehicleModal.description}
                </p>

                <div className="flex gap-3">
                  <Link
                    to={`/quote?lorry=${encodeURIComponent(selectedVehicleModal.registrationNumber)}&capacity=${selectedVehicleModal.loadCapacityTons}`}
                    onClick={() => setSelectedVehicleModal(null)}
                    className="flex-1 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-center text-xs font-bold rounded-xl shadow"
                  >
                    Proceed to Request Quote
                  </Link>
                  <button
                    onClick={() => setSelectedVehicleModal(null)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
