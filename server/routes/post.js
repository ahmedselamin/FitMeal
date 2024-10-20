import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from '../controllers/postConftroller.js';
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, upload.single('image'), createPost);
router.put('/:id', authMiddleware, updatePostById);
router.delete('/:id', authMiddleware, deletePostById);

export default router;
