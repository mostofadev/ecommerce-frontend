"use client";

import { FiMinus, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";

const QuantitySelector = ({ stock = 1, initialQuantity = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);


  const handleChange = (value) => {
    const newQuantity = Math.min(stock, Math.max(1, value));
    setQuantity(newQuantity);
    if (onChange) onChange(newQuantity);
  };

  return (
    <div className="space-y-1">
      {/* <h3 className="text-[11px] font-semibold text-gray-700">Quantity</h3> */}

      <div className="flex items-center rounded-md overflow-hidden w-max text-[12px]">
        <button
          onClick={() => handleChange(quantity - 1)}
          className="px-3 py-1 text-gray-700 bg-transparent border border-gray-300 rounded-l-md disabled:opacity-50"
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <FiMinus size={14} />
        </button>

        <span className="px-4 py-1 font-medium text-gray-900 text-center min-w-[40px]">
          {quantity}
        </span>

        <button
          onClick={() => handleChange(quantity + 1)}
          className="px-3 py-1 text-gray-700 bg-transparent border border-gray-300 rounded-r-md disabled:opacity-50"
          disabled={quantity >= stock}
          aria-label="Increase quantity"
        >
          <FiPlus size={14} />
        </button>
      </div>

      {/* <p className="text-[10px] text-gray-500">{stock} items available</p> */}
    </div>
  );
};

export default QuantitySelector;
