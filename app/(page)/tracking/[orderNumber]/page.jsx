// app/(user)/tracking/[orderNumber]/page.jsx
"use client";

import React, { useEffect } from "react";
import UserLayout from "@/app/components/ui/layout/UserLayout";
import OrderTracking from "@/app/components/page/orderTracking/OrderTracking";
import { useParams } from "next/navigation";
import { useOrders } from "@/app/context/OrderContext";

export default function TrackingPage() {
  const { orderNumber } = useParams();
  const { trackingOrder, OrderTrackingHandle, loading } = useOrders();

  useEffect(() => {
    if (orderNumber) {
      OrderTrackingHandle(orderNumber);
    }
  }, [orderNumber]);

  return (
    <UserLayout>
      {loading ? (
        <p className="text-center py-10 text-blue-500 font-medium">
          Loading tracking info...
        </p>
      ) : (
        <OrderTracking order={trackingOrder} />
      )}
    </UserLayout>
  );
}
