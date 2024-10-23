import React from "react";

const ManagePost = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <h1 className="font-extrabold text-2xl">Manage Posts</h1>
          <div className="flex gap-x-2">
            <input
              type="text"
              placeholder="Search Post"
              className=" px-4 py-2 border border-gray-300 rounded-lg"
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
            <tr className="text-sm">
              <td className="px-4 py-2 border border-gray-300">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Post"
                  className="w-16 h-16 rounded-md"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">Post Title 1</td>
              <td className="px-4 py-2 border border-gray-300">
                This is a caption
              </td>
              <td className="px-4 py-2 border border-gray-300">Category A</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="text-sm">
              <td className="px-4 py-2 border border-gray-300">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Post"
                  className="w-16 h-16 rounded-md"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">Post Title 2</td>
              <td className="px-4 py-2 border border-gray-300">
                Another caption
              </td>
              <td className="px-4 py-2 border border-gray-300">Category B</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManagePost;
