"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, Save, RefreshCw } from "lucide-react";
import { createClient } from "../../../../supabase/client";
import DashboardNavbar from "@/components/dashboard-navbar";

interface DeliverySettings {
  id?: string;
  base_fee: number;
  additional_km_fee: number;
  free_distance_km: number;
  updated_at?: string;
}

export default function SettingsClient() {
  const [settings, setSettings] = useState<DeliverySettings>({
    base_fee: 3000,
    additional_km_fee: 2000,
    free_distance_km: 1,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('delivery_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading settings:', error);
        return;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setMessage("");
    try {
      const { data, error } = await supabase
        .from('delivery_settings')
        .upsert({
          id: settings.id || 1,
          base_fee: settings.base_fee,
          additional_km_fee: settings.additional_km_fee,
          free_distance_km: settings.free_distance_km,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSettings(data);
      setMessage("Settings updated successfully!");
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage("Failed to update settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const calculateExample = (distance: number) => {
    if (distance <= settings.free_distance_km) {
      return settings.base_fee;
    }
    return settings.base_fee + Math.floor(distance - settings.free_distance_km) * settings.additional_km_fee;
  };

  if (loading) {
    return (
      <>
        <DashboardNavbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="w-6 h-6 animate-spin text-[#0066CC]" />
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <div className="min-h-screen bg-[#F8FAFB] py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1A2332] font-grotesk">Settings</h1>
              <p className="text-[#5A6A7A]">Manage pickup and delivery pricing</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#0066CC]" />
                  Pickup & Delivery Pricing
                </CardTitle>
                <CardDescription>
                  Configure the pricing structure for pickup and delivery services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base_fee">Base Fee (RWF)</Label>
                    <Input
                      id="base_fee"
                      type="number"
                      min="0"
                      step="100"
                      value={settings.base_fee}
                      onChange={(e) => setSettings(prev => ({ ...prev, base_fee: parseInt(e.target.value) || 0 }))}
                      placeholder="3000"
                    />
                    <p className="text-xs text-[#5A6A7A]">Fixed fee for pickup/delivery</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="free_distance">Free Distance (km)</Label>
                    <Input
                      id="free_distance"
                      type="number"
                      min="0"
                      step="0.1"
                      value={settings.free_distance_km}
                      onChange={(e) => setSettings(prev => ({ ...prev, free_distance_km: parseFloat(e.target.value) || 0 }))}
                      placeholder="1"
                    />
                    <p className="text-xs text-[#5A6A7A]">Distance covered by base fee</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional_fee">Additional Fee per km (RWF)</Label>
                    <Input
                      id="additional_fee"
                      type="number"
                      min="0"
                      step="100"
                      value={settings.additional_km_fee}
                      onChange={(e) => setSettings(prev => ({ ...prev, additional_km_fee: parseInt(e.target.value) || 0 }))}
                      placeholder="2000"
                    />
                    <p className="text-xs text-[#5A6A7A]">Fee for each additional km</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-[#1A2332] mb-3">Pricing Examples</h4>
                  <div className="grid sm:grid-cols-4 gap-4 text-sm">
                    {[0.5, 1, 2, 5].map(distance => (
                      <div key={distance} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-[#1A2332]">{distance}km</div>
                        <div className="text-[#0066CC] font-mono-data font-semibold">
                          {calculateExample(distance).toLocaleString()} RWF
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    message.includes('successfully') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={saveSettings}
                    disabled={saving}
                    className="bg-[#0066CC] hover:bg-[#0052A3] text-white"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0066CC]" />
                  Current Pricing Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-[#1A2332]">
                    <strong>≤{settings.free_distance_km}km:</strong> {settings.base_fee.toLocaleString()} RWF
                  </p>
                  <p className="text-sm text-[#1A2332] mt-1">
                    <strong>&gt;{settings.free_distance_km}km:</strong> {settings.base_fee.toLocaleString()} + {settings.additional_km_fee.toLocaleString()} per additional km
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}