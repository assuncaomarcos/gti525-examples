import { Router } from 'express';

const router = Router();

router.route(["/", "/neighborhoods"]).get(async (req, res) => {
    res.render('pages/neighborhoods');
});

export default router;