import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Building
} from 'lucide-react';
import { apiClient } from '../services/api';
import { WebsiteSettings } from '../types';

interface WebsiteSettingsAdminProps {
  settings: WebsiteSettings;
  onUpdateSettings: (newSettings: WebsiteSettings) => void;
}

export const WebsiteSettingsAdmin: React.FC<WebsiteSettingsAdminProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [formData, setFormData] = useState<WebsiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof WebsiteSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await apiClient.put('/settings', formData);
      if (res.data?.success) {
        onUpdateSettings(res.data.settings);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy tracking-tight">Website Settings & Brand Identity</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure contact numbers, proprietor details, office addresses, and homepage marketing copy.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Website settings updated successfully and saved to database!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* BRAND & BASIC INFO */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-brand-navy border-b border-slate-100 pb-2 flex items-center">
            <Building className="w-4 h-4 text-brand-orange mr-2" />
            <span>Brand Name & Proprietor Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Official Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Proprietor Name</label>
              <input
                type="text"
                value={formData.proprietorName}
                onChange={(e) => handleChange('proprietorName', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
              />
            </div>
          </div>
        </div>

        {/* CONTACT & DISPATCH CHANNELS */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-brand-navy border-b border-slate-100 pb-2 flex items-center">
            <Phone className="w-4 h-4 text-brand-orange mr-2" />
            <span>Contact Numbers & Office Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Primary Mobile (Click-to-Call)</label>
              <input
                type="text"
                value={formData.primaryPhone}
                onChange={(e) => handleChange('primaryPhone', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Secondary Mobile</label>
              <input
                type="text"
                value={formData.secondaryPhone}
                onChange={(e) => handleChange('secondaryPhone', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">WhatsApp Dispatch Number</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Business Email</label>
              <input
                type="email"
                value={formData.businessEmail}
                onChange={(e) => handleChange('businessEmail', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Operating Hours Notice</label>
              <input
                type="text"
                value={formData.operatingHours}
                onChange={(e) => handleChange('operatingHours', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-gray-700 font-bold mb-1">Head Office Physical Address</label>
              <input
                type="text"
                value={formData.headOfficeAddress}
                onChange={(e) => handleChange('headOfficeAddress', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-gray-700 font-bold mb-1">Google Maps Embed URL</label>
              <input
                type="text"
                value={formData.googleMapsEmbedUrl || ''}
                onChange={(e) => handleChange('googleMapsEmbedUrl', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* HOMEPAGE MARKETING COPY */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-brand-navy border-b border-slate-100 pb-2 flex items-center">
            <Sparkles className="w-4 h-4 text-brand-orange mr-2" />
            <span>Homepage Copy & Story</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Hero Section Main Heading</label>
              <input
                type="text"
                value={formData.heroHeading}
                onChange={(e) => handleChange('heroHeading', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Hero Supporting Subtitle</label>
              <input
                type="text"
                value={formData.heroSubheading}
                onChange={(e) => handleChange('heroSubheading', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">About Company Summary</label>
              <textarea
                rows={3}
                value={formData.aboutCompany}
                onChange={(e) => handleChange('aboutCompany', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Our Story</label>
              <textarea
                rows={3}
                value={formData.ourStory}
                onChange={(e) => handleChange('ourStory', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Mission Statement</label>
                <textarea
                  rows={2}
                  value={formData.missionStatement}
                  onChange={(e) => handleChange('missionStatement', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Vision Statement</label>
                <textarea
                  rows={2}
                  value={formData.visionStatement}
                  onChange={(e) => handleChange('visionStatement', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes to Database...' : 'Save Website Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
