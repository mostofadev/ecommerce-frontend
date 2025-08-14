import AppImage from '@/app/components/ui/Image/AppImage';
import Link from 'next/link';
import React from 'react';

export default function OrderHistoryItem({ product }) {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
  if (!product) return null;
  return (
    <Link
      href={`/product/${product.product?.slug}`}
      className=" p-4"
    >
      <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 h-full">
        {/* Product Image */}
        <div className="w-full h-40 rounded-t-xl overflow-hidden relative">
          <AppImage
            src={`${URL_IMAGE}${product.product?.thumbnail}`}
            alt={product.product?.name}
            width={300}
            height={300}
            ImageClass="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            rounded="none"
          />
        </div>

        {/* Product Info */}
        <div className="p-3 flex flex-col justify-between flex-1">
          <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {product.product?.name}
          </h4>

          <div className="mt-2">
            <span className="text-lg font-bold text-gray-900">
              ৳ {product?.unit_price}
            </span>

            {product.product?.discount_value > 0 && (
              <span className="ml-2 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                {product.product?.discount_value}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
