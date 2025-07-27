"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/admin/order/Card";
import { Separator } from "@/app/components/admin/order/Separator";
import { Badge } from "@/app/components/admin/order/Badge";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useOrderAdmin } from "@/app/context/OrderAdminContext";
import OrderItemsSection from "./OrderItems";

export default function SingleOrderDetails({ order }) {
  const { updateOrderStatus } = useOrderAdmin();
  const [updating, setUpdating] = useState(false);
 const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-indigo-100 text-indigo-800",
    shipped: "bg-green-100 text-green-800",
    delivered: "bg-green-300 text-green-900",
    cancelled: "bg-red-100 text-red-800",
    returned: "bg-red-200 text-red-900",
    refunded: "bg-red-300 text-red-900",
  };

  const shippingAddress = order.addresses?.find((a) => a.type === "shipping");

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      setUpdating(true);
      await updateOrderStatus(order.id, newStatus);
      toast.success("Order status updated!");
      location.reload(); // or re-fetch order if preferred
    } catch (err) {
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left Side */}
      <div className="lg:col-span-2 space-y-8">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Customer Info</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Name</h4>
              <p className="mt-1 text-lg font-semibold">{order.user?.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="mt-1 text-lg">{order.user?.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Note</h4>
              <p className="mt-1 text-lg">{order.customer_note}</p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Info */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <LocationOnIcon className="w-6 h-6" />
            <CardTitle className="text-xl font-semibold">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 text-lg font-medium space-y-1.5">
            {shippingAddress && (
              <>
                <p>{shippingAddress.name}</p>
                <p>{shippingAddress.phone}</p>
                <p>{shippingAddress.email}</p>
                <p>{shippingAddress.street_address}</p>
                <p>
                  {shippingAddress.upazila?.name}, {shippingAddress.district?.name}, {shippingAddress.division?.name}
                </p>
                <p>{shippingAddress.postal_code}</p>
                <p>{shippingAddress.country_code}</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Items */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Order Items ({order.items?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-gray-200">
            {console.log('image',order)}
            {order.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-6 py-4">
                <div className="flex-1">
                  <div className="">
                    <AppImage 
                    src={`${URL_IMAGE}${item.product.thumbnail}`}
                    width={60}
                    height={60}
                    rounded="none"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{item.product_name}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                    <div><strong>Qty:</strong> {item.quantity}</div>
                    <div><strong>SKU:</strong> {item.sku}</div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <strong>Variant:</strong>
  <span>
    Color: 
    <span 
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        backgroundColor: item.variant?.color || "transparent",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginLeft: "6px",
        marginRight: "12px",
        verticalAlign: "middle"
      }}
    ></span>
  </span>
  <span>Size: {item.variant?.size || "-"}</span>
</div>
                    <div><strong>Unit Price:</strong> ৳{Number(item.unit_price).toFixed(2)}</div>
                  </div>
                </div>
                <div className="font-bold text-lg text-gray-900">৳{Number(item.total_price).toFixed(2)}</div>
              </div>
            ))}
          </CardContent>
        </Card> */}
         <OrderItemsSection order={order} />
      </div>

      {/* Right Side */}
      <div className="space-y-8">
        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>৳{Number(order.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Shipping</span>
              <span>৳{Number(order.shipping_cost).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-extrabold text-gray-900">
              <span>Total</span>
              <span>৳{Number(order.total).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Status Log */}
        <Card>
          <CardHeader className="flex items-center gap-2 text-gray-800">
            <LocalShippingIcon className="w-6 h-6" />
            <CardTitle className="text-xl font-semibold">Shipping Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 text-lg font-medium">
            <div className="flex items-center gap-2">
              <span>{order.status_logs?.[0]?.note || "No shipping info"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Status Dropdown and Badge */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Order Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Badge className={`${statusColors[order.status] || "bg-gray-100 text-gray-800"} px-3 py-1.5 rounded-lg uppercase font-semibold`}>
              {order.status}
            </Badge>
            <Badge className={`${statusColors[order.payment_status] || "bg-gray-100 text-gray-800"} px-3 py-1.5 rounded-lg uppercase font-semibold`}>
              {order.payment_status}
            </Badge>

            {/* ✅ Status Change Dropdown */}
            <div>
              <label className="text-sm font-medium text-gray-600">Update Order Status</label>
              <select
                value={order.status}
                onChange={handleStatusChange}
                disabled={updating}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
