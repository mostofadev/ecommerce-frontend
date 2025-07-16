"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/layout/layout";
import LinkButton from "@/app/components/ui/button/LinkButton";
import SearchInput from "@/app/components/ui/form/SearchInput";
import BrandTable from "@/app/components/admin/brand/BrandTable";
export default function ProductPage() {
    const [search, setSearch] = useState("");
  return (
    <Layout>
        <div className=" space-y-6">
                
        <div className="flex justify-between items-center ">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Brand..."
      />
      <LinkButton href="/admin/brand/create" className="ml-4">
        Add Brand
      </LinkButton>
    </div>

        {/* Order Table */}
        <BrandTable />
        </div>
    </Layout>
  );
}
