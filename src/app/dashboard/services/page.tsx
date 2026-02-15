import { createClient } from "../../../../supabase/server";
import { ServicesAdmin } from "@/components/dashboard/services-admin";
import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }
  
  const isAdmin = user.user_metadata?.role === "admin" || user.email === "admin@fura.com";
  
  if (!isAdmin) {
    return redirect("/dashboard");
  }
  
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("category")
    .order("name");

  return (
    <>
      <DashboardNavbar />
      <ServicesAdmin services={services || []} />
    </>
  );
}
