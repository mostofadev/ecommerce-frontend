"use client";
import { createContext, useContext, useState } from "react";
import {
  createBanner,
  deleteBanner,
  updateBanner,
  getAllBanners,
  getSingleBanner,
} from "../services/bannerServices";
import { showCustomToast } from "../lib/showCustomToast";

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [singleBanner, setSingleBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });

  // 🔄 Get All Banners with Pagination Handling
  const getAllBannersHandler = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getAllBanners(page);

      let bannerData = [];
      let paginationData = {};

      if (Array.isArray(response.data)) {
        // Non-paginated fallback
        bannerData = response.data;
        paginationData = {
          current_page: 1,
          last_page: 1,
          per_page: bannerData.length,
          total: bannerData.length,
        };
      } else if (response.data && Array.isArray(response.data.data)) {
        // Paginated
        bannerData = response.data.data;
        paginationData = response.data;
      }

      setBanners(bannerData);
      setPagination({
        current_page: paginationData.current_page || 1,
        last_page: paginationData.last_page || 1,
        total: paginationData.total || bannerData.length,
        per_page: paginationData.per_page || 10,
      });

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create Banner
  const createBannerHandler = async (formData) => {
    setLoading(true);
    try {
      const res = await createBanner(formData);
      await getAllBannersHandler(pagination.current_page);
      setError(null);
      return res;
    } catch (err) {
       console.log(err);

    if (err.response && err.response.data && err.response.data.errors) {
      
      const errorsObj = err.response.data.errors;
      const allErrors = Object.values(errorsObj)
        .flat()
        .join(", ");
      setError(allErrors);
      showCustomToast({
        title: "Validation Error",
        message: allErrors,
        type: "error",
      });
    } else if (err.response && err.response.data && err.response.data.message) {
   
      setError(err.response.data.message);
    } else {
      setError("Something went wrong");
      showCustomToast({
        title: "Error",
        message: 'Something went wrong',
        type: "error",
      });
    }
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete Banner
  const deleteBannerHandler = async (id) => {
    setLoading(true);
    try {
      await deleteBanner(id);
      await getAllBannersHandler(pagination.current_page);
      showCustomToast({
        title: "Banner Delete Successfully",
        message: "Banner Delete Successfully.",
        type: "success",
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to delete banner");
    } finally {
      setLoading(false);
    }
  };
const getSingleBannerHandler = async (id) => {
  try {
    const res = await getSingleBanner(id); // your axios call
    return res; // returns full axios response
  } catch (err) {
    console.error(err);
  }
};
  // 🔁 Update Banner
  const updateBannerHandler = async (id, formData) => {
    setLoading(true);
    try {
      const res = await updateBanner(id, formData);
      await getAllBannersHandler(pagination.current_page);
      await getSingleBannerHandler(id)
      setError(null);
      
      return res;
    } catch (err) {
       console.log(err);

    if (err.response && err.response.data && err.response.data.errors) {
      
      const errorsObj = err.response.data.errors;
      const allErrors = Object.values(errorsObj)
        .flat()
        .join(", ");
      setError(allErrors);
      showCustomToast({
        title: "Validation Error",
        message: allErrors,
        type: "error",
      });
    } else if (err.response && err.response.data && err.response.data.message) {
   
      setError(err.response.data.message);
    } else {
      setError("Something went wrong");
      showCustomToast({
        title: "Error",
        message: 'Something went wrong',
        type: "error",
      });
    }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <BannerContext.Provider
      value={{
        banners,
        singleBanner,
        loading,
        error,
        pagination,
        getAllBannersHandler,
        createBannerHandler,
        deleteBannerHandler,
        updateBannerHandler,
        getSingleBannerHandler,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

// ✅ Custom hook
export const useBannerContext = () => useContext(BannerContext);
