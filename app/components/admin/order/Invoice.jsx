"use client";

import React from "react";

const Invoice = React.forwardRef(({ order }, ref) => {
  if (!order) return null;

  const shipping = order.addresses?.find((a) => a.type === "shipping");

  return (
    <div
      ref={ref}
      className="bg-white text-black p-10 w-full max-w-4xl mx-auto text-sm font-sans"
    >
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>

      <div className="mb-4">
        <p>
          <strong>Order No:</strong> {order.order_number}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.ordered_at).toLocaleString()}
        </p>
      </div>

      <hr className="my-4" />

      <h2 className="font-semibold mb-1">Customer</h2>
      <p>{order.user.name}</p>
      <p>{order.user.email}</p>

      <h2 className="font-semibold mt-4 mb-1">Shipping Address</h2>
      {shipping && (
        <>
          <p>{shipping.name}</p>
          <p>{shipping.phone}</p>
          <p>{shipping.email}</p>
          <p>{shipping.street_address}</p>
          <p>
            {shipping.upazila?.name}, {shipping.district?.name},{" "}
            {shipping.division?.name}
          </p>
          <p>
            {shipping.postal_code}, {shipping.country_code}
          </p>
        </>
      )}

      <h2 className="font-semibold mt-4 mb-1">Order Items</h2>
      <ul className="mt-2 space-y-2">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.product_name} × {item.quantity} — ৳{item.total_price}
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <div className="space-y-1">
        <p>
          <strong>Subtotal:</strong> ৳{order.subtotal}
        </p>
        <p>
          <strong>Discount:</strong> ৳{order.discount_amount}
        </p>
        <p>
          <strong>Shipping Cost:</strong> ৳{order.shipping_cost}
        </p>
        <p className="text-lg font-bold">
          <strong>Total:</strong> ৳{order.total}
        </p>
      </div>
    </div>
  );
});

Invoice.displayName = "Invoice";

export default Invoice;
