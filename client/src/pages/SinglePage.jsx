import React from "react";
import MainLayout from "../components/MainLayout";
import Comment from "../components/Comment/Comment";

const SinglePage = () => {
  return (
    <MainLayout>
      <div className="mt-20 py-5 container w-full mx-auto px-4 md:max-w-5xl">
        <div className="flex justify-center items-center gap-x-5 py-3 text-sm md:text-base font-semibold">
          <span>July 3, 2024</span>&#8226;
          <span className="underline">Hari Bahadur</span>&#8226;
          <span>Category</span>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold py-2">
          The pros and cons of business agency
        </h1>
        <div className="md:max-w-5xl flex justify-center items-center flex-col">
          <img src="/hero.jpeg" alt="Blog Image" className="rounded-lg my-2 w-auto md:max-w-5xl" />
          <p className="text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nisi
            sed, cumque qui vitae amet doloremque aliquam culpa nulla iure,
            assumenda ullam tempore cum! Voluptates rerum ratione officiis saepe
            iure animi, maxime in incidunt necessitatibus at odio omnis
            perferendis debitis?
          </p>
        </div>
        <Comment />
      </div>
    </MainLayout>
  );
};

export default SinglePage;
