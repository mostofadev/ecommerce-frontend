"use client"
import UpdateCategory from '@/app/components/admin/category/CategoryUpdate'
import Layout from '@/app/components/admin/layout/layout'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
    const params = useParams()
    const {id} = params
    
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h2>hello</h2>
          <UpdateCategory id= {id} />
        </div>
      </div>
    </Layout>
  )
}

export default page