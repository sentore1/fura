import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../../supabase/server";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

export async function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Navbar />

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="w-full h-96 object-cover rounded-xl mb-8" />
          )}
          <span className="text-sm font-semibold text-[#0066CC] uppercase">{post.category}</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph: string, i: number) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
