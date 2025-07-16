"use client"
import SingleProduct from '@/app/components/page/product/SingleProduct'
import LayoutPage from '@/app/components/ui/layout/layout'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
   const params = useParams()
      const {slug} = params
  return (
    <LayoutPage>
        <SingleProduct slug={slug} />
    </LayoutPage>
  )
}

export default page