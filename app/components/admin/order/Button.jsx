import React from "react";
import clsx from "clsx";

export function Button({ variant = "default", className, children, ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
