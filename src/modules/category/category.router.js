import { Router } from "express";
import * as categoryController from "./category.controller.js";
import fileUpload, { fileType } from './../../utls/multer.js';
import { auth } from '../../middelware/auth.js';
const router = Router({caseSensitive: true});
router.post('/' ,auth() ,fileUpload(fileType.image).single('image'),categoryController.create);
router.get('/',categoryController.getAll);
router.get('/active' , categoryController.getActive);
router.get('/:id',categoryController.getDetails);
router.patch('/:id',auth() ,fileUpload(fileType.image).single('image'),categoryController.update);
router.delete('/:id',auth() ,categoryController.destory);
export default router;