"use client";
import React, { useEffect, useRef, useState } from "react";
import { useHomeProductContext } from "@/app/context/HomePageContext";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Loader from "../../ui/loader/pageSpinner";
import BtnSpinner from "../../ui/loader/BtnSpinner";
import Link from "next/link";
import Image from "next/image";
import AppImage from "../../ui/Image/AppImage";

export default function ProductLiveSearch() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    searchForProducts,
  } = useHomeProductContext();

  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      searchForProducts(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, searchForProducts]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto  z-[99]"
    >
      {/* Search Box */}
      <div
        className={`flex items-center border ${
          isFocused ? "border-blue-400 shadow-md" : "border-gray-300"
        } rounded-full px-4 py-2 bg-white transition-all duration-200`}
        onFocus={() => setIsFocused(true)}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books, electronics, etc..."
          className="flex-grow outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
          onFocus={() => setIsFocused(true)}
        />
        {searchLoading ? (
          <BtnSpinner size={5} color="bg-blue-600" />
        ) : (
          <SearchRoundedIcon className="text-gray-500" />
        )}
      </div>

      {/* Search Result Dropdown */}
      {isFocused && (searchLoading || searchResults?.length > 0) && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50 mt-1">
          {!searchLoading && searchResults?.length === 0 && (
            <p className="p-4 text-center text-sm text-gray-400">
              No results found
            </p>
          )}

          {!searchLoading && searchResults?.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {searchResults.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`}>
                  <li
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <AppImage
                      src={`${URL_IMAGE}${product.thumbnail}`}
                      alt={product.name}
                      width={48}
                      height={48}
                      ImageClass="w-12 h-12 object-cover rounded-md border"
                      loading="lazy"
                      rounded="none"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      {product.name}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
