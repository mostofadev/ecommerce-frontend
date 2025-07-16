"use client";
import React from "react";
import OrderTable from "@/app/components/admin/order/OrderTable";
import Layout from "@/app/components/admin/layout/layout";
import { useOrderAdmin } from "@/app/context/OrderAdminContext";

export default function OrdersPage() {
  const { search, setSearch, status, setStatus, loading } = useOrderAdmin();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">All Orders</h1>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Filter by Status</option>
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
        </div>

        {/* Order Table */}
        <OrderTable />
      </div>
    </Layout>
  );
}
