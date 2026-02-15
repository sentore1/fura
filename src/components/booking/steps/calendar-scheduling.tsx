"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingData } from "../booking-flow";
import { createClient } from "../../../../supabase/client";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
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
  const [holidays, setHolidays] = useState<{month: number, day: number}[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("holidays").select("month, day");
      if (data) {
        setHolidays(data);
      }
    };
    fetchHolidays();
  }, []);

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

  const isHoliday = (day: number) => {
    return holidays.some(h => h.month === currentMonth + 1 && h.day === day);
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
              const holiday = isHoliday(day);
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  disabled={disabled}
                  className={`h-10 rounded-lg text-sm font-medium transition-all relative ${
                    selected
                      ? "bg-[#0066CC] text-white shadow-md"
                      : disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : holiday
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                      : isToday
                      ? "bg-[#0066CC]/10 text-[#0066CC] hover:bg-[#0066CC]/20"
                      : "text-[#1A2332] hover:bg-gray-100"
                  }`}
                >
                  {day}
                  {holiday && !disabled && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-xs text-[#FF6F00] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Sundays are closed. Service hours: 8AM - 6PM
            </p>
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <span className="w-3 h-3 bg-amber-50 border border-amber-200 rounded inline-block" />
              Holidays - Contact us on WhatsApp to confirm availability
            </p>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-semibold text-[#1A2332] mb-4 font-grotesk">Select Time</h3>
          {bookingData.pickupDate ? (
            <>
              {isHoliday(Number(bookingData.pickupDate.split("-")[2])) ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <p className="text-sm text-amber-800 mb-4">
                    <span className="font-semibold">{formatSelectedDate()}</span> is a public holiday.
                    <br />Please confirm availability via WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/250788888888?text=Hi, I'd like to confirm availability for pickup on a holiday"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Contact on WhatsApp
                  </a>
                </div>
              ) : (
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
              )}
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
