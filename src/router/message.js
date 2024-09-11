import { Router } from 'express';
import messageController from '../controllers/api/messageController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(messageController.getAll));
router.get('/:id', cw(messageController.getOne));
router.post('/', cw(messageController.create));
router.delete('/:id', cw(messageController.deleteMessage));

router.patch('/', cw(messageController.update));

export default router;
