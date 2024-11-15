import React from "react";
import BlogCard from "../../../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/post";

const SuggestedPosts = () => {
  const { data: blogCardData, isLoading: blogCardDataIsLoading } = useQuery({
    queryFn: () => getAllPosts(),

    queryKey: ["blog"],
  });

  if (blogCardDataIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto my-4 p-2">
      <h1 className="text-3xl font-bold py-2">Suggested Posts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {blogCardData?.map((item) => (
          <BlogCard
            key={item._id}
            post={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedPosts;
