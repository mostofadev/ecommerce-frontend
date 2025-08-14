"use client";

import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function HookSelectInput({
  label,
  name,
  options = [],
  error = "",
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const showLabelAsFloating = focused || (rest.value && rest.value !== "");

  return (
    <div className="relative w-full">
      <select
        id={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full rounded-xl px-4 pt-5 pb-2 text-sm border
          ${error ? "border-red-500" : "border-gray-300"}
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-all bg-white text-gray-800 shadow-sm focus:shadow-md
          appearance-none pr-10
        `}
        {...rest}
      >
        <option value="">-- Select --</option>
        {options.map(({ label: optLabel, value }) => (
          <option key={value} value={value}>
            {optLabel}
          </option>
        ))}
      </select>

      {label && (
        <label
          htmlFor={name}
          className={`absolute left-4 px-1 text-sm transition-all bg-white
            ${
              showLabelAsFloating
                ? "-top-2 text-xs text-indigo-600"
                : "top-4 text-gray-500"
            }
            pointer-events-none
          `}
        >
          {label}
        </label>
      )}

      <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-500">
        <ExpandMoreIcon fontSize="small" />
      </div>

      {error && <p className="text-xs text-red-500 mt-1 pl-1">{error}</p>}
    </div>
  );
}
