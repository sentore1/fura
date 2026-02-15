"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Eye, Upload } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
}

const categories = ["Tips", "News", "Guides", "Updates"];

export function BlogAdmin({ posts }: { posts: BlogPost[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "Tips",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadFormData,
    });

    const data = await res.json();
    if (data.url) {
      setFormData(prev => ({ ...prev, image_url: data.url }));
    }
    setUploading(false);
  };

  const handleAdd = async () => {
    setLoading(true);
    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setAdding(false);
    setFormData({ title: "", slug: "", content: "", excerpt: "", category: "Tips", image_url: "" });
    setLoading(false);
    window.location.reload();
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      image_url: post.image_url || "",
    });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);
    const updateData = {
      id,
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      content: formData.content,
      excerpt: formData.excerpt,
      category: formData.category,
      image_url: formData.image_url,
    };
    await fetch("/api/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    setEditing(null);
    setLoading(false);
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    setLoading(true);
    await fetch("/api/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    window.location.reload();
  };

  const handlePublish = async (id: string, published: boolean) => {
    setLoading(true);
    await fetch("/api/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_published: !published }),
    });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Blog</h1>
          <Button onClick={() => setAdding(true)} className="bg-[#0066CC]">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </div>

        {(adding || editing) && (
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{adding ? "New Post" : "Edit Post"}</h2>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = formData.slug || generateSlug(title);
                    setFormData({ ...formData, title, slug });
                  }}
                />
              </div>
              <div>
                <Label>Slug (URL)</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="my-blog-post"
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                </div>
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="mt-2 h-32 rounded" />
                )}
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={adding ? handleAdd : () => handleUpdate(editing!)}
                  disabled={loading}
                  className="bg-green-600"
                >
                  {adding ? "Create" : "Update"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAdding(false);
                    setEditing(null);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border-b last:border-b-0 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{post.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{post.category}</span>
                  {post.is_published ? (
                    <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">Published</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">Draft</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePublish(post.id, post.is_published)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
