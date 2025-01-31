import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logout from "../../store/action/user";
import stables from "./../../constants/stables";

const Navbar = () => {
  const navlinks = [
    { link: "/", name: "Home" },
    { link: "/about", name: "About" },
    { link: "/services", name: "Services" },
    { link: "/contact", name: "Contact" },
  ];

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const [onScroll, setOnScroll] = useState(false);
  const [openMenu, setOpenMenu] = useState(false); // Set to false initially to start with menu closed
  const [isMenuOpen, setIsMenuOpen] = useState(false); // menu to toggle when we click on profile icon

  const toggleSmallMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  // const changeBackground = () => {
  //   if (window.scrollY >= 80) {
  //     setOnScroll(true);
  //   } else {
  //     setOnScroll(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", changeBackground);
  //   return () => window.removeEventListener("scroll", changeBackground);
  // }, []);

  const toggleMenu = () => {
    setOpenMenu((prevState) => !prevState); // Correctly toggles openMenu without argument
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out bg-white shadow-md`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center  ">
        {/* LOGO */}
        <div className={`text-2xl font-bold cursor-pointer`}>
          <Link to="/">
            <img src="/logo.png" alt="logo" className="w-16 h-16" />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-x-5 text-lg">
          {navlinks.map((nav) => (
            <li key={nav.link}>
              <Link
                to={nav.link}
                className={`${
                  isActive(nav.link) ? "text-orange-400 font-semibold" : ""
                }`}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU */}
        <ul
          className={`md:hidden flex-col gap-y-6 absolute top-0 left-0 w-full h-screen bg-white p-10 mt-16 transition-transform duration-300 ease-in-out ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          } text-black`}
        >
          {navlinks.map((nav) => (
            <li key={nav.link} className="text-2xl cursor-pointer">
              <Link
                to={nav.link}
                className={`${
                  isActive(nav.link) ? "text-orange-400 font-semibold" : ""
                }`}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* PROFILE */}
        <div className={`flex gap-x-2 justify-center items-center `}>
          {/* HAMBURGER MENU */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-3xl focus:outline-none"
            >
              {openMenu ? <CgClose /> : <HiOutlineMenu />}
            </button>
          </div>
          {/* USER  */}
          {userState.userInfo ? (
            // <>
            //   <FaRegUserCircle className="text-2xl text-center mb-1" />
            //   <span className="hidden md:block text-lg text-center">
            //     {userState?.userInfo?.name?.split(" ")[0]}
            //   </span>
            // </>
            <div className="relative">
              <div
                onClick={toggleSmallMenu}
                className="cursor-pointer flex gap-x-2"
              >
                {userState?.userInfo && userState.userInfo.avatar ? (
                  <img
                    src={
                      stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar
                    }
                    className="h-8 w-8 p-[2px] border-2 border-blue-500 rounded-full"
                    alt="profile"
                  />
                ) : (
                  <FaRegUserCircle className="text-2xl text-center mb-1" />
                )}

                <span className="hidden md:block text-lg text-center">
                  {userState?.userInfo?.name?.split(" ")[0]}
                </span>
              </div>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul>
                    <Link to="/profile">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profile
                      </li>
                    </Link>

                    {userState?.userInfo?.admin && (
                      <Link to="/admin">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Dashboard
                        </li>
                      </Link>
                    )}
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // login sign up button
            <div className="hidden md:flex flex-row-reverse gap-x-2">
              <button className="px-2 py-2 text-sm bg-black text-white rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300">
                <Link to="/register">REGISTER</Link>
              </button>
              <button className="px-2 text-sm py-2 bg-black text-white rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300">
                <Link to="/login">LOGIN</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
