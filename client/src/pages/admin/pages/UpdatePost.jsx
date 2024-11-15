import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost, updatePost } from "../../../services/post";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";

const UpdatePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [photo, setPhoto] = useState(null);

  //somehow onSuccess did not trigger
  // const { data, isLoading, isError, error } = useQuery({
  //   queryFn: () => getSinglePost({slug}),
  //   queryKey: ["blogg"],
  //   onSuccess: (data) => {
  //     try {
  //       console.log("Fetched Data:", data);
  //       if (!data) {
  //         console.error("No data returned");
  //       }
  //       setTitle(data.post.title);
  //       setCaption(data.post.caption);
  //       setBody(data.post.body);
  //       setPhoto(data.post.photo);
  //       setTags(data.post.tags.join(", "));
  //       setCategory(data.post.category);
  //     } catch (error) {
  //       console.error("Error in onSuccess:", error);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error fetching data:", error);
  //   },
  //   refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSinglePost({ slug });
        const fetchedData = response.post;
        console.log(fetchedData);

        if (!fetchedData) {
          console.error("No data returned");
          return;
        }

        setTitle(fetchedData.title);
        setCaption(fetchedData.title);
        setPhoto(fetchData.photo);
        setBody(fetchedData.body);
      } catch (error) {
        toast.error("Error fetching data!");
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [slug]);

  const mutation = useMutation({
    mutationFn: ({ updatedData, slug, token }) =>
      updatePost({ updatedData, slug, token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated!");
      navigate(`/admin/update-post/${data.slug}`, { replace: true });
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

  const handleDeleteImage = () => {
    if (window.confirm("Do you really want to delete this image?")) {
      setPhoto(null);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = new FormData();

    if (photo) {
      updatedData.append("postPicture", photo);
    }

    updatedData.append("title", title);
    updatedData.append("caption", caption);
    updatedData.append("body", body);
    updatedData.append("category", category);
    updatedData.append("tags", tags.split(", "));

    mutation.mutate({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  // if (isLoading) return <p>Loading...</p>;

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
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="image"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            {photo ? (
              <img
                src={
                  typeof photo === "string" ? photo : URL.createObjectURL(photo)
                }
                alt={title}
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
            onChange={handleFileChange}
            id="image"
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
          {console.log(title)}
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
          {/* <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select Category"
            aria-label="Select Category"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          /> */}
        </div>
        <div className="flex items-start flex-col w-full max-w-xs">
          <label
            htmlFor="tags"
            className="py-1 text-sm md:text-lg text-gray-600"
          >
            Tags
          </label>
          {/* <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter Tags"
            aria-label="Enter Tags"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          /> */}
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
          className="px-6 py-3 w-full bg-black text-white rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300"
        >
          UPDATE
        </button>
      </form>
    </section>
  );
};

export default UpdatePost;
