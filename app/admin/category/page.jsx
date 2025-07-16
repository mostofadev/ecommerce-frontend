"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/layout/layout";
import LinkButton from "@/app/components/ui/button/LinkButton";
import CategoryTable from "@/app/components/admin/category/CategoryTable";
export default function ProductPage() {
    const [search, setSearch] = useState("");
  return (
    <Layout>
      <div className=" space-y-6">
        <div className="flex justify-between items-center ">
          <LinkButton href="/admin/category/create" className="ml-4">
            Add Category
          </LinkButton>
        </div>
        <CategoryTable />
      </div>
    </Layout>
  );
}
