import { Router } from 'express';
import activityRouter from './activity.js';
import adminRouter from './admin.js';
import bookingRouter from './booking.js';
import categoryRouter from './category.js';
import userRouter from './user.js';
import loginRouter from './login.js';
import signinRouter from './signin.js';
import contactRouter from './contact.js';
import priceRouter from './price.js';
import reviewRouter from './review.js';
import messageRouter from './message.js';

const router = Router();

router.use('/admin', adminRouter);
router.use('/activities', activityRouter);
router.use('/booking', bookingRouter);
router.use('/account', userRouter);
router.use('/category', categoryRouter);
router.use('/signin', signinRouter);
router.use('/login', loginRouter);
router.use('/contact', contactRouter);
router.use('/price', priceRouter);
router.use('/reviews', reviewRouter);
router.use('/messages', messageRouter);

export default router;
