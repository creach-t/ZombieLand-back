import { Router } from 'express';
import signinController from '../controllers/api/signinController.js'
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.post('/signin', cw(signinController.signin))

export default router;
