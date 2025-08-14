import { useHomeProductContext } from "@/app/context/HomePageContext";
import ProductCard from "./productCard";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader/pageSpinner";
import MarginSection from "../../Layout/MarginSection";
import ProductGridSkeleton from "../../Skeleton/Home/ProductGridSkeleton";



export default function NewProduct() {
  const { 
        newProduct,
        loading,
        error,
        pagination,
        ProductNewHandle
     } = useHomeProductContext()
     
  const [currentPage, setCurrentPage] = useState(1);
      useEffect(()=> {
          ProductNewHandle(currentPage)
      },[currentPage])

      const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  }
  if (loading) return <ProductGridSkeleton />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <MarginSection>
      <h2 className="text-xl sm:text-2xl font-bold  text-gray-800 mb-6 text-left">
          New Product
        </h2>

     
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {newProduct.map((item, index) => (
            <ProductCard key={index} product={item}/>
          ))}
        </div>
        
      
      
           {/* <div className="py-4 px-4 flex justify-center lg:justify-end lg:px-72">
            {pagination && 
            <PagePagination pagination={pagination} onPageChange={handlePageChange} />
            }
           </div> */}
    </MarginSection>
  );
}
