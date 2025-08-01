"use client";

import { FiMinus, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";

const QuantitySelector = ({ stock = 10, quantity = 1, onChange }) => {
  const [internalQuantity, setInternalQuantity] = useState(quantity);

  // Sync only when `quantity` changes from outside
  useEffect(() => {
    setInternalQuantity(quantity);
  }, [quantity]);

  const handleChange = (newValue) => {
    const newQty = Math.max(1, Math.min(stock, newValue));
    if (newQty !== internalQuantity) {
      setInternalQuantity(newQty);
      onChange?.(newQty);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center rounded-md overflow-hidden w-max text-[12px]">
        <button
          onClick={() => handleChange(internalQuantity - 1)}
          className="px-3 py-1 text-gray-700 bg-transparent border border-gray-300 rounded-l-md disabled:opacity-50"
          disabled={internalQuantity <= 1}
          aria-label="Decrease quantity"
        >
          <FiMinus size={14} />
        </button>

        <span className="px-4 py-1 font-medium text-gray-900 text-center min-w-[40px]">
          {internalQuantity}
        </span>

        <button
          onClick={() => handleChange(internalQuantity + 1)}
          className="px-3 py-1 text-gray-700 bg-transparent border border-gray-300 rounded-r-md disabled:opacity-50"
          disabled={internalQuantity >= stock}
          aria-label="Increase quantity"
        >
          <FiPlus size={14} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
