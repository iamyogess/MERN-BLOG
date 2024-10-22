import React from "react";

const UpdatePost = () => {
  return (
    <section className="w-full max-h-full container mx-auto px-4">
      <h1 className="text-center font-extrabold text-2xl lg:text-4xl py-2">
        Update Post
      </h1>
      <form className="flex justify-center items-center flex-col h-full mt-5 gap-6">
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="title"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            aria-label="New Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="caption"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Caption
          </label>
          <input
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter Caption"
            aria-label="New Caption"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="category"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Select Category"
            aria-label="Select Category"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="image"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Select an image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            aria-label="Select an image"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="description"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="5"
            placeholder="Write Description"
            aria-label="Write Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          aria-label="Create Post"
          className="px-6 py-3 bg-black text-white rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300"
        >
          UPDATE
        </button>
      </form>
    </section>
  );
};

export default UpdatePost;
