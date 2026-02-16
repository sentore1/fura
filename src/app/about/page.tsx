import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Shield, Heart, Target, Eye, Award, Users } from "lucide-react";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066CC] to-[#004999] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-grotesk">Our Story</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            From a pandemic-born necessity to Kigali&apos;s trusted laundry partner — the Fura journey.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#00B8D4] uppercase tracking-wider mb-3">Our Journey</span>
            <h2 className="text-3xl font-bold text-[#1A2332] font-grotesk">Built on Trust, Driven by Care</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0066CC] to-[#00B8D4]" />

            {[
              {
                year: "2020",
                title: "Born During COVID-19",
                desc: "When the pandemic hit Kigali, we saw a critical need for hygienic laundry services. Fura was born to ensure families had access to professionally cleaned, sanitized clothing during uncertain times.",
              },
              {
                year: "2021",
                title: "Growing Roots",
                desc: "Word spread quickly about our commitment to quality and hygiene. We expanded our services and began offering pickup and delivery across Kigali neighborhoods.",
              },
              {
                year: "2022",
                title: "Expanding Services",
                desc: "Added specialty cleaning for wedding dresses, carpets, and curtains. Introduced our express service for those urgent needs.",
              },
              {
                year: "2023",
                title: "Community Trust",
                desc: "Reached 1,000+ regular customers. Partnered with local hotels and businesses for commercial laundry services.",
              },
              {
                year: "2024",
                title: "Digital Transformation",
                desc: "Launched our online booking platform with MTN MoMo integration, making it easier than ever for customers to access our services.",
              },
              {
                year: "2025",
                title: "5 Years of Trust",
                desc: "Celebrating half a decade of serving Kigali with excellence, processing over 10,000 garments and continuing to grow.",
              },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-12" : "text-left pl-12"}`}>
                  <div className="font-mono-data text-sm font-semibold text-[#00B8D4] mb-1">{item.year}</div>
                  <h3 className="text-xl font-bold text-[#1A2332] mb-2 font-grotesk">{item.title}</h3>
                  <p className="text-[#5A6A7A] leading-relaxed">{item.desc}</p>
                </div>
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00B8D4] flex items-center justify-center text-white font-bold font-grotesk shrink-0 shadow-lg">
                  {item.year.slice(2)}
                </div>
                <div className={`flex-1 md:hidden`}>
                  <div className="font-mono-data text-sm font-semibold text-[#00B8D4] mb-1">{item.year}</div>
                  <h3 className="text-xl font-bold text-[#1A2332] mb-2 font-grotesk">{item.title}</h3>
                  <p className="text-[#5A6A7A] leading-relaxed">{item.desc}</p>
                </div>
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F8FAFB]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#0066CC]/10 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-[#0066CC]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2332] mb-4 font-grotesk">Our Mission</h3>
              <p className="text-[#5A6A7A] leading-relaxed">
                To provide Kigali families and businesses with the highest quality laundry and dry cleaning services, delivered with convenience, care, and unwavering commitment to hygiene standards.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#00B8D4]/10 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-[#00B8D4]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2332] mb-4 font-grotesk">Our Vision</h3>
              <p className="text-[#5A6A7A] leading-relaxed">
                To be Rwanda&apos;s most trusted laundry brand — known for quality, reliability, and innovation in garment care, setting the standard for professional cleaning services in East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#00B8D4] uppercase tracking-wider mb-3">What We Stand For</span>
            <h2 className="text-3xl font-bold text-[#1A2332] font-grotesk">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Hygiene", desc: "Strict sanitization at every step", color: "text-[#0066CC] bg-[#0066CC]/10" },
              { icon: <Heart className="w-6 h-6" />, title: "Care", desc: "Every garment treated with respect", color: "text-[#00B8D4] bg-[#00B8D4]/10" },
              { icon: <Award className="w-6 h-6" />, title: "Quality", desc: "Consistent excellence in service", color: "text-[#00C853] bg-[#00C853]/10" },
              { icon: <Users className="w-6 h-6" />, title: "Community", desc: "Building trust through relationships", color: "text-[#FF6F00] bg-[#FF6F00]/10" },
            ].map((val, i) => (
              <div key={i} className="text-center p-6">
                <div className={`w-14 h-14 rounded-2xl ${val.color} flex items-center justify-center mx-auto mb-4`}>
                  {val.icon}
                </div>
                <h3 className="font-bold text-[#1A2332] mb-2 font-grotesk">{val.title}</h3>
                <p className="text-sm text-[#5A6A7A]">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
