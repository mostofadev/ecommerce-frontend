"use client";
import { cn } from "../../../lib/utils";

export default function pagePagination({ pagination, onPageChange }) {
  const { current_page, last_page } = pagination;

  // তৈরি করব ডায়নামিক পেজ নাম্বার লিস্ট
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(current_page - 2, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, last_page);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(current_page - 1)}
        disabled={current_page === 1}
        className={cn(
          "px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100",
          current_page === 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100",
            page === current_page && "bg-gray-900 text-white border-gray-900"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(current_page + 1)}
        disabled={current_page === last_page}
        className={cn(
          "px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100",
          current_page === last_page && "opacity-50 cursor-not-allowed"
        )}
      >
        Next
      </button>
    </div>
  );
}
