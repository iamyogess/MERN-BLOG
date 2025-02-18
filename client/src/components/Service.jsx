import React from "react";
import { FaPenFancy, FaImages } from "react-icons/fa";
const Service = () => {
  const services = [
    {
      id: 1,
      icon: <FaPenFancy className="text-blue-500 text-6xl mx-auto mb-4" />,
      title: "Creative Writing",
      description:
        "Our platform helps bloggers craft engaging, creative content for their audiences.",
    },
    {
      id: 2,
      icon: <FaImages className="text-green-500 text-6xl mx-auto mb-4" />,
      title: "Image Content Creation",
      description:
        "Create stunning, high-quality images to complement your blog posts and enhance your content.",
    },
  ];
  return (
    <section id="service" className=" py-12 mt-10">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Our Services
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          We provide a range of services to help bloggers create and enhance
          their content.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              {service.icon}
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
