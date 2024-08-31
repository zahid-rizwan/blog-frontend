import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaFacebook, FaXTwitter, FaXmark } from "react-icons/fa6";
import { doLogout, getCurrentUser, isLoggedIn } from "../auth";
import userContext from "./Context/userContext";
import { Avatar } from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

const Navbar = () => {
  const userContextData = useContext(userContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let navigate = useNavigate();
  const navItems = [
    { path: "/", link: "Home" },
    { path: "/about", link: "About" },
    { path: "/blogs", link: "Blog" },
    { path: "/contact", link: "Contact" },
  ];
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  }, [login]);
  const logout = () => {
    doLogout(() => {
      setLogin(false);
      userContextData.setUser({
        data: {},
        login: false,
      });
      navigate("/");
    });
  };
  return (
    <header className="bg-black z-10 text-white fixed top-0 left-0 right-0">
      <nav className="px-6 py-4 max-7xl mx-auto flex sm:justify-between justify-end items-center">
        <a href="/" className="text-xl font-bold text-white">
          Blog <span className="text-blue-500">ZD</span>
        </a>

        <ul className="md:flex  gap-12 text-lg hidden">
          {navItems.map(({ path, link }) => (
            <li className="text-white" key={path}>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                to={path}
              >
                {link}{" "}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 ">
          <div className="text-white sm:flex items-center ">
            {login && (
              <>
                <Menu placement="bottom-end">
                  <MenuHandler>
                    <Avatar
                      src="https://docs.material-tailwind.com/img/face-2.jpg"
                      alt="avatar"
                      variant="rounded"
                      withBorder={true}
                      color="green"
                      className="p-0.5 cursor-pointer"
                    />
                    {/* <CgProfile /> */}
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>

                    <NavLink to={"/"}>
                      <MenuItem onClick={logout}>Log out</MenuItem>
                    </NavLink>
                  </MenuList>
                </Menu>{" "}
              </>
            )}
            {!login && (
              <div className="hidden md:flex">
                <NavLink className="px-2" to={"/signup"}>
                  <button className="bg-blue-500 px-6 py-2 font-medium rounded hover:bg-green-600 transition-all duration-200 ease-in">
                    Sign up
                  </button>
                </NavLink>

                <NavLink to={"/login"}>
                  <button className="bg-blue-500 px-6 py-2 font-medium rounded hover:bg-green-600 transition-all duration-200 ease-in">
                    Log in
                  </button>
                </NavLink>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="cursor-pointer">
              {isMenuOpen ? (
                <FaXmark className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
      <div>
        <ul
          className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${
            isMenuOpen
              ? "fixed top-0 left-0 w-full transition-all ease-out  duration-150"
              : "hidden"
          } `}
        >
          {navItems.map(({ path, link }) => (
            <li className="text-black" key={path}>
              <NavLink onClick={toggleMenu} to={path}>
                {link}
              </NavLink>
            </li>
          ))}
          <li>
      
            {!login && (
              <>
                <NavLink to={"/signup"}>
                  <button className="bg-blue-500 mx-1 px-6 py-2 font-medium rounded hover:bg-green-600 transition-all duration-200 ease-in">
                    Sign up
                  </button>
                </NavLink>

                <NavLink to={"/login"}>
                  <button className="bg-blue-500 px-6 py-2 font-medium rounded hover:bg-green-600 transition-all duration-200 ease-in">
                    Log in
                  </button>
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
