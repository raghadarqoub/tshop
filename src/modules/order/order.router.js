import { Router } from 'express'
import * as coponController from './order.controller.js';
import { auth ,roles } from '../../middelware/auth.js';
import { endpoints } from './order.role.js';

const router = Router();

router.post('/', auth(endpoints.create),coponController.createOrder);
router.get('/all', auth(endpoints.all),coponController.getOrders);
router.get('/userOrders', auth(endpoints.getOrder),coponController.getUserOrders);
router.patch('/changeStatus/:orderId', auth(endpoints.changeStatus),coponController.changeStatus);



export default router;