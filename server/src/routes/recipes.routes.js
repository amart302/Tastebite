import { Router } from "express";

const router = new Router();

router.get("/", getCategories);
router.post("/addAll", addCategories);

export default router;