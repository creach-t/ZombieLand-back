import { Router } from 'express';
import bookingController from '../controllers/api/bookingController.js'
import cw from ('../utils/controllerWrapper.js');

const router = Router();

router.get('/:id', cw(bookingController.createBooking))



export default router;
