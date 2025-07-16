import React from "react";
import clsx from "clsx";

export function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white shadow-lg rounded-lg border border-gray-200",
        "transition-shadow hover:shadow-xl",
        "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={clsx("mb-4 border-b border-gray-100", className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return (
    <h3
      className={clsx(
        "text-xl font-semibold text-gray-900",
        "tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className }) {
  return <div className={clsx("text-gray-700", className)}>{children}</div>;
}
