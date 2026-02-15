import { createClient } from '../../../../supabase/server';
import SlidesAdmin from '@/components/dashboard/slides-admin';
import { redirect } from 'next/navigation';
import DashboardNavbar from '@/components/dashboard-navbar';

export default async function SlidesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/auth/signin');

  const { data: slides } = await supabase
    .from('slides')
    .select('*')
    .order('type')
    .order('display_order');

  return (
    <>
      <DashboardNavbar />
      <div className="min-h-screen bg-[#F8FAFB]">
        <SlidesAdmin initialSlides={slides || []} />
      </div>
    </>
  );
}
