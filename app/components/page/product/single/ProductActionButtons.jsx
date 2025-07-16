"use client";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 pt-3">
      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition shadow-md hover:shadow-lg text-xs">
        <FaShoppingCart size={14} /> Add to Cart
      </button>
      <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg text-xs">
        Buy Now
      </button>
    </div>
  );
}
