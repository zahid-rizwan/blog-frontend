import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"; // Import HashRouter instead of BrowserRouter
import Home from "./pages/Home.jsx";
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import { ToastContainer } from 'react-toastify';
import DashBoard from './pages/DashBoard.jsx';
import PostPage from './components/PostPage.jsx';

const router = createHashRouter([ // Use createHashRouter instead of createBrowserRouter
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/blogs",
        element:<Blog/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/services",
        element:<Services/>
      },
      {
        path:"/login",
        element:<LogIn/>
      },
      {
        path:"/signup",
        element:<SignUp/>
      },
      {
        path:"/post/:postId",
        element:<PostPage/>
      },
      
      
    ]
  },
  {
    path:"/user",
    element:<DashBoard/>,
    children:[
      {
        path:"/user/dashboard",
        element:<DashBoard/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer/>
    <RouterProvider router={router} />
  </React.StrictMode>
);
