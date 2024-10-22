import React, { useState } from "react";
import AdminMenu from "./components/AdminMenu";
import { Link, Outlet } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const AdminLayout = () => {
  const [openAdminMenu, setOpenSideMenu] = useState(false);

  const toggleAdminMenu = () => {
    setOpenSideMenu((prevState) => !prevState);
  };

  return (
    <div className="relative flex flex-col w-full">
      {/* Header */}
      <Link
        to="/"
        className="absolute top-0 left-0 z-10 text-center text-black text-2xl font-bold p-8"
      >
        LOGO
      </Link>
      <div className="md:hidden w-full absolute top-0 right-0 p-7 flex justify-end items-center">
        {openAdminMenu ? (
          <CgClose className="text-black text-3xl" onClick={toggleAdminMenu} />
        ) : (
          <HiOutlineMenu
            className="text-black text-3xl"
            onClick={toggleAdminMenu}
          />
        )}
      </div>

      {/* Content */}
      <div className="mt-20 flex relative">
        {/* MOBILE SIDEBAR */}
        <div
          className={`absolute transition-transform duration-300 ease-in-out ${
            openAdminMenu ? "translate-x-0" : "-translate-x-full"
          } w-64`}
        >
          <AdminMenu />
        </div>
        {/* DESKTOP SIDEBAR  */}
        <div className="hidden md:block w-64">
          <AdminMenu />
        </div>

        {/* Main content */}
        {/* <div className="container mx-auto flex justify-center items-center h-80 bg-red-50 ml-8 text-xl md:text-2xl lg:text-4xl font-bold lg:font-extrabold">Admin Control Panel</div> */}
        <div className="flex-1 px-4 py-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
