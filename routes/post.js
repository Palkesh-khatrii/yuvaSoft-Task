import express from "express";
const router = express.Router()
import { createPost, getPosts, editPost, deletePost, getAllPosts } from '../controllers/postController';
import { tokenValidation } from "../middleware/auth"


router.post('/create',tokenValidation, createPost);
router.get('/getAllPosts', tokenValidation, getAllPosts);
router.get('/:id',tokenValidation,  getPosts);
router.put('/:id', tokenValidation, editPost);
router.delete('/:id', tokenValidation, deletePost);


module.exports = router;
