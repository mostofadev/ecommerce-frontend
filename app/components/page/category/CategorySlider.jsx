"use client";

import { useHomeProductContext } from "@/app/context/HomePageContext";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AppImage from "../../ui/Image/AppImage";
import Link from "next/link";

// const categories = [
//   { id: 1, name: "Electronics", image: "/image/category/c1.jpg" },
//   { id: 2, name: "Fashion", image: "/image/category/c2.jpg" },
//   { id: 3, name: "Groceries", image: "/image/category/c3.jpg" },
//   { id: 4, name: "Toys", image: "/image/category/c4.jpg" },
//   { id: 5, name: "Home", image: "/image/category/c5.jpg" },
//   { id: 6, name: "Beauty", image: "/image/category/c6.jpg" },
//   { id: 7, name: "Sports", image: "/image/category/c7.jpg" },
//   { id: 8, name: "Books", image: "/image/category/c8.jpg" },
// ];

export default function CategorySlider() {
  const scrollContainer = useRef(null);
  const {category,fetchCategoryHandle,loading} = useHomeProductContext()
  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };
const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  useEffect(()=> {
    fetchCategoryHandle()
  },[])
  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full px-4 py-3 bg-white">
      
      
      <div className="relative w-[100vw] max-w-[1200px]  mx-auto">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-6 h-6 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div 
          ref={scrollContainer}
          className="flex space-x-3 overflow-x-auto scrollbar-hide py-1 px-2"
        >
          {category.map((item) => (
            <Link key={item.id} href={`/product/category/${item.slug}`}>
            <div
              key={item.id}
              className="flex-shrink-0 w-40 rounded-lg bg-gray-50 border border-gray-200 p-2 cursor-pointer hover:bg-indigo-50 hover:border-indigo-100 transition-all duration-200 flex items-center"
            >
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center overflow-hidden mr-2">
                <AppImage
                  src={`${URL_IMAGE}/${item.image}`}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {item.name}
              </span>
            </div>
            </Link>
          ))}
        </div>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-6 h-6 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}