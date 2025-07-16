"use client";
import React, { useState } from "react";
import OrderTable from "@/app/components/admin/order/OrderTable";
import Layout from "@/app/components/admin/layout/layout";
import ProductTable from "@/app/components/admin/product/ProductTable";
import TextInput from "@/app/components/ui/form/input";
import LinkButton from "@/app/components/ui/button/LinkButton";
import SearchInput from "@/app/components/ui/form/SearchInput";
export default function ProductPage() {
    const [search, setSearch] = useState("");
  return (
    <Layout>
        <div className=" space-y-6">
                
        <div className="flex justify-between items-center ">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search orders, products..."
      />
      <LinkButton href="/admin/product/create" className="ml-4">
        Add Product
      </LinkButton>
    </div>

        {/* Order Table */}
        <ProductTable />
        </div>
    </Layout>
  );
}
