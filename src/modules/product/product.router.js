import { Router } from "express";
import fileUpload , { fileType } from "../../utls/multer.js";
import * as productController from "./product.controller.js";
import { endPoints } from './product.role.js';
import {auth} from "../../middelware/auth.js";

const router = Router();
router.use('/:prouctId/review',reviewRouter);
router.post('/' ,auth(endPoints.create) ,fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImges',maxCount:5}
]),productController.create);
export default router;