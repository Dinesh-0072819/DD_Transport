import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface FloatingActionsProps {
  settings: WebsiteSettings;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ settings }) => {
  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Floating Call Button */}
      <a
        href={`tel:${cleanPhone}`}
        className="group relative flex items-center justify-center w-12 h-12 bg-brand-navy hover:bg-brand-navyLight text-white rounded-full shadow-xl border-2 border-brand-orange transition-all duration-300 hover:scale-110"
        title="Direct Call to Dispatch"
      >
        <Phone className="w-5 h-5 text-brand-orange animate-bounce" />
        <span className="absolute right-14 bg-brand-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700">
          Call {settings.primaryPhone}
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${cleanPhone}?text=Hello%20DD%20Transport,%20I%20am%20looking%20for%20lorry%20freight%20details.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        title="Chat on WhatsApp with Prop. P. Mariappan"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
        </span>
        <span className="absolute right-16 bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          WhatsApp Direct Quote
        </span>
      </a>
    </div>
  );
};
