import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { name, phone, email, subject, message } = await request.json();

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, phone, email, subject, message });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await sendContactEmail({ name, email, phone, subject, message });
  } catch (emailError) {
    console.error("Email send failed:", emailError);
  }

  return NextResponse.json({ success: true });
}
