import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../../services/post";
import { stables } from "../../../constants";

const ManagePost = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Use `queryKey` to properly configure the query
  const { data, isLoading } = useQuery({
    queryKey: ["posts"], // Added queryKey as an array
    queryFn: getAllPosts,
  });

  if (isLoading) return <p>Loading...</p>;

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
            {console.log(data)}
            {data?.map((item, index) => (
              <tr key={item._id || index} className="text-sm">
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    // src="https://via.placeholder.com/80"
                    src={stables.UPLOAD_FOLDER_BASE_URL + item.photo}

                    alt="Post"
                    className="w-16 h-16 rounded-md"
                  />
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
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
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
