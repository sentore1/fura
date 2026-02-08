"use client";

import { useState } from "react";
import { Plus, Minus, Zap, ShoppingCart } from "lucide-react";
import { FaTshirt, FaUserTie } from "react-icons/fa";
import { GiTrousers, GiLabCoat, GiSparkles } from "react-icons/gi";
import { MdLocalLaundryService, MdWindow } from "react-icons/md";
import { PiDressFill, PiCoatHangerFill } from "react-icons/pi";
import { GiBed } from "react-icons/gi";
import { MdCurtains } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { BookingData, CartItem } from "../booking-flow";

interface Service {
  id: string;
  name: string;
  category: string;
  price_rwf: number;
  description: string;
  garment_type: string;
}

const categoryLabels: Record<string, string> = {
  wash_fold: "Wash & Fold",
  wash_iron: "Wash & Iron",
  iron_only: "Iron Only",
  specialty: "Specialty",
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  tops: FaTshirt,
  bottoms: GiTrousers,
  dresses: PiDressFill,
  outerwear: GiLabCoat,
  formal: PiCoatHangerFill,
  home: MdCurtains,
  bedding: GiBed,
  specialty: GiSparkles,
  mixed: MdLocalLaundryService,
};

const getServiceIcon = (name: string, type: string) => {
  if (name.toLowerCase().includes('carpet')) return AiOutlineAppstore;
  if (name.toLowerCase().includes('curtain')) return MdWindow;
  if (name.toLowerCase().includes('suit')) return FaUserTie;
  return serviceIcons[type];
};

export function ServiceSelection({
  services,
  bookingData,
  updateBookingData,
  onNext,
}: {
  services: Service[];
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("wash_fold");
  const categories = Object.keys(categoryLabels);

  const getQuantity = (serviceId: string) => {
    const item = bookingData.items.find((i) => i.service.id === serviceId);
    return item?.quantity || 0;
  };

  const updateQuantity = (service: Service, delta: number) => {
    const existing = bookingData.items.find((i) => i.service.id === service.id);
    let newItems: CartItem[];

    if (existing) {
      const newQty = Math.max(0, existing.quantity + delta);
      if (newQty === 0) {
        newItems = bookingData.items.filter((i) => i.service.id !== service.id);
      } else {
        newItems = bookingData.items.map((i) =>
          i.service.id === service.id ? { ...i, quantity: newQty } : i
        );
      }
    } else if (delta > 0) {
      newItems = [...bookingData.items, { service, quantity: 1 }];
    } else {
      newItems = bookingData.items;
    }

    updateBookingData({ items: newItems });
  };

  const totalItems = bookingData.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = bookingData.items.reduce(
    (sum, i) => sum + i.service.price_rwf * i.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2332] mb-1 font-grotesk">Select Services</h2>
      <p className="text-sm text-[#5A6A7A] mb-6">Choose the services you need and set quantities</p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-[#0066CC] text-white"
                : "bg-gray-100 text-[#5A6A7A] hover:bg-gray-200"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
        {services
          .filter((s) => s.category === activeCategory)
          .map((service) => {
            const qty = getQuantity(service.id);
            return (
              <div
                key={service.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  qty > 0
                    ? "border-[#0066CC]/30 bg-[#0066CC]/5"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex-1 flex items-center gap-2">
                  <div>
                    {(() => {
                      const Icon = getServiceIcon(service.name, service.garment_type);
                      return Icon ? <Icon className="w-4 h-4 text-[#5A6A7A]" /> : null;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A2332] text-sm">{service.name}</h4>
                    <p className="text-xs text-[#5A6A7A]">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono-data text-sm font-semibold text-[#0066CC]">
                    {service.price_rwf.toLocaleString()} RWF
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(service, -1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      disabled={qty === 0}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-mono-data font-semibold text-sm">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(service, 1)}
                      className="w-8 h-8 rounded-lg bg-[#0066CC] text-white hover:bg-[#0052A3] flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Express Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#FF6F00]/5 border border-[#FF6F00]/20 mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-[#FF6F00]" />
          <div>
            <Label className="font-semibold text-[#1A2332] cursor-pointer">Express Service</Label>
            <p className="text-xs text-[#5A6A7A]">Get your clothes back faster (+50% surcharge)</p>
          </div>
        </div>
        <Switch
          checked={bookingData.isExpress}
          onCheckedChange={(checked) => updateBookingData({ isExpress: checked })}
        />
      </div>

      {/* Summary Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 text-[#5A6A7A]" />
          <div>
            <span className="text-sm font-medium text-[#1A2332]">{totalItems} items selected</span>
            {bookingData.isExpress && (
              <span className="ml-2 text-xs text-[#FF6F00] font-semibold">EXPRESS</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono-data font-bold text-lg text-[#0066CC]">
            {bookingData.totalAmount.toLocaleString()} RWF
          </div>
          {bookingData.isExpress && subtotal > 0 && (
            <div className="text-xs text-[#5A6A7A] line-through">
              {subtotal.toLocaleString()} RWF
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={onNext}
          disabled={bookingData.items.length === 0}
          className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8"
        >
          Continue to Scheduling
        </Button>
      </div>
    </div>
  );
}
