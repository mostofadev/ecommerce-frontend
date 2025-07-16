import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './scrollbar.css';

const BrandMenu = () => {
  const scrollRef = useRef(null);

  const brands = [
    "Apple", "Samsung", "Xiaomi", "Sony", "Huawei",
    "Dell", "HP", "Lenovo", "Asus", "LG",
    "Nokia", "Oppo", "Vivo", "OnePlus", "Microsoft"
  ];

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative z-10 bg-white/30 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 relative group">
        {/* Left fade and button */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none z-10" />
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-100 text-gray-700 shadow-lg rounded-full p-1 group-hover:flex transition-all duration-300"
        >
          <ChevronLeft fontSize="small" />
        </button>

        {/* Scrollable Brand Menu */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
        >
          {brands.map((brand, index) => (
            <a
              key={index}
              href="#"
              className="flex-shrink-0 px-5 py-2 text-sm font-semibold text-gray-700 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {brand}
            </a>
          ))}
        </div>

        {/* Right fade and button */}
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white/80 via-white/40 to-transparent pointer-events-none z-10" />
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-100 text-gray-700 shadow-lg rounded-full p-1 group-hover:flex transition-all duration-300"
        >
          <ChevronRight fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default BrandMenu;
