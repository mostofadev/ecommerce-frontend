"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiBars3,
  HiXMark,
  HiShoppingBag,
  HiUserCircle,
} from "react-icons/hi2";
import CartDrawer from "../cart/cartDrawer";
import { useCart } from "@/app/context/CartContext";
import ProductLiveSearch from "../search/ProductLiveSearch";

const MainMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  // State to store token existence and optionally user name
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("user_token");
      setToken(savedToken);

      // ধরছি তোমার ইউজারের নাম localStorage এ 'user_name' নামে আছে
      const savedUserName = localStorage.getItem("user_name");
      if (savedUserName) setUserName(savedUserName);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:block bg-white shadow-sm px-4 md:px-8 lg:px-16 xl:px-32 py-3 relative z-10">
        <div className="flex items-center justify-between gap-6">
          <div className="text-xl font-bold text-red-600 cursor-pointer">
            <Link href="/">
              Rokomari
            </Link>
          </div>

          {/* Search Box */}
          <div className="flex-grow max-w-2xl">
            <ProductLiveSearch />
          </div>

          <div className="flex items-center space-x-6 text-gray-700">
            {/* Conditional Rendering based on token */}
            {token ? (
              <Link href="/user/profile" className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                <HiUserCircle className="text-[20px]" />
                <span className="text-sm">{userName || "Profile"}</span>
              </Link>
            ) : (
              <Link href="/login" className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                <HiUserCircle className="text-[20px]" />
                <span className="text-sm">Sign In</span>
              </Link>
            )}

            <div
              className="relative flex items-center space-x-1 cursor-pointer hover:text-blue-600"
              onClick={() => setCartOpen(true)}
            >
              <HiShoppingBag className="text-[20px]" />
              <span className="text-sm">Cart</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white shadow-sm px-4 py-3 relative z-10">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <button onClick={toggleSidebar}>
              <HiBars3 className="text-gray-700 text-2xl" />
            </button>

            <div className="text-xl font-bold text-red-600">
              <Link href="/">
              Rokomari
            </Link>
            </div>

            <div className="flex items-center space-x-4 text-gray-700">
              {/* Mobile conditional */}
              {token ? (
                <Link href="/user/profile" className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <HiUserCircle className="text-2xl" />
                  <span className="text-sm">{userName || "Profile"}</span>
                </Link>
              ) : (
                <Link href="/login" className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                  <HiUserCircle className="text-2xl" />
                  <span className="text-sm">Sign In</span>
                </Link>
              )}

              <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
                <HiShoppingBag className="text-2xl hover:text-blue-600" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div>
            <ProductLiveSearch />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="text-lg font-semibold text-red-600">
            <Link href="/">
              Rokomari
            </Link>
          </span>
          <button onClick={toggleSidebar}>
            <HiXMark className="text-2xl" />
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4 text-gray-700 text-base">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Categories</li>
          <li className="hover:text-blue-600 cursor-pointer">Pre Order</li>
          <li className="hover:text-blue-600 cursor-pointer">Login</li>
          <li className="hover:text-blue-600 cursor-pointer">Cart</li>
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default MainMenu;
