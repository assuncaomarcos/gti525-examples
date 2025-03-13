import { Router } from 'express';

const router = Router();

router.route(["/", "/neighborhoods"]).get(async (req, res) => {
    res.render('pages/neighborhoods');
});

router.route("/sites").get(async (req, res) => {
    res.render('pages/sites');
});


export default router;