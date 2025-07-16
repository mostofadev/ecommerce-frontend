"use client"
import BrandForm from "@/app/components/admin/brand/create";
import Layout from "@/app/components/admin/layout/layout";
export default function BrandPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <BrandForm />
        </div>
      </div>
    </Layout>
    
  );
}
