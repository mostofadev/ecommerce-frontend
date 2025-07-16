"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchFilteredProducts } from "../services/homePageServices";

const ProductFilterContext = createContext();

export const ProductFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    activeSort: "Best Seller",
    priceRange: { min: "", max: "" },
    discountRange: { min: "", max: "" },
    selectedCategories: [],
    selectedSubcategories: [],
    selectedBrands: [],
  });
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilteredProducts({
          sort_by: filters.activeSort,
          min_price: filters.priceRange.min,
          max_price: filters.priceRange.max,
          min_discount: filters.discountRange.min,
          max_discount: filters.discountRange.max,
          categories: filters.selectedCategories.join(","),
          subcategories: filters.selectedSubcategories.join(","),
          brands: filters.selectedBrands.join(","),
        });
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      activeSort: "Best Seller",
      priceRange: { min: "", max: "" },
      discountRange: { min: "", max: "" },
      selectedCategories: [],
      selectedSubcategories: [],
      selectedBrands: [],
    });
  };

  return (
    <ProductFilterContext.Provider value={{
      filters,
      products,
      loading,
      error,
      updateFilters,
      clearAllFilters,
    }}>
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilterContext = () => useContext(ProductFilterContext);
