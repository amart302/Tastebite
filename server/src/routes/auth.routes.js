import { Router } from "express";
import { signup, signin } from '../controllers/auth.controller.js';
import errorHandlerMiddleware from "../middleware/errorHandler.middleware.js";
import { signInValidation, signUpValidation } from "../middleware/validation.middleware.js";

const router = new Router();

router.post("/signup", signUpValidation, errorHandlerMiddleware, signup);
router.post("/signin", signInValidation, errorHandlerMiddleware, signin);

export default router;