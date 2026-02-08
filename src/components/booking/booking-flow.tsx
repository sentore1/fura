"use client";

import { useState } from "react";
import { ServiceSelection } from "./steps/service-selection";
import { CalendarScheduling } from "./steps/calendar-scheduling";
import { ItemDetails } from "./steps/item-details";
import { PaymentStep } from "./steps/payment-step";
import { Check } from "lucide-react";

interface Service {
  id: string;
  name: string;
  category: string;
  price_rwf: number;
  description: string;
  garment_type: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface BookingData {
  items: CartItem[];
  isExpress: boolean;
  pickupDate: string;
  pickupTime: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  specialInstructions: string;
  totalAmount: number;
}

const steps = [
  { label: "Services", number: 1 },
  { label: "Schedule", number: 2 },
  { label: "Details", number: 3 },
  { label: "Payment", number: 4 },
];

export function BookingFlow({
  services,
  userId,
  userEmail,
}: {
  services: Service[];
  userId: string | null;
  userEmail: string | null;
}) {
  const [currentStep, setCurrentStep] = useState(1);
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

  const calculateTotal = (items: CartItem[], isExpress: boolean) => {
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

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#1A2332] font-grotesk mb-2">Book a Pickup</h1>
          <p className="text-[#5A6A7A]">Schedule your laundry service in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep > step.number
                      ? "bg-[#00C853] text-white"
                      : currentStep === step.number
                      ? "bg-[#0066CC] text-white shadow-lg shadow-[#0066CC]/30"
                      : "bg-gray-200 text-[#5A6A7A]"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    currentStep >= step.number ? "text-[#1A2332]" : "text-[#5A6A7A]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-2 mt-[-20px] ${
                    currentStep > step.number
                      ? "bg-[#00C853]"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {currentStep === 1 && (
            <ServiceSelection
              services={services}
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <CalendarScheduling
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 3 && (
            <ItemDetails
              bookingData={bookingData}
              updateBookingData={updateBookingData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 4 && (
            <PaymentStep
              bookingData={bookingData}
              userId={userId}
              userEmail={userEmail}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
