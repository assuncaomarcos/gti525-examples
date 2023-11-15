import { Router } from 'express';

const router = Router();

router.route("/").get(async (req, res) => {
    res.render('pages/toronto');
});

export default router;