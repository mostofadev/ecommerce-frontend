import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchWishlistIndex,
  fetchWishlistAdd,
  fetchWishlistRemove,
} from "../services/wishlistServices";
import { showCustomToast } from "../lib/showCustomToast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const token = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;
  const WishlistIndex = async (page = 1) => {
    if (!token) {
      setWishlist([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
      });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWishlistIndex(page);
      let WishlistData = [];
      let paginationData = {};
      if (Array.isArray(response.wishlist)) {
        WishlistData = response.wishlist;
        paginationData = {
          current_page: 1,
          last_page: 1,
          per_page: WishlistData.length,
          total: WishlistData.length,
        };
      } else if (response.wishlist && Array.isArray(response.wishlist.data)) {
        WishlistData = response.wishlist.data;
        paginationData = response.wishlist;
      }
      setWishlist(WishlistData);
      setPagination({
        current_page: paginationData.current_page || 1,
        last_page: paginationData.last_page || 1,
        total: paginationData.total || WishlistData.length,
        per_page: paginationData.per_page || 10,
      });
    } catch (err) {
      setError(err?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Wishlist Add 
  const WishlistAdd = async (data) => {
    if (!token) return; 

    setLoading(true);
    setError(null);
    try {
      await fetchWishlistAdd(data);
      await WishlistIndex(pagination.current_page);
      showCustomToast({
        title: "Added to Wishlist",
        message: "Wishlist Added Successfully.",
        type: "success",
      });
    } catch (err) {
      setError(err?.message || "Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Wishlist Remove 
  const WishlistRemove = async (id) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await fetchWishlistRemove(id);
      await WishlistIndex(pagination.current_page);
      showCustomToast({
        title: "Remove Wishlist",
        message: "Wishlist Remove Successfully.",
        type: "success",
      });
    } catch (err) {
      setError(err?.message || "Failed to remove from wishlist");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      WishlistIndex();
    } else {
      setWishlist([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
      });
    }
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        pagination,
        loading,
        error,
        WishlistIndex,
        WishlistAdd,
        WishlistRemove,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
