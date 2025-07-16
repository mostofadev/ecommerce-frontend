import NoProtectedRouteUser from '@/app/components/route/NoProtectedRouteUser'
import LayoutPage from '@/app/components/ui/layout/layout'
import LoginForm from '@/app/components/user/Auth/LoginForm'
import React from 'react'

function page() {
  return (
    <div>
      <LayoutPage>
        <NoProtectedRouteUser>
          <LoginForm />
        </NoProtectedRouteUser>
      </LayoutPage>
    </div>
  )
}

export default page