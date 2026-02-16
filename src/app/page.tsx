import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Carousel from "@/components/carousel";
import Link from "next/link";
import { ArrowRight, Shield, Clock, Star, Calendar } from 'lucide-react';
import { createClient } from "../../supabase/server";
import { ServicesScroll } from "@/components/services-scroll";
import WhatsAppFloat from "@/components/whatsapp-float";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("price_rwf")
    .limit(20);
  
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const { data: heroSlides } = await supabase
    .from("slides")
    .select("image_url")
    .eq("type", "hero")
    .eq("is_active", true)
    .order("display_order");

  const { data: carouselSlides } = await supabase
    .from("slides")
    .select("image_url")
    .eq("type", "carousel")
    .eq("is_active", true)
    .order("display_order");
  
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />
      <Hero slides={heroSlides || undefined} />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#00B8D4] uppercase tracking-wider mb-3">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-4 font-grotesk">Everything Your Wardrobe Needs</h2>
            <p className="text-[#5A6A7A] max-w-2xl mx-auto">Professional cleaning for every fabric, every garment. Choose from our comprehensive range of laundry services.</p>
          </div>
          
          <ServicesScroll services={services || []} />
          
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center text-[#0066CC] font-semibold hover:text-[#0052A3] transition-colors">
              View Full Price List
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#0066CC] to-[#00B8D4] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold mb-1 font-grotesk">5+</div>
              <div className="text-white/80 text-sm font-medium">Years of Trust</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold mb-1 font-grotesk">2,500+</div>
              <div className="text-white/80 text-sm font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold mb-1 font-grotesk">10,000+</div>
              <div className="text-white/80 text-sm font-medium">Garments Cleaned</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold mb-1 font-grotesk">99%</div>
              <div className="text-white/80 text-sm font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#00B8D4] uppercase tracking-wider mb-3">Why Fura</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-4 font-grotesk">The Fura Difference</h2>
            <p className="text-[#5A6A7A] max-w-2xl mx-auto">Born during the 2020 pandemic, we understand the importance of hygiene and reliability.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-3xl bg-[#0066CC]/10 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2332] mb-3 font-grotesk">Hygiene First</h3>
              <p className="text-[#5A6A7A] leading-relaxed">
                Born during COVID-19, hygiene is in our DNA. Every garment is handled with strict sanitization protocols.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-3xl bg-[#0066CC]/10 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2332] mb-3 font-grotesk">Express Service</h3>
              <p className="text-[#5A6A7A] leading-relaxed">
                Need it fast? Our express service gets your clothes back to you in record time, with just a 50% surcharge.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-3xl bg-[#0066CC]/10 flex items-center justify-center mb-5">
                <Star className="w-6 h-6 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2332] mb-3 font-grotesk">Quality Guaranteed</h3>
              <p className="text-[#5A6A7A] leading-relaxed">
                5 years of trusted service in Kigali. We treat every garment as if it were our own, ensuring top-quality care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#00B8D4] uppercase tracking-wider mb-3">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-4 font-grotesk">How It Works</h2>
            <p className="text-[#5A6A7A] max-w-2xl mx-auto">Get your laundry done in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Book Online", desc: "Select services and schedule a pickup time" },
              { step: "2", title: "We Pick Up", desc: "Our team collects from your doorstep" },
              { step: "3", title: "We Clean", desc: "Professional cleaning with care and precision" },
              { step: "4", title: "We Deliver", desc: "Fresh, clean clothes delivered back to you" },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00B8D4] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 font-grotesk">
                  {item.step}
                </div>
                {i < 3 && <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#0066CC]/30 to-[#00B8D4]/30" />}
                <h3 className="font-bold text-[#1A2332] mb-2 font-grotesk">{item.title}</h3>
                <p className="text-sm text-[#5A6A7A]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Carousel images={carouselSlides || undefined} />
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-[#00B8D4] uppercase tracking-wider mb-3">Latest Updates</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-4 font-grotesk">From Our Blog</h2>
            <p className="text-[#5A6A7A] max-w-2xl mx-auto">Tips, guides, and news about laundry care</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts?.map((post) => (
              <div key={post.id} className="bg-white rounded-xl border hover:shadow-lg transition-shadow overflow-hidden h-full">
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <span className="text-xs font-semibold text-[#0066CC] uppercase">{post.category}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <button className="text-sm font-semibold text-[#0066CC] hover:text-[#0052A3] flex items-center gap-1">
                        Read More <ArrowRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts && posts.length > 0 && (
            <div className="text-center mt-10">
              <Link href="/blog" className="inline-flex items-center text-[#0066CC] font-semibold hover:text-[#0052A3] transition-colors">
                View All Posts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFB]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block text-sm font-semibold text-[#FF6F00] uppercase tracking-wider mb-3">Easy Payment</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-4 font-grotesk">Pay with MTN Mobile Money</h2>
              <p className="text-[#5A6A7A] mb-6">
                Simple, fast, and secure. Pay for your laundry services using MTN MoMo — Rwanda&apos;s most popular mobile payment method.
              </p>
              <div className="bg-[#1A2332] text-white rounded-xl p-4 inline-block">
                <p className="text-xs text-gray-400 mb-1">Dial USSD Code</p>
                <p className="font-mono-data text-lg font-semibold text-[#FFCC00]">*182*8*1*008747*[amount]#</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-2xl bg-[#FFCC00] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-black">MTN</div>
                  <div className="text-sm font-bold text-black">MoMo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#0066CC] to-[#004999]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-grotesk">Ready to Experience the Fura Difference?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">Schedule your first pickup today and discover why thousands of Kigali residents trust us with their clothes.</p>
          <Link href="/booking" className="inline-flex items-center px-8 py-4 text-[#0066CC] bg-white rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold shadow-lg">
            Book Your Pickup Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat services={services || []} />
    </div>
  );
}
