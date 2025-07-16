import UserProfile from '@/app/components/page/user/UserProfile'
import UserLayout from '@/app/components/ui/layout/UserLayout'
import React from 'react'

function page() {
  return (
    <UserLayout>
      <UserProfile/>
    </UserLayout>
  )
}

export default page