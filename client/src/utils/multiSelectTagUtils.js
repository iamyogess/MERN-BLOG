export const categoryToOption = (category) => ({
  value: category._id,
  label: category.title,
});

export const filterCategories = (inputValue, categoryData) => {
  const filteredOptions = categoryData
    .map(categoryToOption)
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  console.log(filteredOptions);
  return filteredOptions;
};
