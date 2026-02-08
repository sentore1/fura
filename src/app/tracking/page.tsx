import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { TrackingContent } from "@/components/tracking/tracking-content";
import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";

export default async function TrackingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />
      <TrackingContent orders={orders || []} />
      <Footer />
    </div>
  );
}
