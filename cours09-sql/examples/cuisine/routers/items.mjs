import { Router } from 'express';
import controller from '../controllers/items.mjs';

const router = Router();

router.route("/").get(controller.allItems);
router.route("/:itemId").get(controller.itemById);

export default router;
