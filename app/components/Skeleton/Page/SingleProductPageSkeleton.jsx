"use client";

import Skeleton from "../Skeleton";

export default function SingleProductPageSkeleton() {
  return (
    <>
      <div className="container mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        {/* Left: Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <Skeleton className="w-full h-80 rounded-xl" />

          {/* Thumbnails */}
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="w-14 h-14 rounded-md" />
            ))}
          </div>

          {/* Info box */}
          <div className="flex gap-2 text-sm bg-gray-50 p-3 rounded-lg">
            <Skeleton className="w-6 h-6 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-3/4 h-3" />
              <Skeleton className="w-1/2 h-3" />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-4">
          {/* Title & Wishlist */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="w-80 h-6" />
              <Skeleton className="w-50 h-4" />
              <Skeleton className="w-50 h-3" />
            </div>
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-20 h-4" />
          </div>

          <div className="flex gap-4">
            {/* Color Selector */}
            <div>
              <Skeleton className="w-20 h-4 mb-2" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="w-7 h-7 rounded-full" />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <Skeleton className="w-16 h-4 mb-2" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="w-7 h-7 rounded" />
                ))}
              </div>
            </div>
          </div>

          {/* Stock */}
          <Skeleton className="w-32 h-3" />

          {/* Quantity Selector */}
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-12 h-8 rounded" />
            <Skeleton className="w-8 h-8 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <Skeleton className="w-32 h-10 rounded" />
            <Skeleton className="w-32 h-10 rounded" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 ">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="w-24 h-8" />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-4" />
          ))}
        </div>
      </div>
    </>
  );
}
