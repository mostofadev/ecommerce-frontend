import React from "react";

function MarginSection({ children }) {
  return (
    <div
      className="mx-auto px-2 py-4"
      style={{ maxWidth: "100rem" }} 
    >
      {children}
    </div>
  );
}

export default MarginSection;
