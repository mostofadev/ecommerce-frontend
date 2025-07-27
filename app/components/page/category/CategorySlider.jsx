"use client";

import { useHomeProductContext } from "@/app/context/HomePageContext";
import { useEffect, useRef } from "react";
import AppImage from "../../ui/Image/AppImage";
import Link from "next/link";

export default function CategorySlider() {
  const scrollContainer = useRef(null);
  const { category, fetchCategoryHandle } = useHomeProductContext();
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  useEffect(() => {
    fetchCategoryHandle();
  }, []);

  return (
    <section className="w-full px-4 py-3 bg-white">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Scrollable Category Container */}
        <div
          ref={scrollContainer}
          className="flex space-x-3 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-2"
        >
          {category.map((item) => (
            <Link key={item.id} href={`/product/category/${item.slug}`}>
              <div className="flex-shrink-0 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] rounded-lg bg-gray-50 border border-gray-200 p-2 cursor-pointer hover:bg-indigo-50 hover:border-indigo-100 transition-all duration-200 flex items-center">
                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center overflow-hidden mr-3">
                  <AppImage
                    src={`${URL_IMAGE}${item.image}`}
                    alt={item.name}
                    width={40}
                    height={40}
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
      </div>
    </section>
  );
}
