'use client';
import { createContext, useContext, useState } from 'react';
import { checkPromoCode } from '@/app/services/PromoCodeService';

const PromoCodeContext = createContext();

export const PromoCodeProvider = ({ children }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [error, setError] = useState('');

  const applyPromoCode = async (code) => {
    try {
      const res = await checkPromoCode(code);
      if (res.success) {
        setPromoCode(code);
        setDiscountPercent(res.discount);
        setError('');
        return true;
      }
    } catch (err) {
      setPromoCode('');
      setDiscountPercent(0);
      setError(err.response?.data?.message || 'Invalid promo code');
    }
    return false;
  };

  return (
    <PromoCodeContext.Provider
      value={{ promoCode, discountPercent, error, applyPromoCode }}
    >
      {children}
    </PromoCodeContext.Provider>
  );
};

export const usePromoCode = () => useContext(PromoCodeContext);
