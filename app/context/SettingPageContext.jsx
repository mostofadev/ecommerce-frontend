"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchBanner as fetchBannerService } from "../services/SettingPageServices";

const SettingPageContext = createContext();

export function SettingPageProvider({ children }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBannerHandle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBannerService();

      setBanners(data.data);
    } catch (err) {
      setError(err.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingPageContext.Provider
      value={{ banners, loading, error, fetchBannerHandle }}
    >
      {children}
    </SettingPageContext.Provider>
  );
}

export function useSettingPageContext() {
  const context = useContext(SettingPageContext);
  if (!context) {
    throw new Error("useBannerContext must be used within a BannerProvider");
  }
  return context;
}
