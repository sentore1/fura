import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />

      <section className="bg-gradient-to-br from-[#0066CC] to-[#004999] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-grotesk">Blog</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Tips, news, and insights about laundry care
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-xl border hover:shadow-lg transition-shadow overflow-hidden">
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <span className="text-xs font-semibold text-[#0066CC] uppercase">{post.category}</span>
                    <h2 className="text-xl font-bold mt-2 mb-3">{post.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!posts?.length && (
            <div className="text-center py-12 text-gray-500">No blog posts yet</div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
