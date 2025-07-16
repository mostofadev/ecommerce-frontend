"use client";
import { Button } from "@/app/components/admin/order/Button";
import QuantitySelector from "@/app/components/page/product/single/ProductQuantitySelector";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function Checkout({ cartItems, onDelete, onCheckout }) {
  const userId = 1;
  const onlineFee = 59;

  const [checkedItems, setCheckedItems] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (cartItems) {
      const initChecked = {};
      const initQuantities = {};
      cartItems.forEach((item) => {
        initChecked[item.id] = true;
        initQuantities[item.id] = item.quantity;
      });
      setCheckedItems(initChecked);
      setQuantities(initQuantities);
    }
  }, [cartItems]);

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (checkedItems[item.id]) {
        return total + item.product.Price * quantities[item.id];
      }
      return total;
    }, 0);
  };

  const getTotal = () => getSubtotal() + onlineFee;

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const changeQuantity = (id, value) => {
    const val = Math.max(1, Number(value));
    setQuantities((prev) => ({ ...prev, [id]: val }));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      onDelete(id);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const selected = cartItems
      .filter((item) => checkedItems[item.id])
      .map((item) => ({
        detail_id: item.id,
        order_id: item.order_id || null,
        product_id: item.product.id,
        user_id: userId,
        quantity: quantities[item.id],
        price: item.product.Price,
      }));

    if (selected.length === 0) {
      alert("Please select at least one product to checkout.");
      return;
    }

    onCheckout(selected, getTotal().toFixed(2));
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto p-10 text-center">
        <img
          src="/assets/images/empty.webp"
          alt="Empty Cart"
          className="mx-auto max-w-xs"
        />
        <h3 className="mt-3 text-gray-500 text-xl font-semibold">Your cart is empty</h3>
        <p className="text-gray-400 mb-5">Looks like you haven’t added anything yet.</p>
        <a
          href="/shop"
          className="inline-block bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          🛍️ Continue Shopping
        </a>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <form onSubmit={handleCheckout} className="container  mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-20">
      {/* Left: Cart Items */}
      <div className="w-full lg:w-8/12 bg-white   space-y-4 ">
        {/* <h2 className="text-left text-xl font-bold text-gray-600">Shopping Cart</h2> */}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-100  px-4 py-3 "
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={checkedItems[item.id] || false}
                onChange={() => toggleCheck(item.id)}
                className="h-3 w-3 accent-blue-800"
              />

              <Image
                width={60}
                height={60}
                src={item.product.Photo}
                alt={item.product.Product_Code}
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-gray-700">{item.product.Product_Code}</p>
              <p className="text-gray-600 text-sm">BDT {item.product.Price}</p>
            </div>

            <QuantitySelector
              stock={item.product.Stock}
              initialQuantity={quantities[item.id]}
              onChange={(val) => changeQuantity(item.id, val)}
            />

            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800 text-xl"
              aria-label="Delete item"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>

      {/* Right: Order Summary */}
      <div className="w-full lg:w-3/12 ">
 
        <div className="mb-4 space-y-3 text-sm bg-white shadow-lg border border-gray-100 h-[290px] p-6 rounded-md">
        <h3 className="text-md font-bold text-gray-500 mb-4">Order Summary</h3>

          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">{subtotal.toFixed(2)} TK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Online Fee</span>
            <span className="text-gray-800">{onlineFee.toFixed(2)} TK</span>
          </div>
          <div className="flex justify-between pt-2 ">
            <span className="text-gray-800 font-medium">Total</span>
            <span className="text-gray-800 font-medium">BDT {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-green-700 pt-2">
            <span className="text-sm">Payable Total</span>
            <span className="text-sm">{total.toFixed(2)} TK</span>
          </div>

          <Button className="mt-5 w-full">Checkout</Button>
        </div>
      

        <div className="mt-4 space-y-3 text-sm bg-white shadow-lg border border-gray-100 h-[290px] p-6 rounded-md">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">{subtotal.toFixed(2)} TK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Online Fee</span>
            <span className="text-gray-800">{onlineFee.toFixed(2)} TK</span>
          </div>
          <div className="flex justify-between pt-2 ">
            <span className="text-gray-800 font-medium">Total</span>
            <span className="text-gray-800 font-medium">BDT {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-green-700 pt-2">
            <span className="text-sm">Payable Total</span>
            <span className="text-sm">{total.toFixed(2)} TK</span>
          </div>

          <Button className="mt-5 w-full">Checkout</Button>
        </div>
     
      </div>

      
    </form>
  );
}
