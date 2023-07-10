import React from 'react'
import Footer from '../footer/Footer'
import { Navbar } from '../navbar/Navbar'
import { NavBefLogIn } from '../navbar/NavBefLogIn'
import { ShowOnLogin, ShowOnLogout } from '../protect/HiddenLink'

const Layout = ({children}) => {
  return (
    <>
      <ShowOnLogin>
        <Navbar />
      </ShowOnLogin>
      <ShowOnLogout>
        <NavBefLogIn />
      </ShowOnLogout>
      <div style={{minHeight: "80vh"}} className='--pad'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
