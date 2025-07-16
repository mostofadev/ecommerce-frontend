"use client";
import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function ProductImageGallery({ product, selectedImage, setSelectedImage }) {
  return (
    <div className="sticky top-3 self-start">
      <div className="relative h-72 sm:h-64 md:h-80 w-full rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
        <Image
          src={product.images[selectedImage]}
          alt="Main product image"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-[2px] rounded-full">
          {product.discount}% OFF
        </div>
      </div>

      <div className="flex gap-1.5 mt-2">
        {product.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-10 w-10 rounded-md overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-blue-500 scale-105"
                : "border-gray-200 hover:border-blue-300"
            }`}
            aria-label={`Thumbnail ${index + 1}`}
          >
            <Image src={img} alt={`Thumb ${index + 1}`} fill className="object-cover" sizes="40px" />
          </button>
        ))}
      </div>

      <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg mt-3 text-[11px]">
        <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-gray-700">
            <span className="font-medium">Free Shipping</span> on orders over $50.
            <br />
            Easy <span className="font-medium">30-day returns</span>. Secure checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
