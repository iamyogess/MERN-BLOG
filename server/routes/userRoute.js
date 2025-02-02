import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
  getBloggerRequest,
  approveBloggerRequest,
  getVerifiedBloggers,
  rejectBloggerRequest,
  revokeBloggerPermission,
  bloggerRequest,
  getActivityLog,
} from "../controllers/userController.js";
import { adminGuard, authGuard } from "../middlewares/authGuard.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, getUserProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/uploadProfilePicture", authGuard, uploadProfilePicture);
router.post("/blogger-request",authGuard, getBloggerRequest);
router.get("/get-request",authGuard,adminGuard, bloggerRequest);
router.put("/approve-blogger/:userId",authGuard,adminGuard, approveBloggerRequest);
router.get("/get-bloggers",authGuard,adminGuard, getVerifiedBloggers);
router.get("/activity-log",authGuard,adminGuard, getActivityLog);
router.put("/reject-blogger/:userId",authGuard,adminGuard, rejectBloggerRequest);
router.put("/revoke-blogger/:userId",authGuard,adminGuard, revokeBloggerPermission);

export default router;
