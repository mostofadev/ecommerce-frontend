"use client";
import React, { useState } from "react";
import OrderTable from "@/app/components/admin/order/OrderTable";
import Layout from "@/app/components/admin/layout/layout";
import SearchInput from "@/app/components/ui/form/SearchInput";
import CustomerTable from "@/app/components/admin/customer/CustomerTable";
export default function OrdersPage() {
    const [search, setSearch] = useState("");
  return (
    <Layout>
        <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">All Customer</h1>

            {/* Search and filter (optional expansion later) */}
            <div className="flex gap-2">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Customer..."
            />
            
            </div>
        </div>

        {/* Order Table */}
        <CustomerTable />
        </div>
    </Layout>
  );
}
