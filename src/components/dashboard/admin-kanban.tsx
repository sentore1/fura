"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock, CheckCircle, Package, Truck, XCircle, Zap,
  ChevronDown, ChevronUp, User, Phone, MapPin, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "../../../supabase/client";
import type { Order } from "@/types/orders";

const columns = [
  { key: "pending_approval", label: "Pending Approval", icon: <Clock className="w-4 h-4" />, color: "border-t-[#FF6F00]", headerBg: "bg-[#FF6F00]/5" },
  { key: "approved", label: "Approved", icon: <CheckCircle className="w-4 h-4" />, color: "border-t-[#0066CC]", headerBg: "bg-[#0066CC]/5" },
  { key: "in_progress", label: "In Progress", icon: <Package className="w-4 h-4" />, color: "border-t-[#00B8D4]", headerBg: "bg-[#00B8D4]/5" },
  { key: "ready_pickup", label: "Ready for Pickup", icon: <Truck className="w-4 h-4" />, color: "border-t-[#00C853]", headerBg: "bg-[#00C853]/5" },
  { key: "completed", label: "Completed", icon: <CheckCircle className="w-4 h-4" />, color: "border-t-gray-400", headerBg: "bg-gray-50" },
];

function OrderCard({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: string, reason?: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  const nextStatus: Record<string, string> = {
    pending_approval: "approved",
    approved: "in_progress",
    in_progress: "ready_pickup",
    ready_pickup: "completed",
  };

  const nextLabel: Record<string, string> = {
    pending_approval: "Approve",
    approved: "Start Processing",
    in_progress: "Mark Ready",
    ready_pickup: "Complete",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono-data text-xs text-[#5A6A7A]">
            #{order.id.slice(0, 8).toUpperCase()}
          </span>
          <div className="flex items-center gap-1">
            {order.is_express && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF6F00]/10 text-[#FF6F00]">
                <Zap className="w-3 h-3" /> EXPRESS
              </span>
            )}
            {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </div>
        </div>
        <h4 className="text-sm font-semibold text-[#1A2332] mb-1">{order.customer_name}</h4>
        <p className="text-xs text-[#5A6A7A]">{order.pickup_date} · {order.pickup_time}</p>
        <p className="font-mono-data text-sm font-bold text-[#0066CC] mt-1">
          {order.total_amount.toLocaleString()} RWF
        </p>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-50 p-3 space-y-3">
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <User className="w-3 h-3 text-[#5A6A7A] mt-0.5" />
              <span className="text-[#5A6A7A]">{order.customer_email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-3 h-3 text-[#5A6A7A] mt-0.5" />
              <span className="text-[#5A6A7A]">{order.customer_phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3 h-3 text-[#5A6A7A] mt-0.5" />
              <span className="text-[#5A6A7A]">{order.pickup_address}</span>
            </div>
            {order.special_instructions && (
              <div className="flex items-start gap-2">
                <FileText className="w-3 h-3 text-[#5A6A7A] mt-0.5" />
                <span className="text-[#5A6A7A]">{order.special_instructions}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="bg-gray-50 rounded-lg p-2 space-y-1">
            {order.order_items?.map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-[#5A6A7A]">{item.service_name} × {item.quantity}</span>
                <span className="font-mono-data">{item.subtotal.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          {order.status !== "completed" && order.status !== "rejected" && (
            <div className="flex gap-2">
              {nextStatus[order.status] && (
                <Button
                  size="sm"
                  className="flex-1 bg-[#0066CC] hover:bg-[#0052A3] text-white text-xs"
                  onClick={() => onStatusChange(order.id, nextStatus[order.status])}
                >
                  {nextLabel[order.status]}
                </Button>
              )}
              {order.status === "pending_approval" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-200 hover:bg-red-50 text-xs"
                  onClick={() => setShowReject(!showReject)}
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Reject
                </Button>
              )}
            </div>
          )}

          {showReject && (
            <div className="space-y-2">
              <Textarea
                placeholder="Reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={2}
                className="text-xs"
              />
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white text-xs w-full"
                onClick={() => {
                  onStatusChange(order.id, "rejected", rejectionReason);
                  setShowReject(false);
                }}
              >
                Confirm Rejection
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AdminKanban({ orders }: { orders: Order[] }) {
  const supabase = createClient();
  const router = useRouter();

  const handleStatusChange = async (orderId: string, newStatus: string, reason?: string) => {
    const updateData: Record<string, string> = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    };
    if (reason) {
      updateData.rejection_reason = reason;
    }

    await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    router.refresh();
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-[1200px]">
        {columns.map((col) => {
          const columnOrders = orders.filter((o) => o.status === col.key);
          return (
            <div key={col.key} className={`flex-1 min-w-[240px] bg-gray-50/50 rounded-xl border-t-4 ${col.color}`}>
              <div className={`p-3 ${col.headerBg} rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {col.icon}
                    <span className="text-sm font-semibold text-[#1A2332] font-grotesk">{col.label}</span>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-white text-xs font-bold flex items-center justify-center text-[#5A6A7A]">
                    {columnOrders.length}
                  </span>
                </div>
              </div>
              <div className="p-2 space-y-2 max-h-[600px] overflow-y-auto">
                {columnOrders.length === 0 ? (
                  <div className="p-4 text-center text-xs text-gray-400">
                    No orders
                  </div>
                ) : (
                  columnOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
