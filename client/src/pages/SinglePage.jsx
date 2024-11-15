import React from "react";
import MainLayout from "../components/MainLayout";
import Comment from "../components/Comment/Comment";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../services/post";
import stables from "../constants/stables";

const SinglePage = () => {
  const { slug } = useParams();

  const { data: blogData, isLoading: blogDataIsLoading } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog"],
  });

  if (blogDataIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <div className="mt-20 py-5 container w-full mx-auto px-4 md:max-w-5xl">
        <div className="flex justify-center items-center gap-x-5 py-3 text-sm md:text-base font-semibold">
          <span>{blogData.post.createdAt}</span>&#8226;
          <span className="underline">{blogData.post.user.name}</span>&#8226;
          <span>{blogData.post.category.title}</span>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold py-2">
          {blogData.post.title}
        </h1>
        <div className="md:max-w-5xl flex justify-center items-center flex-col">
          <img
            src={
              blogData.post.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + blogData.post.photo
                : "/hero.jpeg"
            }
            alt="Blog Image"
            className="rounded-lg my-2 w-auto md:max-w-5xl"
          />
          <p className="text-base md:text-lg">{blogData.post.body}</p>
        </div>
        <Comment />
      </div>
    </MainLayout>
  );
};

export default SinglePage;
