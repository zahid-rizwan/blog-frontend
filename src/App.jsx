
import { Outlet } from 'react-router-dom'
import './App.css'
// import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css'

import { FooterWithLogo } from './components/FooterWithLogo'
// import { NewNavbar } from './components/NewNavbar'
import Navbar from './components/Navbar'



function App() {
  // style={{backgroundColor:"#e9ebee"}}
  return (
    <div className='flex flex-col justify-between  min-h-[100vh]' >
    {/* <NewNavbar/> */}
    <Navbar/>
    <Outlet/>
    <FooterWithLogo/>
</div>
  )
}

export default App
