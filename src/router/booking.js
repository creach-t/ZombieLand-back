import { Router } from 'express';
import bookingController from '../controllers/api/bookingController.js';
import checkJwt from '../middlewares/CheckJWT.js';

const router = Router();

router.post('/', checkJwt, bookingController.createBooking);
router.delete('/:id', checkJwt, bookingController.CancelBooking);

export default router;
