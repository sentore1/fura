import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { name, address, phone, whatsapp } = await request.json();

  const { error } = await supabase
    .from("locations")
    .insert({ name, address, phone, whatsapp });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { id, name, address, phone, whatsapp } = await request.json();

  const { error } = await supabase
    .from("locations")
    .update({ name, address, phone, whatsapp })
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
    .from("locations")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
