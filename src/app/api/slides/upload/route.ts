import { createClient } from '../../../../../supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: 'Auth error: ' + authError.message }, { status: 401 });
    }
    
    if (!user) {
      console.error('No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!type || !['hero', 'carousel'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    console.log('Processing file:', file.name, 'type:', type);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), 'public', 'uploads', filename);
    
    await writeFile(path, buffer);
    console.log('File written to:', path);

    // Use service client for admin operations
    const serviceSupabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Get max display order
    const { data: maxOrder, error: maxOrderError } = await serviceSupabase
      .from('slides')
      .select('display_order')
      .eq('type', type)
      .order('display_order', { ascending: false })
      .limit(1);

    if (maxOrderError) {
      console.error('Max order query error:', maxOrderError);
      return NextResponse.json({ error: 'Failed to get display order: ' + maxOrderError.message }, { status: 500 });
    }

    const newDisplayOrder = (maxOrder?.[0]?.display_order || 0) + 1;
    console.log('New display order:', newDisplayOrder);

    // Insert new slide
    const { data: slide, error: insertError } = await serviceSupabase
      .from('slides')
      .insert({
        image_url: `/uploads/${filename}`,
        type,
        display_order: newDisplayOrder,
        is_active: true
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Database insert error: ' + insertError.message }, { status: 500 });
    }

    console.log('Slide created successfully:', slide);
    return NextResponse.json(slide);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') 
    }, { status: 500 });
  }
}
