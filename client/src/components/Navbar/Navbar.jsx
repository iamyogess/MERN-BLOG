import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  // const [onScroll, setOnScroll] = useState(false);
  const [openMenu, setOpenMenu] = useState(false); // Set to false initially to start with menu closed

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

  return (
    <nav
    className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out bg-white shadow-md`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-6">
        {/* LOGO */}
        <div className={`text-2xl font-bold `}>LOGO</div>

        {/* DESKTOP MENU */}
        <ul className={`hidden md:flex gap-x-5 text-lg `}>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>

        {/* MOBILE MENU */}
        <ul
          className={`md:hidden flex-col gap-y-6 absolute top-0 left-0 w-full h-screen bg-white p-10 mt-20 transition-transform duration-300 ease-in-out ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          } text-black`}
        >
          <li className="text-2xl cursor-pointer">Home</li>
          <li className="text-2xl cursor-pointer">About</li>
          <li className="text-2xl cursor-pointer">Services</li>
          <li className="text-2xl cursor-pointer">Contact</li>
        </ul>

        {/* PROFILE */}
        <div
          className={`flex gap-x-2 justify-center items-center `}
        >
          <FaRegUserCircle className="text-2xl text-center mb-1" />
          <span className="hidden md:block text-lg text-center">Name</span>

          {/* HAMBURGER MENU */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-3xl focus:outline-none"
            >
              {openMenu ? <CgClose /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
