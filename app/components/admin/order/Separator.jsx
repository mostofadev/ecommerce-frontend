import React from "react";
import clsx from "clsx";

export function Separator({ className }) {
  return (
    <hr
      className={clsx(
        "border-t border-gray-200",
        className
      )}
    />
  );
}
