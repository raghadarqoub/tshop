import {Router} from 'express';
import * as cartController from './cart.controller.js';
import {auth ,roles} from '../../middelware/auth.js';
import { endPoints } from './cart.role.js';
const router = Router();
router.post('/' ,auth(endPoints.create) ,cartController.create);
router.put('/:productId' ,auth(endPoints.delete),cartController.remove);
router.put('/updateQuantity/:productId' ,auth(endPoints.updateQuantity),cartController.updateQuantity);
export default router;
