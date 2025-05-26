import { Router } from "express";
import { getImage, getVideo } from "../controllers/media.controller.js";

const router = new Router();

router.get("/image/:image", getImage);
router.get("/video/:video", getVideo);

export default router;