"use client";
export default function ProductColorSelector({ colors, selectedColor, setSelectedColor }) {
  return (
    <div className="space-y-1">
      <h3 className="text-[11px] font-semibold text-gray-700">
        Color: <span className="font-normal">{selectedColor.name}</span>
      </h3>
      <div className="flex gap-1.5">
        {colors.map((color) => (
          <button
            key={color.code}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select color ${color.name}`}
            className={`relative w-7 h-7 rounded-full cursor-pointer transition-all hover:scale-110 ${
              selectedColor.code === color.code ? "ring-2 ring-offset-1 ring-blue-500" : ""
            }`}
            style={{
              backgroundColor: color.code,
              border: color.border ? `1px solid ${color.border}` : "none"
            }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}
