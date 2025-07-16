"use client"
import CheckoutPage from '@/app/components/page/checkout/CheckoutPage'
import ProtectedRouteUser from '@/app/components/route/ProtectedRouteUser'
import LayoutPage from '@/app/components/ui/layout/layout'
import UserLayout from '@/app/components/ui/layout/UserLayout'
import React from 'react'

function page() {
  return (
    <ProtectedRouteUser>
        <LayoutPage>
           <CheckoutPage />
        </LayoutPage>
    </ProtectedRouteUser>
  )
}

export default page