import React, { useState, useEffect } from 'react';
import {
  Truck,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
  Upload
} from 'lucide-react';
import { apiClient } from '../services/api';
import { Vehicle, VehicleCategory } from '../types';

export const FleetManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form Fields
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [modelName, setModelName] = useState('');
  const [loadCapacityTons, setLoadCapacityTons] = useState('16');
  const [bodyType, setBodyType] = useState('Open High-Side Platform Body');
  const [dimensions, setDimensions] = useState('24ft Length x 8ft Width x 7ft Height');
  const [imageUrl, setImageUrl] = useState('/images/dd_truck_1.jpg');
  const [description, setDescription] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState<'AVAILABLE' | 'ON_TRIP' | 'UNDER_MAINTENANCE'>('AVAILABLE');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchFleet();
  }, []);

  const fetchFleet = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/vehicles');
      if (res.data && res.data.success) {
        setVehicles(res.data.vehicles || []);
        setCategories(res.data.categories || []);
        if (res.data.categories && res.data.categories.length > 0 && !categoryId) {
          setCategoryId(res.data.categories[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to load fleet:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setRegistrationNumber('');
    setModelName('');
    setLoadCapacityTons('16');
    setBodyType('Open High-Side Platform Body');
    setDimensions('24ft Length x 8ft Width x 7ft Height');
    setImageUrl('/images/dd_truck_1.jpg');
    setDescription('');
    setAvailabilityStatus('AVAILABLE');
    setIsPublic(true);
    if (categories.length > 0) setCategoryId(categories[0].id);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setRegistrationNumber(v.registrationNumber);
    setCategoryId(v.categoryId);
    setModelName(v.modelName);
    setLoadCapacityTons(String(v.loadCapacityTons));
    setBodyType(v.bodyType);
    setDimensions(v.dimensions || '');
    setImageUrl(v.imageUrl);
    setDescription(v.description || '');
    setAvailabilityStatus(v.availabilityStatus);
    setIsPublic(v.isPublic);
    setIsModalOpen(true);
  };

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationNumber.trim() || !modelName.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        registrationNumber: registrationNumber.trim().toUpperCase(),
        categoryId: categoryId || (categories[0]?.id ?? 'cat-1'),
        modelName: modelName.trim(),
        loadCapacityTons: Number(loadCapacityTons),
        bodyType: bodyType.trim(),
        dimensions: dimensions.trim() || undefined,
        imageUrl: imageUrl.trim() || '/images/dd_truck_1.jpg',
        description: description.trim() || undefined,
        availabilityStatus,
        isPublic,
      };

      if (editingVehicle) {
        const res = await apiClient.put(`/vehicles/${editingVehicle.id}`, payload);
        if (res.data && res.data.success) {
          setVehicles((prev) =>
            prev.map((v) => (v.id === editingVehicle.id ? res.data.vehicle : v))
          );
        }
      } else {
        const res = await apiClient.post('/vehicles', payload);
        if (res.data && res.data.success) {
          setVehicles((prev) => [res.data.vehicle, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Error saving vehicle');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await apiClient.delete(`/vehicles/${deletingId}`);
      setVehicles((prev) => prev.filter((v) => v.id !== deletingId));
      setDeletingId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting vehicle');
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      if (
        !v.registrationNumber.toLowerCase().includes(q) &&
        !v.modelName.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (categoryFilter !== 'ALL' && v.categoryId !== categoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Fleet Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Add and manage commercial lorries, update maintenance status, and control public visibility.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lorry</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by registration number (e.g. TN 28 AD 2467) or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={vehicle.imageUrl || '/images/dd_truck_1.jpg'}
                  alt={vehicle.modelName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-brand-navy text-white text-xs font-mono font-bold px-2.5 py-1 rounded shadow">
                  {vehicle.registrationNumber}
                </div>
                <div className="absolute top-2.5 right-2.5 flex items-center space-x-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow ${
                      vehicle.availabilityStatus === 'AVAILABLE'
                        ? 'bg-emerald-500 text-white'
                        : vehicle.availabilityStatus === 'ON_TRIP'
                        ? 'bg-amber-500 text-white'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {vehicle.availabilityStatus}
                  </span>
                  <span
                    className={`p-1 rounded-full text-white ${
                      vehicle.isPublic ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                    title={vehicle.isPublic ? 'Publicly Visible' : 'Hidden from Public'}
                  >
                    {vehicle.isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm text-brand-navy">{vehicle.modelName}</h3>
                <p className="text-[11px] text-gray-500 mb-2">{vehicle.category?.name}</p>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Payload</span>
                    <strong className="text-brand-navy font-bold">{vehicle.loadCapacityTons} Tons</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Body Type</span>
                    <strong className="text-brand-navy truncate block">{vehicle.bodyType}</strong>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">
                  {vehicle.description || 'No specific description.'}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex justify-between items-center text-xs">
              <span className="text-[11px] text-gray-400">
                {vehicle.isPublic ? 'Live on Website' : 'Admin Only'}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleOpenEdit(vehicle)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md flex items-center space-x-1"
                >
                  <Edit className="w-3 h-3 text-brand-orange" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingId(vehicle.id)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-md"
                  title="Delete Vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT LORRY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
              <h3 className="font-bold text-base text-brand-navy flex items-center">
                <Truck className="w-5 h-5 text-brand-orange mr-2" />
                <span>{editingVehicle ? 'Edit Lorry Details' : 'Register New Fleet Lorry'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Registration Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TN 28 AD 2467"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashok Leyland 2518 Taurus"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Payload Capacity (Tons) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    placeholder="16"
                    value={loadCapacityTons}
                    onChange={(e) => setLoadCapacityTons(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Body Type *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Open High-Side Platform Body"
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Dimensions</label>
                  <input
                    type="text"
                    placeholder="e.g. 24ft Length x 8ft Width x 7ft Height"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Vehicle Image Path / URL *</label>
                <input
                  type="text"
                  required
                  placeholder="/images/dd_truck_1.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                />
                <div className="flex gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setImageUrl('/images/dd_truck_1.jpg')}
                    className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-gray-600 hover:bg-slate-200"
                  >
                    Preset 1 (Ashok Leyland)
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('/images/dd_truck_2.jpg')}
                    className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-gray-600 hover:bg-slate-200"
                  >
                    Preset 2 (Depot Lorry)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Availability Status</label>
                  <select
                    value={availabilityStatus}
                    onChange={(e) => setAvailabilityStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="ON_TRIP">On Trip</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPublicCheck"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-4 h-4 text-brand-orange rounded"
                  />
                  <label htmlFor="isPublicCheck" className="text-gray-700 font-bold cursor-pointer">
                    Display on Public Website Fleet
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Lorry Description</label>
                <textarea
                  rows={3}
                  placeholder="Specify cargo suitability, heavy tarpaulin status, and route specialties..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                ></textarea>
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
                  {isSubmitting ? 'Saving...' : 'Save Vehicle'}
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
            <h3 className="text-base font-bold text-brand-navy">Remove Vehicle from Fleet?</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              This lorry will be deleted from the database and fleet lists.
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
