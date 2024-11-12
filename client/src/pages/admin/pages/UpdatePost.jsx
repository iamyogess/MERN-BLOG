import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../../services/post";

const UpdatePost = () => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState("");

  const { data: updateBlogData, isLoading: updateBlogDataIsLoading } = useQuery(
    {
      queryFn: ({ slug, token, blogData }) => {
        return updatePost({ slug, token, blogData });
      },
    }
  );

  const handleUpdate = () => {
    
  }

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
            value={title}
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
            value={caption}
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
            value={category}
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
            value={photo}
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
            value={body}
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
