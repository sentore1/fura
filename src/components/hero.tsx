"use client";

import Link from "next/link";
import { ArrowRight, Clock, Leaf, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/New folder/slide/35977.jpg",
    "/New folder/slide/51763.jpg",
    "/New folder/slide/53202.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative bubbles */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#00B8D4]/8 blur-sm" />
      <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-[#0066CC]/6 blur-sm" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-[#00B8D4]/10 blur-sm" />
      <div className="absolute bottom-40 left-32 w-16 h-16 rounded-full bg-[#0066CC]/8 blur-sm" />
      <div className="absolute top-60 left-20 w-12 h-12 rounded-full bg-[#00B8D4]/12" />
      
      <div className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#0066CC] text-sm font-medium mb-8">
                <span>5 Years of Trusted Service in Kigali</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A2332] mb-6 tracking-tight leading-tight font-grotesk">
                Professional{" "}
                <span className="relative inline-block overflow-hidden">
                  <span className="relative z-10 animate-float animate-gradient bg-gradient-to-r from-[#0066CC] via-[#00B8D4] to-[#0066CC] bg-[length:200%_auto] bg-clip-text text-transparent">
                    Laundry Care
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan-400/30 to-transparent animate-ripple" />
                </span>
                {" "}You Can Trust
              </h1>
              
              <p className="text-lg sm:text-xl text-[#5A6A7A] mb-10 leading-relaxed font-manrope">
                From everyday wear to delicate fabrics — Fura Laundry delivers exceptional cleaning with pickup and delivery right to your door in Kigali.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center px-8 py-4 text-white bg-[#0066CC] rounded-full hover:bg-[#0052A3] transition-all text-lg font-semibold shadow-lg shadow-[#0066CC]/25 hover:shadow-xl hover:shadow-[#0066CC]/30 active:scale-[0.98]"
                >
                  Book a Pickup
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 text-[#0066CC] bg-[#0066CC]/10 rounded-full hover:bg-[#0066CC]/15 transition-all text-lg font-semibold"
                >
                  View Services & Pricing
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 justify-center lg:justify-start bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#00B8D4]/15 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#00B8D4]" />
                  </div>
                  <span className="text-sm font-medium text-[#1A2332]">Free Pickup & Delivery</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#0066CC]/15 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#0066CC]" />
                  </div>
                  <span className="text-sm font-medium text-[#1A2332]">24-Hour Turnaround</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#00C853]/15 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#00C853]" />
                  </div>
                  <span className="text-sm font-medium text-[#1A2332]">Eco-Friendly Products</span>
                </div>
              </div>
            </div>

            {/* Right - Image Slider */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto overflow-hidden rounded-2xl shadow-2xl">
                {slides.map((slide, index) => (
                  <img
                    key={slide}
                    src={slide}
                    alt={`Laundry Service ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
