import { Router } from "express";
import fileUpload , { fileType } from "../../utls/multer.js";
import * as productController from "./product.controller.js";
import { endPoints } from './product.role.js';
import {auth} from "../../middelware/auth.js";
import reviewRouter from "../review/review.router.js";
import { validation } from './../../middelware/validation.js';
import * as Schema  from './product.validation.js';
const router = Router();
router.use('/:prouctId/review',reviewRouter);
router.post('/' ,fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImges',maxCount:5}
]),validation(Schema.createProductSchema),auth(endPoints.create) ,productController.create);
router.get('/',productController.getProducts);
export default router;