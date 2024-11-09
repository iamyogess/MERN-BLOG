import express from "express";
import {
  createCategory,
  deletePostCategory,
  getPostCategory,
  updatePostCategory,
} from "../controllers/postCategoryController.js";
import { adminGuard, authGuard } from "../middlewares/authGuard.js";

const router = express.Router();

router.post("/create-category", authGuard, adminGuard, createCategory);
router.get("/get-categories", getPostCategory);
router.put(
  "/update-category/:postCategoryId",
  authGuard,
  adminGuard,
  updatePostCategory
);
router.delete("/:postCategoryId", authGuard, adminGuard, deletePostCategory);

export default router;
