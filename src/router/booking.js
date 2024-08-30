import { Router } from 'express';
import bookingController from '../controllers/api/bookingController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();
router.get('/', cw(bookingController.getAllBooking));
router.get('/:id', cw(bookingController.getOneBooking));
router.post('/', cw(bookingController.createBooking));
router.delete('/:id', cw(bookingController.deleteBooking));
router.patch('/:id', cw(bookingController.updateBooking));

export default router;
