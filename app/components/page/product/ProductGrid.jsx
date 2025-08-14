import { useHomeProductContext } from "@/app/context/HomePageContext";
import ProductCard from "./productCard";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader/pageSpinner";
import PagePagination from "../../ui/pagination/pagePagination";
import MarginSection from "../../Layout/MarginSection";
import ProductCardSkeleton from "../../Skeleton/Home/ProductCardSkeleton";
import ProductGridSkeleton from "../../Skeleton/Home/ProductGridSkeleton";

export default function HomePage() {
  const { HomeProducts,loading, error, pagination, getAllHomeProducts } =
    useHomeProductContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllHomeProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  if (loading) return <ProductGridSkeleton />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <section className="bg-white py-3 ">
      <MarginSection>
        <h2 className={`${loading ? 'hidden' : 'block'} text-xl sm:text-2xl font-bold  text-gray-800 mb-6 text-left `}>
          All Product
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {HomeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {pagination?.last_page >= 2 && (
          <div className="py-4  flex justify-center lg:justify-end ">
            <PagePagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </MarginSection>
    </section>
  );
}
