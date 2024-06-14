import express from 'express';

// Importación de controllers
import { test } from '../controllers/user.controller.js';

const router = express.Router();


router.get('/test', test  )


export default router;