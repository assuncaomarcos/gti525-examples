import { Router } from 'express';
import controller from '../controllers/items.js';

const router = Router();

router.route("/").get(controller.allItems);
router.route("/:itemId").get(controller.itemById);

export default router;
