"use client";

import { useSettingPageContext } from "@/app/context/SettingPageContext";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const arrowIcons = [
  {
    direction: "left",
    action: "prev",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    ),
  },
  {
    direction: "right",
    action: "next",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
        <path d="M9 6l6 6-6 6" />
      </svg>
    ),
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const { banners , loading, error, fetchBannerHandle } = useSettingPageContext();
  const length = banners?.length;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    fetchBannerHandle(); // fetch only once
  }, []);
console.log(banners);

  useEffect(() => {
    if (length === 0) return; // if banners not loaded yet, skip

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => resetTimeout();
  }, [current, length]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
if (!banners || banners.length === 0) return null;
  if (loading) return <div className="text-center py-10">Loading banners...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
 
  return (
    <div className="w-[95vw] max-w-[1500px] mx-auto p-4">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full h-52 md:h-120 relative">
              <Image
                src={`${URL_IMAGE}/${banner.image}`}
                alt={banner.title}
                fill 
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 90vw, 1200px"
                priority={true}
                unoptimized
                onError={() => setImgSrc(fallback)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
              <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 text-white">
                <h2 className="text-2xl md:text-4xl font-bold drop-shadow">{banner.title}</h2>
                <p className="text-sm md:text-lg mb-3">{banner.subtitle}</p>
                <button className="bg-white text-black font-semibold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow hover:bg-gray-200 transition">
                  {banner.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        {arrowIcons.map(({ direction, action, icon }) => (
          <button
            key={direction}
            onClick={() => (action === "next" ? nextSlide() : prevSlide())}
            aria-label={`${action} slide`}
            className={`z-[0] absolute top-1/2 transform -translate-y-1/2 z-30 bg-white/10 text-white border border-white/30 backdrop-blur-lg hover:bg-white/20 transition-all duration-300
              ${direction === "left" ? "left-4" : "right-4"} 
              p-3 md:p-4 rounded-full shadow-md hover:shadow-indigo-500/40 ring-1 ring-white/30 hover:ring-4 hover:ring-indigo-400/50`}
          >
            {icon}
          </button>
        ))}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
