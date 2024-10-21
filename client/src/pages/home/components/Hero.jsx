import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(/hero.jpeg)`,
      }}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content on top of the darkened background */}
      <div className="relative z-99 container text-white flex items-center justify-center h-screen px-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Exploring thoughts & ideas that <br className="hidden lg:block" />
            truly matter
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mt-4">
            Join us as we navigate through the intricacies of life, pondering
            thoughts and ideas that resonate deeply with our human experience.
          </p>
          <Link
            to="/explore"
            className="inline-block bg-white text-black border-2 border-transparent rounded-lg px-6 py-3 text-sm md:text-base transition-colors duration-300 hover:bg-gray-200 hover:border-black mt-8"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
