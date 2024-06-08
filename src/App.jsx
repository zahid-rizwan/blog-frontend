
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css'



function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App
