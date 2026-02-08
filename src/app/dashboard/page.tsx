import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user is admin
  const isAdmin = user.user_metadata?.role === "admin" || user.email === "admin@fura.com";

  // Fetch user's orders
  const { data: userOrders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch all orders (only for admin)
  const { data: allOrders } = isAdmin
    ? await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <>
      <DashboardNavbar />
      <DashboardContent
        user={user}
        userOrders={userOrders || []}
        allOrders={allOrders || []}
        isAdmin={isAdmin}
      />
    </>
  );
}
