import WishlistPage from '@/app/components/page/user/wishlist/WishlistList'
import UserLayout from '@/app/components/ui/layout/UserLayout'
import React from 'react'

function page() {
  return (
    <UserLayout>
        <WishlistPage />
    </UserLayout>
  )
}

export default page