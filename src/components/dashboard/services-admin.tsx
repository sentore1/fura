"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Pencil } from "lucide-react";

interface Service {
  id: string;
  name: string;
  category: string;
  price_rwf: number;
  description: string;
  garment_type: string;
  is_active: boolean;
}

const categoryLabels: Record<string, string> = {
  wash_fold: "Wash & Fold",
  wash_iron: "Wash & Iron",
  iron_only: "Iron Only",
  specialty: "Specialty",
};

export function ServicesAdmin({ services }: { services: Service[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", garment_type: "", price_rwf: "" });
  const [loading, setLoading] = useState(false);

  const handleEdit = (service: Service) => {
    setEditing(service.id);
    setFormData({
      name: service.name,
      description: service.description,
      garment_type: service.garment_type,
      price_rwf: service.price_rwf.toString()
    });
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    const res = await fetch("/api/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...formData, price_rwf: parseInt(formData.price_rwf) }),
    });
    
    if (res.ok) {
      setEditing(null);
      window.location.reload();
    }
    setLoading(false);
  };

  const grouped = services.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Services & Pricing</h1>
      
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#0066CC]">
              {categoryLabels[category]}
            </h2>
            
            <div className="bg-white rounded-lg border">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 font-semibold text-sm">
                <div className="col-span-3">Service</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Price (RWF)</div>
                <div className="col-span-2">Action</div>
              </div>
              
              {items.map((service) => (
                <div key={service.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-t items-center">
                  <div className="col-span-3">
                    {editing === service.id ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    ) : (
                      <span className="font-medium">{service.name}</span>
                    )}
                  </div>
                  <div className="col-span-3">
                    {editing === service.id ? (
                      <Input
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{service.description}</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    {editing === service.id ? (
                      <Input
                        value={formData.garment_type}
                        onChange={(e) => setFormData({...formData, garment_type: e.target.value})}
                      />
                    ) : (
                      <span className="text-sm capitalize">{service.garment_type}</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    {editing === service.id ? (
                      <Input
                        type="number"
                        value={formData.price_rwf}
                        onChange={(e) => setFormData({...formData, price_rwf: e.target.value})}
                      />
                    ) : (
                      <span className="font-mono font-semibold">{service.price_rwf.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    {editing === service.id ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(service.id)}
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditing(null)}
                          disabled={loading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
