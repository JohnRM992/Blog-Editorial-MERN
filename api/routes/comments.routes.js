import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'
import { create , getComments } from '../controllers/comments.controller.js';

const router = express.Router();


router.post('/create' , verifyToken , create);
router.get('/getPostsComments/:postId' , verifyToken , getComments)

export default router;