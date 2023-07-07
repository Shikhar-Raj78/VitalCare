import React from 'react'
import Footer from '../Footer/Footer'
import { Navbar } from '../Navbar/Navbar'

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <div style={{minHeight: "80vh"}} className='--pad'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
