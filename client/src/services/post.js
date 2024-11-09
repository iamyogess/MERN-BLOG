import axios from "axios";

const createPost = async ({token, blogData}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Ensure the content type is set if you're sending JSON
    },
  };

  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/post/create-post`,
      blogData,
      config
    );
    return data; // Return the response data directly
  } catch (error) {
    // Improved error handling
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("Error creating post:", errorMessage); // Log the error for debugging
    throw new Error(errorMessage); // Throw the error for further handling
  }
};

export { createPost };
