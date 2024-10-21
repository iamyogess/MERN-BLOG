import React from "react";
import { Link } from 'react-router-dom';
import { ImArrowUpRight2 } from "react-icons/im";

const BlogCard = () => {    
  return (
    <div className="group flex flex-col gap-y-2 p-4 border border-transparent hover:border-black transition-all duration-300 rounded-md">
      <Link to="/single/5">
        <img
          src="https://images.unsplash.com/photo-1723242017539-39cd15eb75fd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Post Image"
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60 rounded-md transition-transform duration-300"
        />
      </Link>
      <div className="flex justify-between items-center">
        <Link to="/single/5">
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl transition-colors duration-300 group-hover:text-orange-400">
            The pros and cons of business agency
          </h1>
        </Link>
        <ImArrowUpRight2 className="h-8 w-auto transition-transform duration-300 group-hover:rotate-45" />
      </div>
      <div className="flex gap-x-2 text-sm md:text-base items-center text-gray-600">
        <span>Pearl Janmanee</span>
        <span className="font-extrabold">&#183;</span>
        <span>May 7, 2023</span>
      </div>
      <p className="text-base lg:text-lg text-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt
        viverra urna, et aliquam leo semper a. Morbi euismod, massa ut faucibus
        ultrices, justo dui tempus arcu, quis lobortis elit enim vitae turpis.
      </p>
      <span className="p-1 md:px-2 md:py-1 rounded-lg border border-black w-fit text-xs md:text-sm lg:text-base">
        Business
      </span>
    </div>
  );
};

export default BlogCard;
