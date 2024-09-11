import { Router } from 'express';
import reviewController from '../controllers/api/reviewController.js';
import cw from '../utils/controllerWrapper.js';
import checkJwt from '../middlewares/CheckJWT.js';

const router = Router();

router.post('/', checkJwt, cw(reviewController.createReview));
router.delete('/:id', checkJwt, cw(reviewController.deleteReview));
router.patch('/', checkJwt, cw(reviewController.update));

export default router;
