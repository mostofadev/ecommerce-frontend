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
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Method Selection */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

          {/* COD Option */}
          <div className="border rounded-lg p-4 mb-6">
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

          {/* Mobile Wallet Options */}
          <div className="border-t pt-4 mb-4">
            <p className="mb-2 text-sm text-gray-700 font-medium">Mobile Wallet</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['sslcommerz'].map((method) => (
                <label key={method} className={`border rounded-lg px-4 py-3 flex items-center justify-center text-sm font-medium transition cursor-pointer ${selected === method ? 'border-indigo-500 bg-indigo-50' : 'hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={selected === method}
                    onChange={() => handleSelect(method)}
                    className="accent-indigo-600 mr-2"
                  />
                  {method.toUpperCase()}
                </label>
              ))}
            </div>
          </div>

          <FormButton
            type="submit"
            loading={loading}
            IsValid={true}
            onClick={handleCheckout}
            ClassName="w-full mt-6"
          >
            {loading ? 'Processing...' : 'Order Confirm'}
          </FormButton>
        </div>

        {/* Summary */}
        <CheckoutSummary
          subTotal={order?.subtotal}
          onlineFee={order?.shipping_cost}
          discount={order?.discount_amount}
          total={order?.total}
          payable={order?.total}
          loading={orderLoading}
        />
      </div>
    </div>
  );
}
