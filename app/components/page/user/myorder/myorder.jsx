"use client";

import { Button } from "@/app/components/admin/order/Button";
import SelectInput from "@/app/components/ui/filter/select";
import { useState, useEffect } from "react";
import { useOrder } from "@/app/context/OrderContext"; // ✅ Import context
import OrderHistory from "./OrderHistory";

export default function MyOrderCard() {
  const [status, setStatus] = useState("all");
  const { MyOrders, myOrder, loading } = useOrder(); // ✅ use context

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleFetch = () => {
    MyOrders(status); 
  };
console.log(myOrder);

  // Optional: Load on mount
  useEffect(() => {
    MyOrders("all");
  }, []);

  return (
    <>
      <div className="lg:m-6 m-2 flex lg:justify-between lg:flex-row flex-col border-b border-gray-200 pb-6">
        <h2 className="text-2xl mb-2">
          My Orders{" "}
          <span className="text-sm text-gray-300">
            (Your Total Order: {myOrder.length})
          </span>
        </h2>

        <div className="flex gap-2">
          <SelectInput
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
            placeholder="Select order status"
          />
          <div>
            <Button onClick={handleFetch}>Submit</Button>
          </div>
        </div>
      </div>

      <div className="lg:m-6 m-2 border-b border-gray-200 pb-6">
        <OrderHistory orders={myOrder} loading={loading} />
      </div>
    </>
  );
}
