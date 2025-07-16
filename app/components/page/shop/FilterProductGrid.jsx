// "use client";

// import React from "react";
// import ProductCard from "../product/ProductCard"; // তোমার product card component এর সঠিক path বসাও

// export default function FilterProductGrid({ products = [] }) {
//   if (!Array.isArray(products)) {
//     return <p className="text-center py-10">কোনো প্রোডাক্ট পাওয়া যায়নি।</p>;
//   }

//   if (products.length === 0) {
//     return <p className="text-center py-10">কোনো প্রোডাক্ট পাওয়া যায়নি।</p>;
//   }

//   return (
//     <section className="min-h-screen bg-white py-2 px-2 sm:px-8 lg:px-4">
//       <div className="flex justify-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl w-full">
//           {products.map((product) => (
//             <ProductCard key={product.id || product._id} product={product} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import React from 'react'

function FilterProductGrid() {
  return (
    <div>FilterProductGrid</div>
  )
}

export default FilterProductGrid