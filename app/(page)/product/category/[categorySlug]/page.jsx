"use client"
import CategoryProduct from '@/app/components/page/product/CategoryProduct'
import SingleProduct from '@/app/components/page/product/SingleProduct'
import LayoutPage from '@/app/components/ui/layout/layout'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
   const params = useParams()
      const {categorySlug} = params
      console.log(categorySlug);
      
  return (
    <LayoutPage>
        <CategoryProduct slug={categorySlug} />
    </LayoutPage>
  )
}

export default page