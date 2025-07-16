"use client"
import UpdateBrandForm from "@/app/components/admin/brand/updateForm";
import Layout from "@/app/components/admin/layout/layout";
import UpdateBannerForm from "@/app/components/admin/setting/banner/updateBanner";
import { useParams } from "next/navigation";
export default function BrandPage() {
  const params = useParams()
    const {id} = params
  return (
    
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <UpdateBannerForm id={id} />
        </div>
      </div>
    </Layout>
    
  );
}
