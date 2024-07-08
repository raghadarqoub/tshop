import { Router } from "express";
import fileUpload, { fileType } from "../../utls/multer.js";
import * as rewiewController from "./review.controller.js";
import { auth } from "../../middelware/auth.js";
import { endPoints } from "./review.role.js";
const router = Router({mergeParams: true});// a33ml dmg m3 abok
router.post('/',auth(endPoints.create),fileUpload(fileType.image).single('image'),rewiewController.create);

export default router