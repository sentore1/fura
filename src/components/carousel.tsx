'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({ images: initialImages }: { images?: { image_url: string }[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = initialImages?.map(i => i.image_url) || [
    '/New folder/slide/35977.jpg',
    '/New folder/slide/51763.jpg',
    '/New folder/slide/53202.jpg',
    '/New folder/laundry/35977.jpg',
    '/New folder/laundry/51763.jpg',
    '/New folder/laundry/53202.jpg',
    '/New folder/ironning/170680750_10556978.png',
    '/New folder/ironning/405497144_aedb29a7-05ad-441a-a00d-1d128bc0ef7e-removebg-preview.png',
    '/New folder/ironning/405497202_d98b8013-a8a0-4604-8a0a-6864fed22e61-removebg-preview.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 50);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((current - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 50);
  };

  const next = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((current + 1) % images.length);
      setIsTransitioning(false);
    }, 50);
  };

  const getImage = (offset: number) => images[(current + offset + images.length) % images.length];

  return (
    <div className="relative group">
      <div className="flex items-center justify-center gap-4 overflow-hidden px-4">
        <div className={`relative w-[25%] h-[300px] md:h-[400px] rounded-3xl overflow-hidden opacity-50 transition-all duration-700 ease-in-out ${isTransitioning ? 'scale-95' : 'scale-100'}`}>
          <Image key={`prev-${current}`} src={getImage(-1)} alt="Previous" fill className="object-cover" priority />
        </div>
        <div className={`relative w-[50%] h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out ${isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
          <Image key={`current-${current}`} src={getImage(0)} alt="Current" fill className="object-cover" priority />
        </div>
        <div className={`relative w-[25%] h-[300px] md:h-[400px] rounded-3xl overflow-hidden opacity-50 transition-all duration-700 ease-in-out ${isTransitioning ? 'scale-95' : 'scale-100'}`}>
          <Image key={`next-${current}`} src={getImage(1)} alt="Next" fill className="object-cover" priority />
        </div>
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <ChevronLeft className="w-6 h-6 text-[#0066CC]" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <ChevronRight className="w-6 h-6 text-[#0066CC]" />
      </button>
    </div>
  );
}
