import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaRedditAlien,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full pt-1 md:pt-6 lg:pt-8 px-4 flex flex-col">
      <div className="container mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col items-start gap-4 flex-1 py-4">
          <Link
            to="/"
            className="flex w-full justify-normal md:justify-start items-center"
          >
            {/* <img src="/logo.svg" alt="Logo" className="h-12" /> */}
            <h1 className="text-2xl font-bold">LOGO</h1>
          </Link>
          <p className="text-base">
            Supposing so be resolving breakfast am or perfectly. It drew a hill
            from me. Valley by oh twenty direct me so.
          </p>
          <div className="flex gap-4">
            <FaFacebook className="h-6 w-auto cursor-pointer hover:text-blue-600 transition-all" />
            <FaInstagram className="h-6 w-auto cursor-pointer hover:text-pink-600 transition-all" />
            <FaTwitter className="h-6 w-auto cursor-pointer hover:text-blue-400 transition-all" />
            <FaRedditAlien className="h-6 w-auto cursor-pointer hover:text-orange-600 transition-all" />
          </div>
        </div>
        <div className="flex gap-8 flex-1 flex-col md:flex-row md:justify-around pb-2">
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Pages
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Legal Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center border-t-2 py-8">Made by Yogesh Shrestha</p>
    </div>
  );
};

export default Footer;
