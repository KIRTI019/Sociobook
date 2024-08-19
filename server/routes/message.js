import express from "express";
import { getMessages, sendMessage } from "../controllers/message.js";
import { verifyToken } from "../middleware/token.js";

const router = express.Router();

router.post("/", getMessages);
router.post("/send-message", sendMessage);

export default router;
