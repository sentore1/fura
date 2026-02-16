import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ServicesContent } from "@/components/services/services-content";
import { createClient } from "../../../supabase/server";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("category")
    .order("price_rwf");

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />
      <ServicesContent services={services || []} />
      <Footer />
    </div>
  );
}
