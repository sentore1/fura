import { createClient } from "../../../../supabase/server";
import { BlogAdmin } from "@/components/dashboard/blog-admin";
import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/sign-in");
  }
  
  const isAdmin = user.user_metadata?.role === "admin" || user.email === "admin@fura.com";
  
  if (!isAdmin) {
    return redirect("/dashboard");
  }
  
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <DashboardNavbar />
      <BlogAdmin posts={posts || []} />
    </>
  );
}
