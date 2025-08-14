"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { OrderAdminService } from "@/app/services/OrderAdminService";
import { toast } from "react-hot-toast";
import { showCustomToast } from "../lib/showCustomToast";

const OrderAdminContext = createContext();

export const useOrderAdmin = () => useContext(OrderAdminContext);

export function OrderAdminProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });

  const fetchOrders = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await OrderAdminService.getAllOrders({
          search,
          status,
          page,
        });
        const orderData = res.data || [];
        const meta = res;
        setOrders(orderData);
        setPagination({
          current_page: meta.current_page || 1,
          last_page: meta.last_page || 1,
          total: meta.total || orderData.length,
          per_page: meta.per_page || 10,
        });
      } catch (err) {
        showCustomToast({
          title: "Failed to fetch orders",
          message: "Failed to fetch orders",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [search, status]
  );

  const fetchSingleOrder = async (id) => {
    try {
      const res = await OrderAdminService.getSingleOrder(id);
      setSelectedOrder(res);
    } catch (err) {
      showCustomToast({
        title: "Order Details",
        message: "Failed to fetch order details",
        type: "error",
      });
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;
    try {
      await OrderAdminService.deleteOrder(id);
      toast.success("Order deleted successfully");
      fetchOrders(pagination.current_page);
    } catch (err) {
      showCustomToast({
        title: "Order Delete",
        message: "Failed to delete order",
        type: "error",
      });
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await OrderAdminService.updateStatus(id, newStatus);
      showCustomToast({
        title: "Order Status",
        message: "Order Status Update Successfully.",
        type: "success",
      });
      fetchOrders(pagination.current_page);
    } catch (err) {
      showCustomToast({
        title: "Order Update",
        message: "Failed to update status",
        type: "error",
      });
    }
  };

  const createOrder = async (formData) => {
    try {
      const res = await OrderAdminService.createOrder(formData);

      showCustomToast({
        title: "Order Created",
        message: "Order created successfully.",
        type: "success",
      });
      fetchOrders(pagination.current_page);
      return res;
    } catch (err) {
      showCustomToast({
        title: "Order Failed",
        message: "Failed to create order.",
        type: "error",
      });
      created;
      throw err;
    }
  };
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("admin_token")
        : null;
    if (token) {
      fetchOrders();
    }
  }, [fetchOrders]);
  return (
    <OrderAdminContext.Provider
      value={{
        orders,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        fetchOrders,
        deleteOrder,
        updateOrderStatus,
        fetchSingleOrder,
        selectedOrder,
        createOrder,
        pagination,
      }}
    >
      {children}
    </OrderAdminContext.Provider>
  );
}
