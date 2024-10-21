import React from "react";
import Hero from "./components/Hero";
import SuggestedPosts from "./components/SuggestedPosts";
import MainLayout from "../../components/MainLayout";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <SuggestedPosts />
      </MainLayout>
    </>
  );
};

export default HomePage;
