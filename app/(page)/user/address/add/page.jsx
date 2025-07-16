import AddressAdd from '@/app/components/page/user/address/AddressAdd'
import UserLayout from '@/app/components/ui/layout/UserLayout'
import React from 'react'

function page() {
  return (
    <UserLayout>
        <>
        <div className="border-b border-gray-100 flex  justify-between items-center">
            <h2 className="p-3 text-xl font-bold">Your Information</h2>
            
        </div>
        </>
        <div className="my-2">
            <AddressAdd />
        </div>
        
    </UserLayout>
  )
}

export default page