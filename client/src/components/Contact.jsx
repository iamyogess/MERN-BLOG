import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  // State to manage form input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to handle validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.message) newErrors.message = "Message is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const formErrors = validateForm();
    setErrors(formErrors);

    // If there are errors, stop submission
    if (Object.keys(formErrors).length > 0) return;

    // Normally here, you'd send form data to a backend (e.g., an API)
    console.log(formData);

    // Set success message
    toast.success("Message has been sent successfully!");

    // Clear the form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-8 mt-10">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-5 text-gray-800">
          Contact Us
        </h2>
        <p className="text-center text-lg text-gray-600 mb-5">
          We’d love to hear from you! Fill out the form below to get in touch.
        </p>

        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          {/* Owner Info Section */}
          <div className="flex  flex-col gap-5  md:gap-20 items-start mb-5 ">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-blue-500 w-6 h-6" />
              <p className="text-gray-600 text-lg">Mid-Baneshwor, Kathmandu</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-500 w-6 h-6" />
              <a
                href="tel:+977 9763493276"
                className="text-gray-600 text-lg hover:underline"
              >
                +977 9763493276
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-500 w-6 h-6" />
              <p className="text-gray-600 text-lg">aryanSchool@gmail.com</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-lg mx-auto md:mx-5 w-full bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-base">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-base">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-3">
                <label
                  htmlFor="message"
                  className="block text-base font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.message && (
                  <p className="text-red-500 text-base">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        {/* Map Section */}
        <div className="mt-10">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.686303237523!2d85.33532027492268!3d27.69608882598889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1999be7f0fc9%3A0xfac07fe53ee539a4!2sAryan%20School%20of%20Engineering%20%26%20Management!5e0!3m2!1sen!2snp!4v1738309686860!5m2!1sen!2snp"
            className="w-full"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
