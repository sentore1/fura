import { useState, useEffect } from 'react';
import { createClient } from '../../supabase/client';

interface DeliverySettings {
  id: number;
  base_fee: number;
  additional_km_fee: number;
  free_distance_km: number;
}

export function useDeliverySettings() {
  const [settings, setSettings] = useState<DeliverySettings>({
    id: 1,
    base_fee: 3000,
    additional_km_fee: 2000,
    free_distance_km: 1,
  });
  const [loading, setLoading] = useState(true);
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
        console.error('Error loading delivery settings:', error);
        return;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading delivery settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDeliveryFee = (distance: number) => {
    if (distance <= settings.free_distance_km) {
      return settings.base_fee;
    }
    return settings.base_fee + Math.floor(distance - settings.free_distance_km) * settings.additional_km_fee;
  };

  return {
    settings,
    loading,
    calculateDeliveryFee,
    refreshSettings: loadSettings,
  };
}