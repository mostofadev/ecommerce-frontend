"use client";

import React from "react";
import parse from "html-react-parser";

export default function ProductTabs({ summary, shipping, activeTab, setActiveTab }) {
  return (
    <div className="pt-3 mt-3 border-t border-gray-200 text-xs">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-3 py-1 font-medium ${
            activeTab === "details"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`px-3 py-1 font-medium ${
            activeTab === "shipping"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Shipping & Returns
        </button>
      </div>

      {/* Content */}
      <div className="py-3">
       {activeTab === "details" && (
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Product Details</h4>
            <div className="text-gray-700 text-[11px] leading-relaxed">
              {summary}
            </div>
          </div>
        )}
        {activeTab === "shipping" && (
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Shipping Information</h4>
            <p className="text-gray-700 text-[11px]">{shipping}</p>
            <h4 className="font-medium text-gray-900 mt-2 mb-1">Returns Policy</h4>
            <p className="text-gray-700 text-[11px]">
              Easy 30-day return policy. Items must be unused with tags attached.
              Original shipping fees are non-refundable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
