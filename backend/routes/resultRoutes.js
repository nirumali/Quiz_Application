import express from 'express';

import authMiddleware from '../middleware/auth.js';
import { createResult,listResults } from '../controllers/resultController.js';

const resultRouter=express.Router();

resultRouter.post('/',authMiddleware,createResult);
resultRouter.post('/',authMiddleware,listResults);

export default resultRouter;
