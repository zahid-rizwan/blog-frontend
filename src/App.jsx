
import { Outlet } from 'react-router-dom'
import './App.css'
// import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css'

import { FooterWithLogo } from './components/FooterWithLogo'
// import { NewNavbar } from './components/NewNavbar'
import Navbar from './components/Navbar'



function App() {

  return (
    <>
    {/* <NewNavbar/> */}
    <Navbar/>
    <Outlet/>
    <FooterWithLogo/>
</>
  )
}

export default App
