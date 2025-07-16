import React from "react";
import OrderStatus from "./OrderStatus";
import LinkButton from "@/app/components/ui/button/LinkButton";
import { HiOutlineArrowRight } from "react-icons/hi";
import OrderHistoryItem from "./OrderHistoryItem";

function OrderHistory({ orders = [] }) {
  if (!orders.length) {
    return <p className="text-gray-400 italic">No orders found.</p>;
  }

  return (
    <div className="space-y-12">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border-b border-gray-300 pb-8 last:border-none last:pb-0"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Order ID:{" "}
              <span className="text-green-600 font-medium">
                {order.order_number}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                ({order.items.length} items)
              </span>
            </h2>

            <div className="flex items-center gap-3">
              <OrderStatus status={order.status} />
              {order.status !== 'cancelled' ? (
                <LinkButton
                href={`/tracking/${order.order_number}`}
                RightIcon={<HiOutlineArrowRight />}
                className="text-sm"
              >
                Track My Order
              </LinkButton>
              ) :'' }
              
            </div>
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-6 mt-6">
            {order.items.map((item) => (
              <OrderHistoryItem
                key={item.id}
                product={item}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
