"use client";

import { useCart } from "@/app/context/CartContext";
import CheckoutCart from "./checkoutList";
import { useEffect, useState } from "react";
import { usePromoCode } from "@/app/context/PromoCodeContext";
import ShippingAddressWithModal from "./ShippingAddressWithModal";
import { useAddress } from "@/app/context/AddressContext";
import { useOrder } from "@/app/context/OrderContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormButton from "../../ui/button/FormBtn";

export default function CheckoutPage() {
  const { items, handleRemoveFromCart, handleUpdateQuantity } = useCart();
  const { promoCode, discountPercent, error, applyPromoCode } = usePromoCode();
  const { addresses, loadAddresses } = useAddress();
  const { loading, handleOrderSubmit, setOrderInfo } = useOrder();
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputCode, setInputCode] = useState("");
  const [shippingCost, setShippingCost] = useState(60);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [selectedBillingId, setSelectedBillingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleApplyPromo = async () => {
    await applyPromoCode(inputCode);
  };
  const handleSelectionChange = (items) => {
    setSelectedItems(items);
  };

  const subTotal = selectedItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  const discountAmount = (subTotal * discountPercent) / 100;
  const total = subTotal - discountAmount + shippingCost;

  const handleCheckout = async () => {
    if (!selectedShippingId) {
      toast.error("Please select a shipping address.");
      return;
    }

    const orderData = {
      subtotal: subTotal,
      discount_amount: discountAmount,
      shipping_cost: shippingCost,
      total: total,
      payment_method: "cod",
      customer_note: "Deliver between 10AM-1PM",
      shipping_id: selectedShippingId,
      billing_id: selectedBillingId,
      coupon_id: promoCode?.id || null,
      items: selectedItems.map((item) => ({
        cart_id: item.id,
        product_id: item.product.id,
        product_name: item.product.name,
        sku: item.product.sku,
        unit_price: item.unit_price,
        quantity: item.quantity,
        variant: item.variant,
      })),
    };
    const res = await handleOrderSubmit(orderData);
    if (res?.data) {
      const fullOrder = { ...orderData, order_id: res.data };
      localStorage.setItem("latest_order", JSON.stringify(fullOrder));
      setOrderInfo(fullOrder);
      router.push(`/payment?order_id=${res.data}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto my-12 p-4">
      <div className="flex-1">
        <CheckoutCart
          items={items}
          onRemove={handleRemoveFromCart}
          onQuantityChange={handleUpdateQuantity}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <div className="w-full md:w-[350px] space-y-6">
        <ShippingAddressWithModal
          addresses={addresses}
          onShippingSelect={setSelectedShippingId}
          onBillingSelect={setSelectedBillingId}
        />

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-2">Promo Code</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              disabled={discountPercent > 0}
              className={`flex-1 border rounded px-2 py-1 text-sm ${
                discountPercent > 0
                  ? "bg-gray-100 cursor-not-allowed"
                  : "border-gray-300"
              }`}
            />
            <button
              onClick={handleApplyPromo}
              disabled={discountPercent > 0}
              className={`px-3 py-1 rounded text-sm text-white ${
                discountPercent > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Apply
            </button>
          </div>
          {discountPercent > 0 && (
            <p className="text-green-600 text-sm mt-2">
              {discountPercent}% discount applied!
            </p>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="bg-white shadow rounded-lg p-4 space-y-2">
          <h2 className="font-semibold text-lg">Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>৳{subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount:</span>
            <span>-৳{discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span>৳{shippingCost.toFixed(2)}</span>
          </div>
          <hr className="border-t-2 border-gray-300 my-3" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total:</span>
            <span>৳{total.toFixed(2)}</span>
          </div>

          <FormButton
            type="submit"
            loading={loading}
            IsValid={true}
            onClick={handleCheckout}
          >
            {loading ? "" : "Proceed to Checkout"}
          </FormButton>
        </div>
      </div>
    </div>
  );
}
