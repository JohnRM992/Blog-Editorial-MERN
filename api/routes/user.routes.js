import express from 'express';

// Importación de controllers
import { test , updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/test', test  )
router.put('/update/:userId' ,verifyToken, updateUser)

export default router;