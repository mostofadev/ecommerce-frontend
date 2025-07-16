'use client';

import { FaBox, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineLocalShipping } from 'react-icons/md';
import clsx from 'clsx';

const steps = [
  { title: 'Pending', icon: FaBox, key: 'pending' },
  { title: 'Confirmed', icon: FaSpinner, key: 'confirmed' },
  { title: 'Processing', icon: FaSpinner, key: 'processing' },
  { title: 'Shipped', icon: MdOutlineLocalShipping, key: 'shipped' },
  { title: 'Delivered', icon: FaCheckCircle, key: 'delivered' },
];

export default function OrderTrackingProgress({ order }) {
  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
        <p className="text-red-600 font-semibold text-lg">Order data not found!</p>
      </div>
    );
  }

  // Calculate last completed step index based on trackingHistory keys presence
  const currentStepIndex = steps.reduce((lastIndex, step, idx) => {
    return order.trackingHistory?.[step.key] ? idx : lastIndex;
  }, -1);

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-md border border-blue-100 p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Order Tracking</h1>
          <p className="text-sm text-blue-400 mt-1">Stay updated with your order journey</p>
        </div>

        {/* Order Info */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 bg-blue-50 border border-blue-100 px-8 py-6 rounded-xl text-sm text-gray-700 mb-16">
          <div>
            <p className="font-semibold text-gray-600">Order No:</p>
            <p className="text-blue-600 font-mono select-text">{order.orderNumber}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Estimated Delivery:</p>
            <p className="text-blue-600">{order.estimatedDelivery || 'Not set'}</p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full px-4">
          {/* Background Line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-blue-100 rounded-full z-0" />

          {/* Steps */}
          <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isDone = index <= currentStepIndex;
              const history = order.trackingHistory?.[step.key];

              return (
                <div key={step.key} className="flex flex-col items-center text-center w-full max-w-[140px]">
                  <div
                    className={clsx(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 shadow-sm transition-colors',
                      isDone
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-blue-200 text-blue-300'
                    )}
                  >
                    <Icon className="text-xl" />
                  </div>
                  <p
                    className={clsx(
                      'mt-3 text-xs font-semibold transition-colors',
                      isDone ? 'text-gray-800' : 'text-blue-300'
                    )}
                  >
                    {step.title}
                  </p>
                  {history?.date && (
                    <p className="mt-1 text-[10px] text-blue-400">{history.date}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
