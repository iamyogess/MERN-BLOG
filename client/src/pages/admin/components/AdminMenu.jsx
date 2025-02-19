import { useState } from "react";
import { useSelector } from "react-redux";
import { TfiWrite } from "react-icons/tfi";
import { BiSolidCollection } from "react-icons/bi";
import { FaUsersCog } from "react-icons/fa";
import { MdDashboardCustomize, MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const { userInfo } = useSelector((state) => state.user);

  // Menu items for bloggers - only Add Post and Manage Posts
  const bloggerMenuItems = [
    {
      icon: <TfiWrite className="h-6 w-auto" />,
      label: "Add Post",
      link: "add-post",
    },
    {
      icon: <BiSolidCollection className="h-6 w-auto" />,
      label: "Manage Posts",
      link: "manage-posts",
    },
  ];

  // Full menu items for admin
  const adminMenuItems = [
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
      icon: <BiSolidCollection className="h-6 w-auto" />,
      label: "Manage Posts",
      link: "manage-posts",
    },
    {
      icon: <FaUsersCog className="h-6 w-auto" />,
      label: "Manage Users",
      link: "manage-users",
    },
    {
      icon: <FaUsersCog className="h-6 w-auto" />,
      label: "Activity Log",
      link: "activity-logs",
    },
    {
      icon: <FaUsersCog className="h-6 w-auto" />,
      label: "Blogger Requests",
      link: "blogger-request",
    },
    {
      icon: <FaUsersCog className="h-6 w-auto" />,
      label: "Verified Bloggers",
      link: "verified-bloggers",
    },
  ];

  // Choose which menu items to display based on user role
  const menuItems = userInfo?.blogger ? bloggerMenuItems : adminMenuItems;

  const [clickNavLink, setClickNavLink] = useState(false);
  const onClickNavItem = () => {
    setClickNavLink((currentState) => !currentState);
  };

  return (
    <nav
      className="max-w-xl w-full bg-white p-8 h-max border shadow-lg rounded-md"
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