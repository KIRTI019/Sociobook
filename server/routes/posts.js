import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/token.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/user/:userId", verifyToken, getUserPosts);
router.post("/create", verifyToken, createPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
