"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { fetchMyOrder, fetchOrder,fetchOrderTracking,fetchSingleOrder} from "../services/OrderServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);


export const OrderProvider = ({ children }) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const [order, setOrder] = useState([]);
  const [loading,setLoading] = useState(false)

  const [myOrder,setMyOrder] = useState([])

  // tracking 
  const [trackingOrder, serTrackingOrder] = useState([]);

  const handleOrderSubmit = useCallback(async (orderData) => {
    setLoading(true)
    try {
      const res = await fetchOrder(orderData);
console.log(res);

      return res;
    } catch (error) {
      console.error("Order Error:", error);
    
    }finally{
        setLoading(false)
    }
  }, []);


  const FetchSingleOrder =async (orderId) => {
    setLoading(true)
    try {
      const res =  await fetchSingleOrder(orderId);
      console.log(res);
      setOrder(res.data)
      return res.data
    } catch (error) {
      console.error("Order Error:", error);
    }finally{
      setLoading(false)
    }
      
  }

  const MyOrders = async (status) => {
    setLoading(true);
    try {
      const res = await fetchMyOrder(status);
      setMyOrder(res.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const OrderTrackingHandle = async (orderNumber) => {
    console.log(orderNumber);
    
    try {
      setLoading(true);
      const data = await fetchOrderTracking(orderNumber);
      serTrackingOrder(data);
    } catch (err) {
      console.error(err);
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

        trackingOrder,
        OrderTrackingHandle
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
