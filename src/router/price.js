import { Router } from 'express';
import priceController from '../controllers/api/priceController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(priceController.getOne));

export default router;
