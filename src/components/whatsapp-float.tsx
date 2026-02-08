'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  price_rwf: number;
}

const categoryLabels: Record<string, string> = {
  wash_fold: "Wash & Fold",
  wash_iron: "Wash & Iron Per Item",
  iron_only: "Iron Only",
  specialty: "Specialty Cleaning",
};

export default function WhatsAppFloat({ services }: { services: Service[] }) {
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [service, setService] = useState('');

  const handleSend = () => {
    const text = `Service: ${service}\n\nMessage: ${message}`;
    window.open(`https://wa.me/250784649169?text=${encodeURIComponent(text)}`, '_blank');
    setShowDialog(false);
    setMessage('');
    setCategory('');
    setService('');
  };

  const categories = [...new Set(services.map(s => s.category))];
  const filteredServices = category ? services.filter(s => s.category === category) : [];

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="fixed bottom-6 left-4 z-50 bg-gradient-to-r from-[#0066CC] to-[#00B8D4] bg-[length:200%_100%] animate-gradient rounded-[40px] px-2 py-1.5 flex items-center gap-1.5 shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="text-white font-semibold text-xs">Chat Now</span>
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-start p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto mb-20 ml-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#1A2332]">Contact Us</h3>
              <button onClick={() => setShowDialog(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setService(''); }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabels[cat] || cat}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  disabled={!category}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select a service</option>
                  {filteredServices.map((s) => (
                    <option key={s.id} value={`${s.name} - ${s.price_rwf} RWF`}>
                      {s.name} - {s.price_rwf} RWF
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  placeholder="Type your message here..."
                />
              </div>
              
              <button
                onClick={handleSend}
                disabled={!service || !message}
                className="w-full bg-gradient-to-r from-[#0066CC] to-[#00B8D4] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
