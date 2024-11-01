import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
} from "../controllers/userController.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, getUserProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/uploadProfilePicture", authGuard, uploadProfilePicture);

export default router;
