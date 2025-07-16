import userAxios from "../lib/axiosUser";

export const fetchOrder = async (orderData) => {
  const res = await userAxios.post("/orders", orderData);
  return res.data;
};


export const fetchSingleOrder = async (orderId) => {
    const res = await userAxios.get(`/order/${orderId}`);
    return res.data;
}

export const fetchMyOrder = async (status = 'all') => {
  try {
    const res = await userAxios.get(`/my-orders`, {
      params: { status },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};


export async function fetchOrderTracking(orderNumber) {
  try {
    const res = await userAxios.get(`/orders/${orderNumber}/tracking`);
    return res.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Error fetching order tracking:", error);
    throw new Error("Failed to fetch order tracking data");
  }
}