"use client";

import Skeleton from "../Skeleton";

export default function WishlistSkeleton() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-2">
      {/* Title skeleton */}
      <div className="flex items-center gap-3 mb-10">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-40 rounded" />
      </div>

      {/* Wishlist item skeletons */}
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center gap-6 p-5 border-b border-gray-100"
          >
            {/* Image placeholder */}
            <Skeleton className="w-20 h-20 rounded-md" />

            {/* Product info */}
            <div className="flex-1 w-full space-y-2">
              <Skeleton className="h-4 w-48 rounded" />
              <div className="flex gap-3">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
