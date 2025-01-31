import React from "react";
import { FaUsers, FaHeart } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
const About = () => {
  return (
    <section className="  py-12 mt-10">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          About Us
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Welcome to our blog! We are passionate writers and content creators
          dedicated to delivering insightful articles and updates on a variety
          of topics.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <TbTargetArrow className="text-blue-500 text-5xl mx-auto mb-4" />
            <p className="text-gray-600">
              To provide readers with quality content that inspires, educates,
              and entertains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <FaUsers className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Team
            </h3>
            <p className="text-gray-600">
              A diverse group of passionate writers, designers, and developers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <FaHeart className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Why We Care
            </h3>
            <p className="text-gray-600">
              Because sharing knowledge and connecting with readers brings us
              joy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
