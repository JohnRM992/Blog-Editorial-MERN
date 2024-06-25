import express from "express";
import { verifyToken } from '../utils/verifyUser.js'
import {create , getposts ,deletepost , editpost} from '../controllers/post.controller.js'

const router = express.Router();

router.post('/create' , verifyToken , create)
router.get('/getposts' , getposts)
router.delete('/deletepost/:postId/:userId' , verifyToken , deletepost)
router.put('/editpost/:postId/:userId' , verifyToken , editpost)



export default router;