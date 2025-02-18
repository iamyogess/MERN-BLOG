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
    <div className="w-full max-w-screen-xl mx-auto pt-1 md:pt-6 lg:pt-8 px-4 flex flex-col">
      <div className="container mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col items-start gap-4 flex-1 py-4">
          <Link
            to="/"
            className="flex w-full justify-normal md:justify-start items-center"
          >
            {/* <img src="/logo.svg" alt="Logo" className="h-12" /> */}
            <img src="/logo.png" alt="logo" className="w-16 h-16 " />
          </Link>
          <p className="text-base">
            Blog Web App is your go-to platform for sharing, engaging and
            informative blog content. Our mission is to help creators connect
            with their audience and share unique stories with the world.
          </p>
          <div className="flex gap-4">
            <FaFacebook
              className="h-6 w-auto cursor-pointer hover:text-blue-600 transition-all"
              title="Facebook"
            />
            <FaInstagram
              className="h-6 w-auto cursor-pointer hover:text-pink-600 transition-all"
              title="Instagram"
            />
            <FaTwitter
              className="h-6 w-auto cursor-pointer hover:text-blue-400 transition-all"
              title="Twitter"
            />
            <FaRedditAlien
              className="h-6 w-auto cursor-pointer hover:text-orange-600 transition-all"
              title="Reddit"
            />
          </div>
        </div>
        <div className="flex gap-8 w-full flex-1 justify-between  flex-row md:justify-around pb-2">
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:underline"
                  onClick={window.scrollTo(0, 0)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Services
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
      <p className="text-center border-t-2 py-8">
        &copy; {new Date().getFullYear()} Blog Web App. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
