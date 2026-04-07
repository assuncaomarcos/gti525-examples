import {Router} from 'express';

const router = new Router();

router.route('/')
    .get(async (req, res) => {
            res.render('pages/index')
    });

router.route('/efficient-det')
    .get(async (req, res) => {
        res.render('pages/efficient-det', {modelName: 'EfficientDet-Lite0'});
    });

router.route('/mobilenet-ssd')
    .get(async (req, res) => {
        res.render('pages/mobilenet-ssd', {modelName: 'SSDMobileNet-V2'});
    });

export default router;