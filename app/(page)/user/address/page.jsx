import AddressList from '@/app/components/page/user/address/AddressList'
import LinkButton from '@/app/components/ui/button/LinkButton'
import UserLayout from '@/app/components/ui/layout/UserLayout'
import React from 'react'
import { FiPlus } from "react-icons/fi";
function page() {
  return (
    <UserLayout>
        <>
        <div className="border-b border-gray-100 flex  justify-between items-center">
            <h2 className="p-3 text-xl font-bold">Default Address</h2>
            <div className="">
                <LinkButton RightIcon={<FiPlus className="w-4 h-4" />} href="/user/address/add">
                    Add New Address
                </LinkButton>
            </div>
        </div>
        </>
        <div className="my-2">
            <AddressList />
        </div>
    </UserLayout>
  )
}

export default page