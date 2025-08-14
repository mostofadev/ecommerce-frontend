import Skeleton from "../Skeleton";
import MarginSection from "../../Layout/MarginSection";

export default function CategorySliderSkeleton() {
  return (
    <section className="w-full bg-white">
      <MarginSection>
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] rounded-lg bg-gray-50 border border-gray-200 p-2 flex items-center"
            >
              <Skeleton className="w-10 h-10 rounded-md mr-3" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          ))}
        </div>
      </MarginSection>
    </section>
  );
}
