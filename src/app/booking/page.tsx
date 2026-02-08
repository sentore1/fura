import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BookingFlow } from "@/components/booking/booking-flow";
import { createClient } from "../../../supabase/server";

export default async function BookingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("category")
    .order("price_rwf");

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />
      <BookingFlow 
        services={services || []} 
        userId={user?.id || null} 
        userEmail={user?.email || null} 
      />
      <Footer />
    </div>
  );
}
