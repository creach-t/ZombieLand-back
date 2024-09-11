import { Router } from 'express';
import bookingController from '../controllers/api/bookingController.js';
import cw from '../utils/controllerWrapper.js';
import checkJwt from '../middlewares/CheckJWT.js';

const router = Router();

router.get('/:id', checkJwt, cw(bookingController.getOneBooking));
router.post('/', checkJwt, cw(bookingController.createBooking));
router.patch('/:id', checkJwt, cw(bookingController.updateBooking));

export default router;
