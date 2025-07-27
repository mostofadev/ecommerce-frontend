import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import QuantitySelector from "../product/single/ProductQuantitySelector";

const CheckoutCart = ({ items, onRemove, onQuantityChange, onSelectionChange }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
console.log(items);

  const [selectedItems, setSelectedItems] = useState(() =>
    items.map((item) => item.id) // ✅ all selected initially
  );

  // ✅ If `items` prop changes (e.g., from API), reselect all
  useEffect(() => {
    setSelectedItems(items.map((item) => item.id));
  }, [items]);

  // ✅ Notify parent when selection changes
  useEffect(() => {
    const selectedData = items.filter((item) => selectedItems.includes(item.id));
    onSelectionChange && onSelectionChange(selectedData);
  }, [selectedItems]); // keep minimal dependency

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 w-full">
      {items.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        return (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-lg ${
              isSelected ? "bg-blue-50" : "bg-gray-50"
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleCheckboxChange(item.id)}
              className="w-4 h-4"
            />

            {/* Product Image */}
            <div className="w-20 h-20 relative rounded overflow-hidden">
              <Image
                src={`${URL_IMAGE}${item.product.thumbnail}`}
                alt={item.product.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {item.product.name}
              </h4>

              <div className="text-xs text-gray-500 flex">
                {item.variant?.color && (
                  <span className="mr-2 flex items-center gap-1">
                    Color:
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: item.variant?.color }}
                      title={item.variant?.color}
                    ></span>
                  </span>
                )}
                {item.variant?.size && (
                  <span>
                    Size: <span className="font-medium">{item.variant?.size}</span>
                  </span>
                )}
              </div>

              {/* Quantity + Price */}
              <div className="mt-2 flex items-center gap-4">
                <QuantitySelector
                  initialQuantity={item.quantity}
                  stock={item.variant?.quantity}
                  onChange={(newQty) => onQuantityChange(item.id, newQty)}
                />
                <div className="text-sm font-semibold text-gray-800">
                  ৳{(item.unit_price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-600 p-2"
            title="Remove item"
          >
            <FaTrash />
          </button>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutCart;
