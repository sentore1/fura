import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { title, slug, content, excerpt, category, image_url } = await request.json();

  const { error } = await supabase
    .from("blog_posts")
    .insert({ title, slug, content, excerpt, category, image_url });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { id, title, slug, content, excerpt, category, image_url, is_published } = await request.json();

  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (slug !== undefined) updateData.slug = slug;
  if (content !== undefined) updateData.content = content;
  if (excerpt !== undefined) updateData.excerpt = excerpt;
  if (category !== undefined) updateData.category = category;
  if (image_url !== undefined) updateData.image_url = image_url;
  if (is_published !== undefined) updateData.is_published = is_published;

  const { error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { id } = await request.json();

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
