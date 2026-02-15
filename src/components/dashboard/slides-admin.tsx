'use client';

import { useState } from 'react';
import { Upload, Trash2, Eye, EyeOff } from 'lucide-react';

type Slide = {
  id: string;
  image_url: string;
  type: 'hero' | 'carousel';
  display_order: number;
  is_active: boolean;
};

export default function SlidesAdmin({ initialSlides }: { initialSlides: Slide[] }) {
  const [slides, setSlides] = useState(initialSlides);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'carousel'>('hero');

  const filteredSlides = slides.filter(s => s.type === activeTab).sort((a, b) => a.display_order - b.display_order);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', activeTab);

    const res = await fetch('/api/slides/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const newSlide = await res.json();
      setSlides([...slides, newSlide]);
    }
    setUploading(false);
  };

  const toggleActive = async (id: string, is_active: boolean) => {
    await fetch('/api/slides', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_active: !is_active }),
    });
    setSlides(slides.map(s => s.id === id ? { ...s, is_active: !is_active } : s));
  };

  const deleteSlide = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    await fetch(`/api/slides?id=${id}`, { method: 'DELETE' });
    setSlides(slides.filter(s => s.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-[#1A2332] font-grotesk">Manage Slides</h1>
      
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('hero')} className={`px-4 py-2 rounded ${activeTab === 'hero' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Hero Slides
        </button>
        <button onClick={() => setActiveTab('carousel')} className={`px-4 py-2 rounded ${activeTab === 'carousel' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Carousel Slides
        </button>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer w-fit">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSlides.map((slide) => (
          <div key={slide.id} className="border rounded-lg p-4">
            <img src={slide.image_url} alt="" className="w-full h-48 object-cover rounded mb-3" />
            <div className="flex gap-2">
              <button onClick={() => toggleActive(slide.id, slide.is_active)} className="flex-1 px-3 py-2 bg-gray-200 rounded flex items-center justify-center gap-2">
                {slide.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {slide.is_active ? 'Active' : 'Hidden'}
              </button>
              <button onClick={() => deleteSlide(slide.id)} className="px-3 py-2 bg-red-600 text-white rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
