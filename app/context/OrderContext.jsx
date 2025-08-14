"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  fetchMyOrder,
  fetchOrder,
  fetchOrderTracking,
  fetchSingleOrder,
} from "../services/OrderServices";
const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myOrder, setMyOrder] = useState([]);
  const [trackingOrder, serTrackingOrder] = useState([]);
  const [error, setError] = useState(null);
  const handleOrderSubmit = useCallback(async (orderData) => {
    setLoading(true);
    try {
      const res = await fetchOrder(orderData);
      return res;
    } catch (error) {
      setError(
        error?.message || "An unexpected error occurred. Please try again."
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const FetchSingleOrder = async (orderId) => {
    setLoading(true);
    try {
      const res = await fetchSingleOrder(orderId);
      setOrder(res.data);
      return res.data;
    } catch (error) {
      setError(error.message || "Failed to load FetchSingleOrder");
    } finally {
      setLoading(false);
    }
  };

  const MyOrders = async (status) => {
    setLoading(true);
    try {
      const res = await fetchMyOrder(status);
      setMyOrder(res.data || []);
    } catch (error) {
      setError(err.message || "Failed to load MyOrders");
    } finally {
      setLoading(false);
    }
  };

  const OrderTrackingHandle = async (orderNumber) => {
    try {
      setLoading(true);
      const data = await fetchOrderTracking(orderNumber);
      serTrackingOrder(data);
    } catch (err) {
      setError(err.message || "Failed to load OrderTracking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        loading,
        order,
        orderInfo,
        myOrder,
        setOrderInfo,
        handleOrderSubmit,
        FetchSingleOrder,
        MyOrders,
        error,
        trackingOrder,
        OrderTrackingHandle,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
