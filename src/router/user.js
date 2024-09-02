import { Router } from 'express';
import userController from '../controllers/api/userController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(userController.getAll));
router.get('/:id', cw(userController.getOne));
router.post('/', cw(userController.create));
router.patch('/:id/update', cw(userController.update));
router.delete('/:id/delete', cw(userController.delete));

export default router;
