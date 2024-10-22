import React from "react";

const CreateCategory = () => {
  return (
    <section className="w-full max-h-full container mx-auto">
      <h1 className="text-center font-extrabold text-2xl lg:text-4xl py-5">
        Create Category
      </h1>
      <form className="flex justify-center items-center h-full mt-20 gap-x-3">
        <input
          type="text"
          placeholder="Enter a new category"
          aria-label="New category"
          className="w-full max-w-xs px-5 py-3 border-2 border-black rounded-lg"
        />
        <button
          type="submit"
          aria-label="Create category"
          className="px-6 py-3 bg-black text-white rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300"
        >
          CREATE
        </button>
      </form>
    </section>
  );
};

export default CreateCategory;
