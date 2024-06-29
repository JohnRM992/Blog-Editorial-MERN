import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'
import { create , getPostComments , likeComment ,editComment , deleteComment , getComments} from '../controllers/comments.controller.js';

const router = express.Router();


router.post('/create' , verifyToken , create);
router.get('/getPostsComments/:postId' , verifyToken , getPostComments);
router.put('/likeComment/:commentId' , verifyToken , likeComment);
router.put('/editComment/:commentId' , verifyToken , editComment);
router.delete('/deleteComment/:commentId' , verifyToken , deleteComment);
router.get('/getcomments', verifyToken, getComments)
export default router;
