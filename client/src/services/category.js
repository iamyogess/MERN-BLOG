import axios from "axios";

const getCategories = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/category/get-categories"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async ({ token, title }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/category/create-category",
      { title },
      config
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

const updateCategory = async ({ token, postCategoryId, updatedCategory }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/category/update-category/${postCategoryId}`,
      { title: updatedCategory },
      config
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

const deleteCategory = async ({ token, postCategoryId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(postCategoryId);

    const { data } = await axios.delete(
      `http://localhost:5000/api/category/${postCategoryId}`,
      config
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export { getCategories, createCategory, updateCategory, deleteCategory };
