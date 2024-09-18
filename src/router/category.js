import { Router } from 'express';
import categoryController from '../controllers/api/categoryController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(categoryController.getAll));

export default router;
