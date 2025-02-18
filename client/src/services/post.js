import axios from "axios";

const createPost = async ({ token, blogData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.post(
      `http://localhost:8000/api/post/create-post`,
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
    const { data } = await axios.get(`http://localhost:8000/api/post`);
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("Error creating post:", errorMessage);
    throw new Error(errorMessage);
  }
};

const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/post/${slug}`);
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("Error creating post:", errorMessage);
    throw new Error(errorMessage);
  }
};

const deletePost = async ({ slug, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/post/${slug}`,
      config
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("Error deleting post:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const updatePost = async ({ updatedData, slug, token }) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/post/${slug}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error updating post:", errorMessage);
    throw new Error(errorMessage);
  }
};
export { createPost, getAllPosts, deletePost, getSinglePost };
