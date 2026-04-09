import express from 'express';

const router = express.Router();

router.get(['/', '/text-generation'], async (req, res) => {
    res.render("pages/text-generation");
});

export default router;
