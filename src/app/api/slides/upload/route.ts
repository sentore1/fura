import { createClient } from '../../../../../supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

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

    // Use service client for storage operations
    const serviceSupabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Upload to Supabase Storage
    const filename = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await serviceSupabase.storage
      .from('uploads')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload file: ' + uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = serviceSupabase.storage
      .from('uploads')
      .getPublicUrl(filename);

    console.log('File uploaded to storage:', publicUrl);

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
        image_url: publicUrl,
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
