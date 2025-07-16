"use client";
import React from "react";

export default function UserInput({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  showPasswordToggle,
  onToggleShowPassword,
  errorMessage,
  showPasswordIcon: ShowIcon,
  ...rest // Important: register() থেকে আসা props (ref, onChange, onBlur, name, etc.)
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon className="text-lg" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full pl-${Icon ? "10" : "4"} pr-${showPasswordToggle ? "10" : "4"} py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all`}
          autoComplete="off"
          {...rest} // This line ensures form works with react-hook-form
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onToggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {ShowIcon ? <ShowIcon className="h-5 w-5" /> : null}
          </button>
        )}
      </div>
      {errorMessage && <p className="mt-1 text-sm text-red-600 ">{errorMessage}</p>}
    </div>
  );
}
