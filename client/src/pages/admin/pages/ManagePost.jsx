import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getAllPosts } from "../../../services/post";
import { stables } from "../../../constants";
import toast from "react-hot-toast";

const ManagePost = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading: isPostsAreLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: getAllPosts,
  });

  //delete post
  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return deletePost({
          slug,
          token,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["blog"]);
        toast.success("Blog post deleted!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleDeletePost = ({ slug, token }) => {
    if (window.confirm("Do you really want to delete this blog post?")) {
      mutateDeletePost({ slug, token });
    }
  };

  if (isPostsAreLoading) return <p>Loading...</p>;

  return (
    <section>
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <h1 className="font-extrabold text-2xl">Manage Posts</h1>
          <div className="flex gap-x-2">
            <input
              type="text"
              placeholder="Search Post"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button className="px-4 py-2 bg-black text-white rounded-lg border hover:border-black hover:bg-transparent hover:text-black transition duration-300">
              Search
            </button>
          </div>
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="px-4 py-2 border border-gray-300">Post Image</th>
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Caption</th>
              <th className="px-4 py-2 border border-gray-300">Category</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id || index} className="text-sm">
                <td className="px-4 py-2 border border-gray-300">
                  {!item.photo ? (
                    <img
                      src="https://via.placeholder.com/80"
                      alt="Post"
                      className="w-16 h-16 rounded-md"
                    />
                  ) : (
                    <img
                      // src="https://via.placeholder.com/80"
                      src={stables.UPLOAD_FOLDER_BASE_URL + item.photo}
                      alt="Post"
                      className="w-16 h-16 rounded-md"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.title}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.caption}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {/* {item.category?.title || 'N/A'} */}
                  {item.category.length > 0 ? item.category : "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <Link
                    to={`/admin/update-post/${item?.slug}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    disabled={isLoadingDeletePost}
                    onClick={() =>
                      handleDeletePost({
                        slug: item?.slug,
                        token: userState.userInfo.token,
                      })
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManagePost;
