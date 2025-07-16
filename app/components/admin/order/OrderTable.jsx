"use client";
import React, { useState, useEffect } from "react";
import { useOrderAdmin } from "@/app/context/OrderAdminContext";
import Table from "../../ui/table/TableMain";
import TableHeader from "../../ui/table/TableHeader";
import TableHeadCell from "../../ui/table/TableHeadCell";
import TableBody from "../../ui/table/TableBody";
import TableRow from "../../ui/table/TableRow";
import TableCell from "../../ui/table/TableCell";
import TableActions from "../../ui/table/TableActions";
import Pagination from "../../ui/pagination/pagination";
import { useRouter } from "next/navigation";

export default function OrderTable() {
  const {
    orders,
    deleteOrder,
    updateOrderStatus,
    loading,
    pagination,
    fetchOrders,
  } = useOrderAdmin();
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading orders...</div>;
  }

  if (!orders.length) {
    return <div className="text-center py-10 text-gray-600">No orders found.</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <tr>
            <TableHeadCell>Order ID</TableHeadCell>
            <TableHeadCell>Customer</TableHeadCell>
            <TableHeadCell>Order Date</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Payment</TableHeadCell>
            <TableHeadCell>Method</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
            <TableHeadCell>Items</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </tr>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.order_number || order.id}</TableCell>
              <TableCell>{order.customer_name || order.user?.name}</TableCell>
              <TableCell>{order.ordered_at?.split("T")[0]}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold capitalize 
                    ${order.status === "shipped"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="capitalize">{order.payment_status}</TableCell>
              <TableCell>{order.payment_method}</TableCell>
              <TableCell>৳{order.total}</TableCell>
              <TableCell>{order.items?.length || 0}</TableCell>
              <TableCell>
                <TableActions
                  onView={() => router.push(`/admin/order/${order.id}`)}
                  // onEdit={() =>
                  //   updateOrderStatus(order.id, prompt("New Status:", order.status))
                  // }
                  onDelete={() => deleteOrder(order.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ Pagination here */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
}
