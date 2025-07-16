import React from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const stats = [
  {
    label: "Total Users",
    value: 1523,
    icon: <FaUsers />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Total Products",
    value: 321,
    icon: <FaBoxOpen />,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Total Orders",
    value: 789,
    icon: <FaShoppingCart />,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Total Revenue",
    value: "$12,340",
    icon: <FaDollarSign />,
    color: "bg-purple-100 text-purple-700",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white border rounded-xl shadow"
        >
          <div className={`p-3 rounded-full text-xl ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
