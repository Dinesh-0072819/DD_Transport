import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  X,
  AlertTriangle,
  Navigation,
  Clock,
  Truck
} from 'lucide-react';
import { apiClient } from '../services/api';
import { TransportRoute } from '../types';

export const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<TransportRoute | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form Fields
  const [origin, setOrigin] = useState('Sivakasi / Kovilpatti');
  const [destination, setDestination] = useState('Coimbatore');
  const [distance, setDistance] = useState('260 km');
  const [duration, setDuration] = useState('6 - 7 Hours');
  const [highways, setHighways] = useState('NH 209 & NH 83 via Dharapuram & Palladam');
  const [typicalCargo, setTypicalCargo] = useState('Textile Machinery, Industrial Castings, Paper Rolls, Matches');
  const [frequency, setFrequency] = useState('Daily Departures (24/7 FTL)');
  const [isPopular, setIsPopular] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/routes');
      if (res.data?.success) {
        setRoutes(res.data.routes || []);
      }
    } catch (e) {
      console.error('Failed to load routes:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingRoute(null);
    setOrigin('Sivakasi');
    setDestination('');
    setDistance('500 km');
    setDuration('10 - 12 Hours');
    setHighways('NH 44');
    setTypicalCargo('Commercial Packaged Goods, Cartons');
    setFrequency('Daily Departures');
    setIsPopular(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rt: TransportRoute) => {
    setEditingRoute(rt);
    setOrigin(rt.origin);
    setDestination(rt.destination);
    setDistance(rt.distance);
    setDuration(rt.duration);
    setHighways(rt.highways);
    setTypicalCargo(rt.typicalCargo);
    setFrequency(rt.frequency);
    setIsPopular(rt.isPopular !== undefined ? rt.isPopular : true);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        origin: origin.trim(),
        destination: destination.trim(),
        distance: distance.trim(),
        duration: duration.trim(),
        highways: highways.trim(),
        typicalCargo: typicalCargo.trim(),
        frequency: frequency.trim(),
        isPopular,
      };

      if (editingRoute) {
        const res = await apiClient.put(`/routes/${editingRoute.id}`, payload);
        if (res.data?.success) {
          setRoutes((prev) =>
            prev.map((r) => (r.id === editingRoute.id ? res.data.route : r))
          );
        }
      } else {
        const res = await apiClient.post('/routes', payload);
        if (res.data?.success) {
          setRoutes((prev) => [res.data.route, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Error saving route');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await apiClient.delete(`/routes/${deletingId}`);
      setRoutes((prev) => prev.filter((r) => r.id !== deletingId));
      setDeletingId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting route');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Routes Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Add, update, or remove active transport corridors shown across the public website and homepage.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Route</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((rt) => (
          <div
            key={rt.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                  <span className="font-bold text-sm text-brand-navy">{rt.origin}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold text-sm text-brand-orange truncate max-w-[140px]">{rt.destination}</span>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full shrink-0">
                  {rt.distance}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-[10px] text-gray-400 block uppercase font-semibold">Average Transit</span>
                  <strong className="text-brand-navy font-bold text-xs">{rt.duration}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-[10px] text-gray-400 block uppercase font-semibold">Corridor / Highway</span>
                  <strong className="text-brand-navy font-bold text-xs truncate block">{rt.highways}</strong>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1 mb-2">
                <p><strong className="text-gray-700">Typical Cargo:</strong> {rt.typicalCargo}</p>
                <p><strong className="text-gray-700">Frequency:</strong> <span className="text-emerald-700 font-semibold">{rt.frequency}</span></p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-[11px] text-gray-400">
                {rt.isPopular ? 'Featured on Home' : 'Standard Corridor'}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleOpenEdit(rt)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md flex items-center space-x-1"
                >
                  <Edit className="w-3 h-3 text-brand-orange" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingId(rt.id)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-md"
                  title="Delete Route"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT ROUTE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-base text-brand-navy flex items-center">
                <Navigation className="w-5 h-5 text-brand-orange mr-2" />
                <span>{editingRoute ? 'Edit Route Corridor' : 'Add New Transport Route'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Origin City *</label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Destination City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chennai / Bengaluru / Salem"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Approximate Distance</label>
                  <input
                    type="text"
                    placeholder="e.g. 540 km"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Estimated Transit Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 11 - 13 Hours"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Highway / Route Link</label>
                  <input
                    type="text"
                    placeholder="e.g. NH 38 & NH 45"
                    value={highways}
                    onChange={(e) => setHighways(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. Daily Departures / Tri-Weekly"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Typical Cargo Profiles</label>
                <input
                  type="text"
                  placeholder="e.g. Printed Cartons, Safety Matches, Industrial Machines"
                  value={typicalCargo}
                  onChange={(e) => setTypicalCargo(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="popRouteCheck"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="w-4 h-4 text-brand-orange rounded"
                />
                <label htmlFor="popRouteCheck" className="font-bold text-gray-700 cursor-pointer">
                  Feature on Homepage Popular Routes
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold rounded-lg shadow"
                >
                  {isSubmitting ? 'Saving...' : 'Save Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200">
            <AlertTriangle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-base font-bold text-brand-navy">Delete Transport Route?</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              This corridor will be removed from website listings.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
