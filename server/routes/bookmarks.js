import express from "express";
import { addBookmark, removeBookmark } from "../controllers/bookmarkController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/bookmarks/:id', authMiddleware, addBookmark )
router.post('/bookmarks/:id', authMiddleware, removeBookmark)

export default router;