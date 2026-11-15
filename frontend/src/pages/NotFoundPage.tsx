import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <span className="text-4xl font-black text-brand-navy block">404</span>
        <h1 className="text-xl font-bold text-brand-navy mt-2">Route Not Found</h1>
        <p className="text-xs text-gray-500 mt-2 mb-6">
          The logistics page or route you were navigating towards does not exist or has been relocated.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2.5 bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-xs rounded-xl shadow transition"
          >
            <Home className="w-4 h-4 mr-1.5 text-brand-orange" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/quote"
            className="inline-flex items-center px-4 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-xs rounded-xl shadow transition"
          >
            <span>Get a Quote</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
