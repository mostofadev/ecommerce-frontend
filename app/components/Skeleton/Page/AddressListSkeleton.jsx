"use client";

import Skeleton from "../Skeleton";

export default function AddressListSkeleton() {
  return (
    <div className="w-full mx-auto p-4 space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-full border-b border-gray-100 pb-4 flex flex-col gap-6 mt-4"
        >
          {/* Top row: icon + name/email + edit/delete */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-40 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-64 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-6 h-6 rounded" />
              <Skeleton className="w-6 h-6 rounded" />
              
            </div>
          </div>

          {/* Address line */}
          {/* <div className="ml-11 space-y-1 gep-2">
            
          </div> */}
        </div>
      ))}
    </div>
  );
}
