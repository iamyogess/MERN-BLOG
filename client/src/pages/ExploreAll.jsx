import React from "react";
import MainLayout from "../components/MainLayout";
import BlogCard from "../components/BlogCard";

const ExploreAll = () => {
  const count = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <MainLayout>
      <section className="w-full container mx-auto mt-20 p-4 md:p-0">
        <div>
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold pt-8">
            Explore More
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {count.map((item, index) => {
              return <BlogCard key={index} />;
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ExploreAll;
