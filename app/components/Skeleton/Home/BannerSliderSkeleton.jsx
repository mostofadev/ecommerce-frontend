
import MarginSection from "../../Layout/MarginSection";
import Skeleton from "../Skeleton";

export default function BannerSliderSkeleton() {
  return (
    <MarginSection>
      <div className="relative overflow-hidden rounded-xl shadow-md">
        <Skeleton className="h-52 md:h-120 w-full rounded-xl" />

        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 space-y-2 w-1/2">
          <Skeleton className="h-6 md:h-10 w-3/4 rounded" />
          <Skeleton className="h-4 md:h-6 w-2/3 rounded" />
          <Skeleton className="h-8 md:h-10 w-32 rounded-full" />
        </div>

        
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-3 h-3 rounded-full" />
          ))}
        </div>
      </div>
    </MarginSection>
  );
}
