import { useHomeProductContext } from "@/app/context/HomePageContext";
import ProductCard from "./productCard";
import { useEffect, useState } from "react";
import MarginSection from "../../Layout/MarginSection";
import ProductGridSkeleton from "../../Skeleton/Home/ProductGridSkeleton";

export default function BestSeller() {
  const { bestProduct, loading, error, ProductBestHandle } =
    useHomeProductContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    ProductBestHandle(currentPage);
  }, [currentPage]);

  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return loading ? (
    <ProductGridSkeleton />
  ) : (
    <section className="bg-white py-12">
      <MarginSection>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-left">
          Best Seller
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {bestProduct.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      </MarginSection>
    </section>
  );
}
