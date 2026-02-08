"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingData } from "../booking-flow";

const timeSlots = [
  "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function CalendarScheduling({
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
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const isSunday = date.getDay() === 0;
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return isSunday || isPast;
  };

  const isDateSelected = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return bookingData.pickupDate === dateStr;
  };

  const selectDate = (day: number) => {
    if (isDateDisabled(day)) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    updateBookingData({ pickupDate: dateStr });
  };

  const formatSelectedDate = () => {
    if (!bookingData.pickupDate) return "";
    const [y, m, d] = bookingData.pickupDate.split("-");
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${Number(d)}, ${y}`;
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2332] mb-1 font-grotesk">Schedule Pickup</h2>
      <p className="text-sm text-[#5A6A7A] mb-6">Choose your preferred pickup date and time</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#5A6A7A]" />
            </button>
            <h3 className="font-semibold text-[#1A2332] font-grotesk">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-[#5A6A7A]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-[#5A6A7A] py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDateDisabled(day);
              const selected = isDateSelected(day);
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  disabled={disabled}
                  className={`h-10 rounded-lg text-sm font-medium transition-all ${
                    selected
                      ? "bg-[#0066CC] text-white shadow-md"
                      : disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : isToday
                      ? "bg-[#0066CC]/10 text-[#0066CC] hover:bg-[#0066CC]/20"
                      : "text-[#1A2332] hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#FF6F00] mt-3 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Sundays are closed. Service hours: 7AM - 7PM
          </p>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-semibold text-[#1A2332] mb-4 font-grotesk">Select Time</h3>
          {bookingData.pickupDate ? (
            <>
              <p className="text-sm text-[#5A6A7A] mb-4">
                Available slots for <span className="font-semibold text-[#1A2332]">{formatSelectedDate()}</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => updateBookingData({ pickupTime: time })}
                    className={`py-3 rounded-lg text-sm font-mono-data font-medium transition-all ${
                      bookingData.pickupTime === time
                        ? "bg-[#0066CC] text-white shadow-md"
                        : "bg-gray-50 text-[#1A2332] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-48 text-[#5A6A7A] text-sm bg-gray-50 rounded-xl">
              Please select a date first
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!bookingData.pickupDate || !bookingData.pickupTime}
          className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );
}
