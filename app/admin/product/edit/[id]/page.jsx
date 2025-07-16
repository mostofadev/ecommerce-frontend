"use client"
import Layout from '@/app/components/admin/layout/layout'
import ProductUpdateForm from '@/app/components/admin/product/ProductUpdateForm'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
    const params = useParams()
        const {id} = params
  return (
    <Layout>
        <ProductUpdateForm productId={id} />
    </Layout>
  )
}

export default page