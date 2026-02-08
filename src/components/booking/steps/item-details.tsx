"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, User, Phone } from "lucide-react";
import type { BookingData } from "../booking-flow";

export function ItemDetails({
  bookingData,
  updateBookingData,
  onNext,
  onPrev,
}: {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const isValid =
    bookingData.customerName.trim() &&
    bookingData.customerPhone.trim() &&
    bookingData.pickupAddress.trim();

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2332] mb-1 font-grotesk">Your Details</h2>
      <p className="text-sm text-[#5A6A7A] mb-6">
        Enter your contact and address information for pickup and delivery
      </p>

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1A2332] flex items-center gap-2">
              <User className="w-4 h-4 text-[#5A6A7A]" />
              Full Name *
            </Label>
            <Input
              value={bookingData.customerName}
              onChange={(e) => updateBookingData({ customerName: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1A2332] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#5A6A7A]" />
              Phone Number *
            </Label>
            <Input
              value={bookingData.customerPhone}
              onChange={(e) => updateBookingData({ customerPhone: e.target.value })}
              placeholder="+250 7XX XXX XXX"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#1A2332] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#5A6A7A]" />
            Pickup Address *
          </Label>
          <Input
            value={bookingData.pickupAddress}
            onChange={(e) => updateBookingData({ pickupAddress: e.target.value })}
            placeholder="Where should we pick up your laundry?"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#1A2332] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#5A6A7A]" />
            Delivery Address
          </Label>
          <Input
            value={bookingData.deliveryAddress}
            onChange={(e) => updateBookingData({ deliveryAddress: e.target.value })}
            placeholder="Leave empty if same as pickup address"
          />
          <p className="text-xs text-[#5A6A7A]">Leave empty if same as pickup address</p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#1A2332]">Special Instructions</Label>
          <Textarea
            value={bookingData.specialInstructions}
            onChange={(e) => updateBookingData({ specialInstructions: e.target.value })}
            placeholder="Any special care instructions, stain notes, etc."
            rows={3}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-8 p-5 rounded-xl bg-gray-50 border">
        <h3 className="font-semibold text-[#1A2332] mb-3 font-grotesk">Order Summary</h3>
        <div className="space-y-2">
          {bookingData.items.map((item) => (
            <div key={item.service.id} className="flex justify-between text-sm">
              <span className="text-[#5A6A7A]">
                {item.service.name} × {item.quantity}
              </span>
              <span className="font-mono-data font-medium text-[#1A2332]">
                {(item.service.price_rwf * item.quantity).toLocaleString()} RWF
              </span>
            </div>
          ))}
          {bookingData.isExpress && (
            <div className="flex justify-between text-sm text-[#FF6F00]">
              <span className="font-medium">Express surcharge (+50%)</span>
              <span className="font-mono-data font-medium">
                +{(bookingData.totalAmount - bookingData.items.reduce((s, i) => s + i.service.price_rwf * i.quantity, 0)).toLocaleString()} RWF
              </span>
            </div>
          )}
          <div className="border-t pt-2 mt-2 flex justify-between">
            <span className="font-semibold text-[#1A2332]">Total</span>
            <span className="font-mono-data font-bold text-lg text-[#0066CC]">
              {bookingData.totalAmount.toLocaleString()} RWF
            </span>
          </div>
        </div>
        <div className="mt-3 text-xs text-[#5A6A7A]">
           Pickup: {bookingData.pickupDate} at {bookingData.pickupTime}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
