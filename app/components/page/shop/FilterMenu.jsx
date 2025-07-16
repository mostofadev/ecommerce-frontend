"use client";

import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiX, FiCheck, FiFilter, FiSliders } from "react-icons/fi";
import { useProductFilterContext } from "@/app/context/ProductFilterContext";

const FilterMenu = () => {
  const {
    filters,
    updateFilters,
    clearAllFilters
  } = useProductFilterContext();

  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    price: true,
    discount: true,
    categories: true,
    subcategories: true,
    brands: true
  });
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSelection = (type, item) => {
    const currentSelections = filters[type];
    if (currentSelections.includes(item)) {
      updateFilters({
        [type]: currentSelections.filter(i => i !== item)
      });
    } else {
      updateFilters({
        [type]: [...currentSelections, item]
      });
    }
  };

  const isMobile = windowWidth < 768;

  // Static data example
  const sortOptions = [
    "Best Seller",
    "New Released",
    "Price - Low to High",
    "Price - High to Low",
    "Discount - High to Low",
    "Discount - Low to High",
    "In Stock"
  ];

  const categories = ["Electronics", "Fashion", "Home Appliances"];
  const subcategories = ["Mobile", "Laptop", "Refrigerator"];
  const brands = ["Samsung", "Apple", "Xiaomi"];

  return (
    <>
      {isMobile && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiSliders className="text-lg" />
            <span className="font-medium">Filters</span>
            {(filters.selectedCategories.length > 0 || filters.selectedBrands.length > 0 || filters.priceRange.min || filters.priceRange.max) && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {filters.selectedCategories.length + filters.selectedBrands.length + (filters.priceRange.min ? 1 : 0) + (filters.priceRange.max ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      )}

      <div className={`${isMobile ? 
        `fixed inset-0 z-10 transform ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out bg-white overflow-y-auto pb-20` : 
        'w-full md:w-80'}`}>
        <div className={`${isMobile ? 'p-4' : 'p-5 rounded-xl bg-white shadow-lg border border-gray-100'}`}>
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pt-4 pb-2 z-10">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiFilter className="text-blue-500" />
              Filters
            </h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <FiX size={14} />
                Clear all
              </button>
              {isMobile && (
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-5 border-b border-gray-100 pb-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("sort")}>
              <h3 className="font-semibold text-gray-800">Sort By</h3>
              {expandedSections.sort ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.sort && (
              <ul className="mt-3 space-y-2">
                {sortOptions.map(option => (
                  <li key={option}>
                    <button
                      onClick={() => updateFilters({ activeSort: option })}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-all ${
                        filters.activeSort === option
                          ? "bg-blue-50 text-blue-600 font-medium border border-blue-100"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                      {filters.activeSort === option && <FiCheck className="text-blue-500" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-5 border-b border-gray-100 pb-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("price")}>
              <h3 className="font-semibold text-gray-800">Price Range (৳)</h3>
              {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.price && (
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={e => updateFilters({ priceRange: { ...filters.priceRange, min: e.target.value } })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400 text-sm">৳</span>
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={e => updateFilters({ priceRange: { ...filters.priceRange, max: e.target.value } })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400 text-sm">৳</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Discount Range */}
          <div className="mb-5 border-b border-gray-100 pb-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("discount")}>
              <h3 className="font-semibold text-gray-800">Discount Range (%)</h3>
              {expandedSections.discount ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.discount && (
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.discountRange.min}
                    onChange={e => updateFilters({ discountRange: { ...filters.discountRange, min: e.target.value } })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.discountRange.max}
                    onChange={e => updateFilters({ discountRange: { ...filters.discountRange, max: e.target.value } })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="mb-5 border-b border-gray-100 pb-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("categories")}>
              <h3 className="font-semibold text-gray-800">Categories</h3>
              {expandedSections.categories ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.categories && (
              <ul className="mt-3 space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        filters.selectedCategories.includes(category)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 group-hover:border-blue-300'
                      }`}>
                        {filters.selectedCategories.includes(category) && <FiCheck className="text-white text-xs" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-blue-600">{category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Subcategories */}
          <div className="mb-5 border-b border-gray-100 pb-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("subcategories")}>
              <h3 className="font-semibold text-gray-800">Subcategories</h3>
              {expandedSections.subcategories ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.subcategories && (
              <ul className="mt-3 space-y-2">
                {subcategories.map(subcat => (
                  <li key={subcat}>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        filters.selectedSubcategories.includes(subcat)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 group-hover:border-blue-300'
                      }`}>
                        {filters.selectedSubcategories.includes(subcat) && <FiCheck className="text-white text-xs" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-blue-600">{subcat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Brands */}
          <div className="mb-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("brands")}>
              <h3 className="font-semibold text-gray-800">Brands</h3>
              {expandedSections.brands ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.brands && (
              <ul className="mt-3 space-y-2">
                {brands.map(brand => (
                  <li key={brand}>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        filters.selectedBrands.includes(brand)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 group-hover:border-blue-300'
                      }`}>
                        {filters.selectedBrands.includes(brand) && <FiCheck className="text-white text-xs" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-blue-600">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterMenu;
