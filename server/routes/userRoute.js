import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile",authGuard, getUserProfile);

export default router;