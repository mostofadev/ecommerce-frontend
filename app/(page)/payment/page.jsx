'use client';

import React, { useState } from 'react';
import PaymentMethodSelector from '@/app/components/page/checkout/PaymentSystem';
import CheckoutSummary from '@/app/components/page/checkout/CheckoutSummer';
import LayoutPage from '@/app/components/ui/layout/layout';
import ProtectedRouteUser from '@/app/components/route/ProtectedRouteUser';

export default function Page() {
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <div>
       <ProtectedRouteUser>
        <LayoutPage>
           <PaymentMethodSelector/>
        </LayoutPage>
    </ProtectedRouteUser>
      
      
    </div>
  );
}
