import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
  Truck
} from 'lucide-react';
import { apiClient } from '../services/api';
import { ServiceItem } from '../types';

export const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/dd_truck_1.jpg');
  const [iconName, setIconName] = useState('Truck');
  const [displayOrder, setDisplayOrder] = useState('1');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/services');
      if (res.data?.success) {
        setServices(res.data.services || []);
      }
    } catch (e) {
      console.error('Failed to load services:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setTitle('');
    setSlug('');
    setShortDescription('');
    setFullDescription('');
    setFeatures('Direct door-to-door transit, Weather-proof tarpaulin, Experienced highway drivers');
    setImageUrl('/images/dd_truck_1.jpg');
    setIconName('Truck');
    setDisplayOrder(String(services.length + 1));
    setIsPublic(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingService(s);
    setTitle(s.title);
    setSlug(s.slug);
    setShortDescription(s.shortDescription);
    setFullDescription(s.fullDescription);
    const featStr = Array.isArray(s.features)
      ? s.features.join(', ')
      : typeof s.features === 'string'
      ? s.features
      : '';
    setFeatures(featStr);
    setImageUrl(s.imageUrl);
    setIconName(s.iconName || 'Truck');
    setDisplayOrder(String(s.displayOrder || 1));
    setIsPublic(s.isPublic);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;

    setIsSubmitting(true);
    try {
      const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const featArr = features.split(',').map((f) => f.trim()).filter(Boolean);

      const payload = {
        title: title.trim(),
        slug: generatedSlug,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim() || shortDescription.trim(),
        features: featArr,
        imageUrl: imageUrl.trim() || '/images/dd_truck_1.jpg',
        iconName,
        displayOrder: Number(displayOrder) || 1,
        isPublic,
      };

      if (editingService) {
        const res = await apiClient.put(`/services/${editingService.id}`, payload);
        if (res.data?.success) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? res.data.service : s))
          );
        }
      } else {
        const res = await apiClient.post('/services', payload);
        if (res.data?.success) {
          setServices((prev) => [...prev, res.data.service]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Error saving service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await apiClient.delete(`/services/${deletingId}`);
      setServices((prev) => prev.filter((s) => s.id !== deletingId));
      setDeletingId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Services Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage public transportation service offerings, descriptions, and feature lists.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                <img
                  src={srv.imageUrl || '/images/dd_truck_1.jpg'}
                  alt={srv.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 flex items-center space-x-1">
                  <span
                    className={`p-1 rounded-full text-white text-[10px] ${
                      srv.isPublic ? 'bg-emerald-600' : 'bg-gray-600'
                    }`}
                  >
                    {srv.isPublic ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm text-brand-navy mb-1.5">{srv.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                  {srv.shortDescription}
                </p>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Slug: {srv.slug}
                </span>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex justify-between items-center text-xs">
              <span className="text-[11px] text-gray-400">
                Order: #{srv.displayOrder || 1}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md flex items-center space-x-1"
                >
                  <Edit className="w-3 h-3 text-brand-orange" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingId(srv.id)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-md"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-base text-brand-navy flex items-center">
                <Layers className="w-5 h-5 text-brand-orange mr-2" />
                <span>{editingService ? 'Edit Transport Service' : 'Add New Service'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Load Transportation"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingService) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Short Description (Cards) *</label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Description (Detail View)</label>
                <textarea
                  rows={3}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Key Features (comma-separated)</label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-5">
                  <input
                    type="checkbox"
                    id="srvPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-4 h-4 text-brand-orange rounded"
                  />
                  <label htmlFor="srvPublic" className="font-bold text-gray-700 cursor-pointer">
                    Visible on Public Website
                  </label>
                </div>
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
                  {isSubmitting ? 'Saving...' : 'Save Service'}
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
            <h3 className="text-base font-bold text-brand-navy">Delete Service?</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              This service will be removed from website listings.
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
