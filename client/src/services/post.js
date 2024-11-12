import axios from "axios";

const createPost = async ({ token, blogData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/post/create-post`,
      blogData,
      config
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("Error creating post:", errorMessage);
    throw new Error(errorMessage);
  }
};

const getAllPosts = async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/post`);
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("Error creating post:", errorMessage);
    throw new Error(errorMessage);
  }
};

export { createPost, getAllPosts };
