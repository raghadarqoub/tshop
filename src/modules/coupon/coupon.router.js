import { Router } from 'express'
import * as coponController from './coupon.controller.js';
import { auth ,roles } from './../../middelware/auth.js';
import { endpoints } from './coupon.role.js';

const router = Router();

router.post('/', auth(endpoints.create),coponController.createCoupon);

export default router;