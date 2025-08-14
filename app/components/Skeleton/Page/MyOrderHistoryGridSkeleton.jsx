'use client';

import Skeleton from '../Skeleton';
import OrderHistorySkeleton from './OrderHistorySkeleton';

export default function MyOrderHistoryGridSkeleton() {
  return (
    <section className="w-full bg-white animate-pulse">
     
        {/* Header + Filter */}
        <div className="lg:m-6 m-2 flex lg:justify-between lg:flex-row flex-col border-b border-gray-200 pb-6">
          <Skeleton className="h-6 w-60 mb-4 lg:mb-0 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-40 rounded" />
            <Skeleton className="h-10 w-24 rounded" />
          </div>
        </div>

        {/* Orders Skeleton */}
        <div className="lg:m-6 m-2 border-b border-gray-200 pb-6">
          <OrderHistorySkeleton />
        </div>
    </section>
  );
}
