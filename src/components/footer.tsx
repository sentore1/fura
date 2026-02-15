import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/fura-logo.png" alt="Fura Laundry" width={36} height={36} className="object-contain" />
              <div>
                <span className="text-lg font-bold font-grotesk text-[#0066CC]">FURA</span>
                <p className="text-xs text-[#5A6A7A] tracking-wider">LAUNDRY & DRY CLEANERS</p>
              </div>
            </div>
            <p className="text-[#5A6A7A] text-sm leading-relaxed mb-4">
              Kigali&apos;s trusted laundry service since 2020. Professional care for your garments with free pickup and delivery.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://wa.me/250784649169" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold font-grotesk text-[#1A2332] mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Wash & Fold</Link></li>
              <li><Link href="/services" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Wash & Iron</Link></li>
              <li><Link href="/services" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Iron Only</Link></li>
              <li><Link href="/services" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Specialty Cleaning</Link></li>
              <li><Link href="/booking" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Book a Pickup</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold font-grotesk text-[#1A2332] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/tracking" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Track Order</Link></li>
              <li><Link href="/sign-in" className="text-[#5A6A7A] hover:text-[#0066CC] text-sm transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold font-grotesk text-[#1A2332] mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[#5A6A7A]">
                <MapPin className="w-4 h-4 mt-0.5 text-[#0066CC] shrink-0" />
                <span>Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#5A6A7A]">
                <Phone className="w-4 h-4 mt-0.5 text-[#0066CC] shrink-0" />
                <span>+250 784 649 169</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#5A6A7A]">
                <Mail className="w-4 h-4 mt-0.5 text-[#0066CC] shrink-0" />
                <span>info@furalaundryanddrycleaner.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#5A6A7A]">
                <Clock className="w-4 h-4 mt-0.5 text-[#0066CC] shrink-0" />
                <div>
                  <p>Mon - Sat: 8:00 AM - 6:00 PM</p>
                  <p className="text-[#FF6F00]">Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#5A6A7A] text-sm">
              © {currentYear} Fura Laundry & Dry Cleaners. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#5A6A7A]">Payments via</span>
              <div className="px-3 py-1.5 bg-[#FFCC00] rounded-md text-xs font-bold text-black">MTN MoMo</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
