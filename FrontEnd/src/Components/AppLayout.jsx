import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const AppLayout = () => {
  return (
    <>
    <Header/>
<div className='d-flex'>
<Sidebar/>
<div className='w-100'>
<Outlet />
</div>

</div>
    </>
  )
}

export default AppLayout