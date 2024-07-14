import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { createHashRouter, RouterProvider } from "react-router-dom"; 
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
import Category from './components/Category.jsx';
import UserProvider from './components/Context/UserProvider'; // Import UserProvider
import UpdateBlog from './pages/UpdateBlog.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';

const router = createHashRouter([ 
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/blogs",
        element: <Blog />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/services",
        element: <Services />
      },
      {
        path: "/login",
        element: <LogIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/post/:postId",
        element: <PostPage />
      },
      {
        path: "/categories/:categoryId",
        element: <Category />
      },
    ]
  },
  {
    path: "/user",
    element:<PrivateRoute/> ,
    children: [
      {
        path: "/user/dashboard",
        element: <DashBoard />
      },
      {
        path: "/user/update-blog/:blogId",
        element: <UpdateBlog/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
