import { Router } from "express";
import * as authController from "./auth.controller.js";
import { checkEmail } from "../../middelware/checkEmail.js";
import { asyncHandler } from './../../utls/catchError.js';
import { validation } from "../../middelware/validation.js";
import * as schema from './auth.validation.js'
const router = Router();
router.post("/register",checkEmail,validation(schema.registerSchema),asyncHandler (authController.register));
router.post("/login",validation(schema.loginSchema),asyncHandler (authController.login));
router.patch("/sendCode",validation(schema.sendCodeSchema),asyncHandler (authController.sendCode));
router.patch("/forgotPassword",validation(schema.forgotPasswordSchema),asyncHandler (authController.forgotPassword));
router.get("/confirmEmail/:token",asyncHandler (authController.confirmEmail));


export default router;