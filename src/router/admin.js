import { Router } from 'express';
import adminPanelController from '../controllers/adminPanelController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();
router.get('/', cw(adminPanelController.homePage));
export default router;