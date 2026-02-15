import { createClient } from "../../../../supabase/server";
import { LocationsAdmin } from "@/components/dashboard/locations-admin";
import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";

export default async function AdminLocationsPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }
  
  const isAdmin = user.user_metadata?.role === "admin" || user.email === "admin@fura.com";
  
  if (!isAdmin) {
    return redirect("/dashboard");
  }
  
  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .order("created_at");

  return (
    <>
      <DashboardNavbar />
      <LocationsAdmin locations={locations || []} />
    </>
  );
}
