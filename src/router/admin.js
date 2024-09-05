import { Router } from 'express';

import adminActivityController from '../controllers/admin/adminActivityController.js';
import adminBookingController from '../controllers/admin/adminBookingController.js';
import adminCategoryController from '../controllers/admin/adminCategoryController.js';
import adminLoginController from '../controllers/admin/adminLoginController.js';
import adminMemberController from '../controllers/admin/adminMemberController.js';
import adminPanelController from '../controllers/admin/adminPanelController.js';
import adminPriceController from '../controllers/admin/adminPriceController.js';

import cw from '../utils/controllerWrapper.js';
import ensureIsAdmin from '../middlewares/adminMiddleware.js';

const router = Router();
router.get('/', cw(adminPanelController.homePage));
router.post('/login', cw(adminLoginController.loginAction));
router.get('/logout', ensureIsAdmin, cw(adminLoginController.logout));
router.get('/bookings', ensureIsAdmin, cw(adminBookingController.bookingsPage));
router.get('/prices', ensureIsAdmin, cw(adminPriceController.pricesPage));
router.get('/members', ensureIsAdmin, cw(adminMemberController.membersPage));
router.get(
  '/categories',
  ensureIsAdmin,
  cw(adminCategoryController.categoriesPage)
);
router.get(
  '/activities',
  ensureIsAdmin,
  cw(adminActivityController.activitiesPage)
);
router.post(
  '/delete-booking/:id',
  ensureIsAdmin,
  cw(adminBookingController.deleteBooking)
);
router.post(
  '/update-booking/:id',
  ensureIsAdmin,
  cw(adminBookingController.updateBooking)
);
router.post(
  '/create-booking',
  ensureIsAdmin,
  cw(adminBookingController.createBooking)
);

router.post(
  '/create-category',
  ensureIsAdmin,
  adminCategoryController.createCategory
);
router.delete(
  '/delete-category/:id',
  ensureIsAdmin,
  cw(adminCategoryController.deleteCategory)
);

export default router;
