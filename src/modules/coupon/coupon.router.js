import { Router } from 'express'
import * as coponController from './coupon.controller.js';
import { auth ,roles } from './../../middelware/auth.js';
import { endpoints } from './coupon.role.js';
import { validation } from './../../middelware/validation.js';
import * as Schema  from './coupon.validation.js'
const router = Router();

router.post('/',validation(Schema.createCouponSchema),auth(endpoints.create),coponController.createCoupon);

export default router;
