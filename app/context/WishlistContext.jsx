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

  // Token check করার জন্য
  const token = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;

  // Wishlist লোড করার ফাংশন
  const WishlistIndex = async (page = 1) => {
    if (!token) {
      // যদি token না থাকে, তাহলে API কল না করো
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
      console.error(err);
      setError(err?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Wishlist Add ফাংশনে token চেক
  const WishlistAdd = async (data) => {
    if (!token) return; // token না থাকলে কিছু করবে না

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
      console.error(err);
      setError(err?.message || "Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Wishlist Remove ফাংশনে token চেক
  const WishlistRemove = async (id) => {
    if (!token) return; // token না থাকলে কিছু করবে না

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
      console.error(err);
      setError(err?.message || "Failed to remove from wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Component মাউন্ট হলে Wishlist লোড করো, যদি token থাকে
  useEffect(() => {
    if (token) {
      WishlistIndex();
    } else {
      // token না থাকলে পরিষ্কার করে রাখো
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
