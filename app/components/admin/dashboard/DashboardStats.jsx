import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 2100, 1800, 2400, 3000, 4000],
        borderColor: "#2563eb", // bg-blue-600
        backgroundColor: "#2563eb33",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const ordersData = {
    labels: ["Shoes", "Bags", "Watches", "Clothes", "Accessories"],
    datasets: [
      {
        label: "Orders",
        data: [50, 35, 40, 60, 30],
        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Sales" value="$12,340" change="+12%" />
        <StatCard title="Total Orders" value="1,240" change="+5%" />
        <StatCard title="Customers" value="820" change="+8%" />
        <StatCard title="Pending Orders" value="45" change="-2%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time</h2>
          <Line data={salesData} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Orders by Category</h2>
          <Bar data={ordersData} />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <TableRow id="#1023" customer="John Doe" amount="$120" status="Completed" />
            <TableRow id="#1024" customer="Jane Smith" amount="$90" status="Pending" />
            <TableRow id="#1025" customer="Alex Brown" amount="$250" status="Shipped" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- Components ----------------
function StatCard({ title, value, change }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm mt-1 ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
        {change} from last month
      </p>
    </div>
  );
}

function TableRow({ id, customer, amount, status }) {
  const statusColor =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{id}</td>
      <td className="p-3">{customer}</td>
      <td className="p-3">{amount}</td>
      <td className="p-3">
        <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>{status}</span>
      </td>
    </tr>
  );
}
