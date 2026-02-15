"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Zap, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServiceSelection } from "@/components/booking/steps/service-selection";
import type { BookingData } from "@/components/booking/booking-flow";
import { GiIronCross, GiWashingMachine, GiClothes, GiDress, GiTrousers, GiLabCoat, GiSofa, GiBed, GiSparkles } from "react-icons/gi";
import { MdLocalLaundryService, MdIron, MdCurtains, MdWindow } from "react-icons/md";
import { FaTshirt, FaUserTie } from "react-icons/fa";
import { TbIroning3 } from "react-icons/tb";
import { AiOutlineAppstore } from "react-icons/ai";
import { PiDressFill, PiCoatHangerFill } from "react-icons/pi";
import { LuSofa } from "react-icons/lu";
import { RiLayoutGridFill } from "react-icons/ri";
import { BsSuitSpadeFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  wash_iron: "Wash & Iron Per Item",
  iron_only: "Iron Only",
  specialty: "Specialty Cleaning",
};

const categoryColors: Record<string, string> = {
  wash_fold: "bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/20",
  wash_iron: "bg-[#00B8D4]/10 text-[#00B8D4] border-[#00B8D4]/20",
  iron_only: "bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20",
  specialty: "bg-[#FF6F00]/10 text-[#FF6F00] border-[#FF6F00]/20",
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wash_fold: MdLocalLaundryService,
  wash_iron: GiWashingMachine,
  iron_only: MdIron,
  specialty: GiSparkles,
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

export function ServicesContent({ services }: { services: Service[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    items: [],
    isExpress: false,
    pickupDate: "",
    pickupTime: "",
    customerName: "",
    customerPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    specialInstructions: "",
    totalAmount: 0,
  });

  const calculateTotal = (items: any[], isExpress: boolean) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.service.price_rwf * item.quantity,
      0
    );
    return isExpress ? Math.round(subtotal * 1.5) : subtotal;
  };

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => {
      const updated = { ...prev, ...updates };
      updated.totalAmount = calculateTotal(updated.items, updated.isExpress);
      return updated;
    });
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setBookingData({
      items: [{ service, quantity: 1 }],
      isExpress: false,
      pickupDate: "",
      pickupTime: "",
      customerName: "",
      customerPhone: "",
      pickupAddress: "",
      deliveryAddress: "",
      specialInstructions: "",
      totalAmount: service.price_rwf,
    });
  };

  const handleNext = () => {
    window.location.href = '/booking';
  };

  const categories = ["all", ...Object.keys(categoryLabels)];

  const filteredServices = services.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const grouped = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066CC] to-[#004999] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-grotesk">
            Services & Pricing
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
            Transparent pricing for all our laundry and dry cleaning services. All prices in Rwandan Francs (RWF).
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6F00] text-white text-sm font-semibold">
            <Zap className="w-4 h-4" />
            Express service available (+50% surcharge)
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#0066CC] text-white shadow-md"
                      : "bg-gray-100 text-[#5A6A7A] hover:bg-gray-200"
                  }`}
                >
                  {cat === "all" ? "All Services" : categoryLabels[cat]}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6A7A]" />
              <Input
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${categoryColors[category]}`}>
                  {(() => {
                    const Icon = categoryIcons[category];
                    return Icon ? <Icon className="w-3.5 h-3.5" /> : null;
                  })()}
                  {categoryLabels[category]}
                </span>
                <span className="text-sm text-[#5A6A7A]">{items.length} services</span>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-[#5A6A7A] uppercase tracking-wider">
                  <div className="col-span-4">Service</div>
                  <div className="col-span-3">Description</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-3 text-right">Price (RWF)</div>
                </div>
                {items.map((service, i) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 ${
                      i < items.length - 1 ? "border-b border-gray-50" : ""
                    } hover:bg-[#F8FAFB] transition-colors cursor-pointer`}
                  >
                    <div className="col-span-4 font-semibold text-[#1A2332] flex items-center gap-2">
                      {(() => {
                        const Icon = getServiceIcon(service.name, service.garment_type);
                        return Icon ? <Icon className="w-4 h-4 text-[#5A6A7A]" key={service.id} /> : null;
                      })()}
                      {service.name}
                    </div>
                    <div className="col-span-3 text-sm text-[#5A6A7A]">{service.description}</div>
                    <div className="col-span-2">
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-[#5A6A7A] capitalize">
                        {service.garment_type}
                      </span>
                    </div>
                    <div className="col-span-3 text-right font-mono-data font-semibold text-[#0066CC]">
                      {service.price_rwf.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#5A6A7A] text-lg">No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Book Service</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <ServiceSelection
              services={services}
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={handleNext}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-4 font-grotesk">
            Ready to get started?
          </h2>
          <p className="text-[#5A6A7A] mb-8 max-w-lg mx-auto">
            Book your laundry pickup today and experience the Fura difference.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8 py-4 text-lg">
              Book a Pickup
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
