import React from 'react'
import Navbar from '../components/Navbar'
import { AddPost } from '../components/AddPost'

const DashBoard = () => {
  return (
    <>
    <Navbar/>
    <div className='mt-20 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'><AddPost/></div>
    </>
  )
}

export default DashBoard