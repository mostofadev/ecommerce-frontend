"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaInfoCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import { useHomeProductContext } from "@/app/context/HomePageContext";
import { useCart } from "@/app/context/CartContext";
import QuantitySelector from "./single/ProductQuantitySelector";
import ProductTabs from "./single/ProductDetails";
import parse from "html-react-parser";
import AddToCart from "../../ui/button/AddToCart";
import { useWishlist } from "@/app/context/WishlistContext";
import { notFound, useRouter } from "next/navigation";
import NotFound from "@/app/not-found";
import SingleProductPageSkeleton from "../../Skeleton/Page/SingleProductPageSkeleton";
const fallback = "/image/fallback.png";

const ProductPage = ({ slug }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const { loading:AddToLoading,handleAddToCart } = useCart();
  const { singleProduct,loading, error, getSingleProduct } = useHomeProductContext();
  const router = useRouter();
  const { WishlistAdd } = useWishlist();

  useEffect(() => {
    getSingleProduct(slug);
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedVariant(null);
    setQuantity(1);
  }, [slug]);
  useEffect(() => {
    if (selectedColor && selectedSize && singleProduct?.variants) {
      const match = singleProduct.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      setSelectedVariant(match || null);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedColor, selectedSize, singleProduct]);

  const handleWishlist =  () => {
    const token = localStorage.getItem('user_token'); 
    if (!token) {
      router.push('/login');
      return;
    }
       WishlistAdd(singleProduct.id)
       setWishlisted(!wishlisted);
   };
  if (loading) return <SingleProductPageSkeleton />;
   if (!singleProduct) {
   return NotFound(); 
  }
  
  const images = singleProduct.images || [];
  const variants = singleProduct.variants || [];
  const thumbnail = singleProduct.thumbnail;
  const mainImage = images[selectedImageIndex]?.image_path || thumbnail;

  const hasVariants = variants?.length > 0;

  const colors = [...new Map(variants.map((v) => [v.color, { code: v.color }])).values()];

  const availableSizes = selectedColor
    ? variants.filter((v) => v.color === selectedColor).map((v) => v.size)
    : [];

  const uniqueSizes = [...new Set(availableSizes)];

  const addToCartHandler = () => {
    handleAddToCart({
      product: singleProduct,
      variant: hasVariants ? selectedVariant : null,
      quantity,
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 border border-gray-200 rounded-xl overflow-hidden w-[330px] h-[300px] lg:w-full sm:h-full md:w-full ">
            <Image
              src={`${URL_IMAGE}${mainImage}`}
              alt="Main Product"
              fill
              className="object-contain w-full h-full"
             // sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
            />
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-10  gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-14 h-14 border-2 rounded-md overflow-hidden  lg:my-0 my-2 ${
                  selectedImageIndex === idx ? "border-blue-500" : "border-gray-300"
                }`}
                type="button"
              >
                <Image
                  src={`${URL_IMAGE}${img.image_path}`}
                  alt={`Thumb ${idx}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                  unoptimized
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2 text-sm bg-blue-50 p-3 rounded-lg">
            <FaInfoCircle className="text-blue-600 mt-1" />
            <p>
              Free shipping on orders over ৳50.
              <br /> Easy 30-day returns.
            </p>
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-4 my-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">{singleProduct.name}</h1>
              <p className="text-md text-gray-500">by {singleProduct.brand?.name}</p>
              <p className="text-sm text-gray-500">SKU: {singleProduct.sku}</p>
            </div>

            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              type="button"
            >
              {wishlisted ? (
                <FaHeart className="text-red-500" size={24} />
              ) : (
                <FaRegHeart className="text-gray-400 hover:text-red-400" size={24} />
              )}
            </button>
          </div>

          <div className="text-lg text-gray-800">
            <span className="text-2xl font-bold text-gray-900">
              ৳{singleProduct.final_price || singleProduct.price}
            </span>
            {singleProduct.final_price && (
              <span className="line-through text-gray-400 ml-3 text-base">
                ৳{singleProduct.price}
              </span>
            )}
          </div>

          {/* Color & Size Selector (if variants exist) */}
          {hasVariants && (
            <div className="flex gap-4">
              {/* Color */}
              <div>
                <h3 className="text-xs font-semibold mb-1">Color</h3>
                <div className="flex gap-2">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(color.code);
                        setSelectedSize(null);
                      }}
                      className={`w-7 h-7 rounded-full border ${
                        selectedColor === color.code ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{ backgroundColor: color.code }}
                      type="button"
                      aria-label={`Select color ${color.code}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-xs font-semibold mb-1">Size</h3>
                <div className="flex gap-2">
                  {uniqueSizes?.length > 0 ? (
                    uniqueSizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded text-xs ${
                          selectedSize === size ? "bg-gray-800 text-white" : "hover:bg-gray-100"
                        }`}
                        type="button"
                        aria-label={`Select size ${size}`}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Select a color first</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stock */}
          <p className="text-sm text-gray-500">
            Stock:{" "}
            {hasVariants
              ? selectedVariant?.quantity ?? "Select a variant"
              : singleProduct.quantity}
          </p>

          {/* Quantity Selector */}
          <QuantitySelector
            stock={
              hasVariants
                ? selectedVariant?.quantity ?? 0
                : singleProduct.quantity
            }
            onChange={(q) => setQuantity(q)}
          />

          {/* Add to Cart and Buy Now buttons */}
          <div className="flex gap-2 mt-3">
            <AddToCart
              product={singleProduct}
              selectedVariant={selectedVariant}
              hasVariants={hasVariants}
              quantity={quantity}
              onAddToCart={addToCartHandler}
              loading={AddToLoading}
            />
            
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6 my-12 lg:my-32">
        <ProductTabs
          details={singleProduct.summary || []}
          shipping={singleProduct.shipping || "Free shipping on orders over ৳50."}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          summary={parse(singleProduct.summary || "")}
          
        />
      </div>

      {/* Related Products */}
      {/* <div className="container mx-auto px-4 py-6">
        <RelatedProducts />
      </div> */}
    </>
  );
};

export default ProductPage;
