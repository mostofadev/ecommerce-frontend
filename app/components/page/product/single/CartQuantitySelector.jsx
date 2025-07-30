"use client";

import { FiMinus, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

const CartQuantitySelector = ({ itemId }) => {
  const { items, handleUpdateQuantity, cartLoading } = useCart();
  const item = items.find((i) => i.id === itemId);

  const getInitialQty = () => {
    if (!item) return 1;
    return parseInt(item.quantity);
  };

  const getMaxStock = () => {
    if (item.variant) {
      return parseInt(item.variant.quantity);
    }
    return parseInt(item.product.quantity);
  };

  const [qty, setQty] = useState(getInitialQty());

  useEffect(() => {
    setQty(getInitialQty());
  }, [item]);

  const handleChange = async (delta) => {
    const maxStock = getMaxStock();
    const newQty = Math.max(1, Math.min(maxStock, qty + delta));
    if (newQty !== qty) {
      setQty(newQty);
      await handleUpdateQuantity(itemId, newQty);
    }
  };

  if (!item) return null;

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => handleChange(-1)}
        disabled={qty <= 1 || cartLoading}
        className={`
          px-3 py-1 border border-gray-300 rounded-l-md
          text-gray-700 bg-white
          hover:bg-gray-100
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center
        `}
        aria-label="Decrease quantity"
      >
        <FiMinus size={16} />
      </button>

      <span className="min-w-[32px] text-center font-medium text-gray-900 select-none">
        {qty}
      </span>

      <button
        onClick={() => handleChange(1)}
        disabled={qty >= getMaxStock() || cartLoading}
        className={`
          px-3 py-1 border border-gray-300 rounded-r-md
          text-gray-700 bg-white
          hover:bg-gray-100
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center
        `}
        aria-label="Increase quantity"
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
};

export default CartQuantitySelector;
