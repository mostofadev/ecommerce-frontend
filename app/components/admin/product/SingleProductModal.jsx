// components/SingleProductModal.jsx
"use client";
import React from "react";
import { X } from "react-icons/fa6";
import AppImage from "../../ui/Image/AppImage";

export default function SingleProductModal({ product, onClose }) {
  if (!product) return null;

  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* Top Section */}
        <div className="flex gap-6">
          {/* Left image */}
          <div className="w-1/3">
            <AppImage
              src={`${URL_IMAGE}${product.thumbnail}`}
              alt={product.name}
              className="w-full h-auto object-contain rounded border"
            />
          </div>

          {/* Right Info */}
          <div className="w-2/3 space-y-2">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.sku}</p>
            <div className="text-lg font-bold text-green-700">
              ৳{product.final_price}
              {product.original_price && (
                <span className="text-sm line-through ml-2 text-gray-400">
                  ৳{product.original_price}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-700">
              Quantity: {product.quantity}
            </div>
            <div className="text-sm">
              Category: {product.category?.name} / {product.subcategory?.name}
            </div>
            <div className="text-sm">Brand: {product.brand?.name}</div>

            <div className="flex gap-4 mt-2">
              {product.new_product ? (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                  New
                </span>
              ) : null}
              {product.best_seller ? (
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded">
                  Best Seller
                </span>
              ) : null}
              <span className="text-xs px-2 py-1 bg-gray-200 rounded capitalize">
                {product.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="font-semibold">Description</h3>
          <p className="text-sm text-gray-700">{product.description}</p>
        </div>

        {/* Summary */}
        <div className="mt-4">
          <h3 className="font-semibold">Summary</h3>
          <div
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.summary }}
          />
        </div>

        {/* Variants */}
        {product.variants?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Variants</h3>
            <ul className="text-sm">
              {product.variants.map((variant, index) => (
                <li key={index}>
                  Color:{" "}
                  <span style={{ color: variant.color }}>{variant.color}</span>,
                   Size: {variant.size},  Qty: {variant.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SEO */}
        <div className="mt-4">
          <h3 className="font-semibold">SEO Info</h3>
          <p className="text-sm"> Title: {product.meta_title}</p>
          <p className="text-sm"> Description: {product.meta_description}</p>
          <p className="text-sm"> Keywords: {product.meta_keyword}</p>
        </div>
      </div>
    </div>
  );
}
