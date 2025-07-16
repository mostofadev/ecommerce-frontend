"use client";

import { createContext, useContext, useState } from "react";
import { getCart,fetchAddToCart, updateQuantity, removeFromCart } from "../services/CartServices";
import { getGuestToken,getUserFromLocal,getTokenFromLocal } from "../utils/getGuestToken";
import { showCustomToast } from "../lib/showCustomToast";
import { toast } from "react-toastify";
import { useWishlist } from "./WishlistContext";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {pagination,WishlistIndex} = useWishlist()
  
  const fetchCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const guestToken = getGuestToken();
      const user = getUserFromLocal();
      const user_id = user?.id;
      const res = await getCart(user_id, guestToken);
      console.log(res);
      
      setCart(res.cart);
      setItems(res.items);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      setError(err?.response?.data?.message || "Error loading cart");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async ({ product, variant = null, quantity = 1 }) => {
    setLoading(true);
    setError(null);

    try {
      const user = getUserFromLocal();
      const token = getTokenFromLocal();
      const guestToken = getGuestToken();

      const payload = {
        user_id: user?.id || null,
        product_id: product.id,
        variant_id: variant?.id || null,
        quantity,
        unit_price:product.final_price? product.final_price : product.price,
        original_price: product.price,
        discount: product.discount_value || 0,
      };

      const res = await fetchAddToCart(payload, token, guestToken);
      console.log("✅ Added to cart:", res);
      await fetchCart()
      await WishlistIndex(pagination.current_page)
      // Add to cart
      showCustomToast({
        title: "Added to Cart",
        message: "Cart Added Successfully.",
        type: "success",
      });
     
      return res;
    } catch (err) {
      console.error("❌ Add to cart error:", err);
      setError(err?.response?.data?.message || "Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const res = await updateQuantity(itemId, quantity);
      await fetchCart();
      showCustomToast({
        title: "Update Cart",
        message: "Cart Update Successfully.",
        type: "success",
      });
      return res;
    } catch (err) {
      console.error("❌ Quantity update error:", err);
      setError(err?.response?.data?.message || "Error updating quantity");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await removeFromCart(itemId);
      await fetchCart();
      showCustomToast({
        title: "Delete Cart",
        message: "Cart Delete Successfully.",
        type: "success",
      });
      return res;
    } catch (err) {
      console.error("❌ Remove item error:", err);
      setError(err?.response?.data?.message || "Error removing item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        loading,
        error,
        fetchCart,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
