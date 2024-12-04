import { Router } from 'express';
import messageController from '../controllers/api/messageController.js';
import cw from '../utils/controllerWrapper.js';
import checkJWT from '../middlewares/CheckJWT.js';

const router = Router();

router.get('/', checkJWT, cw(messageController.getAllFromOneConversation));
router.post('/', checkJWT,(messageController.createMessage));
router.patch('/markAsRead', cw(messageController.messageMarkAsRead));

export default router;
