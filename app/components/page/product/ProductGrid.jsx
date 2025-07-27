import { useHomeProductContext } from "@/app/context/HomePageContext";
import ProductCard from "./productCard";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader/pageSpinner";
import PagePagination from "../../ui/pagination/pagePagination";

export default function HomePage() {
  const {
    HomeProducts,
    loading,
    error,
    pagination,
    getAllHomeProducts,
  } = useHomeProductContext();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllHomeProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <section className="bg-white py-3 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold px-4 sm:px-8 lg:px-72 text-gray-800 mb-6 lg:text-left text-center">
        All Product
      </h2>

      <div className="px-2 flex justify-center lg:px-16 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 gap-2">
          {HomeProducts.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      </div>

      {pagination?.last_page >= 2 && (
        <div className="py-4 px-4 flex justify-center lg:justify-end lg:px-72">
          <PagePagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      )}
    </section>
  );
}
