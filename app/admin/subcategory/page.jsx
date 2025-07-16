"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/layout/layout";
import LinkButton from "@/app/components/ui/button/LinkButton";
import SubCategoryTable from "@/app/components/admin/subcategory/SubCategoryTable";
export default function ProductPage() {
    const [search, setSearch] = useState("");
  return (
    <Layout>
        <div className=" space-y-6">
                
        <div className="flex justify-between items-center ">
      <p>Sub Category</p>
      <LinkButton href="/admin/subcategory/create" className="ml-4">
        Add Sub Category
      </LinkButton>
    </div>

        {/* Order Table */}
        <SubCategoryTable />
        </div>
    </Layout>
  );
}
