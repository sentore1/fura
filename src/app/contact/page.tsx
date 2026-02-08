import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#0066CC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] font-grotesk">Location</h3>
                    <p className="text-[#5A6A7A] text-sm">Kigali, Rwanda</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00B8D4]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#00B8D4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] font-grotesk">Phone</h3>
                    <p className="text-[#5A6A7A] text-sm">+250 784 649 169</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00C853]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#00C853]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] font-grotesk">Email</h3>
                    <p className="text-[#5A6A7A] text-sm">info@furalaundryanddrycleaner.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FF6F00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] font-grotesk">Operating Hours</h3>
                    <p className="text-[#5A6A7A] text-sm">Monday - Saturday: 7:00 AM - 7:00 PM</p>
                    <p className="text-[#FF6F00] text-sm font-medium">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  <h3 className="font-semibold text-[#1A2332] font-grotesk">Chat on WhatsApp</h3>
                </div>
                <p className="text-sm text-[#5A6A7A] mb-4">
                  Fastest way to reach us! Send us a message on WhatsApp for quick responses.
                </p>
                <a
                  href="https://wa.me/250784649169"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#1A2332] mb-6 font-grotesk">Send a Message</h2>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-[#1A2332]">Full Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-[#1A2332]">Phone</Label>
                    <Input id="phone" placeholder="+250 7XX XXX XXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1A2332]">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-[#1A2332]">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-[#1A2332]">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} />
                </div>
                <Button type="button" className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
