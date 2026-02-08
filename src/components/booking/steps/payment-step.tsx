"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Smartphone } from "lucide-react";
import { createClient } from "../../../../supabase/client";
import type { BookingData } from "../booking-flow";
import QRCode from "qrcode";

export function PaymentStep({
  bookingData,
  userId,
  userEmail,
  onPrev,
}: {
  bookingData: BookingData;
  userId: string | null;
  userEmail: string | null;
  onPrev: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const generateQR = async () => {
      try {
        const ussdCode = `tel:*182*8*1*008747*${bookingData.totalAmount}%23`;
        const url = await QRCode.toDataURL(ussdCode, { width: 200, margin: 2 });
        setQrCodeUrl(url);
      } catch (err) {
        console.error("QR generation error:", err);
      }
    };
    generateQR();
  }, [bookingData.totalAmount, isMounted]);

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          customer_name: bookingData.customerName,
          customer_email: userEmail || bookingData.customerPhone + "@guest.com",
          customer_phone: bookingData.customerPhone,
          pickup_address: bookingData.pickupAddress,
          delivery_address: bookingData.deliveryAddress || bookingData.pickupAddress,
          special_instructions: bookingData.specialInstructions,
          pickup_date: bookingData.pickupDate,
          pickup_time: bookingData.pickupTime,
          is_express: bookingData.isExpress,
          status: "pending_approval",
          total_amount: bookingData.totalAmount,
          payment_method: "momo",
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = bookingData.items.map((item) => ({
        order_id: order.id,
        service_id: item.service.id,
        service_name: item.service.name,
        quantity: item.quantity,
        unit_price: item.service.price_rwf,
        subtotal: item.service.price_rwf * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderId(order.id);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-[#00C853]/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#00C853]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A2332] mb-2 font-grotesk">Order Confirmed!</h2>
        <p className="text-[#5A6A7A] mb-4">Your order has been placed successfully.</p>
        <div className="inline-block bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-[#5A6A7A] mb-1">Order ID</p>
          <p className="font-mono-data text-sm font-semibold text-[#1A2332]">{orderId.slice(0, 8).toUpperCase()}</p>
        </div>
        <p className="text-sm text-[#5A6A7A] mb-6 max-w-md mx-auto">
          Your order is pending approval. You&apos;ll receive a notification once it&apos;s confirmed. You can track your order status from the dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => router.push("/tracking")}>
            Track Order
          </Button>
          {userId && (
            <Button onClick={() => router.push("/dashboard")} className="bg-[#0066CC] hover:bg-[#0052A3] text-white">
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A2332] mb-1 font-grotesk">Payment</h2>
      <p className="text-sm text-[#5A6A7A] mb-6">Complete your payment via MTN Mobile Money</p>

      {/* Payment Method */}
      <div className="bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center">
            <span className="text-sm font-extrabold text-black">MTN</span>
          </div>
          <div>
            <h3 className="font-semibold text-[#1A2332] font-grotesk">MTN Mobile Money</h3>
            <p className="text-xs text-[#5A6A7A]">Pay securely with MoMo</p>
          </div>
        </div>

        <div className="bg-[#1A2332] text-white rounded-xl p-5 mb-4">
          <div className="flex flex-col md:flex-row gap-6">
            {qrCodeUrl && (
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-lg mb-2">
                  <img src={qrCodeUrl} alt="Payment QR Code" className="w-32 h-32" />
                </div>
                <p className="text-xs text-gray-400">Scan to pay instantly</p>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="w-5 h-5 text-[#FFCC00]" />
                <span className="text-sm font-medium">Or dial manually:</span>
              </div>
              <p className="font-mono-data text-lg font-bold text-[#FFCC00] mb-4">
                *182*8*1*008747*{bookingData.totalAmount}#
              </p>
              <a
                href={`tel:*182*8*1*008747*${bookingData.totalAmount}%23`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCC00] text-black rounded-lg font-semibold text-sm hover:bg-[#FFD633] transition-colors"
              >
                <Smartphone className="w-4 h-4" />
                Open Dialer
              </a>
            </div>
          </div>
        </div>

        <div className="text-sm text-[#5A6A7A]">
          <p className="mb-2"><strong>How to pay:</strong></p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Dial the USSD code above on your phone</li>
            <li>Confirm the payment amount: <span className="font-mono-data font-semibold">{bookingData.totalAmount.toLocaleString()} RWF</span></li>
            <li>Enter your MoMo PIN to confirm</li>
            <li>You&apos;ll receive a confirmation SMS</li>
          </ol>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-5 rounded-xl bg-gray-50 border mb-6">
        <h3 className="font-semibold text-[#1A2332] mb-3 font-grotesk">Final Order Summary</h3>
        <div className="space-y-2 text-sm">
          {bookingData.items.map((item) => (
            <div key={item.service.id} className="flex justify-between">
              <span className="text-[#5A6A7A]">{item.service.name} × {item.quantity}</span>
              <span className="font-mono-data">{(item.service.price_rwf * item.quantity).toLocaleString()} RWF</span>
            </div>
          ))}
          {bookingData.isExpress && (
            <div className="flex justify-between text-[#FF6F00]">
              <span>Express surcharge</span>
              <span className="font-mono-data">+50%</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span className="text-[#1A2332]">Total</span>
            <span className="font-mono-data text-lg text-[#0066CC]">{bookingData.totalAmount.toLocaleString()} RWF</span>
          </div>
        </div>
        <div className="mt-4 space-y-1 text-xs text-[#5A6A7A]">
          <p> Pickup: {bookingData.pickupDate} at {bookingData.pickupTime}</p>
          <p> {bookingData.pickupAddress}</p>
          <p> {bookingData.customerName} · {bookingData.customerPhone}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button
          onClick={handleSubmitOrder}
          disabled={isSubmitting}
          className="bg-[#00C853] hover:bg-[#00A844] text-white px-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Placing Order...
            </>
          ) : (
            "Confirm & Place Order"
          )}
        </Button>
      </div>
    </div>
  );
}
