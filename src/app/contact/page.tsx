import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "../../../supabase/server";
import { ContactForm } from "@/components/contact/contact-form";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .eq("is_active", true);

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066CC] to-[#004999] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-grotesk">Contact Us</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            We&apos;d love to hear from you. Get in touch for questions, quotes, or feedback.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1A2332] mb-6 font-grotesk">Get In Touch</h2>
              <p className="text-[#5A6A7A] mb-8 leading-relaxed">
                Whether you have a question about our services, pricing, or just want to say hello — our team is ready to help.
              </p>

              <div className="space-y-6">
                {locations?.map((location) => (
                  <div key={location.id}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#0066CC]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1A2332] font-grotesk">{location.name}</h3>
                        <p className="text-[#5A6A7A] text-sm">{location.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#00B8D4]/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#00B8D4]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1A2332] font-grotesk">Phone</h3>
                        <p className="text-[#5A6A7A] text-sm">{location.phone}</p>
                      </div>
                    </div>

                    {location.whatsapp && (
                      <div className="mb-6 p-4 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="w-5 h-5 text-[#25D366]" />
                          <h3 className="font-semibold text-[#1A2332] text-sm">WhatsApp</h3>
                        </div>
                        <a
                          href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
                            Chat Now
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-6 mt-6 pt-6 border-t">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00C853]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#00C853]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] font-grotesk">Email</h3>
                    <p className="text-[#5A6A7A] text-sm">info@furalaundryanddrycleaner.com</p>
                    <p className="text-[#5A6A7A] text-sm">izihirekellya@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FF6F00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] font-grotesk">Operating Hours</h3>
                    <p className="text-[#5A6A7A] text-sm">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                    <p className="text-[#FF6F00] text-sm font-medium">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
