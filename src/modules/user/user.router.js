import { Router } from "express";
import * as userController from "./user.controller.js";
import { auth, roles } from "../../middelware/auth.js";
import { endPoints } from "./user.role.js";
const router = Router();
router.get('/',auth(endPoints.getUsers),userController.getUsers);
router.get('/userData',auth(endPoints.userData),userController.getUserData);

export default router