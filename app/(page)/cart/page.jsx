"use client";

import LayoutPage from "@/app/components/ui/layout/layout";
import React from "react";
import CartList from "@/app/components/page/cart/cartList";

function Page() {
  const dummyCartItems = [
    {
      id: 1,
      product_id: 101,
      product: {
        id: 101,
        price: 550,
        name: "Blue T-Shirt",
        thumbnail: "/image/p.avif",
      },
      variant: {
        color: "Blue",
        size: "M",
      },
      quantity: 2,
      unit_price: 550,
    },
    {
      id: 2,
      product_id: 102,
      product: {
        id: 102,
        price: 1200,
        name: "Black Hoodie",
        thumbnail: "/image/p2.avif",
      },
      quantity: 1,
      unit_price: 1200,
    },
    {
      id: 3,
      product_id: 103,
      product: {
        id: 103,
        price: 299,
        name: "Red Cap",
        thumbnail: "/image/p.avif",
      },
      quantity: 3,
      unit_price: 299,
    },
  ];

  const handleDelete = (id) => {
    console.log("Deleted item with ID:", id);
  };

  const handleQtyChange = (id, qty) => {
    console.log("Updated item ID:", id, "to quantity:", qty);
  };

  return (
    <LayoutPage>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Cart Preview (Dummy)</h1>
        <CartList
          items={dummyCartItems}
          onRemove={handleDelete}
          onQuantityChange={handleQtyChange}
        />
      </div>
    </LayoutPage>
  );
}

export default Page;
