import { Router } from "express";
import controller from "../controllers/artists.mjs";

const router = Router();

router.route("/")
    .get(controller.all);

export default router;