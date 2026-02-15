import { createClient } from "../../../../supabase/server";
import { MessagesAdmin } from "@/components/dashboard/messages-admin";
import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }
  
  const isAdmin = user.user_metadata?.role === "admin" || user.email === "admin@fura.com";
  
  if (!isAdmin) {
    return redirect("/dashboard");
  }
  
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <DashboardNavbar />
      <MessagesAdmin messages={messages || []} />
    </>
  );
}
