"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  Package, Clock, CheckCircle, Truck, ShoppingCart,
  BarChart3, Calendar, Users, ArrowRight, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminKanban } from "./admin-kanban";
import type { Order } from "@/types/orders";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending_approval: { label: "Pending", color: "bg-[#FF6F00]/10 text-[#FF6F00]" },
  approved: { label: "Approved", color: "bg-[#0066CC]/10 text-[#0066CC]" },
  in_progress: { label: "In Progress", color: "bg-[#00B8D4]/10 text-[#00B8D4]" },
  ready_pickup: { label: "Ready", color: "bg-[#00C853]/10 text-[#00C853]" },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600" },
  rejected: { label: "Rejected", color: "bg-red-50 text-red-500" },
};

export function DashboardContent({
  user,
  userOrders,
  allOrders,
  isAdmin = false,
}: {
  user: User;
  userOrders: Order[];
  allOrders: Order[];
  isAdmin?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "admin">("overview");

  const stats = {
    totalOrders: userOrders.length,
    pendingOrders: userOrders.filter((o) => o.status === "pending_approval").length,
    inProgress: userOrders.filter((o) => ["approved", "in_progress"].includes(o.status)).length,
    completed: userOrders.filter((o) => o.status === "completed").length,
  };

  const adminStats = {
    totalOrders: allOrders.length,
    pending: allOrders.filter((o) => o.status === "pending_approval").length,
    inProgress: allOrders.filter((o) => ["approved", "in_progress"].includes(o.status)).length,
    ready: allOrders.filter((o) => o.status === "ready_pickup").length,
    completed: allOrders.filter((o) => o.status === "completed").length,
    totalRevenue: allOrders.filter((o) => o.status === "completed").reduce((s, o) => s + o.total_amount, 0),
  };

  return (
    <main className="min-h-screen bg-[#F8FAFB]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1A2332] font-grotesk">
              Welcome back, {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </h1>
            <p className="text-[#5A6A7A] text-sm">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/booking">
              <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </Link>
            <Link href="/tracking">
              <Button variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Track Orders
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Switch - Only show for admins */}
        {isAdmin && (
          <div className="flex gap-2 mb-8 bg-white p-1 rounded-xl border w-fit">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "overview"
                  ? "bg-[#0066CC] text-white"
                  : "text-[#5A6A7A] hover:bg-gray-100"
              }`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "admin"
                  ? "bg-[#0066CC] text-white"
                  : "text-[#5A6A7A] hover:bg-gray-100"
              }`}
            >
              Admin Panel
            </button>
          </div>
        )}

        {activeTab === "overview" || !isAdmin ? (
          <>
            {/* Customer Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Orders", value: stats.totalOrders, icon: <BarChart3 className="w-5 h-5" />, color: "text-[#0066CC] bg-[#0066CC]/10" },
                { label: "Pending", value: stats.pendingOrders, icon: <Clock className="w-5 h-5" />, color: "text-[#FF6F00] bg-[#FF6F00]/10" },
                { label: "In Progress", value: stats.inProgress, icon: <Package className="w-5 h-5" />, color: "text-[#00B8D4] bg-[#00B8D4]/10" },
                { label: "Completed", value: stats.completed, icon: <CheckCircle className="w-5 h-5" />, color: "text-[#00C853] bg-[#00C853]/10" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-[#1A2332] font-grotesk">{stat.value}</p>
                  <p className="text-xs text-[#5A6A7A]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border shadow-sm">
              <div className="p-5 border-b flex items-center justify-between">
                <h2 className="font-semibold text-[#1A2332] font-grotesk">Recent Orders</h2>
                <Link href="/tracking" className="text-sm text-[#0066CC] font-medium hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {userOrders.length === 0 ? (
                <div className="p-10 text-center">
                  <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-[#5A6A7A]">No orders yet. Book your first pickup!</p>
                  <Link href="/booking">
                    <Button className="mt-4 bg-[#0066CC] hover:bg-[#0052A3] text-white" size="sm">
                      Book Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {userOrders.slice(0, 5).map((order) => {
                    const status = statusConfig[order.status] || statusConfig.pending_approval;
                    return (
                      <div key={order.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono-data text-xs text-[#5A6A7A]">
                                #{order.id.slice(0, 8).toUpperCase()}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${status.color}`}>
                                {status.label}
                              </span>
                              {order.is_express && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FF6F00]/10 text-[#FF6F00]">
                                  <Zap className="w-3 h-3" /> Express
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#5A6A7A]">
                              {order.order_items?.length || 0} items · Pickup: {order.pickup_date}
                            </p>
                          </div>
                          <span className="font-mono-data font-semibold text-[#0066CC]">
                            {order.total_amount.toLocaleString()} RWF
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Admin Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: "Total Orders", value: adminStats.totalOrders, icon: <BarChart3 className="w-5 h-5" />, color: "text-[#0066CC] bg-[#0066CC]/10" },
                { label: "Pending", value: adminStats.pending, icon: <Clock className="w-5 h-5" />, color: "text-[#FF6F00] bg-[#FF6F00]/10" },
                { label: "In Progress", value: adminStats.inProgress, icon: <Package className="w-5 h-5" />, color: "text-[#00B8D4] bg-[#00B8D4]/10" },
                { label: "Ready", value: adminStats.ready, icon: <Truck className="w-5 h-5" />, color: "text-[#00C853] bg-[#00C853]/10" },
                { label: "Revenue", value: `${adminStats.totalRevenue.toLocaleString()} RWF`, icon: <BarChart3 className="w-5 h-5" />, color: "text-[#0066CC] bg-[#0066CC]/10" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
                    {stat.icon}
                  </div>
                  <p className="text-xl font-bold text-[#1A2332] font-grotesk">{stat.value}</p>
                  <p className="text-xs text-[#5A6A7A]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Kanban Board */}
            <AdminKanban orders={allOrders} />
          </>
        )}
      </div>
    </main>
  );
}
