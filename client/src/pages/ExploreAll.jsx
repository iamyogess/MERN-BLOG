import React from "react";
import MainLayout from "../components/MainLayout";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/post";

const ExploreAll = () => {
  const { data: blogCardData, isLoading: blogCardDataIsLoading } = useQuery({
    queryFn: () => getAllPosts(),

    queryKey: ["blog"],
  });

  if (blogCardDataIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <section className="w-full container mx-auto mt-20 p-4 md:p-0">
        <div>
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold pt-8">
            Explore More
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {blogCardData?.map((item) => (
              <BlogCard key={item._id} post={item} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ExploreAll;
