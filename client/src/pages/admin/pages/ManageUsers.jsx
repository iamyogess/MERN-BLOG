import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../../services/user";
import { stables } from "../../../constants";

const ManageUsers = () => {
  const userState = useSelector((state) => state.user);

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!userState?.userInfo?.token) {
        throw new Error("Token is missing");
      }
      return getAllUsers({ token: userState.userInfo.token });
    },
    enabled: !!userState?.userInfo?.token, // Only fetch when token is available
  });

  console.log("Users Data:", data);
  console.log("Error:", error);
  console.log("Loading:", isLoading);

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
            {data?.allUsers?.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={stables.UPLOAD_FOLDER_BASE_URL + user.avatar}
                    alt="Profile Picture"
                    className=" w-12 h-12 object-cover "
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.admin ? "Admin" : "User"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.blogger ? "blogger" : "Not a blogger"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
