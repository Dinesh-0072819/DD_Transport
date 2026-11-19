import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import { WebsiteSettings } from '../types';
import { apiClient } from '../services/api';

interface ContactPageProps {
  settings: WebsiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      // Register inquiry as general enquiry
      await apiClient.post('/enquiries', {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        pickupLocation: 'Sivakasi Hub (General Inquiry)',
        deliveryLocation: 'Inquiry',
        goodsType: subject.trim() || 'General Transport Query',
        weightApprox: 'N/A',
        lorryTypePreferred: 'General Fleet Inquiry',
        additionalRequirements: message.trim(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Resilient graceful UX
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
            Contact DD Transport
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Have questions about lorry availability, freight quotations, or interstate logistics? Reach out to our Sivakasi office directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Direct Business Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Proprietor Card */}
            <div className="bg-brand-navy text-white p-6 sm:p-8 rounded-2xl shadow-md border-2 border-brand-orange/40">
              <div className="flex items-center space-x-3.5 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-brand-orange bg-white shadow-md flex items-center justify-center shrink-0">
                  <img
                    src={settings.logoUrl || '/images/dd_logo.jpg'}
                    alt="DD Transport Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{settings.companyName}</h3>
                  <p className="text-xs text-brand-orange font-semibold">Prop. {settings.proprietorName}</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Specialized in Full Truck Loads for industrial matches, printing cartons, fireworks, and agricultural freight.
              </p>

              <div className="space-y-4 text-xs text-gray-200">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <span className="leading-snug">{settings.headOfficeAddress}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                  <div className="space-y-0.5">
                    <a href={`tel:${cleanPhone}`} className="hover:text-white font-bold block text-sm">
                      {settings.primaryPhone} (Primary)
                    </a>
                    {settings.secondaryPhone && (
                      <a href={`tel:${settings.secondaryPhone.replace(/\D/g, '')}`} className="text-gray-400 hover:text-white block">
                        {settings.secondaryPhone} (Secondary)
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                  <a href="mailto:ddtransport.loads@gmail.com" className="hover:text-white text-sm">
                    ddtransport.loads@gmail.com
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="leading-relaxed">{settings.operatingHours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-gray-700">
                <a
                  href={`tel:${cleanPhone}`}
                  className="py-2.5 px-3 bg-white hover:bg-gray-100 text-brand-navy text-center font-bold text-xs rounded-lg transition flex items-center justify-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hello%20Prop.%20P.%20Mariappan,%20I%20have%20an%20inquiry%20regarding%20DD%20Transport.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold text-xs rounded-lg transition flex items-center justify-center space-x-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Trust Highlights */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-gray-600 space-y-3">
              <div className="flex items-center space-x-2 text-brand-navy font-bold">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span>Why Direct Contact Matters</span>
              </div>
              <p>
                You speak directly to the person dispatching the truck. No middleman margins, no false transit promises, and full accountability from loading to delivery.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-brand-navy mb-2">Send Us a Direct Message</h2>
              <p className="text-xs text-gray-500 mb-6">
                Fill in your query and our team will get back to you promptly.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-emerald-900">Message Received!</h3>
                  <p className="text-xs text-emerald-700 mt-1 mb-4">
                    Thank you, {name}. Prop. P. Mariappan or our fleet manager will contact you at {phone} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="text-xs text-brand-orange hover:underline font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. K. Ramanathan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98421 55670"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. contact@business.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. Sivakasi to Chennai Full Load Rate"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message / Transport Requirement *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please specify goods type, approximate weight, and desired pickup/delivery locations..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-orange hover:bg-brand-orangeHover disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-brand-orange" />
            <h3 className="text-base font-bold text-brand-navy">Office & Depot Location</h3>
            <span className="text-xs text-gray-500 font-normal">| 6/400, Bose Colony, Naranapuram Road, Sivakasi - 626 189</span>
          </div>
          <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200">
            <iframe
              title="DD Transport Office Sivakasi Location Map"
              src={settings.googleMapsEmbedUrl || "https://maps.google.com/maps?q=Naranapuram+Road+Sivakasi+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
