import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../../services/category";

const CreateCategory = () => {
  const userState = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isErrorOnCategoryLoading,
  } = useQuery({
    queryFn: () => getCategories({ token: userState.userInfo.token }),
    queryKey: ["category"],
    onSuccess: (data) => {
      console.log("Fetched categories:", data);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ title }) => {
      return createCategory({ token: userState.userInfo.token, title });
    },
    onSuccess: () => {
      toast.success("Category created successfully!");
      setTitle("");
      queryClient.invalidateQueries(["category"]);
    },
    onError: (error) => {
      console.error("Error creating category:", error);
      toast.error("Error occurred while creating category!");
    },
  });

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      toast.error("Category field should not be empty!");
      return;
    }
    mutate({ title });
  };

  //delete category mutation
  const { mutate: deleteCategoryMutate, isLoading: isDeletingCategory } =
    useMutation({
      mutationFn: ({ postCategoryId }) => {
        return deleteCategory({
          token: userState.userInfo.token,
          postCategoryId,
        });
      },
      onSuccess: () => {
        toast.success("Category deleted successfully!");
        console.log("Category deleted successfully!");
        queryClient.invalidateQueries(["category"]);
      },
      onError: (error) => {
        toast.error("Something went wrong, Unable to delete the category");
        console.log(
          "Something went wrong, Unable to delete the category",
          error
        );
      },
    });

  const handleDeleteCategory = (postCategoryId) => {
    if (window.confirm("Do you want to delete the category?")) {
      deleteCategoryMutate({ postCategoryId });
    }
  };

  return (
    <section className="w-full max-h-full container mx-auto">
      <h1 className="text-center font-extrabold text-2xl lg:text-4xl py-5">
        Create Category
      </h1>
      <form
        className="flex justify-center items-center h-full mt-20 gap-x-3"
        onSubmit={handleCategorySubmit}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new category"
          aria-label="New category"
          className="w-full max-w-xs px-5 py-3 border-2 border-black rounded-lg"
        />
        <button
          type="submit"
          aria-label="Create category"
          className="px-6 py-3 bg-black text-white rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300 disabled:cursor-disabled"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "CREATE"}
        </button>
      </form>

      {/* All Categories */}
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="font-bold text-xl">All Categories</h1>
        <div className="my-3 w-full max-w-lg">
          {isCategoryLoading ? (
            <p>Loading categories...</p>
          ) : isErrorOnCategoryLoading ? (
            <p>Error loading categories.</p>
          ) : (
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Category Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Creation Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <tr key={category._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {category.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded">
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          disabled={isDeletingCategory}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          {isDeletingCategory ? "Deleting..." : "DELETE"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateCategory;
