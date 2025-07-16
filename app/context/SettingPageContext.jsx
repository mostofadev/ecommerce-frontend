"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchBanner as fetchBannerService } from "../services/SettingPageServices";

// Create context
const SettingPageContext = createContext();

// Provider component
export function SettingPageProvider({ children }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch banners function (wrap service call)
  const fetchBannerHandle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBannerService();
      console.log(data);
      
      setBanners(data.data);
    } catch (err) {
      setError(err.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch on mount
  

  return (
    <SettingPageContext.Provider
      value={{ banners, loading, error, fetchBannerHandle }}
    >
      {children}
    </SettingPageContext.Provider>
  );
}

// Custom hook for consuming context easily
export function useSettingPageContext() {
  const context = useContext(SettingPageContext);
  if (!context) {
    throw new Error("useBannerContext must be used within a BannerProvider");
  }
  return context;
}
