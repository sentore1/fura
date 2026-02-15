"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Pencil, Plus, Trash2 } from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string | null;
  is_active: boolean;
}

export function LocationsAdmin({ locations }: { locations: Location[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "", phone: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);

  const handleEdit = (location: Location) => {
    setEditing(location.id);
    setFormData({
      name: location.name,
      address: location.address,
      phone: location.phone,
      whatsapp: location.whatsapp || ""
    });
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    await fetch("/api/locations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...formData }),
    });
    setEditing(null);
    setLoading(false);
    window.location.reload();
  };

  const handleAdd = async () => {
    setLoading(true);
    await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setAdding(false);
    setFormData({ name: "", address: "", phone: "", whatsapp: "" });
    setLoading(false);
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    setLoading(true);
    await fetch("/api/locations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Locations</h1>
          <Button onClick={() => setAdding(true)} className="bg-[#0066CC]">
            <Plus className="w-4 h-4 mr-2" /> Add Location
          </Button>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 font-semibold text-sm">
            <div className="col-span-2">Name</div>
            <div className="col-span-3">Address</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-2">WhatsApp</div>
            <div className="col-span-3">Actions</div>
          </div>

          {adding && (
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-t bg-blue-50">
              <div className="col-span-2">
                <Input
                  placeholder="Branch name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="col-span-3">
                <Input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Input
                  placeholder="+250 7XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Input
                  placeholder="+250 7XX XXX XXX"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
              <div className="col-span-3 flex gap-2">
                <Button size="sm" onClick={handleAdd} disabled={loading} className="bg-green-600">
                  <Check className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setAdding(false)} disabled={loading}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {locations.map((location) => (
            <div key={location.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-t items-center">
              <div className="col-span-2">
                {editing === location.id ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                ) : (
                  <span className="font-medium">{location.name}</span>
                )}
              </div>
              <div className="col-span-3">
                {editing === location.id ? (
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                ) : (
                  <span className="text-sm">{location.address}</span>
                )}
              </div>
              <div className="col-span-2">
                {editing === location.id ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                ) : (
                  <span className="text-sm">{location.phone}</span>
                )}
              </div>
              <div className="col-span-2">
                {editing === location.id ? (
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                ) : (
                  <span className="text-sm">{location.whatsapp || "-"}</span>
                )}
              </div>
              <div className="col-span-3 flex gap-2">
                {editing === location.id ? (
                  <>
                    <Button size="sm" onClick={() => handleSave(location.id)} disabled={loading} className="bg-green-600">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditing(null)} disabled={loading}>
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(location)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(location.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
