import { Router } from 'express';
import loginController from '../controllers/api/loginController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.post('/', cw(loginController.login));

export default router;
