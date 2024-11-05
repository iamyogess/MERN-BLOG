import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { updateCategory } from "../services/category";

const UpdateCategory = ({
  categoryId: postCategoryId,
  categoryValue,
  setUpdateCategoryPortal,
}) => {
  const userState = useSelector((state) => state.user);
  const [updatedCategory, setUpdatedCategory] = useState(categoryValue); // Local state for input // cant change the prop directly so assign it locally
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ updatedCategory }) => {
      return updateCategory({
        token: userState.userInfo.token,
        postCategoryId,
        updatedCategory,
      });
    },
    onSuccess: () => {
      setUpdateCategoryPortal(false);
      toast.success("Category Updated!");
      queryClient.invalidateQueries(["category"]);
      console.log("Category Updated!");
    },
    onError: (error) => {
      toast.error("Error while updating category!");
      console.log("Error while updating category!", error);
    },
  });

  // Update local state if the categoryValue prop changes
  useEffect(() => {
    setUpdatedCategory(categoryValue);
  }, [categoryValue]);

  const handleUpdateCategorySubmit = (e) => {
    e.preventDefault();
    mutate({ updatedCategory });
    console.log("hii");
  };

  return (
    <section className="w-full container mx-auto fixed z-[1000] inset-0 flex justify-center p-5 overflow-auto">
      <form
        className="flex justify-center items-center h-full mt-20 gap-x-3"
        onSubmit={handleUpdateCategorySubmit}
      >
        <input
          type="text"
          value={updatedCategory}
          onChange={(e) => setUpdatedCategory(e.target.value)}
          placeholder="Enter a new category"
          aria-label="Update category"
          className="w-full max-w-xs px-5 py-3 border-2 border-black rounded-lg"
        />
        <button
          type="submit"
          aria-label="Update category"
          className="px-6 py-3 bg-black text-white rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "UPDATE"}
        </button>
      </form>
    </section>
  );
};

export default UpdateCategory;
