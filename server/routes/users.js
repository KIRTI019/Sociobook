import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getSearchUser,
  getAllUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/token.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/", getAllUser);
router.get("/search", verifyToken, getSearchUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
