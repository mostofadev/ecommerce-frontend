"use client";

import { useCart } from "@/app/context/CartContext";
import { FaTimes } from "react-icons/fa";
import CartList from "./cartList";
import { useEffect } from "react";
import Loader from "../../ui/loader/pageSpinner";
import LinkButton from "../../ui/button/LinkButton";
import { HiArrowLeft } from "react-icons/hi";

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    loading,
    cart,
    items,
    fetchCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Calculate subtotal based on item price × quantity
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.final_price ?? item.product.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  const total = subtotal;

  if (loading) return <Loader />;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-md z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button onClick={onClose}>
            <FaTimes size={18} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {items?.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <CartList
              items={items}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleUpdateQuantity}
            />
          )}
        </div>

        {/* Checkout Summary */}
        {items?.length !== 0 ?
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center">
            {/* Checkout Button */}
            <LinkButton
              href="/checkout"
              onClick={onClose}
              className="group flex items-center gap-2 font-semibold"
              Icon={<HiArrowLeft />}
            >
              Checkout
            </LinkButton>

            {/* Total Price */}
            <span className="text-lg font-bold text-gray-900">৳ {total}</span>
          </div>
        </div>
        :''}
        
      </div>
    </>
  );
};

export default CartDrawer;
