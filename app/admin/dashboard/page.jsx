"use client"
import Layout from "@/app/components/admin/layout/layout";
import DashboardStats from "@/app/components/admin/dashboard/DashboardStats";
import RecentOrders from "@/app/components/admin/dashboard/RecentOrders";
import AdminDashboard from "@/app/components/admin/dashboard/DashboardStats";

export default function page() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <AdminDashboard />
        {/* <RecentOrders /> */}
      </div>
    </Layout>
  );
}
