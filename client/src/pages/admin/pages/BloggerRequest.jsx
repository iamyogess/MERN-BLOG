import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveBloggerRequests,
  getBloggerRequests,
  rejectBloggerRequests,
} from "../../../services/user";
import { useSelector } from "react-redux";

const BloggerRequest = () => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // Fetch blogger requests
  const {
    data: bloggerRequest,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bloggers"],
    queryFn: () => getBloggerRequests({ token: userState.userInfo.token }),
  });

  // Approve mutation
  const { mutate: approveGuide } = useMutation({
    mutationFn: (bloggerId) =>
      approveBloggerRequests({ token: userState.userInfo.token, bloggerId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["bloggers"]);
    },
    onError: (error) => {
      console.error("Error approving blogger:", error.message);
    },
  });

  // Reject mutation
  const { mutate: rejectGuide } = useMutation({
    mutationFn: (bloggerId) => {
      rejectBloggerRequests({ token: userState.userInfo.token, bloggerId });
      console.log(bloggerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bloggers"]);
    },
    onError: (error) => {
      console.error("Error rejecting blogger:", error.message);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-screen-xl w-full mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Blogger Requests
        </h1>
        {bloggerRequest && bloggerRequest.bloggers.length > 0 ? (
          bloggerRequest.bloggers.map((blogger) => (
            <div
              key={blogger._id}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <span className="text-lg font-medium text-gray-700">
                {blogger.name}
              </span>
              <span className="text-lg font-medium text-gray-700">
                {blogger.email}
              </span>
              <span className="text-lg font-medium text-gray-700">
                {blogger._id}
              </span>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
                  onClick={() => approveGuide(blogger._id)}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
                  onClick={() => rejectGuide(blogger._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No blogger requests found.</div>
        )}
      </div>
    </div>
  );
};

export default BloggerRequest;
