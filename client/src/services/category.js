import axios from "axios";

const getCategories = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/category/get-categories",
      config
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

const updateCategory = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      "http://localhost:5000/api/category/update-category",
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
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
