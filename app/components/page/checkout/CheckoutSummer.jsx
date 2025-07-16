'use client';

import FormButton from '../../ui/button/FormBtn';

export default function SummaryBox({
  subTotal = 0,
  onlineFee = 0,
  discount = 0,
  total = 0,
  payable = 0,
  loading = false,
  handleCheckout = () => {},
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto w-full">
      <h2 className="font-semibold text-xl text-gray-800 mb-6">Order Summary</h2>

      <div className="flex justify-between text-gray-600 text-sm mb-3">
        <span>Subtotal:</span>
        <span>৳{subTotal}</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm mb-3">
        <span>Online Fee:</span>
        <span>৳{onlineFee}</span>
      </div>
      {discount > 0 &&
        <div className="flex justify-between text-gray-600 text-sm mb-3">
        <span>Discount :</span>
        <span>৳{discount}</span>
      </div>
      }
     

      <div className="flex justify-between text-gray-600 text-sm mb-3">
        <span>Total:</span>
        <span>৳{total}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg text-gray-900 mb-6">
        <span>Payable:</span>
        <span>৳{payable}</span>
      </div>

  
    </div>
  );
}
