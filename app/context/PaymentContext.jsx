'use client';

import React, { createContext, useContext, useState } from 'react';
import { CodRedirect, initiatePayment } from '../services/PaymentServices';
import { useRouter } from 'next/navigation';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async (orderNumber, paymentMethod) => {
    setLoading(true);

    const response = await initiatePayment({
      order_number: orderNumber,
      payment_method: paymentMethod,
    });
    setLoading(false);
    if (response?.status === 'success') {
  const redirectUrl = response?.redirect_url;

  if (typeof redirectUrl === 'string') {
    if (redirectUrl.startsWith('/')) {
      router.push(redirectUrl);
    } else {
      window.location.href = redirectUrl;
    }
  } else {
    alert('Payment completed but no redirect URL found.');
  }
} else {
  alert(response?.message || 'Payment failed');
}
  };

  return (
    <PaymentContext.Provider value={{ handlePayment, loading }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);