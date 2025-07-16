import NoProtectedRouteUser from '@/app/components/route/NoProtectedRouteUser'
import LayoutPage from '@/app/components/ui/layout/layout'
import React from 'react'

function page() {
  return (
     <LayoutPage>
        <NoProtectedRouteUser>
          <p>Register</p>
        </NoProtectedRouteUser>
      </LayoutPage>
  )
}

export default page