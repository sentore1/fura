import { createClient } from '../../../../../supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const type = formData.get('type') as string;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const path = join(process.cwd(), 'public', 'uploads', filename);
  
  await writeFile(path, buffer);

  const { data: maxOrder } = await supabase
    .from('slides')
    .select('display_order')
    .eq('type', type)
    .order('display_order', { ascending: false })
    .limit(1);

  const { data: slide } = await supabase
    .from('slides')
    .insert({
      image_url: `/uploads/${filename}`,
      type,
      display_order: (maxOrder?.[0]?.display_order || 0) + 1,
    })
    .select()
    .single();

  return NextResponse.json(slide);
}
