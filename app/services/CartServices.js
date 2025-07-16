"use client";
import userAxios from "../lib/axiosUser";
// ✅ Add to cart
export const fetchAddToCart = async (data, token = null, guestToken = null) => {
    console.log(data);
    console.log(token);
    console.log(guestToken);
    
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (guestToken) headers["X-Guest-Token"] = guestToken;

  const response = await userAxios.post("/cart/add", data, { headers });
  console.log('wishlist remove log',response);
  
  return response.data;
};

// ✅ Get cart (details)
export const getCart = async (user_id = null, guestToken = null) => {
  const headers = {};
  if (user_id) headers["user_id"] = user_id;
  if (guestToken) headers["X-Guest-Token"] = guestToken;

  const response = await userAxios.get("/cart", { headers });
  return response.data;
};

// ✅ Update item quantity
export const updateQuantity = async (itemId, quantity) => {
  const response = await userAxios.put("/cart/item/update", {
    item_id: itemId,
    quantity,
  });
  return response.data;
};

// ✅ Remove item from cart
export const removeFromCart = async (itemId) => {
  const response = await userAxios.delete(`/cart/item/${itemId}`);
  return response.data;
};
