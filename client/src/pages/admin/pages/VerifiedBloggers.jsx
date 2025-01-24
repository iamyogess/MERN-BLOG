import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getVerifiedBloggerRequests } from "../../../services/user";

const VerifiedBloggers = () => {
  const userState = useSelector((state) => state.user);

  // Fetch verified bloggers
  const {
    data: verifiedBloggers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["verifiedBloggers"],
    queryFn: () => getVerifiedBloggerRequests({ token: userState.userInfo.token }),
  });

  if (isLoading) {
    return <div>Loading verified bloggers...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-screen-xl w-full mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800">Verified Bloggers</h1>
      {verifiedBloggers && verifiedBloggers.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {verifiedBloggers.map((blogger) => (
            <li
              key={blogger._id}
              className="p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
            >
              <span className="text-lg font-medium text-gray-700">{blogger.name}</span>
              <span className="text-sm text-gray-500">{blogger.email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">No verified bloggers found.</p>
      )}
    </div>
  );
};

export default VerifiedBloggers;
