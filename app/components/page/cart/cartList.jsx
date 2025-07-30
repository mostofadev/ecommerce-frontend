"use client";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import CartQuantitySelector from "../product/single/CartQuantitySelector";
import { useCart } from "@/app/context/CartContext";

const CartList = () => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const { items, handleRemoveFromCart} =
    useCart();

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 rounded-lg bg-gray-50"
        >
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
                  Size:{" "}
                  <span className="font-medium">{item.variant?.size}</span>
                </span>
              )}
            </div>

            {/* Quantity + Price */}
            <div className="mt-2 flex items-center gap-4">
              <CartQuantitySelector itemId={item.id} />
              <div className="text-sm font-semibold text-gray-800">
                ৳{(item.unit_price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => handleRemoveFromCart(item.id)}
            className="text-red-500 hover:text-red-600 p-2"
            title="Remove item"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartList;
