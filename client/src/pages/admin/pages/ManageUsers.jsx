import React from "react";

const ManageUsers = () => {
  return (
    <section className="overflow-x-auto">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <h1 className="font-extrabold text-2xl">Manage Users</h1>
          <div className="flex gap-x-2">
            <input
              type="text"
              placeholder="Search Users"
              className=" px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button className="px-4 py-2 bg-black text-white rounded-lg border hover:border-black hover:bg-transparent hover:text-black transition duration-300">
              Search
            </button>
          </div>
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Image</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Role</th>
              <th className="px-4 py-2 border border-gray-300">Verification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">John Doe</td>
              <td className="px-4 py-2 border border-gray-300">
                john@example.com
              </td>
              <td className="px-4 py-2 border border-gray-300">Admin</td>
              <td className="px-4 py-2 border border-gray-300">Verified</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">Jane Smith</td>
              <td className="px-4 py-2 border border-gray-300">
                jane@example.com
              </td>
              <td className="px-4 py-2 border border-gray-300">Editor</td>
              <td className="px-4 py-2 border border-gray-300">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
