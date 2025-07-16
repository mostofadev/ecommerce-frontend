import React from "react";

const orders = [
  { id: "#001", customer: "John Doe", total: "$120", status: "Pending" },
  { id: "#002", customer: "Jane Smith", total: "$240", status: "Shipped" },
  { id: "#003", customer: "Alex Johnson", total: "$90", status: "Delivered" },
];

export default function RecentOrders() {
  return (
    <div className="p-4 bg-white border rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2">Order ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Total</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.customer}</td>
              <td className="py-2">{order.total}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
