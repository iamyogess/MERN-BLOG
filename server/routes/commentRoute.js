import express from "express";
import { authGuard } from "../middlewares/authGuard.js";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", authGuard, createComment);
router.put("/:commentId", authGuard, updateComment);
router.delete("/:commentId", authGuard, deleteComment);

export default router;
