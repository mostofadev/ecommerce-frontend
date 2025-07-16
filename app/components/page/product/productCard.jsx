import { useState } from 'react';
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
const ProductCard = ({product}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

 const { handleAddToCart } = useCart();
 const {WishlistAdd} = useWishlist()
 const handleWishlist =  () => {
  console.log(product.id);
      WishlistAdd(product.id)
      setIsFavorite(!isFavorite);
  };
  return (
    <motion.div
  className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all w-[280px] border border-gray-100"
  whileHover={{ y: -6, scale: 1.01 }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
      {/* Image section with light gray background */}
      <div className="relative  w-full h-[180px] overflow-hidden bg-gray-50 flex items-center justify-center rounded-t-2xl">
        <motion.img
          src={`${URL_IMAGE}/${product.thumbnail}`}
          alt={product.title}
          className="max-h-full w-auto object-contain transition-transform duration-300"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
        />

        {/* Overlay */}
        {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Link href={`/product/${product.slug}`}>
                <motion.button
                  className="bg-white text-gray-900 text-xs px-3 py-1 rounded-full shadow flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiEye size={12} />
                  View
                </motion.button>
              </Link>
            </motion.div>
          )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discount_value > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                {product.discount_value}%
              </span>
            )}
          {product.new_product === 1 && (
            <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
              NEW
            </span>
          )}
        </div>

        {/* Favorite */}
        <motion.button
          className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full backdrop-blur shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
        >
          <FiHeart
            size={14}
            className={isFavorite ? 'text-rose-500 fill-rose-500' : 'text-gray-600'}
          />
        </motion.button>
      </div>

      {/* Info section */}
      <div className="p-3">
        <div className="text-xs text-gray-500 mb-1">{product.brand?.name}</div>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
           <p>{product.sku}</p>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-base font-semibold text-gray-900">${product.final_price}</p>
            {product.price && (
              <p className="text-xs text-gray-400 line-through">${product.price}</p>
            )}
          </div>

          <motion.button
            className="p-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddToCart({
              product,
              variant: null, // Only if product has no variant
              quantity: 1
            })}
          >
            <FiShoppingBag size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
