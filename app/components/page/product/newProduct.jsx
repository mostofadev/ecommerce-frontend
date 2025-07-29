import { useHomeProductContext } from "@/app/context/HomePageContext";
import ProductCard from "./productCard";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader/pageSpinner";



export default function NewProduct() {
  const { 
        newProduct,
        loading,
        error,
        pagination,
        ProductNewHandle
     } = useHomeProductContext()
  const [currentPage, setCurrentPage] = useState(1);
    console.log("Pagination:", pagination);
      useEffect(()=> {
          ProductNewHandle(currentPage)
      },[currentPage])

      console.log(newProduct);
      const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  }
  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <section className=" bg-white py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold px-4 sm:px-8 lg:px-72 text-gray-800 mb-6 text-center">
          New Product
        </h2>

      <div className="px-4 flex justify-center lg:px-16 mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {newProduct.map((item, index) => (
            <ProductCard key={index} product={item}/>
          ))}
        </div>
        
      </div>
      
           {/* <div className="py-4 px-4 flex justify-center lg:justify-end lg:px-72">
            {pagination && 
            <PagePagination pagination={pagination} onPageChange={handlePageChange} />
            }
           </div> */}
    </section>
  );
}
