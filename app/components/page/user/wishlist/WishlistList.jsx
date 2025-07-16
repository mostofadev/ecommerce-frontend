"use client";

import Loader from "@/app/components/ui/loader/pageSpinner";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import AddToCart from "@/app/components/ui/button/AddToCart";
import PagePagination from "@/app/components/ui/pagination/pagePagination";
import TableActions from "@/app/components/ui/table/TableActions";

const WishlistPage = () => {
  const { wishlist, pagination, loading, error, WishlistIndex, WishlistRemove } = useWishlist();
  const { handleAddToCart } = useCart();
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    WishlistIndex(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  const handleAdd = async ({ product, variant, quantity, wishlistId }) => {
    setLoadingId(wishlistId); // start loading for this item only
    try {
      await handleAddToCart({ product, variant, quantity });
      // Optionally remove from wishlist after add
      // await WishlistRemove(wishlistId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 flex items-center gap-3">
        <FiHeart className="text-rose-500" size={30} />
        Your Wishlist
      </h1>

      {wishlist?.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">Your wishlist is empty.</div>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 p-5 border-b border-gray-100 hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="relative w-20 h-20 overflow-hidden hover:scale-105 transition">
                <motion.img
                  src={`${URL_IMAGE}/${item.product.thumbnail}`}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="max-h-full w-auto object-contain transition-transform duration-300"
                  initial={{ scale: 1 }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 w-full">
                <h2 className="text-md font-semibold text-gray-900">{item.product.name}</h2>
                <div className="mt-2 flex items-center gap-3">
                  {item.product.price && (
                    <span className="text-lg font-bold text-gray-800">
                      ৳ {item.product.final_price ? item.product.final_price : item.product.price}
                    </span>
                  )}

                  {item.product.final_price && (
                    <span className="line-through text-gray-400 text-sm">
                      ৳ {item.product.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <AddToCart
                  product={item.product}
                  selectedVariant={null}
                  hasVariants={false}
                  quantity={1}
                  loading={loadingId === item.id}
                  onAddToCart={() =>
                    handleAdd({
                      product: item.product,
                      variant: null,
                      quantity: 1,
                      wishlistId: item.id,
                    })
                  }
                />
                <TableActions onDelete={() => WishlistRemove(item.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="py-4 px-4 flex justify-center lg:justify-end lg:px-44">
        {pagination.last_page > 1 && (
          <PagePagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
