import { Router } from 'express';
import reviewController from '../controllers/api/reviewController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(reviewController.getAll));
router.get('/:id', cw(reviewController.getOneReview));
router.post('/', cw(reviewController.createReview));
router.delete('/:id', cw(reviewController.deleteReview));

router.patch('/', cw(reviewController.update));

export default router;
