import { Router } from 'express';
import adminPanelController from '../controllers/adminPanelController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();
router.get('/', cw(adminPanelController.homePage));
router.post('/login', cw(adminPanelController.loginAction));
router.get('/logout', cw(adminPanelController.logout));

export default router;