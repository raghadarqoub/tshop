import {Router} from 'express';
import * as cartController from './cart.controller.js';
import {auth ,roles} from '../../middelware/auth.js';
import { endPoints } from './cart.role.js';
import { validation } from '../../middelware/validation.js';
import * as schema from './cart.validation.js'
const router = Router();
router.post('/' ,auth(endPoints.create) ,validation(schema.creatCartSchema) ,cartController.create);
router.put('/:productId' ,auth(endPoints.delete),cartController.remove);
router.put('/clear',auth(endPoints.delete),cartController.clearCart);
router.get('/' ,auth(endPoints.get),cartController.get);
router.put('/updateQuantity/:productId' ,auth(endPoints.updateQuantity),cartController.updateQuantity);
export default router;
