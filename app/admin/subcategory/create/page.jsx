"use client"
import Layout from "@/app/components/admin/layout/layout";
import SubCategoryForm from "@/app/components/admin/subcategory/create";
export default function BrandPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <SubCategoryForm />
        </div>
      </div>
    </Layout>
    
  );
}
