import { Router } from 'express';
import reviewController from '../controllers/api/reviewController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(reviewController.getAll));
router.get('/:id', cw(reviewController.getOne));
router.post('/', cw(reviewController.create));
router.delete('/:id', cw(reviewController.deleteCategory));

router.patch('/', cw(reviewController.update));

export default router;
