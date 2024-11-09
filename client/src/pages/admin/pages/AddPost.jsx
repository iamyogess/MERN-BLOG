import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import MultiSelectTagDropdown from "../components/MultiSelectTagDropdown";
import { getCategories } from "../../../services/category";
import CreatableSelect from "react-select/creatable";
import { HiOutlineCamera } from "react-icons/hi";
import { createPost } from "../../../services/post";

const categoryToOption = (category) => ({
  value: category._id,
  label: category.title,
});

const filterCategories = (inputValue, categoryData) => {
  return categoryData
    .map(categoryToOption)
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = async (inputValue) => {
  try {
    const categoriesData = await getCategories();

    if (!Array.isArray(categoriesData)) {
      console.log("No categories data found or data is not an array.");
      return [];
    }
    return filterCategories(inputValue, categoriesData);
  } catch (error) {
    console.log("Error in promiseOptions:", error);
    return [];
  }
};

const AddPost = () => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState("");
  const [caption, setCaption] = useState("");

  const { mutate: mutateCreatePostDetails, isLoading: isLoadingPostDetails } =
    useMutation({
      mutationFn: ({ token, blogData }) => {
        console.log(userState.userInfo.token);
        console.log(blogData);
        return createPost({ token, blogData });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["blog"]);
        toast.success("Post is created!");
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    let newData = new FormData();

    if (photo) {
      newData.append("postPicture", photo);
    }
    newData.append(
      "document",
      JSON.stringify({ title, category, tags, caption, body })
    );

    mutateCreatePostDetails({ token: userState.userInfo.token, newData });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete this picture?")) {
      setPhoto(null);
    }
  };

  return (
    <section className="w-full max-h-full container mx-auto px-4">
      <h1 className="text-center font-extrabold text-2xl lg:text-4xl py-2">
        Create Post
      </h1>
      <form
        onSubmit={handleCreatePost}
        encType="multipart/form-data"
        className="flex justify-center items-center flex-col h-full mt-5 gap-6"
      >
        <div className="flex items-start flex-col w-full max-w-xs gap-y-4">
          <label
            htmlFor="image"
            className="py-1 text-sm md:text-lg text-gray-600 w-full"
          >
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Blog Photo"
                className="rounded-xl w-full"
              />
            ) : (
              <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center rounded-xl">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
            <button
              type="button"
              onClick={handleDeleteImage}
              className="px-6 py-3 my-2 w-full bg-red-500 border-2 text-white rounded-lg border-red-500 hover:bg-transparent hover:text-red-500 transition duration-300"
            >
              Remove Image
            </button>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            aria-label="Select an image"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setCaption(e.target.value)}
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
          <MultiSelectTagDropdown
            loadOptions={promiseOptions}
            defaultValue={null}
            onChange={(newValue) =>
              setCategory(newValue.map((item) => item.value))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="tags"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Tags
          </label>
          <CreatableSelect
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            id="tags"
            defaultValue={null}
            isMulti
            onChange={(newValue) => setTags(newValue.map((item) => item.value))}
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
            onChange={(e) => setBody(e.target.value)}
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
          CREATE
        </button>
      </form>
    </section>
  );
};

export default AddPost;
