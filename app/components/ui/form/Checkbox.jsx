// components/form/Checkbox.jsx
import React from "react";

export default function Checkbox({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  error = "",
  className = "",
  ...rest 
}) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${className}`}>
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
        className={`h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500
          ${error ? "border-red-500" : ""}
        `}
      />
      <label
        htmlFor={name}
        className={`text-sm text-gray-700 cursor-pointer select-none
          ${disabled ? "cursor-not-allowed text-gray-400" : ""}
        `}
      >
        {label}
      </label>

      {error && (
        <p className="text-xs text-red-500 mt-1 ml-7">{error}</p>
      )}
    </div>
  );
}
