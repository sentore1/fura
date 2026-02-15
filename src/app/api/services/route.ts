import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { id, name, description, garment_type, price_rwf } = await request.json();

  const { error } = await supabase
    .from("services")
    .update({ name, description, garment_type, price_rwf })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
