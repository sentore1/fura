export interface OrderItem {
  id: string;
  service_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_date: string;
  pickup_time: string;
  pickup_address: string;
  delivery_address: string;
  special_instructions: string;
  status: string;
  total_amount: number;
  is_express: boolean;
  created_at: string;
  updated_at: string;
  payment_method: string;
  payment_status: string;
  admin_notes: string;
  rejection_reason: string;
  order_items: OrderItem[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price_rwf: number;
  description: string;
  garment_type: string;
  is_active: boolean;
}
