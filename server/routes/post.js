import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from '../controllers/postConftroller.js';
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePostById);
router.delete('/:id', authMiddleware, deletePostById);

export default router;
