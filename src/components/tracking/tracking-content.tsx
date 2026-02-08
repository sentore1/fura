"use client";

import { Package, Clock, CheckCircle, XCircle, Truck, AlertCircle } from "lucide-react";

interface OrderItem {
  id: string;
  service_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface Order {
  id: string;
  customer_name: string;
  pickup_date: string;
  pickup_time: string;
  status: string;
  total_amount: number;
  is_express: boolean;
  created_at: string;
  payment_status: string;
  order_items: OrderItem[];
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode; step: number }> = {
  pending_approval: { label: "Pending Approval", color: "text-[#FF6F00] bg-[#FF6F00]/10", icon: <Clock className="w-4 h-4" />, step: 1 },
  approved: { label: "Approved", color: "text-[#0066CC] bg-[#0066CC]/10", icon: <CheckCircle className="w-4 h-4" />, step: 2 },
  in_progress: { label: "In Progress", color: "text-[#00B8D4] bg-[#00B8D4]/10", icon: <Package className="w-4 h-4" />, step: 3 },
  ready_pickup: { label: "Ready for Pickup", color: "text-[#00C853] bg-[#00C853]/10", icon: <Truck className="w-4 h-4" />, step: 4 },
  completed: { label: "Completed", color: "text-[#00C853] bg-[#00C853]/10", icon: <CheckCircle className="w-4 h-4" />, step: 5 },
  rejected: { label: "Rejected", color: "text-red-500 bg-red-50", icon: <XCircle className="w-4 h-4" />, step: 0 },
};

const progressSteps = [
  { key: "pending_approval", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "in_progress", label: "Processing" },
  { key: "ready_pickup", label: "Ready" },
  { key: "completed", label: "Completed" },
];

export function TrackingContent({ orders }: { orders: Order[] }) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#1A2332] font-grotesk mb-2">Order Tracking</h1>
          <p className="text-[#5A6A7A]">Monitor the status of your laundry orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
            <AlertCircle className="w-12 h-12 text-[#5A6A7A] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A2332] mb-2 font-grotesk">No Orders Yet</h3>
            <p className="text-[#5A6A7A]">You haven&apos;t placed any orders yet. Start by booking a pickup!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending_approval;
              const currentStep = status.step;

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="p-5 border-b border-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono-data text-xs text-[#5A6A7A]">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                            {status.icon}
                            {status.label}
                          </span>
                          {order.is_express && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FF6F00]/10 text-[#FF6F00]">
                              EXPRESS
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#5A6A7A]">
                          Pickup: {order.pickup_date} at {order.pickup_time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono-data font-bold text-lg text-[#0066CC]">
                          {order.total_amount.toLocaleString()} RWF
                        </p>
                        <p className="text-xs text-[#5A6A7A]">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {order.status !== "rejected" && (
                    <div className="px-5 py-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        {progressSteps.map((step, i) => {
                          const isActive = currentStep >= i + 1;
                          const isCurrent = currentStep === i + 1;
                          return (
                            <div key={step.key} className="flex items-center flex-1">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    isActive
                                      ? "bg-[#00C853] text-white"
                                      : isCurrent
                                      ? "bg-[#0066CC] text-white"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {isActive ? "✓" : i + 1}
                                </div>
                                <span className={`text-[10px] mt-1 ${isActive ? "text-[#1A2332] font-medium" : "text-gray-400"}`}>
                                  {step.label}
                                </span>
                              </div>
                              {i < progressSteps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 mt-[-14px] ${isActive ? "bg-[#00C853]" : "bg-gray-200"}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-[#5A6A7A] uppercase mb-2">Items</p>
                    <div className="space-y-1.5">
                      {order.order_items?.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-[#5A6A7A]">{item.service_name} × {item.quantity}</span>
                          <span className="font-mono-data text-[#1A2332]">{item.subtotal.toLocaleString()} RWF</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
