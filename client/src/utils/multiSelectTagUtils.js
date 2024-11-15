import { getCategories } from "../services/category";

const categoryToOption = (category) => ({
  value: category._id,
  label: category.title,
});

const filterCategories = (inputValue, categoryData) => {
  return categoryData
    .map(categoryToOption)
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = async (inputValue) => {
  try {
    const categoriesData = await getCategories();

    if (!Array.isArray(categoriesData)) {
      console.log("No categories data found or data is not an array.");
      return [];
    }
    return filterCategories(inputValue, categoriesData);
  } catch (error) {
    console.log("Error in promiseOptions:", error);
    return [];
  }
};

export { promiseOptions };
