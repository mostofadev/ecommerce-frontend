import Skeleton from "../Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="relative bg-white rounded-md overflow-hidden shadow-sm border border-gray-100">
      {/* Image placeholder */}
      <Skeleton className="h-[180px] w-full rounded-t-md" />

      {/* Content */}
      <div className="p-2">
        {/* Title placeholder */}
        <Skeleton className="h-4 w-3/4 mb-2 rounded" />

        {/* Price section */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-3 w-12 rounded" />
        </div>
      </div>
    </div>
  );
}
