"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/layout/layout";
import LinkButton from "@/app/components/ui/button/LinkButton";
import BannerTable from "@/app/components/admin/setting/banner/BannerTable";
export default function ProductPage() {
    const [search, setSearch] = useState("");
  return (
    <Layout>
        <div className=" space-y-6">
                
        <div className="flex justify-between items-center ">
      
      <LinkButton href="/admin/setting/banner/create" className="ml-4">
        Add Brand
      </LinkButton>
    </div>

       <BannerTable />
        
        </div>
    </Layout>
  );
}
