"use client";

import { useHomeProductContext } from "@/app/context/HomePageContext";
import { useEffect, useRef, useState } from "react";
import AppImage from "../../ui/Image/AppImage";
import Link from "next/link";
import MarginSection from "../../Layout/MarginSection";
import CategorySliderSkeleton from "../../Skeleton/Home/CatSliderSkeleton";
import BannerSliderSkeleton from "../../Skeleton/Home/BannerSliderSkeleton";

export default function CategorySlider() {
  const scrollContainer = useRef(null);
  const {loading, category, fetchCategoryHandle } = useHomeProductContext();
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
  useEffect(() => {
    fetchCategoryHandle();
  }, []);
 
  if(loading) return <CategorySliderSkeleton />

  return (
    <section className="w-full bg-white">
      <MarginSection>
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
      </MarginSection>
    </section>
  );
}
