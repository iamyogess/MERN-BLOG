import React from "react";
import Hero from "./components/Hero";
import SuggestedPosts from "./components/SuggestedPosts";
import MainLayout from "../../components/MainLayout";
import About from "../../components/About";
import Service from "../../components/Service";
import Contact from "../../components/Contact";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <SuggestedPosts />
        <About />
        <Service />
        <Contact />
      </MainLayout>
    </>
  );
};

export default HomePage;
