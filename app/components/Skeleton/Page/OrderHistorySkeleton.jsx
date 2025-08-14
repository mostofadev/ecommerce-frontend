'use client';

import ProductCardSkeleton from '../Home/ProductCardSkeleton';
import Skeleton from '../Skeleton';

export default function OrderHistorySkeleton() {
  return (
    <div className="space-y-12">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pb-8 last:border-none last:pb-0"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <Skeleton className="h-6 w-48 rounded" />
            <div className="flex gap-3 mt-2 lg:mt-0">
              <Skeleton className="h-6 w-24 rounded" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-6 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton  key={i} className="h-40 w-full rounded"/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
