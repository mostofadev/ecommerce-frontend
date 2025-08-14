import MarginSection from "../../Layout/MarginSection";
import Skeleton from "../Skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton() {
  return (
    <section className="bg-white py-3">
      <MarginSection>
        {/* Title placeholder */}
        <Skeleton className="h-8 w-40 mb-6 rounded" />

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </MarginSection>
    </section>
  );
}
