import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";
import { createPost } from "../../../services/post";
import MultiSelectTagDropdown from "../components/MultiSelectTagDropdown";
import CreatableSelect from "react-select/creatable";
import { promiseOptions } from "../../../utils/multiSelectTagUtils";

// const categoryToOption = (category) => ({
//   value: category._id,
//   label: category.title,
// });

// const filterCategories = (inputValue, categoryData) => {
//   return categoryData
//     .map(categoryToOption)
//     .filter((category) =>
//       category.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
// };

// const promiseOptions = async (inputValue) => {
//   try {
//     const categoriesData = await getCategories();

//     if (!Array.isArray(categoriesData)) {
//       console.log("No categories data found or data is not an array.");
//       return [];
//     }
//     return filterCategories(inputValue, categoriesData);
//   } catch (error) {
//     console.log("Error in promiseOptions:", error);
//     return [];
//   }
// };

const AddPost = () => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState("");

  const { mutate: mutateCreatePostDetails, isLoading: isLoadingPostDetails } =
    useMutation({
      mutationFn: ({ token, blogData }) => createPost({ token, blogData }),
      onSuccess: () => {
        queryClient.invalidateQueries(["blog"]);
        toast.success("Post is created!");
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message || "An error occurred.");
        console.log(error);
      },
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete this picture?")) {
      setPhoto(null);
    }
  };

  const handlePostCreate = (e) => {
    e.preventDefault();

    let newData = new FormData();
    if (!photo) {
      toast.error("You must upload photo!");
      console.log("You must upload a Photo!");
    }
    newData.append("postPicture", photo);

    newData.append("title", title);
    newData.append("caption", caption);
    newData.append("category", category);
    newData.append("tags", tags);
    newData.append("body", body);

    try {
      mutateCreatePostDetails({
        blogData: newData,
        token: userState.userInfo.token,
      });
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <section className="w-full max-h-full container mx-auto px-4">
      <h1 className="text-center font-extrabold text-2xl lg:text-4xl py-2">
        Create Post
      </h1>
      <form
        encType="multipart/form-data"
        onSubmit={handlePostCreate}
        className="flex justify-center items-center flex-col h-full mt-5 gap-6"
      >
        {/* Photo Section */}
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
            name="postPicture"
            id="image"
            onChange={handleFileChange}
            aria-label="Select an image"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Title Section */}
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
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            aria-label="New Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Caption Section */}
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
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter caption"
            aria-label="New caption"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Category Section */}
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="category"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Category
          </label>
          <MultiSelectTagDropdown
            loadOptions={promiseOptions}
            defaultValue={category} // Pass category state as default value
            onChangeFunction={(newValue) => {
              setCategory(newValue ? newValue.value : null); // Update category state
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Tags Section */}
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

        {/* Body Section */}
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="body"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Body
          </label>
          <textarea
            name="body"
            id="body"
            onChange={(e) => setBody(e.target.value)}
            rows="5"
            placeholder="Write Description"
            aria-label="Post Body"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          aria-label="Create Post"
          className="px-6 py-3 w-[22vw] bg-sky-500 text-white rounded-lg border-2 hover:border-white hover:bg-sky-400   transition duration-300"
        >
          {isLoadingPostDetails ? "Submitting..." : "CREATE"}
        </button>
      </form>
    </section>
  );
};

export default AddPost;
