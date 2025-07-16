"use client"
import Layout from "@/app/components/admin/layout/layout";
import BannerForm from "@/app/components/admin/setting/banner/createBanner";
export default function BannerPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <BannerForm />
        </div>
      </div>
    </Layout>
    
  );
}
