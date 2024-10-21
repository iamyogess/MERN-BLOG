import React from "react";
import BlogCard from "../../../components/BlogCard";

const SuggestedPosts = () => {
  return (
    <div className="container mx-auto my-4 p-2">
      <h1 className="text-3xl font-bold py-2">Suggested Posts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

export default SuggestedPosts;
