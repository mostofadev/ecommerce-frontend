"use client";

import { useEffect, useState } from "react";
import { useHomeProductContext } from "@/app/context/HomePageContext";
import ProductCard from "./productCard";
import Loader from "../../ui/loader/pageSpinner";
import PagePagination from "../../ui/pagination/pagePagination";

export default function CategoryProduct({ slug }) {
  console.log(slug);
  
  const {
    loading,
    error,
    CategoryProduct,
    catPagination,
    fetchCategoryProductHandle,
  } = useHomeProductContext();
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (slug) {
      fetchCategoryProductHandle(slug, currentPage);
    }
  }, [slug, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= catPagination.cat_last_page) {
      setCurrentPage(page);
    }
  };
function formatSlug(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <section className="bg-white py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold px-4 sm:px-8 lg:px-72 text-gray-800 mb-6 text-left">
         Category: {formatSlug(slug)}
      </h2>

      <div className="px-4 flex justify-center lg:px-16 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {CategoryProduct.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      <div className="py-4 px-4 flex justify-center lg:justify-end lg:px-72">
        {catPagination.cat_last_page > 1 && (
          <PagePagination
            pagination={{
              current_page: catPagination.cat_current_page,
              last_page: catPagination.cat_last_page,
              total: catPagination.cat_total,
              per_page: catPagination.cat_per_page,
            }}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
