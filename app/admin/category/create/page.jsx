"use client"
import CategoryForm from "@/app/components/admin/category/create";
import Layout from "@/app/components/admin/layout/layout";
export default function CategoryPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <CategoryForm />
        </div>
      </div>
    </Layout>
    
  );
}
