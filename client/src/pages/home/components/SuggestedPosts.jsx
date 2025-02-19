import React, { useState } from "react";
import BlogCard from "../../../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/post";
import { HiSearch } from "react-icons/hi";

const SuggestedPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: blogCardData, isLoading: blogCardDataIsLoading } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["blog"],
  });

  const filteredPosts = blogCardData?.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (blogCardDataIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto my-4 px-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Suggested Posts</h1>

        <div className="relative flex gap-x-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <HiSearch className="h-8 w-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPosts?.map((item) => (
            <BlogCard key={item._id} post={item} />
          ))}
        </div>

        {filteredPosts?.length === 0 && (
          <p className="text-center text-gray-500">
            No posts found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default SuggestedPosts;
