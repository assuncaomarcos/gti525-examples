import { Router } from 'express';
import nController from '../controllers/api.mjs';

const router = Router();

router.route("/neighborhoods")
    .get(nController.all);

router.route("/neighborhoods/:id")
    .get(nController.byId);

router.route("/neighborhoods/search")
    .post(nController.withinArea);

export default router;