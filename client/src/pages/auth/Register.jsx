import React from "react";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <MainLayout>
      <section className="mt-20 container mx-auto pt-10">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-6">Register</h1>
          <form action="">
            {/* NAME  */}
            <div className="flex justify-center items-start flex-col gap-y-2">
              <label htmlFor="name" className="font-semibold text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="px-10 py-4 border-2 border-black rounded-lg"
              />
            </div>
            {/* EMAIL  */}
            <div className="flex justify-center items-start flex-col gap-y-2">
              <label htmlFor="email" className="font-semibold text-gray-500">
               Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="px-10 py-4 border-2 border-black rounded-lg"
              />
            </div>
            {/* PASSWORD  */}
            <div className="flex justify-center items-start flex-col gap-y-2">
              <label htmlFor="password" className="font-semibold text-gray-500">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="px-10 py-4 border-2 border-black rounded-lg"
              />
            </div>
            {/* CONFIRM PASSWORD  */}
            <div className="flex justify-center items-start flex-col gap-y-2">
              <label htmlFor="confirm_password" className="font-semibold text-gray-500">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                className="px-10 py-4 border-2 border-black rounded-lg"
              />
            </div>
            <button className="px-10 py-4 mt-3 bg-black text-white w-full rounded-lg">Register</button>
          </form>
          <div className="mt-2">
            <p>
              Already have an account? <Link to="/login">Login here </Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
