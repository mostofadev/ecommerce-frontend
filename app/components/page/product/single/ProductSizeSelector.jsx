"use client";
export default function ProductSizeSelector({ sizes, selectedSize, setSelectedSize }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <h3 className="text-[11px] font-semibold text-gray-700">Size</h3>
        <button className="text-[9px] text-blue-600 hover:underline">Size Guide</button>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`py-1 border rounded text-[11px] font-medium transition-all ${
              selectedSize === size
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
