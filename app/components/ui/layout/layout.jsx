import React from 'react'
import MenuLayout from './menu'
import Footer from '../../page/footer/footer'

function LayoutPage({children}) {
  return (
    <>
    <MenuLayout />
      {children}
    <Footer />
    </>
  )
}

export default LayoutPage