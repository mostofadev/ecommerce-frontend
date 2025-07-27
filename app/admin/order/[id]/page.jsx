"use client";

import React, { useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import Invoice from "@/app/components/admin/order/Invoice";
import SingleOrderDetails from "@/app/components/admin/order/SingleOrderDetails";
import { Button } from "@/app/components/admin/order/Button";
import { Badge } from "@/app/components/admin/order/Badge";
import Layout from "@/app/components/admin/layout/layout";
import { useOrderAdmin } from "@/app/context/OrderAdminContext";

import Link from "next/link";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Loader from "@/app/components/ui/loader/pageSpinner";

export default function SingleOrderPage() {
  const params = useParams();
  const orderId = params?.id;

  const { selectedOrder: order, fetchSingleOrder } = useOrderAdmin();

  const invoiceRef = useRef();

const handlePrint = useReactToPrint({
  content: () => invoiceRef.current,
  documentTitle: `Invoice_${order?.order_number || "Order"}`,
});

  useEffect(() => {
    if (orderId) {
      fetchSingleOrder(orderId);
    }
  }, [orderId]);

  if (!order) {
    return (
     <Loader />
    );
  }

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin/order"
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowBackIcon className="mr-2" />
            <span className="text-lg font-medium">Back to Orders</span>
          </Link>

          {/* <div className="p-6">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              <PrintIcon className="w-5 h-5" />
              Print Invoice
            </Button>

            
           <div style={{ display: "none" }}>
  <Invoice ref={invoiceRef} order={order} />
</div>
          </div> */}
        </div>

        {/* Order Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Order #{order.order_number}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Placed on{" "}
              {new Date(order.ordered_at).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Badge
              className={`${
                statusColors[order.status] || "bg-gray-100 text-gray-800"
              } px-4 py-1.5 rounded-lg uppercase font-semibold`}
            >
              {order.status}
            </Badge>
            <Badge
              className={`${
                statusColors[order.payment_status] || "bg-gray-100 text-gray-800"
              } px-4 py-1.5 rounded-lg uppercase font-semibold`}
            >
              {order.payment_status}
            </Badge>
          </div>
        </div>

        {/* Order Details */}
        <SingleOrderDetails order={order} />
      </div>
    </Layout>
  );
}
