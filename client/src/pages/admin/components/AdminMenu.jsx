import React from "react";
import { TfiWrite } from "react-icons/tfi";
import { GrUpdate } from "react-icons/gr";
import { BiSolidCollection } from "react-icons/bi";
import { FaUsersCog } from "react-icons/fa";
import { MdDashboardCustomize, MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const menuItems = [
    {
      icon: <MdDashboardCustomize className="h-6 w-auto" />,
      label: "Dashboard",
      link: "admin-dashboard",
    },
    {
      icon: <TfiWrite className="h-6 w-auto" />,
      label: "Add Post",
      link: "add-post",
    },
    {
      icon: <MdCategory className="h-6 w-auto" />,
      label: "Create Category",
      link: "create-category",
    },
    {
      icon: <GrUpdate className="h-6 w-auto" />,
      label: "Update Post",
      link: "update-post",
    },
    {
      icon: <BiSolidCollection className="h-6 w-auto" />,
      label: "Manage Posts",
      link: "manage-posts",
    },
    {
      icon: <FaUsersCog className="h-6 w-auto" />,
      label: "Manage Users",
      link: "manage-users",
    },
  ];

  return (
    <nav
      className="max-w-xl w-full bg-white p-8 h-screen border shadow-lg rounded-md"
      aria-label="Admin navigation menu"
    >
      <ul className="flex flex-col items-start">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-4 py-4 px-4 w-full rounded-md hover:bg-gray-200"
          >
            <span className="text-3xl">{item.icon}</span>
            <Link to={item.link} className="font-semibold border-b p-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminMenu;
