import { Router } from 'express';
import nController from '../controllers/neighborhoods.mjs';
import sitesController from '../controllers/sites.mjs';

const router = Router();

router.route("/neighborhoods")
    .get(nController.all);

router.route("/neighborhoods/:id")
    .get(nController.byId);

router.route("/neighborhoods/search")
    .post(nController.withinArea);

router.route("/sites")
    .get(sitesController.search);

router.route("/sites/search")
    .post(sitesController.withinPolygon);

router.route("/sites/:id")
    .get(sitesController.byId);

export default router;