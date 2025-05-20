import { Router } from "express";
import { getCategories, addCategories } from "../controllers/categories.controller.js";

const router = new Router();

router.get("/", getCategories);
router.post("/addAll", addCategories);

export default router;