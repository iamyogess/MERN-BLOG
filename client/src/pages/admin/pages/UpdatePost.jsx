import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost, updatePost } from "../../../services/post";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import { promiseOptions } from "../../../utils/multiSelectTagUtils";
import MultiSelectTagDropdown from "../components/MultiSelectTagDropdown";
import stables from "../../../constants/stables";

const UpdatePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSinglePost({ slug });
        const fetchedData = response.post;
        if (!fetchedData) {
          console.error("No data returned");
          return;
        }
        setTitle(fetchedData.title);
        setCaption(fetchedData.caption);
        setPhoto(fetchedData.photo);
        setBody(fetchedData.body);
        setCategory(fetchedData.category);
      } catch (error) {
        toast.error("Error fetching data!");
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [slug]);

  const mutation = useMutation({
    mutationFn: async ({ updatedData, slug, token }) => {
      return await updatePost({ updatedData, slug, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated!");
      navigate(`/admin/update-post/${data.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("Mutation error:", error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you really want to delete this image?")) {
      setPhoto(null);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    const document = JSON.stringify({
      title,
      caption,
      body,
      category,
    });
    
    formData.append("document", document);
    
    if (photo && typeof photo !== 'string') {
      formData.append("postPicture", photo);
    }

    mutation.mutate({
      updatedData: formData,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <section className="w-full max-h-full container mx-auto px-4">
      <h1 className="text-center font-extrabold text-2xl lg:text-4xl py-2">
        Update Post
      </h1>
      <form
        onSubmit={handleUpdate}
        encType="multipart/form-data"
        className="flex justify-center items-center flex-col h-full mt-5 gap-6"
      >
        <div className="w-full max-w-md flex flex-col items-start">
          <label className="py-1 text-lg text-gray-600">Image</label>
          {photo ? (
            <img
              src={
                typeof photo === "string"
                  ? stables.UPLOAD_FOLDER_BASE_URL + photo
                  : URL.createObjectURL(photo)
              }
              alt="Preview"
              className="w-full h-auto"
            />
          ) : (
            <div className="w-full min-h-[200px] bg-blue-50 flex justify-center items-center rounded-xl">
              <HiOutlineCamera className="w-7 h-auto text-primary" />
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border px-4 py-3 rounded-lg mt-2"
          />
          <button
            type="button"
            disabled={!photo}
            onClick={handleDeleteImage}
            className="px-6 py-3 w-full bg-red-500 text-white rounded-lg mt-2 disabled:opacity-50"
          >
            Remove Image
          </button>
        </div>

        <div className="flex items-start flex-col w-full max-w-md">
          <label htmlFor="title" className="py-1 text-sm md:text-lg text-gray-600">
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

        <div className="flex items-start flex-col w-full max-w-md">
          <label htmlFor="caption" className="py-1 text-sm md:text-lg text-gray-600">
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

        <div className="flex items-start flex-col w-full max-w-md">
          <label htmlFor="category" className="py-1 text-sm md:text-lg text-gray-600">
            Category
          </label>
          <MultiSelectTagDropdown
            loadOptions={promiseOptions}
            defaultValue={category}
            onChangeFunction={(newValue) => {
              setCategory(newValue ? newValue.value : null);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex items-start flex-col w-full max-w-md">
          <label htmlFor="description" className="py-1 text-sm md:text-lg text-gray-600">
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
          aria-label="Update Post"
          className="px-6 py-3 w-[30vw] bg-green-500 text-white rounded-lg border-2 hover:border-white hover:bg-green-400 transition duration-300"
        >
          UPDATE
        </button>
      </form>
    </section>
  );
};

export default UpdatePost;