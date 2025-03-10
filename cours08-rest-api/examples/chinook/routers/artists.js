import { Router } from "express";
import controller from "../controllers/artists.js";

const router = Router();

router.route("/")
    .get(controller.all);

router.route("/:artistId")
    .get(controller.artistById);

export default router;