"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { FaTshirt, FaUserTie } from "react-icons/fa";
import { GiTrousers, GiLabCoat, GiSparkles, GiBed } from "react-icons/gi";
import { MdLocalLaundryService, MdWindow, MdCurtains } from "react-icons/md";
import { PiDressFill, PiCoatHangerFill } from "react-icons/pi";
import { AiOutlineAppstore } from "react-icons/ai";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServiceSelection } from "@/components/booking/steps/service-selection";
import type { BookingData } from "@/components/booking/booking-flow";

interface Service {
  id: string;
  name: string;
  category: string;
  price_rwf: number;
  description: string;
  garment_type: string;
}

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
  return serviceIcons[type] || MdLocalLaundryService;
};

export function ServicesScroll({ services }: { services: Service[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
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

  const handleBookClick = (service: Service) => {
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

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    checkScroll();
    scrollEl.addEventListener('scroll', checkScroll);

    const interval = setInterval(() => {
      if (isPaused) return;
      if (scrollEl.scrollLeft >= scrollEl.scrollWidth - scrollEl.clientWidth) {
        scrollEl.scrollLeft = 0;
      } else {
        scrollEl.scrollLeft += 1;
      }
    }, 30);

    return () => {
      scrollEl.removeEventListener('scroll', checkScroll);
      clearInterval(interval);
    };
  }, [isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0066CC] hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0066CC] hover:bg-gray-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4 min-w-max">
          {services?.map((service) => {
            const Icon = getServiceIcon(service.name, service.garment_type);
            return (
              <div key={service.id} className="w-64">
                <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-[#0066CC]/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-3xl bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] mb-2 font-grotesk">{service.name}</h3>
                  <p className="text-[#5A6A7A] text-sm mb-4 line-clamp-2">{service.description}</p>
                  <p className="text-sm font-mono-data font-semibold text-[#0066CC] mb-4">{service.price_rwf.toLocaleString()} RWF</p>
                  <button
                    onClick={() => handleBookClick(service)}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0066CC] text-white rounded-lg text-sm font-semibold hover:bg-[#0052A3] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
    </div>
  );
}
