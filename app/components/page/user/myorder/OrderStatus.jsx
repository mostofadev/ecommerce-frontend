import React from 'react';

const statusMap = {
  pending: {
    text: 'Pending',
    className: 'text-yellow-300 border-yellow-300 ',
  },
  confirmed: {
    text: 'Confirmed',
    className: 'text-indigo-300 border-indigo-300 ',
  },
  processing: {
    text: 'Processing',
    className: 'text-blue-300 border-blue-300 ',
  },
  shipped: {
    text: 'Shipped',
    className: 'text-orange-300 border-orange-300 ',
  },
  delivered: {
    text: 'Delivered',
    className: 'text-green-600 border-green-600  ',
  },
  cancelled: {
    text: 'Cancelled',
    className: 'text-red-300 border-red-300  ',
  },
  returned: {
    text: 'Returned',
    className: 'text-pink-300 border-pink-300   ',
  },
  refunded: {
    text: 'Refunded',
    className: 'text-gray-300 border-gray-300  ',
  },
};


export default function OrderStatus({ status = 'pending' }) {
  const statusInfo = statusMap[status] || {
    text: 'Unknown',
    className: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  return (
    <span
      className={`text-sm px-4 py-2 rounded-sm border ${statusInfo.className}`}
    >
      {statusInfo.text}
    </span>
  );
}
