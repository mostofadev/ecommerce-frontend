'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CheckoutSummary from './CheckoutSummer';
import FormButton from '../../ui/button/FormBtn';
import { useOrder } from '@/app/context/OrderContext';
import { usePayment } from '@/app/context/PaymentContext';

export default function PaymentPage() {
  const [selected, setSelected] = useState('cod');
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const { order, loading: orderLoading, FetchSingleOrder } = useOrder();
  const { handlePayment, loading } = usePayment();

  const handleSelect = (id) => setSelected(id);

  const handleCheckout = () => {
    handlePayment(orderId, selected);
  };

  useEffect(() => {
    if (orderId) FetchSingleOrder(orderId);
  }, [orderId]);

  return (
<div className="min-h-screen bg-gray-100 py-8">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-6 lg:grid-flow-col-dense">

    {/* Summary First */}
    <div className="order-1 lg:order-none">
      <CheckoutSummary
        subTotal={order?.subtotal}
        onlineFee={order?.shipping_cost}
        discount={order?.discount_amount}
        total={order?.total}
        payable={order?.total}
        loading={orderLoading}
      />
    </div>

    {/* Payment Method Second */}
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow order-2 lg:order-none">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment Method</h2>

      {/* COD Option */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6 hover:border-indigo-500 transition">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="radio"
            name="payment"
            checked={selected === 'cod'}
            onChange={() => handleSelect('cod')}
            className="mt-1 accent-indigo-600"
          />
          <div>
            <p className="font-medium text-gray-700">Cash on Delivery</p>
            <p className="text-sm text-gray-500">Pay after receiving the product</p>
          </div>
        </label>
      </div>

      {/* More payment methods notice */}
      <div className="border border-dashed border-gray-300 rounded-xl p-5 text-center text-gray-400 mb-6">
        <p>More payment methods coming soon...</p>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-400">or</span>
        </div>
      </div>

      {/* Confirm Order Button */}
      <FormButton
        type="submit"
        loading={loading}
        IsValid={true}
        onClick={handleCheckout}
        ClassName="w-full"
      >
        {loading ? 'Processing...' : 'Order Confirm'}
      </FormButton>

      {/* Reassurance Info */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm text-gray-700">
  <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
    <span className="text-lg mr-2">🔒</span>
    <span className="font-medium">Secure Payment</span>
  </div>
  <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
    <span className="text-lg mr-2">🚚</span>
    <span className="font-medium">Fast Delivery</span>
  </div>
  <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
    <span className="text-lg mr-2">📞</span>
    <span className="font-medium">24/7 Support</span>
  </div>
</div>
    </div>

  </div>
</div>

  );
}
