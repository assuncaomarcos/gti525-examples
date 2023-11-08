import { Router } from "express";
import controller from "../controllers/artists.mjs";

const router = Router();

router.route("/")
    .get(controller.all);

router.route("/:artistId")
    .get(controller.artistById);

export default router;