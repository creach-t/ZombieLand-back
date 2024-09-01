import { Router } from 'express';
import activityRouter from './activity.js';
import bookingRouter from './booking.js';
import categoryRouter from './category.js';
import userRouter from './user.js';
import loginRouter from './login.js';
import signinRouter from './signin.js';
import adminRouter from './admin.js';

const router = Router();

router.use('/activities', activityRouter);
router.use('/booking', bookingRouter);
router.use('/account', userRouter);
router.use('/admin-home', adminRouter);
/* router.use('/signin', signin);
router.use('/login', loginRouter); */

export default router;
